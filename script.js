    function showMain() {
      document.getElementById('mainContent').style.display = 'block';
      document.getElementById('docsPage').style.display = 'none';
    }

    function showDocs() {
      document.getElementById('mainContent').style.display = 'none';
      document.getElementById('docsPage').style.display = 'grid';
    }

    function goToDocsSection(sectionId) {
      showDocs();
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    