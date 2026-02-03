import { useState, useEffect } from 'react';
import portfolioData from '../data/portfolio.json';

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [preventHide, setPreventHide] = useState(false);

  const { personal } = portfolioData;

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#leadership', label: 'Leadership' },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.pageYOffset;

          if (currentScroll <= 100) {
            setHeaderHidden(false);
          } else if (currentScroll < lastScroll) {
            setHeaderHidden(false);
          } else if (currentScroll > lastScroll && currentScroll > 200 && !preventHide) {
            setHeaderHidden(true);
          }

          setLastScroll(currentScroll);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll, preventHide]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      setHeaderHidden(false);
      setPreventHide(true);
      setTimeout(() => setPreventHide(false), 1000);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', href);
      setMobileMenuOpen(false);
    }
  };

  const handleBrandClick = () => {
    setHeaderHidden(false);
    setPreventHide(true);
    setTimeout(() => setPreventHide(false), 1000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', window.location.pathname);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`site-header ${headerHidden ? 'hidden' : ''}`}>
      <div className="container header-inner">
        <div className="brand" onClick={handleBrandClick}>
          <div className="avatar" aria-hidden="true">{personal.initials}</div>
          <div>
            <div className="name">{personal.name}</div>
            <div className="role">{personal.role}</div>
          </div>
        </div>

        <button
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <span className="hamburger"></span>
        </button>

        <nav className="nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeSection === link.href.slice(1) ? 'active' : ''}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`btn small ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Contact Me
          </a>
        </nav>
      </div>

      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>
          Contact Me
        </a>
      </div>
    </header>
  );
}
