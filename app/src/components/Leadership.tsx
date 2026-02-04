import portfolioData from '../data/portfolio.json';
import { useEntranceAnimation } from '../hooks/useEntranceAnimation';

export default function Leadership() {
  const { leadership, volunteer } = portfolioData;
  const { ref, isVisible } = useEntranceAnimation();

  return (
    <section id="leadership" className="section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={`section-title animate-in ${isVisible ? 'visible' : ''}`}>
          <h2>Leadership & Activities</h2>
          <p>Communication, outreach, and community-building alongside engineering.</p>
        </div>

        <div className={`grid cards-2 animate-in ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.1s' }}>
          {leadership.map((item, idx) => (
            <div key={idx} className="card">
              <h3>{item.title}</h3>
              <p className="muted">{item.period}</p>
              <ul className="bullets">
                {item.description.map((desc, descIdx) => (
                  <li key={descIdx}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`card volunteer-card animate-in ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.2s' }}>
          <h3>Volunteer Experience</h3>
          <ul className="bullets">
            {volunteer.map((item, idx) => (
              <li key={idx}>
                <strong>{item.title}</strong> {item.organization && `(${item.organization})`} — {item.period}
                {item.details && ` (${item.details})`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
