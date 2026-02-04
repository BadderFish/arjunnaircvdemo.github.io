import portfolioData from '../data/portfolio.json';
import { useEntranceAnimation } from '../hooks/useEntranceAnimation';

export default function Skills() {
  const { skills, certifications, languages } = portfolioData;
  const { ref, isVisible } = useEntranceAnimation();

  return (
    <section id="skills" className="section alt" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={`section-title animate-in ${isVisible ? 'visible' : ''}`}>
          <h2>Skills</h2>
          <p>A practical toolkit: analysis, design, software, and hardware.</p>
        </div>

        <div className={`grid cards-3 animate-in ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.1s' }}>
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
