/**
 * Site-wide decorative background layer.
 *
 * Sits behind every page (fixed, pointer-events: none) so pages stay
 * transparent and let it show through.
 *
 * The artwork recreates "design-source/Plantillas imagenes/imagen fondo.png"
 * — scattered thin-line gold wedding icons over white — but as individual
 * inline SVGs instead of the flat PNG. That is what lets each object drift on
 * its own path (the client's "cada objeto podrá estar flotando"), keeps the
 * marks crisp at any zoom, and costs a fraction of the 640 KB bitmap.
 *
 * Animation is plain CSS, not Framer Motion: this content loops forever, and
 * looping content is exactly the case where the installed framer-motion
 * version misbehaves (see the flip-word note in the project docs).
 *
 * Positions/sizes/delays are hard-coded rather than randomised so server and
 * client render identical markup (no hydration mismatch).
 */

const VARIANT = "icons"; // "icons" | "plain"

/* Each icon is drawn in a 24×24 box, stroked (never filled) so they all share
   the same hairline weight regardless of the size they're scaled to. */
const ICONS = {
  rings: (
    <>
      <circle cx="9.5" cy="14" r="5.5" />
      <circle cx="15" cy="14" r="5.5" />
    </>
  ),
  gift: (
    <>
      <rect x="3.5" y="10" width="17" height="10.5" rx="1.2" />
      <path d="M3.5 13.8h17M12 10v10.5" />
      <path d="M12 10C10.6 7.2 7 7 7 8.9c0 1.4 3.2 1.1 5 1.1zM12 10c1.4-2.8 5-3 5-1.1 0 1.4-3.2 1.1-5 1.1z" />
    </>
  ),
  cake: (
    <>
      <path d="M4.5 20.5v-5.2c0-.7.6-1.3 1.3-1.3h12.4c.7 0 1.3.6 1.3 1.3v5.2z" />
      <path d="M7 14v-3.2c0-.6.5-1.1 1.1-1.1h7.8c.6 0 1.1.5 1.1 1.1V14" />
      <path d="M9.5 9.7V7.5M12 9.7V6.8M14.5 9.7V7.5M4.5 17.6h15" />
    </>
  ),
  toast: (
    <>
      <path d="M7.2 3.6 5.6 9.4c-.4 1.6.5 3 2 3s2.4-1.4 2-3L8 3.6z" />
      <path d="M7.6 12.4v6.4M5.4 19.4h4.4" />
      <path d="M16.8 3.6l1.6 5.8c.4 1.6-.5 3-2 3s-2.4-1.4-2-3l1.6-5.8z" />
      <path d="M16.4 12.4v6.4M14.2 19.4h4.4" />
    </>
  ),
  heart: <path d="M12 20.2s-6.6-4.3-6.6-9.1A3.75 3.75 0 0 1 12 8.3a3.75 3.75 0 0 1 6.6 2.8c0 4.8-6.6 9.1-6.6 9.1z" />,
  balloons: (
    <>
      <path d="M8.4 12.6s-4-2.6-4-5.5A2.28 2.28 0 0 1 8.4 5.4a2.28 2.28 0 0 1 4 1.7c0 2.9-4 5.5-4 5.5z" />
      <path d="M16 15.4s-3.6-2.4-3.6-5a2.06 2.06 0 0 1 3.6-1.5 2.06 2.06 0 0 1 3.6 1.5c0 2.6-3.6 5-3.6 5z" />
      <path d="M8.4 12.6c.4 3 -.8 5 -1.6 7.6M16 15.4c.3 2.2 1 3.2 1.5 4.6" />
    </>
  ),
  dress: (
    <>
      <path d="M9.4 3.2 12 6l2.6-2.8" />
      <path d="M9.4 3.2v3.4L5.6 20.6h12.8L14.6 6.6V3.2" />
      <path d="M7.6 13.4h8.8" />
    </>
  ),
  envelope: (
    <>
      <rect x="3" y="6.2" width="18" height="11.6" rx="1.3" />
      <path d="M3.4 7.2 12 13.4l8.6-6.2" />
    </>
  ),
  bouquet: (
    <>
      <circle cx="9" cy="7.4" r="2.5" />
      <circle cx="14.6" cy="6.6" r="2.2" />
      <circle cx="12.4" cy="11.2" r="2.4" />
      <path d="M10 13.4 12 21M14 12.6 12.6 21M9.6 21h5.4" />
      <path d="M7.4 10.6c-1.6.4-2.6 1.6-2.8 3.2 1.7.2 3-.6 3.6-2" />
    </>
  ),
  bowtie: (
    <>
      <path d="M10.4 12 4.4 8.4v7.2z" />
      <path d="M13.6 12l6-3.6v7.2z" />
      <rect x="10.2" y="9.9" width="3.6" height="4.2" rx="1.1" />
    </>
  ),
  note: (
    <>
      <path d="M9.4 17.6V5.8l9.2-2.2v11.8" />
      <circle cx="7" cy="18" r="2.4" />
      <circle cx="16.2" cy="15.4" r="2.4" />
    </>
  ),
  bunting: (
    <>
      <path d="M2.4 6.6C8 3.4 16 3.4 21.6 6.6" />
      <path d="M4.8 7.4 6.6 11.8 8.8 8M9.6 6.4 11.4 11 13.4 6.2M14.4 6.6 16.2 11.2 18.2 7" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.8" y="5.2" width="16.4" height="15" rx="1.8" />
      <path d="M3.8 10h16.4M8.4 3.2v4M15.6 3.2v4" />
      <path d="M12 17.6s-2.7-1.8-2.7-3.7A1.53 1.53 0 0 1 12 13a1.53 1.53 0 0 1 2.7 1.1c0 1.9-2.7 3.5-2.7 3.5z" />
    </>
  ),
  photos: (
    <>
      <rect x="3.4" y="7" width="10" height="10" rx=".9" transform="rotate(-11 8.4 12)" />
      <rect x="11" y="6.4" width="10" height="10" rx=".9" transform="rotate(9 16 11.4)" />
    </>
  ),
  lock: (
    <>
      <rect x="4.8" y="10.8" width="14.4" height="9.8" rx="2.2" />
      <path d="M8 10.8V8.4a4 4 0 0 1 8 0v2.4" />
      <path d="M12 18s-2.4-1.6-2.4-3.3A1.36 1.36 0 0 1 12 13.7a1.36 1.36 0 0 1 2.4 1c0 1.7-2.4 3.3-2.4 3.3z" />
    </>
  ),
  bottle: (
    <>
      <path d="M10 3.4h4v3.8l2 3.2v10.2H8V10.4l2-3.2z" />
      <path d="M8 13.6h8M10 3.4h4" />
    </>
  ),
  bubble: (
    <>
      <path d="M4 5.2h16v10.4h-7.6l-4.6 3.8v-3.8H4z" />
      <path d="M12 12.6s-2.3-1.5-2.3-3.1A1.3 1.3 0 0 1 12 8.6a1.3 1.3 0 0 1 2.3.9c0 1.6-2.3 3.1-2.3 3.1z" />
    </>
  ),
  ring: (
    <>
      <circle cx="12" cy="15" r="5.2" />
      <path d="M9.2 8.4 12 4l2.8 4.4M9.2 8.4h5.6M9.2 8.4 12 11.2l2.8-2.8" />
    </>
  ),
};

