/**
 * OnviteSeal — the wax-seal logo mark.
 * Reproduced verbatim from OnviteSeal.dc.html so it scales crisply at any size.
 */
export default function Seal({ size = 36, className, style }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      style={{ display: "block", ...style }}
      role="img"
      aria-label="Onvite"
    >
      <defs>
        <radialGradient id="onvWax" cx="38%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#c9543b" />
          <stop offset="45%" stopColor="#a6241f" />
          <stop offset="100%" stopColor="#6d1210" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="33.5" r="27" fill="#4f0b09" />
      <g fill="url(#onvWax)">
        <circle cx="32" cy="31.5" r="27" />
        <circle cx="13.5" cy="24" r="6" />
        <circle cx="50.5" cy="22" r="6" />
        <circle cx="18" cy="47.5" r="6.5" />
        <circle cx="47" cy="48" r="6" />
        <circle cx="32" cy="8.5" r="5.5" />
        <circle cx="8.5" cy="35" r="5.5" />
        <circle cx="55.5" cy="37" r="5.5" />
        <circle cx="32" cy="57" r="6" />
      </g>
      <ellipse cx="23" cy="19" rx="12" ry="7.5" fill="#ffffff" opacity="0.14" />
      <circle cx="32" cy="31.5" r="21.5" fill="none" stroke="#4f0b09" strokeWidth="1.3" opacity="0.55" />
      <circle cx="32" cy="31.5" r="20" fill="none" stroke="#cf6349" strokeWidth="0.7" opacity="0.45" />
      <g transform="translate(-0.6 -0.7)" stroke="#e79277" fill="#e79277" opacity="0.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 46 L32 19" strokeWidth="1.5" fill="none" />
        <path d="M32 39 C28 38 26 35 26 31.5" strokeWidth="1.2" fill="none" />
        <path d="M32 39 C36 38 38 35 38 31.5" strokeWidth="1.2" fill="none" />
        <ellipse cx="32" cy="16.5" rx="1.7" ry="2.6" stroke="none" />
        <path d="M32 45 C24 43 19 36 18.5 27" strokeWidth="1.4" fill="none" />
        <path d="M32 45 C40 43 45 36 45.5 27" strokeWidth="1.4" fill="none" />
      </g>
      <g transform="translate(0.7 0.8)" stroke="#560c0a" fill="#560c0a" opacity="0.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 46 L32 19" strokeWidth="1.5" fill="none" />
        <path d="M32 39 C28 38 26 35 26 31.5" strokeWidth="1.2" fill="none" />
        <path d="M32 39 C36 38 38 35 38 31.5" strokeWidth="1.2" fill="none" />
        <ellipse cx="32" cy="16.5" rx="1.7" ry="2.6" stroke="none" />
        <path d="M32 45 C24 43 19 36 18.5 27" strokeWidth="1.4" fill="none" />
        <path d="M32 45 C40 43 45 36 45.5 27" strokeWidth="1.4" fill="none" />
      </g>
      <g stroke="#8d1d19" fill="#8d1d19" opacity="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 46 L32 19" strokeWidth="1.5" fill="none" />
        <path d="M32 39 C28 38 26 35 26 31.5" strokeWidth="1.2" fill="none" />
        <path d="M32 39 C36 38 38 35 38 31.5" strokeWidth="1.2" fill="none" />
        <path d="M32 33 C29 32 27.5 30 27.5 27" strokeWidth="1.2" fill="none" />
        <path d="M32 33 C35 32 36.5 30 36.5 27" strokeWidth="1.2" fill="none" />
        <ellipse cx="32" cy="16.5" rx="1.7" ry="2.6" stroke="none" />
        <ellipse cx="29.6" cy="18.4" rx="1.4" ry="2.2" stroke="none" transform="rotate(-35 29.6 18.4)" />
        <ellipse cx="34.4" cy="18.4" rx="1.4" ry="2.2" stroke="none" transform="rotate(35 34.4 18.4)" />
        <path d="M32 45 C24 43 19 36 18.5 27" strokeWidth="1.4" fill="none" />
        <path d="M32 45 C40 43 45 36 45.5 27" strokeWidth="1.4" fill="none" />
        <g stroke="none">
          <ellipse cx="25" cy="41" rx="2.2" ry="1.1" transform="rotate(40 25 41)" />
          <ellipse cx="21.5" cy="36" rx="2.2" ry="1.1" transform="rotate(52 21.5 36)" />
          <ellipse cx="19.5" cy="31" rx="2" ry="1" transform="rotate(66 19.5 31)" />
          <ellipse cx="39" cy="41" rx="2.2" ry="1.1" transform="rotate(-40 39 41)" />
          <ellipse cx="42.5" cy="36" rx="2.2" ry="1.1" transform="rotate(-52 42.5 36)" />
          <ellipse cx="44.5" cy="31" rx="2" ry="1" transform="rotate(-66 44.5 31)" />
        </g>
        <path d="M32 49.5 C31 48 28.9 47.6 28.9 49.2 C28.9 50.6 30.7 51.3 32 52.6 C33.3 51.3 35.1 50.6 35.1 49.2 C35.1 47.6 33 48 32 49.5" strokeWidth="1" fill="none" />
      </g>
    </svg>
  );
}
