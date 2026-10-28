import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, LoaderCircle, Check, CircleAlert } from 'lucide-react';
import { site } from '../config/site';
import { services } from '../data/services';
import { useReveal } from '../lib/useReveal';
import '../styles/contact.css';

type Fields = { name: string; email: string; company: string; projectType: string; details: string; website: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'error' | 'not-configured';

const empty: Fields = { name: '', email: '', company: '', projectType: '', details: '', website: '' };
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Enter your name.';
  if (!emailRe.test(f.email.trim())) e.email = 'Enter a valid email address, like name@company.com.';
  if (!f.projectType) e.projectType = 'Choose a project type.';
  if (f.details.trim().length < 20) e.details = 'Tell us a little more about the project (at least 20 characters).';
  return e;
}

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const startedAt = useRef(Date.now());
  useReveal(root);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof Fields]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // Spam protection: honeypot filled or form submitted implausibly fast -> silently drop
    if (fields.website || Date.now() - startedAt.current < 2500) return;

    if (!site.formEndpoint) {
      setStatus('not-configured');
      return;
    }
    setStatus('sending');
    try {
      const { website: _hp, ...payload } = fields;
      void _hp;
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        // Spam-protection integration point: add a captcha token (e.g. Cloudflare Turnstile) here.
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      setFields(empty);
    } catch {
      setStatus('error');
    }
  };

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p className="field__error" id={`${k}-error`}>
        <CircleAlert size={16} aria-hidden="true" /> {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Fields) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
  });

  const { email, phone, address } = site.contact;
  const hasDetails = email || phone || address;

  return (
    <section id="contact" ref={root} className="section contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__intro">
          <h2 id="contact-title" data-reveal>Have a project in mind?</h2>
          <p data-reveal>Let’s discuss your goals and explore how AS Webmarketings can help.</p>

          <ul className="contact__details" data-reveal>
            {email && (
              <li><Mail size={20} aria-hidden="true" /><a href={`mailto:${email}`}>{email}</a></li>
            )}
            {phone && (
              <li><Phone size={20} aria-hidden="true" /><a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a></li>
            )}
            {address && (
              <li><MapPin size={20} aria-hidden="true" /><span>{address}</span></li>
            )}
            {!hasDetails && site.showPlaceholders && (
              <li><span className="placeholder-note">Add email, phone and address in src/config/site.ts</span></li>
            )}
          </ul>
        </div>

        <form ref={formRef} className="form" onSubmit={onSubmit} noValidate data-reveal>
          <div className="form__row">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" autoComplete="name" value={fields.name} onChange={onChange} required {...aria('name')} />
              {err('name')}
            </div>
            <div className="field">
              <label htmlFor="email">Business email</label>
              <input id="email" name="email" type="email" autoComplete="email" value={fields.email} onChange={onChange} required {...aria('email')} />
              {err('email')}
            </div>
          </div>
          <div className="form__row">
            <div className="field">
              <label htmlFor="company">Company name <span className="field__opt">(optional)</span></label>
              <input id="company" name="company" autoComplete="organization" value={fields.company} onChange={onChange} />
            </div>
            <div className="field">
              <label htmlFor="projectType">Project type</label>
              <select id="projectType" name="projectType" value={fields.projectType} onChange={onChange} required {...aria('projectType')}>
                <option value="">Select one</option>
                {services.map((s) => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
                <option value="Other">Something else</option>
              </select>
              {err('projectType')}
            </div>
          </div>
          <div className="field">
            <label htmlFor="details">Project details</label>
            <textarea id="details" name="details" rows={5} value={fields.details} onChange={onChange} required {...aria('details')} />
            {err('details')}
          </div>

          {/* Honeypot: hidden from people, often filled by bots */}
          <div className="form__hp" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={onChange} />
          </div>

          <div className="form__foot">
            <button type="submit" className="btn btn-dark" disabled={status === 'sending'}>
              {status === 'sending' ? (
                <>Sending <LoaderCircle size={18} className="spin" aria-hidden="true" /></>
              ) : (
                <>Send message <ArrowUpRight size={18} aria-hidden="true" /></>
              )}
            </button>
            <div className="form__status" role="status" aria-live="polite">
              {status === 'sent' && (
                <p className="is-ok"><Check size={18} aria-hidden="true" /> Message sent. We’ll reply to the email you provided.</p>
              )}
              {status === 'error' && (
                <p className="is-err"><CircleAlert size={18} aria-hidden="true" /> The message didn’t send. Check your connection and try again{email ? `, or email ${email}` : ''}.</p>
              )}
              {status === 'not-configured' && (
                <p className="is-err">
                  <CircleAlert size={18} aria-hidden="true" /> Online form is not connected yet, so this message was not sent.
                  {email ? ` Please email ${email}.` : ' Please use the contact details on this page.'}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
