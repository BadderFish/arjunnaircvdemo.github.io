import portfolioData from '../data/portfolio.json';

export default function Skills() {
  const { skills, certifications, languages } = portfolioData;

  return (
    <section id="skills" className="section alt">
      <div className="container">
        <div className="section-title">
          <h2>Skills</h2>
          <p>A practical toolkit: analysis, design, software, and hardware.</p>
        </div>

        <div className="grid cards-3">
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} className="card">
              <h3>{category}</h3>
              <div className="chips">
                {(skillList as string[]).map((skill, idx) => (
                  <span key={idx} className="chip">{skill}</span>
                ))}
              </div>
            </div>
          ))}

          <div className="card">
            <h3>Certifications</h3>
            <p className="muted">{certifications}</p>
          </div>

          <div className="card">
            <h3>Languages</h3>
            <p className="muted">{languages}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
