(function () {
  var ids = ['about', 'research', 'amie', 'publications', 'experience', 'contact'];
  var parents = { amie: 'research' };
  var links = document.querySelectorAll('.tabs a');

  function show(id, focus) {
    if (ids.indexOf(id) === -1) id = 'about';
    ids.forEach(function (s) {
      var el = document.getElementById(s);
      if (el) el.classList.toggle('is-active', s === id);
    });
    links.forEach(function (a) {
      if (a.getAttribute('href') === '#' + (parents[id] || id)) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    if (focus) {
      var h = document.querySelector('#' + id + ' h2');
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
      var tabs = document.querySelector('.tabs');
      var top = tabs.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY > top) window.scrollTo(0, top);
    }
  }

  var inPage = document.querySelectorAll('.cs-link a, .back a');
  inPage.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var id = a.getAttribute('href').slice(1);
      try { history.replaceState(null, '', '#' + id); } catch (err) {}
      show(id, true);
    });
  });

  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var id = a.getAttribute('href').slice(1);
      try { history.replaceState(null, '', '#' + id); } catch (err) {}
      show(id, true);
    });
  });
  window.addEventListener('hashchange', function () { show(location.hash.slice(1), true); });
  show(location.hash.slice(1), false);
  if (location.hash) { window.addEventListener('load', function () { setTimeout(function () { window.scrollTo(0, 0); }, 0); }); }

  var btn = document.getElementById('copy-email');
  if (btn) {
    btn.addEventListener('click', function () {
      var text = document.getElementById('email-text').textContent;
      function selectIt() {
        var r = document.createRange();
        r.selectNodeContents(document.getElementById('email-text'));
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        btn.textContent = 'Selected';
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { btn.textContent = 'Copied'; }, selectIt);
      } else { selectIt(); }
      setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
    });
  }
})();
