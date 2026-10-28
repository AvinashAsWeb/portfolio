import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Partnership from './components/Partnership';
import Leadership from './components/Leadership';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { initSmoothScroll, scrollToId } from './lib/smoothScroll';
import { ScrollTrigger } from './lib/motion';

export default function App() {
  useEffect(() => {
    const destroy = initSmoothScroll();
    // Honour a #hash in the shared link once layout is ready
    const id = location.hash.slice(1);
    const t = window.setTimeout(() => {
      ScrollTrigger.refresh();
      if (id && document.getElementById(id)) scrollToId(id);
    }, 150);
    return () => {
      window.clearTimeout(t);
      destroy();
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <Portfolio />
        <Partnership />
        <Leadership />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
