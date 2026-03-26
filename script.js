    function showMain() {
      document.getElementById('mainContent').style.display = 'block';
      document.getElementById('docsPage').style.display = 'none';
      updateNavActive('main');
      window.scrollTo({ top: 0 });
    }

    function showDocs() {
      document.getElementById('mainContent').style.display = 'none';
      document.getElementById('docsPage').style.display = 'grid';
      updateNavActive('docs');
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
      var btns = document.querySelectorAll('.nav .btn');
      btns.forEach(function(btn) { btn.classList.remove('active'); });
      if (page === 'main' && btns[0]) btns[0].classList.add('active');
      if (page === 'docs' && btns[1]) btns[1].classList.add('active');
    }
    