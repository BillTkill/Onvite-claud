/**
 * Admin charts — static SVGs reproduced from the mockup.
 * Sample data; a real build would feed these from the analytics API.
 */

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const X = [44, 97.1, 150.2, 203.3, 256.4, 309.5, 362.5, 415.6, 468.7, 521.8, 574.9, 628];

function GridLines({ labels }) {
  const ys = [12, 57.5, 103, 148.5, 194];
  return (
    <>
      {ys.map((y, i) => (
        <g key={y}>
          <line x1="44" y1={y} x2="628" y2={y} stroke="#eee" />
          <text x="4" y={y + 4} fontSize="10" fill="#9ca3af">{labels[i]}</text>
        </g>
      ))}
    </>
  );
}

function MonthLabels({ every = 1 }) {
  return MONTHS.map((m, i) =>
    i % every === 0 ? (
      <text key={m} x={X[i]} y="212" fontSize="10" fill="#9ca3af" textAnchor="middle">{m}</text>
    ) : null
  );
}

export function MonthlyChart() {
  const pts2026 = "44,139.6 97.1,124.8 150.2,103.7 203.3,79.7 256.4,49.1 309.5,12 362.5,111.6 415.6,194 468.7,194 521.8,194 574.9,194 628,194";
  const pts2025 = "44,151.4 97.1,143.6 150.2,134.3 203.3,124.8 256.4,113 309.5,117 362.5,109 415.6,102.3 468.7,98.3 521.8,93 574.9,86.4 628,67.9";
  const dots = [[44, 139.6], [97.1, 124.8], [150.2, 103.7], [203.3, 79.7], [256.4, 49.1], [309.5, 12], [362.5, 111.6]];
  return (
    <div className="admin-card">
      <h2 className="serif admin-card__title">Evolución mensual (Bs)</h2>
      <svg viewBox="0 0 640 220" style={{ width: "100%" }}>
        <GridLines labels={["13700", "10275", "6850", "3425", "0"]} />
        <polyline fill="none" stroke="#c4b5fd" strokeWidth="2.5" strokeDasharray="5 4" points={pts2025} />
        <polyline fill="none" stroke="#ec4899" strokeWidth="2.5" points={pts2026} />
        {dots.map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="3" fill="#ec4899" />)}
        <MonthLabels />
      </svg>
      <div style={{ marginTop: 12, display: "flex", gap: 16, fontSize: 12, color: "#6b7280" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <i style={{ display: "inline-block", height: 8, width: 16, borderRadius: 4, background: "var(--brand500)" }} />2026
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <i style={{ display: "inline-block", height: 8, width: 16, borderRadius: 4, background: "#c4b5fd" }} />2025
        </span>
      </div>
    </div>
  );
}

export function CumulativeChart() {
  const pts = "44,178.9 97.1,159.8 150.2,134.8 203.3,103.2 256.4,63.1 309.5,12 362.5,12 415.6,12 468.7,12 521.8,12 574.9,12 628,12";
  const dots = [[44, 178.9], [97.1, 159.8], [150.2, 134.8], [203.3, 103.2], [256.4, 63.1], [309.5, 12]];
  return (
    <div className="admin-card">
      <h2 className="serif admin-card__title">Acumulado del año (Bs)</h2>
      <svg viewBox="0 0 640 220" style={{ width: "100%" }}>
        <GridLines labels={["49500", "37125", "24750", "12375", "0"]} />
        <polyline fill="none" stroke="#16a34a" strokeWidth="2.5" points={pts} />
        {dots.map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="3" fill="#16a34a" />)}
        <MonthLabels every={2} />
      </svg>
    </div>
  );
}

export function RevenueBars() {
  const bars = [
    [59.7, 139.6, 54.4], [109.4, 124.9, 69.1], [159.1, 103.7, 90.3], [208.8, 79.7, 114.3],
    [258.5, 49.2, 144.8], [308.2, 12, 182], [357.9, 111.6, 82.4],
  ];
  const barLabelX = [74.6, 124.3, 174, 223.7, 273.4, 323.1, 372.8, 422.5, 472.2, 521.9, 571.6, 621.3];
  return (
    <div className="admin-card">
      <h2 className="serif admin-card__title">Ingresos por mes (Bs)</h2>
      <svg viewBox="0 0 640 220" style={{ width: "100%" }}>
        <GridLines labels={["13700", "10275", "6850", "3425", "0"]} />
        {bars.map(([x, y, h], i) => (
          <rect key={x} x={x} y={y} width="29.8" height={h} rx="4" fill="#ec4899" />
        ))}
        {MONTHS.map((m, i) => (
          <text key={m} x={barLabelX[i]} y="212" fontSize="10" fill="#9ca3af" textAnchor="middle">{m}</text>
        ))}
      </svg>
    </div>
  );
}
