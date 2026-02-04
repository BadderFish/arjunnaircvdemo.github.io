import portfolioData from '../data/portfolio.json';
import { useEntranceAnimation } from '../hooks/useEntranceAnimation';

const DocumentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '6px' }}>
    <path d="M5 0h6a1 1 0 0 1 1 1v1H4V1a1 1 0 0 1 1-1zM3 3h10v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3zm2 2v8h6V5H5z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ marginLeft: '4px' }}>
    <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
    <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
  </svg>
);

export default function Experience() {
  const { experience } = portfolioData;
  const { ref, isVisible } = useEntranceAnimation();

  return (
    <section id="experience" className="section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={`section-title animate-in ${isVisible ? 'visible' : ''}`}>
          <h2>Professional Experience</h2>
          <p>Leadership + delivery across startups and aerospace-focused internships.</p>
        </div>

        <div className={`grid cards-3 animate-in ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.1s' }}>
          {experience.map((exp, idx) => (
            <div key={idx} className="card">
              <div className="chips">
                {exp.chips.map((chip, chipIdx) => (
                  <span key={chipIdx} className="chip">{chip}</span>
                ))}
              </div>
              <h3>{exp.title}</h3>
              <p className="muted">{exp.company} • {exp.period}</p>
              <p className="muted">{exp.location}</p>
              <ul className="bullets">
                {exp.description.map((desc, descIdx) => (
                  <li key={descIdx} dangerouslySetInnerHTML={{ __html: desc }} />
                ))}
              </ul>
              {exp.link && (
                <a href={exp.link.url} target="_blank" rel="noreferrer" className="btn small" style={{ marginTop: '12px' }}>
                  <DocumentIcon />
                  {exp.link.text}
                  <ExternalIcon />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
