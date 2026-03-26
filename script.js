    function showMain() {
      document.getElementById('mainContent').style.display = 'block';
      document.getElementById('docsPage').style.display = 'none';
      document.getElementById('newsPage').style.display = 'none';
      updateNavActive('main');
      window.scrollTo({ top: 0 });
    }

    function showDocs() {
      document.getElementById('mainContent').style.display = 'none';
      document.getElementById('docsPage').style.display = 'block';
      document.getElementById('newsPage').style.display = 'none';
      updateNavActive('docs');
      window.scrollTo({ top: 0 });
    }

    function showNews() {
      document.getElementById('mainContent').style.display = 'none';
      document.getElementById('docsPage').style.display = 'none';
      document.getElementById('newsPage').style.display = 'block';
      updateNavActive('news');
      window.scrollTo({ top: 0 });
    }

    function goToDocsSection(sectionId) {
      showDocs();
      const section = document.getElementById(sectionId);
      if (section) {
        setTimeout(function() {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    }

    function updateNavActive(page) {
      var btns = document.querySelectorAll('.nav .btn:not(.support)');
      btns.forEach(function(btn) { btn.classList.remove('active'); });
      if (page === 'main' && btns[0]) btns[0].classList.add('active');
      if (page === 'docs' && btns[1]) btns[1].classList.add('active');
      if (page === 'news' && btns[2]) btns[2].classList.add('active');
    }