/* x/y are viewport %; s = px size; d = drift keyframe (1-4); t = seconds;
   dl = delay; r = base rotation; o = opacity multiplier. Scatter mirrors the
   loose, uneven spread of the reference artwork. */
const SCATTER = [
  { i: "bottle", x: 5, y: 4, s: 30, d: 1, t: 19, dl: 0, r: -8, o: 1 },
  { i: "rings", x: 32, y: 6, s: 36, d: 2, t: 24, dl: 2.5, r: 6, o: 1 },
  { i: "gift", x: 60, y: 8, s: 34, d: 3, t: 21, dl: 1.2, r: -5, o: 1 },
  { i: "note", x: 93, y: 5, s: 26, d: 4, t: 26, dl: 3.4, r: 10, o: 0.9 },
  { i: "bunting", x: 85, y: 16, s: 40, d: 1, t: 23, dl: 0.8, r: -4, o: 1 },
  { i: "lock", x: 14, y: 17, s: 28, d: 2, t: 27, dl: 4, r: 7, o: 0.95 },
  { i: "heart", x: 22, y: 22, s: 16, d: 3, t: 17, dl: 1.8, r: 0, o: 0.8 },
  { i: "photos", x: 29, y: 24, s: 34, d: 4, t: 22, dl: 2.2, r: -9, o: 1 },
  { i: "heart", x: 42, y: 20, s: 14, d: 1, t: 18, dl: 3.1, r: 0, o: 0.75 },
  { i: "cake", x: 51, y: 25, s: 30, d: 2, t: 25, dl: 0.5, r: 4, o: 1 },
  { i: "bubble", x: 71, y: 19, s: 30, d: 3, t: 20, dl: 2.9, r: -6, o: 0.95 },
  { i: "heart", x: 88, y: 24, s: 13, d: 4, t: 16, dl: 1.1, r: 0, o: 0.7 },
  { i: "bunting", x: 12, y: 35, s: 36, d: 3, t: 28, dl: 3.6, r: 5, o: 0.95 },
  { i: "note", x: 23, y: 39, s: 24, d: 1, t: 21, dl: 1.4, r: -7, o: 0.9 },
  { i: "toast", x: 41, y: 35, s: 32, d: 2, t: 24, dl: 4.2, r: 3, o: 1 },
  { i: "cake", x: 67, y: 34, s: 34, d: 4, t: 26, dl: 0.9, r: -4, o: 1 },
  { i: "bouquet", x: 80, y: 31, s: 32, d: 1, t: 22, dl: 2.6, r: 8, o: 1 },
  { i: "dress", x: 94, y: 39, s: 34, d: 2, t: 27, dl: 1.7, r: -5, o: 1 },
  { i: "calendar", x: 5, y: 47, s: 28, d: 4, t: 23, dl: 3.9, r: 6, o: 0.95 },
  { i: "heart", x: 33, y: 45, s: 14, d: 3, t: 17, dl: 0.4, r: 0, o: 0.75 },
  { i: "lock", x: 56, y: 45, s: 26, d: 1, t: 25, dl: 2.1, r: -8, o: 0.95 },
  { i: "ring", x: 66, y: 51, s: 28, d: 2, t: 20, dl: 3.3, r: 5, o: 1 },
  { i: "calendar", x: 86, y: 52, s: 28, d: 3, t: 29, dl: 1.5, r: -6, o: 0.95 },
  { i: "heart", x: 20, y: 53, s: 12, d: 2, t: 18, dl: 4.5, r: 0, o: 0.7 },
  { i: "gift", x: 28, y: 59, s: 30, d: 4, t: 24, dl: 0.7, r: 7, o: 1 },
  { i: "balloons", x: 43, y: 56, s: 34, d: 1, t: 26, dl: 2.8, r: -4, o: 1 },
  { i: "envelope", x: 59, y: 62, s: 30, d: 3, t: 21, dl: 3.7, r: 5, o: 1 },
  { i: "bubble", x: 74, y: 60, s: 28, d: 2, t: 23, dl: 1.3, r: -7, o: 0.95 },
  { i: "balloons", x: 95, y: 68, s: 30, d: 4, t: 27, dl: 2.4, r: 6, o: 1 },
  { i: "cake", x: 8, y: 73, s: 30, d: 1, t: 22, dl: 4.1, r: -5, o: 1 },
  { i: "bowtie", x: 24, y: 75, s: 26, d: 3, t: 19, dl: 0.2, r: 4, o: 0.95 },
  { i: "dress", x: 32, y: 82, s: 32, d: 2, t: 25, dl: 3.2, r: -6, o: 1 },
  { i: "ring", x: 43, y: 79, s: 26, d: 4, t: 20, dl: 1.9, r: 8, o: 1 },
  { i: "bubble", x: 51, y: 77, s: 26, d: 1, t: 24, dl: 2.7, r: -5, o: 0.9 },
  { i: "bottle", x: 61, y: 84, s: 28, d: 3, t: 26, dl: 0.6, r: 6, o: 1 },
  { i: "toast", x: 73, y: 86, s: 28, d: 2, t: 21, dl: 3.5, r: -4, o: 1 },
  { i: "bowtie", x: 82, y: 73, s: 26, d: 4, t: 23, dl: 1.6, r: 5, o: 0.95 },
  { i: "bottle", x: 89, y: 85, s: 28, d: 1, t: 28, dl: 4.4, r: -7, o: 1 },
  { i: "bouquet", x: 4, y: 89, s: 30, d: 2, t: 22, dl: 2.3, r: 5, o: 1 },
  { i: "bunting", x: 45, y: 92, s: 34, d: 3, t: 27, dl: 1, r: -3, o: 0.95 },
];

