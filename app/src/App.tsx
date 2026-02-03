import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import { useActiveSection } from './hooks/useActiveSection';

function App() {
  const activeSection = useActiveSection();

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header activeSection={activeSection} />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Leadership />
        <Contact />
      </main>
    </>
  );
}

export default App;
