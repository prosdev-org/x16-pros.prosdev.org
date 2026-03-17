function initDownloadModal() {
  const modal = document.getElementById("downloadModal");
  const downloadBtn = document.querySelector('.btn.primary[href="#download"]');

  if (!modal || !downloadBtn) {
    return;
  }

  const closeBtn = modal.querySelector(".modal-close");
  if (!closeBtn) {
    return;
  }

  downloadBtn.addEventListener("click", (event) => {
    event.preventDefault();
    modal.classList.add("show");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });
}

window.initDownloadModal = initDownloadModal;