/* The soft amber glows dotted through the reference image. */
const GLOWS = [
  { x: 19, y: 7, s: 46, t: 7, dl: 0 },
  { x: 73, y: 10, s: 40, t: 9, dl: 2 },
  { x: 13, y: 63, s: 44, t: 8, dl: 3.5 },
  { x: 67, y: 71, s: 50, t: 10, dl: 1.2 },
  { x: 92, y: 46, s: 38, t: 8.5, dl: 4.2 },
];

export default function SiteBackground() {
  if (VARIANT !== "icons") return <div className="site-bg" aria-hidden="true" />;

  return (
    <div className="site-bg site-bg--icons" aria-hidden="true">
      {GLOWS.map((g, n) => (
        <span
          key={`g${n}`}
          className="site-bg__glow"
          style={{
            left: `${g.x}%`,
            top: `${g.y}%`,
            width: g.s,
            height: g.s,
            animationDuration: `${g.t}s`,
            animationDelay: `${g.dl}s`,
          }}
        />
      ))}

      {SCATTER.map((p, n) => (
        <svg
          key={`i${n}`}
          className={`site-bg__icon site-bg__icon--d${p.d}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            opacity: p.o,
            animationDuration: `${p.t}s`,
            animationDelay: `${p.dl}s`,
            "--icon-rot": `${p.r}deg`,
          }}
        >
          {ICONS[p.i]}
        </svg>
      ))}
    </div>
  );
}
