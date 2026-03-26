document.addEventListener("DOMContentLoaded", () => {
  if (typeof window.renderSoftwareGrid === "function" && Array.isArray(window.softwarePrograms)) {
    window.renderSoftwareGrid("softwareGrid", window.softwarePrograms);
  }

  if (typeof window.initSoftwareProgramModal === "function") {
    window.initSoftwareProgramModal(window.softwarePrograms, window.morePrograms);
  }

  if (typeof window.initDownloadModal === "function") {
    window.initDownloadModal();
  }

  if (typeof window.initTypingAnimations === "function") {
    window.initTypingAnimations();
  }

  if (typeof window.initScrollTop === "function") {
    window.initScrollTop();
  }

  if (typeof window.initGallery === "function" && Array.isArray(window.galleryData)) {
    window.initGallery(window.galleryData);
  }

  if (typeof window.updateNavActive === "function") {
    window.updateNavActive("main");
  }
});
