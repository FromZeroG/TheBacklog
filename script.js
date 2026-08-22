  (function(){
    "use strict";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // header border sharpens once the page has scrolled
    var header = document.getElementById("siteHeader");
    if (header){
      var onScroll = function(){
        if (window.scrollY > 8) header.style.borderBottomColor = "var(--line)";
        else header.style.borderBottomColor = "var(--line-soft)";
      };
      document.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

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

  // ---------------- search ----------------
  (function(){
    "use strict";

    var toggle = document.getElementById("searchToggle");
    var panel = document.getElementById("searchPanel");
    var input = document.getElementById("searchInput");
    var results = document.getElementById("searchResults");
    if (!toggle || !panel || !input || !results) return;

    var data = null;
    var activeIndex = -1;

    var toneLabel = function(score){
      if (score >= 110) return "tone-over";
      if (score >= 85) return "tone-high";
      if (score >= 60) return "tone-mid";
      return "tone-low";
    };

    var render = function(query){
      var q = query.trim().toLowerCase();
      var list = (data || []).filter(function(game){
        if (!q) return true;
        return (game.title + " " + game.genre + " " + game.platform).toLowerCase().indexOf(q) !== -1;
      });

      results.innerHTML = "";
      activeIndex = -1;

      if (!data){
        var loading = document.createElement("li");
        loading.className = "search-empty";
        loading.textContent = "Loading the shelf...";
        results.appendChild(loading);
        return;
      }

      if (!list.length){
        var empty = document.createElement("li");
        empty.className = "search-empty";
        empty.textContent = q ? "Nothing on the shelf matches \"" + query.trim() + "\"." : "Nothing's been reviewed yet.";
        results.appendChild(empty);
        return;
      }

      list.forEach(function(game){
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.className = "search-result";
        a.href = "/reviews/" + game.slug + ".html";

        var left = document.createElement("span");
        var name = document.createElement("span");
        name.className = "name";
        name.textContent = game.title;
        var meta = document.createElement("span");
        meta.className = "meta";
        meta.textContent = game.platform + " — " + game.genre;
        left.appendChild(name);
        left.appendChild(meta);

        var score = document.createElement("span");
        score.className = "score " + toneLabel(game.score);
        score.textContent = game.score + "%";

        a.appendChild(left);
        a.appendChild(score);
        li.appendChild(a);
        results.appendChild(li);
      });
    };

    var setActive = function(index){
      var items = results.querySelectorAll(".search-result");
      if (!items.length) return;
      activeIndex = (index + items.length) % items.length;
      items.forEach(function(el, i){ el.classList.toggle("is-active", i === activeIndex); });
      items[activeIndex].scrollIntoView({ block: "nearest" });
    };

    var loadData = function(){
      if (data) return Promise.resolve(data);
      return fetch("/reviews.json")
        .then(function(r){ return r.json(); })
        .then(function(json){ data = json; return data; })
        .catch(function(){ data = []; return data; });
    };

    var openPanel = function(){
      panel.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      render(input.value);
      loadData().then(function(){ render(input.value); });
      input.focus();
    };

    var closePanel = function(){
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", function(){
      if (panel.hidden) openPanel(); else closePanel();
    });

    document.addEventListener("click", function(e){
      if (!panel.hidden && !panel.contains(e.target) && !toggle.contains(e.target)){
        closePanel();
      }
    });

    document.addEventListener("keydown", function(e){
      if (e.key === "Escape" && !panel.hidden){
        closePanel();
        toggle.focus();
      }
    });

    input.addEventListener("input", function(){ render(input.value); });

    input.addEventListener("keydown", function(e){
      var items = results.querySelectorAll(".search-result");
      if (e.key === "ArrowDown"){
        e.preventDefault();
        setActive(activeIndex + 1);
      } else if (e.key === "ArrowUp"){
        e.preventDefault();
        setActive(activeIndex - 1);
      } else if (e.key === "Enter"){
        e.preventDefault();
        var target = activeIndex >= 0 && items[activeIndex] ? items[activeIndex] : items[0];
        if (target) window.location.href = target.getAttribute("href");
      }
    });
  })();
