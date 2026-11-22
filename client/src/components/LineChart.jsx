export default function LineChart({ points, unit = '', height = 220 }) {
  // points: [{ x: label, y: number }]
  const data = points.filter((p) => p.y !== null && p.y !== undefined && !Number.isNaN(p.y));
  if (data.length < 2) return <div className="chart-empty">Log at least two entries to see a trend.</div>;
  const W = 640, H = height, pad = { l: 44, r: 16, t: 16, b: 32 };
  const ys = data.map((p) => p.y);
  let min = Math.min(...ys), max = Math.max(...ys);
  if (min === max) { min -= 1; max += 1; }
  const span = max - min;
  min -= span * 0.1; max += span * 0.1;
  const x = (i) => pad.l + (i * (W - pad.l - pad.r)) / (data.length - 1);
  const y = (v) => pad.t + ((max - v) * (H - pad.t - pad.b)) / (max - min);
  const path = data.map((p, i) => `${i ? 'L' : 'M'}${x(i)},${y(p.y)}`).join(' ');
  const ticks = [0, 0.5, 1].map((t) => min + (max - min) * t);
  const delta = data[data.length - 1].y - data[0].y;
  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="var(--line)" />
            <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" className="axis">{t.toFixed(1)}</text>
          </g>
        ))}
        <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" />
        {data.map((p, i) => (
          <g key={i}>
            <circle cx={x(i)} cy={y(p.y)} r="4" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2"><title>{`${p.x}: ${p.y}${unit}`}</title></circle>
            {(i === 0 || i === data.length - 1 || data.length <= 8) && (
              <text x={x(i)} y={H - 10} textAnchor="middle" className="axis">{p.x}</text>
            )}
          </g>
        ))}
      </svg>
      <p className="delta">Change: <b>{delta > 0 ? '+' : ''}{delta.toFixed(1)}{unit}</b></p>
    </div>
  );
}
