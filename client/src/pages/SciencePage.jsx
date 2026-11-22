import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PILLARS, SCIENCE } from '../data/program.js';

export default function SciencePage() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <div className="science">
      <h1>The science</h1>
      <p className="muted">Every habit in Reforge 90 comes from published research or Huberman Lab protocols. Evidence levels are shown honestly: <b>Strong</b> = consistent trials and meta-analyses; <b>Moderate</b> = good mechanism and some trials; <b>Mixed/Emerging</b> = promising or contested.</p>
      {PILLARS.map((p) => (
        <section key={p}>
          <h2 className={`tag tag-${p.toLowerCase()} section-tag`}>{p}</h2>
          <div className="sci-grid">
            {Object.entries(SCIENCE).filter(([, s]) => s.pillar === p).map(([id, s]) => (
              <article id={id} key={id} className={`card sci ${hash === '#' + id ? 'highlight' : ''}`}>
                <div className="card-title">
                  <h3>{s.title}</h3>
                  <span className={`ev ev-${s.evidence.toLowerCase()}`}>{s.evidence}</span>
                </div>
                <p>{s.summary}</p>
                <p className="protocol"><b>Protocol:</b> {s.protocol}</p>
                <ul className="sources">
                  {s.sources.map((src) => <li key={src.url}><a href={src.url} target="_blank" rel="noreferrer">{src.label} ↗</a></li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
