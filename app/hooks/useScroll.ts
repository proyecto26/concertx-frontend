import { useEffect, useState } from 'react'

const opts: AddEventListenerOptions & EventListenerOptions = { passive: true };

export function useScroll () {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, opts);
    return () => {
      window.removeEventListener('scroll', onScroll, opts);
    };
  }, []);

  return {
    isScrolled,
  };
}