THE BACKLOG — SITE FILES
========================

What's in this folder:

  index.html    The homepage.
  404.html      Shown when someone hits a broken/missing link. Matches the site look.
  styles.css    All the site's styling in one file.
  script.js     Small bits of interactivity (scroll effects, card animations).
  favicon.svg   The little icon that shows up in browser tabs.
  robots.txt    Tells search engines they're allowed to crawl the site.
  sitemap.xml   Tells search engines what pages exist.

This is a static site — no database, no install process. You upload these
files as-is to a host and it works.

TWO THINGS TO UPDATE ONCE YOU HAVE A DOMAIN:

1. sitemap.xml
   Open it and replace "https://YOURDOMAIN.com/" with your real domain,
   e.g. https://thebacklog.com/

2. robots.txt
   Uncomment the last line and replace the domain the same way:
   Sitemap: https://thebacklog.com/sitemap.xml

Everything else is ready to upload as-is. When you add more pages later
(a review archive, individual review pages), keep styles.css and
script.js shared across them so the look stays consistent — just link
to them the same way index.html does.
