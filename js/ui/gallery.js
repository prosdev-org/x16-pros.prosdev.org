function initGallery(galleryData) {
  if (!Array.isArray(galleryData) || galleryData.length === 0) {
    return;
  }

  const galleryImage = document.getElementById("galleryImage");
  const galleryTitle = document.getElementById("galleryTitle");
  const galleryDesc = document.getElementById("galleryDesc");
  const thumbnailsContainer = document.getElementById("galleryThumbnails");
  const dotsContainer = document.getElementById("galleryDots");
  const prevBtn = document.querySelector(".gallery-nav.prev");
  const nextBtn = document.querySelector(".gallery-nav.next");

  const fsOverlay = document.getElementById("fullscreenGallery");
  const fsImg = document.querySelector(".fs-image");
  const fsClose = document.querySelector(".fs-close");
  const fsPrev = document.querySelector(".fs-prev");
  const fsNext = document.querySelector(".fs-next");
  const fsOpenBtn = document.getElementById("galleryFullscreenBtn");

  if (!galleryImage || !prevBtn || !nextBtn) {
    return;
  }

  const hasFullscreen = Boolean(fsOverlay && fsImg && fsClose && fsPrev && fsNext);

  if (thumbnailsContainer) {
    thumbnailsContainer.innerHTML = galleryData
    .map(
      (item, index) => `
      <div class="thumbnail${index === 0 ? " active" : ""}" data-index="${index}">
        <img src="${item.src}" alt="${item.title} thumbnail" loading="lazy">
      </div>
    `
    )
      .join("");
  }

  const thumbnails = thumbnailsContainer
    ? Array.from(thumbnailsContainer.querySelectorAll(".thumbnail"))
    : [];

  if (dotsContainer) {
    dotsContainer.innerHTML = galleryData
      .map(
        (item, index) =>
          `<button class="gallery-dot${index === 0 ? " active" : ""}" data-index="${index}"` +
          ` aria-label="Show ${item.title || "screenshot " + (index + 1)}"></button>`
      )
      .join("");
  }

  const dots = dotsContainer
    ? Array.from(dotsContainer.querySelectorAll(".gallery-dot"))
    : [];

  let currentIndex = 0;

  function updateGallery(index) {
    const item = galleryData[index];

    galleryImage.style.opacity = "0";
    setTimeout(() => {
      galleryImage.src = item.src;
      galleryImage.onload = () => {
        galleryImage.style.opacity = "1";
      };
    }, 120);

    galleryImage.alt = item.title || "";
    if (galleryTitle) galleryTitle.textContent = item.title;
    if (galleryDesc) galleryDesc.textContent = item.desc;

    thumbnails.forEach((thumb) => thumb.classList.remove("active"));
    if (thumbnails[index]) {
      thumbnails[index].classList.add("active");
    }

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
      dot.setAttribute("aria-current", i === index ? "true" : "false");
    });

    currentIndex = index;
    if (hasFullscreen && fsOverlay.style.display === "flex") {
      fsImg.src = item.src;
    }
  }

  function nextImage() {
    const nextIndex = (currentIndex + 1) % galleryData.length;
    updateGallery(nextIndex);
  }

  function prevImage() {
    const prevIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateGallery(prevIndex);
  }

  function openFullscreenGallery() {
    if (!hasFullscreen) return;
    fsOverlay.style.display = "flex";
    fsImg.src = galleryData[currentIndex].src;
  }

  function closeFullscreenGallery() {
    if (!hasFullscreen) return;
    fsOverlay.style.display = "none";
  }

  nextBtn.addEventListener("click", nextImage);
  prevBtn.addEventListener("click", prevImage);

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const index = Number(thumb.dataset.index);
      if (!Number.isNaN(index)) {
        updateGallery(index);
      }
    });
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.index);
      if (!Number.isNaN(index)) {
        updateGallery(index);
      }
    });
  });

  galleryImage.addEventListener("click", openFullscreenGallery);
  if (fsOpenBtn) {
    fsOpenBtn.addEventListener("click", openFullscreenGallery);
  }

  if (hasFullscreen) {
    fsClose.addEventListener("click", closeFullscreenGallery);
    fsNext.addEventListener("click", nextImage);
    fsPrev.addEventListener("click", prevImage);

    fsOverlay.addEventListener("click", (event) => {
      if (event.target === fsOverlay) {
        closeFullscreenGallery();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (!hasFullscreen || fsOverlay.style.display !== "flex") {
      return;
    }

    if (event.key === "ArrowRight") {
      nextImage();
    } else if (event.key === "ArrowLeft") {
      prevImage();
    } else if (event.key === "Escape") {
      closeFullscreenGallery();
    }
  });

  updateGallery(0);
}

window.initGallery = initGallery;
