  (function(){
    "use strict";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // header border sharpens once the page has scrolled
    var header = document.getElementById("siteHeader");
    var onScroll = function(){
      if (window.scrollY > 8) header.style.borderBottomColor = "var(--line)";
      else header.style.borderBottomColor = "var(--line-soft)";
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // active nav link tracking by section in view
    var sections = ["shelf", "scoring", "about"].map(function(id){
      return document.getElementById(id);
    });
    var links = Array.prototype.slice.call(document.querySelectorAll(".site-nav a"));

    var setCurrent = function(id){
      links.forEach(function(link){
        var match = link.getAttribute("href") === "#" + id;
        link.classList.toggle("current", match);
      });
    };

    if ("IntersectionObserver" in window){
      var navObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) setCurrent(entry.target.id);
        });
      }, { rootMargin: "-45% 0px -45% 0px" });
      sections.forEach(function(s){ if (s) navObserver.observe(s); });

      // reveal cards as they enter view
      var cards = document.querySelectorAll(".card");
      if (reduceMotion){
        cards.forEach(function(c){ c.classList.add("in-view"); });
      } else {
        var cardObserver = new IntersectionObserver(function(entries, obs){
          entries.forEach(function(entry){
            if (entry.isIntersecting){
              entry.target.classList.add("in-view");
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });
        cards.forEach(function(c){ cardObserver.observe(c); });
      }
    } else {
      document.querySelectorAll(".card").forEach(function(c){ c.classList.add("in-view"); });
    }
  })();
