/**
 * Ornamento decorativo de las pantallas de acceso: rama de laurel · corazón ·
 * rama espejada. Compartido por /login y /registro.
 *
 * Solo se dibuja una rama; la de la derecha es la misma volteada por CSS
 * (.login-ornament__branch--flip), así el SVG no se duplica.
 */
export default function Ornament() {
  const branch = (
    <svg viewBox="0 0 110 18" fill="none" stroke="currentColor" strokeLinecap="round" aria-hidden="true">
      <path d="M8 9h94" strokeWidth="1" />
      <path d="M30 9c3.5-4.5 9-5.5 12.5-3.5-2.5 4.5-9 5.5-12.5 3.5z" fill="currentColor" stroke="none" opacity=".9" />
      <path d="M46 9c3.5-4.5 9-5.5 12.5-3.5-2.5 4.5-9 5.5-12.5 3.5z" fill="currentColor" stroke="none" opacity=".9" />
      <path d="M62 9c3.5-4.5 9-5.5 12.5-3.5-2.5 4.5-9 5.5-12.5 3.5z" fill="currentColor" stroke="none" opacity=".9" />
      <path d="M38 9c3.5 4.5 9 5.5 12.5 3.5-2.5-4.5-9-5.5-12.5-3.5z" fill="currentColor" stroke="none" opacity=".65" />
      <path d="M54 9c3.5 4.5 9 5.5 12.5 3.5-2.5-4.5-9-5.5-12.5-3.5z" fill="currentColor" stroke="none" opacity=".65" />
      <path d="M70 9c3.5 4.5 9 5.5 12.5 3.5-2.5-4.5-9-5.5-12.5-3.5z" fill="currentColor" stroke="none" opacity=".65" />
    </svg>
  );
  return (
    <div className="login-ornament" aria-hidden="true">
      <span className="login-ornament__branch">{branch}</span>
      <svg className="login-ornament__heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 20.5s-7.5-4.8-7.5-10.2A4.2 4.2 0 0 1 12 7.8a4.2 4.2 0 0 1 7.5 2.5c0 5.4-7.5 10.2-7.5 10.2z" />
      </svg>
      <span className="login-ornament__branch login-ornament__branch--flip">{branch}</span>
    </div>
  );
}
