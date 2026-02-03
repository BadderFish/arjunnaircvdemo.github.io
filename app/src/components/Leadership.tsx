import portfolioData from '../data/portfolio.json';

export default function Leadership() {
  const { leadership, volunteer } = portfolioData;

  return (
    <section id="leadership" className="section">
      <div className="container">
        <div className="section-title">
          <h2>Leadership & Activities</h2>
          <p>Communication, outreach, and community-building alongside engineering.</p>
        </div>

        <div className="grid cards-2">
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

        <div className="card volunteer-card">
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
