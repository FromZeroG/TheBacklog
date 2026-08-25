THE BACKLOG — SITE FILES
========================

What's in this folder:

  index.html          The homepage.
  404.html            Shown when someone hits a broken/missing link. Matches the site look.
  styles.css          All the site's styling in one file, shared by every page.
  script.js           Small bits of interactivity (scroll effects, card animations, search).
  favicon.svg         The little icon that shows up in browser tabs.
  robots.txt          Tells search engines they're allowed to crawl the site.
  sitemap.xml         Tells search engines what pages exist.
  reviews.json        Powers the search box in the header. See below.
  reviews/
    sephiria.html      Review: Sephiria — 117%, Exceeded Expectations
    megaloot.html       Review: Megaloot — 66%, Mixed Bag
    nightingale.html    Review: Nightingale — 51%, Whiffed It
    bloodline.html      Review: The Bloodline — 65%, Mixed Bag
    bloodstained.html   Review: Bloodstained: Ritual of the Night — 87%, Delivered
    gunslinger.html     Review: Call of Juarez: Gunslinger — 91%, Delivered
    palworld.html       Review: Palworld — 104%, Delivered
    deathloop.html      Review: Deathloop — 70%, Mixed Bag

This is a static site — no database, no install process.

THIS FOLDER IS A GIT REPOSITORY, HOSTED ON GITHUB PAGES:

This folder is tracked by Git and connected to GitHub (repo: FromZeroG/TheBacklog),
which publishes it live at thebacklog.online via GitHub Pages. There's also a
CNAME file in this folder (don't delete it) — that's what tells GitHub Pages
which custom domain to serve the site on.

The day-to-day workflow: edit or add files in this folder, then open GitHub
Desktop. It will show you every changed/new file. Write a short commit
message, click "Commit to main," then click "Push origin." GitHub Pages
picks up the push automatically and the live site updates within a minute
or two — no manual upload step needed.

All the internal links (nav, homepage cards, review page cross-links) use
root-relative paths like "/styles.css" and "/reviews/sephiria.html" — that
only works correctly once the site is live at the root of your domain. If
you ever preview a page by double-clicking the HTML file directly on your
computer, those links won't resolve — that's expected, it's not a bug.

THE SEARCH BOX:

Click the magnifying glass in the top right of any page to search by game
title, genre, or platform. It's a plain client-side search, no external
service, no account, nothing to pay for — it just reads reviews.json.

WHEN YOU ADD MORE REVIEWS:

1. Copy one of the existing files in reviews/ as a starting point (they're
   all built the same way: hero with the case-photo image and score stamp,
   review text on the left, "The Consensus" box on the right, sources list
   at the bottom).
2. Add a matching card to the "On the Shelf" grid in index.html, and update
   the homepage hero to feature the newest review (the latest one always
   leads).
3. Update the "Reviews Processed" number in the About section.
4. Add an entry to reviews.json (same shape as the existing entries) so the
   new game shows up in search. This step is easy to forget — the review
   page will exist and work fine even if you skip it, it just won't be
   findable through the search box.
5. Add a <url> entry to sitemap.xml for the new review page.
6. Commit and push via GitHub Desktop, same as always.
