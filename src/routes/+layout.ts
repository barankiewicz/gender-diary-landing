/* Every page is a file on disk, and the URL a person copies ends in a slash so
   that lh.pl serves `<locale>/index.html` for it. */
export const prerender = true;
export const trailingSlash = 'always';
