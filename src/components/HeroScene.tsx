import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneProps {
  reduced: boolean;
  mobile: boolean;
  onReady?: () => void;
}

const ORANGE = new THREE.Color('#ff7506');
const PAPER = new THREE.Color('#f4f6f1');
const SAGE = new THREE.Color('#8fb895');

/** Round, soft-edged sprite so points render as dots rather than squares. */
function useDotTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.45, 'rgba(255,255,255,1)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

/** Deterministic pseudo-random so the sphere looks the same on every load. */
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function buildGlobe(count: number, radius: number) {
  const rand = rng(7);
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const jitter = 1 + (rand() - 0.5) * 0.03;
    const v = new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r).multiplyScalar(radius * jitter);
    pts.push(v);
    pos.set([v.x, v.y, v.z], i * 3);
    const roll = rand();
    const c = roll < 0.74 ? ORANGE : roll < 0.9 ? PAPER : SAGE;
    col.set([c.r, c.g, c.b], i * 3);
  }
  // Sparse network: a share of nodes link to their two nearest neighbours
  const lines: number[] = [];
  for (let i = 0; i < count; i++) {
    if (rand() > 0.22) continue;
    const near = pts
      .map((p, j) => ({ j, d: j === i ? Infinity : p.distanceToSquared(pts[i]) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    near.forEach(({ j }) => lines.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z));
  }
  return { pos, col, lines: new Float32Array(lines) };
}

function buildDust(count: number) {
  const rand = rng(42);
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const v = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize().multiplyScalar(2.5 + rand() * 1.8);
    pos.set([v.x, v.y, v.z], i * 3);
  }
  return pos;
}

function Globe({ reduced, mobile }: Omit<SceneProps, 'onReady'>) {
  const group = useRef<THREE.Group>(null);
  const dustRef = useRef<THREE.Points>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const tex = useDotTexture();
  const radius = 2;
  const { pos, col, lines } = useMemo(() => buildGlobe(mobile ? 650 : 1400, radius), [mobile]);
  const dust = useMemo(() => buildDust(mobile ? 70 : 220), [mobile]);

  useEffect(() => {
    if (mobile) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mobile]);

  // Desktop: large globe on the right. Mobile: smaller globe above the headline.
  const base: [number, number, number] = mobile ? [0.35, 1.35, 0] : [2.15, 0, 0];
  const scale = mobile ? 0.55 : 1;

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
    const drift = reduced ? 0 : t * 0.04;
    const ty = drift + pointer.current.x * 0.35 + scroll * 0.9;
    const tx = 0.25 + pointer.current.y * 0.18 + scroll * 0.25;
    const k = Math.min(1, delta * 3);
    g.rotation.y += (ty - g.rotation.y) * k;
    g.rotation.x += (tx - g.rotation.x) * k;
    // Scroll-linked lift for a light parallax
    g.position.y = base[1] + scroll * 1.1;
    if (dustRef.current && !reduced) dustRef.current.rotation.y = -t * 0.015;
  });

  return (
    <>
      <group ref={group} position={base} scale={scale}>
        {/* Occluder hides the far side so the globe reads as solid */}
        <mesh>
          <sphereGeometry args={[radius * 0.985, 48, 48]} />
          <meshBasicMaterial color="#1a2e21" />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[pos, 3]} />
            <bufferAttribute attach="attributes-color" args={[col, 3]} />
          </bufferGeometry>
          <pointsMaterial size={mobile ? 0.07 : 0.045} map={tex} vertexColors transparent depthWrite={false} alphaTest={0.02} sizeAttenuation />
        </points>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[lines, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#ff7506" transparent opacity={0.28} depthWrite={false} />
        </lineSegments>
      </group>
      <points ref={dustRef} position={base} scale={scale}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.03} map={tex} color="#f4f6f1" transparent opacity={0.45} depthWrite={false} sizeAttenuation />
      </points>
    </>
  );
}

export default function HeroScene({ reduced, mobile, onReady }: SceneProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Stop rendering when the hero is off-screen
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '100px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="hero__canvas" aria-hidden="true">
      <Canvas
        frameloop={visible ? (reduced ? 'demand' : 'always') : 'never'}
        dpr={[1, mobile ? 1.5 : 1.75]}
        camera={{ position: [0, 0, 7.2], fov: 40 }}
        gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
        onCreated={() => onReady?.()}
      >
        <Globe reduced={reduced} mobile={mobile} />
      </Canvas>
    </div>
  );
}
