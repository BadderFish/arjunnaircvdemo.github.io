import { useState } from 'react';
import portfolioData from '../data/portfolio.json';
import { useEntranceAnimation } from '../hooks/useEntranceAnimation';

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '6px' }}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>
);

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

export default function Projects() {
  const { projects } = portfolioData;
  const [searchQuery, setSearchQuery] = useState('');
  const { ref, isVisible } = useEntranceAnimation();

  const filteredProjects = projects.filter((project) => {
    const searchText = searchQuery.toLowerCase();
    const projectText = `${project.title} ${project.organization} ${project.chips.join(' ')} ${project.description.join(' ')}`.toLowerCase();
    return projectText.includes(searchText);
  });

  return (
    <section id="projects" className="section alt" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={`section-title animate-in ${isVisible ? 'visible' : ''}`}>
          <h2>Projects & Research</h2>
          <p>Selected work spanning aerodynamics, embedded systems, materials, and space systems.</p>
        </div>

        <div className={`search-row animate-in ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.1s' }}>
          <input
            id="projectSearch"
            className="search"
            type="search"
            placeholder="Filter projects (e.g. CFD, MATLAB, ESP32)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={`grid cards-3 animate-in ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.2s' }}>
          {filteredProjects.map((project, idx) => (
            <article key={idx} className="card project">
              <div className="chips">
                {project.chips.map((chip, chipIdx) => (
                  <span key={chipIdx} className="chip">{chip}</span>
                ))}
              </div>
              <h3>{project.title}</h3>
              {project.organization && <p className="muted">{project.organization} • {project.period}</p>}
              {!project.organization && <p className="muted">{project.period}</p>}
              <ul className="bullets">
                {project.description.map((desc, descIdx) => (
                  <li key={descIdx} dangerouslySetInnerHTML={{ __html: desc }} />
                ))}
              </ul>
              {project.link && (
                <a href={project.link.url} target="_blank" rel="noreferrer" className="btn small" style={{ marginTop: '12px' }}>
                  {project.link.text.includes('GitHub') ? <GitHubIcon /> : <DocumentIcon />}
                  {project.link.text}
                  <ExternalIcon />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
