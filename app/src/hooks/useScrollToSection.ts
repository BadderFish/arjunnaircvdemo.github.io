import { useCallback } from 'react';

/**
 * Custom hook for smooth scrolling to sections with header visibility control
 * Dispatches a custom event that the Header component listens to
 */
export function useScrollToSection() {
  const scrollToSection = useCallback((sectionId: string) => {
    const target = document.querySelector(sectionId);
    if (!target) return;

    // Dispatch custom event to notify Header to stay visible
    window.dispatchEvent(new CustomEvent('scrollToSection'));

    // Smooth scroll to target
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Update URL
    window.history.pushState(null, '', sectionId);
  }, []);

  return { scrollToSection };
}
