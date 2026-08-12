/** The scroll reveals for browsers that cannot scrub them (ticket 17).
 *
 * Chromium does the whole thing in CSS, with `animation-timeline: view()` in
 * base.css, and gets it with scripting switched off. Everywhere else this
 * stands in: the same staggered arrival, driven by an IntersectionObserver,
 * with no scrubbing. Written here rather than installed, because a landing
 * page arguing that the app holds nothing back should not ship 40kb of
 * animation library to slide some paragraphs upward.
 *
 * It adds movement and never anything else. With this file blocked, never
 * loaded or simply broken, every element it would have touched is already in
 * its finished state, which is what `.reveal` styles as when nothing marks it.
 */
export function startReveals(): () => void {
  /* Three ways to decide there is nothing to do here, in the order that costs
     least. The support check is the important one: where the CSS works, this
     must not also run, or an element gets moved by both. */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  if (CSS.supports('animation-timeline', 'view()')) return () => {};
  if (!('IntersectionObserver' in window)) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.reveal = 'in';
        /* Once each. A reveal is an arrival, not a state that tracks the
           scrollbar, and re-hiding something a reader has already read to
           replay it on the way back up would be an animation with no reason
           anybody could write down. */
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );

  for (const item of document.querySelectorAll<HTMLElement>('.reveal')) {
    /* Only what is still below the fold. Hiding something that is already on
       screen so it can fade back in is a flash in the face of somebody who
       was reading it, and this file runs after the page has painted. */
    if (item.getBoundingClientRect().top < window.innerHeight) continue;
    item.dataset.reveal = 'pending';
    observer.observe(item);
  }

  return () => observer.disconnect();
}
