import portfolioData from '../data/portfolio.json';
import { useEntranceAnimation } from '../hooks/useEntranceAnimation';

export default function About() {
  const { about, education } = portfolioData;
  const { ref, isVisible } = useEntranceAnimation();

  return (
    <section id="about" className="section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={`section-title animate-in ${isVisible ? 'visible' : ''}`}>
          <h2>About</h2>
          <p>What I bring: validated engineering, clear communication, and momentum.</p>
        </div>

        <div className={`card animate-in ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.1s' }}>
          <p>{about.description}</p>
        </div>

        <div className={`two-col animate-in ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.2s' }}>
          <div className="card">
            <h3>Education</h3>
            <div className="timeline">
              {education.map((edu, idx) => (
                <div key={idx} className="t-item">
                  <div className="t-when">{edu.period}</div>
                  <div className="t-what">
                    <div className="t-title">{edu.degree}</div>
                    <div className="t-sub">{edu.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>At a glance</h3>
            <ul className="bullets">
              {about.atAGlance.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
