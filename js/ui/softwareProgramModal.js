function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createProgramDetailsHtml(program) {
  return `
    <div class="program-modal-content">
      <div class="program-modal-head">
        <h3>${escapeHtml(program.title)}</h3>
        <a class="btn program-source-btn" href="${escapeHtml(
          program.sourceUrl
        )}" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 0 0-1.34-1.76c-1.09-.75.08-.74.08-.74a2.52 2.52 0 0 1 1.84 1.24a2.56 2.56 0 0 0 3.5 1a2.55 2.55 0 0 1 .76-1.6c-2.66-.3-5.47-1.33-5.47-5.93a4.65 4.65 0 0 1 1.24-3.22a4.32 4.32 0 0 1 .12-3.17s1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23a4.32 4.32 0 0 1 .12 3.17a4.64 4.64 0 0 1 1.24 3.22c0 4.61-2.81 5.63-5.49 5.92a2.86 2.86 0 0 1 .82 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .5z"/>
          </svg>
          <span>Source on GitHub</span>
        </a>
      </div>
      <div class="program-detail-layout">
        <div class="program-image-box">
          <img class="program-modal-image" src="${escapeHtml(program.image)}" alt="${escapeHtml(program.title)} screenshot">
        </div>
        <div class="program-description-box">
          <p class="program-modal-text">${escapeHtml(program.fullDescription || program.description)}</p>
        </div>
      </div>
    </div>
  `;
}

function createMoreProgramsHtml(items) {
  const cards = items
    .map(
      (item) => `
      <article class="mini-program-card">
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.description)}</p>
      </article>
    `
    )
    .join("");

  return `
    <div class="program-modal-head">
      <h3>More Programs</h3>
      <span class="program-modal-subtitle">Additional built-in tools from x16-PRos</span>
    </div>
    <div class="mini-program-grid">${cards}</div>
  `;
}

function openProgramModal(overlay, body, html) {
  body.innerHTML = html;
  overlay.classList.add("show");
}

function closeProgramModal(overlay, body) {
  overlay.classList.remove("show");
  body.innerHTML = "";
}

function isActivationKey(event) {
  return event.key === "Enter" || event.key === " ";
}

function findCardFromTarget(target) {
  if (!(target instanceof Element)) {
    return null;
  }
  return target.closest(".software-card");
}

function handleCardActivation(card, overlay, body, programsById, morePrograms) {
  if (!card) {
    return;
  }

  const programId = card.dataset.programId;
  if (!programId) {
    return;
  }

  if (programId === "more-programs") {
    openProgramModal(overlay, body, createMoreProgramsHtml(morePrograms));
    return;
  }

  const program = programsById.get(programId);
  if (!program) {
    return;
  }

  openProgramModal(overlay, body, createProgramDetailsHtml(program));
}

function initSoftwareProgramModal(programs, morePrograms) {
  const grid = document.getElementById("softwareGrid");
  const overlay = document.getElementById("programModal");
  const body = document.getElementById("programModalBody");

  if (!grid || !overlay || !body || !Array.isArray(programs)) {
    return;
  }

  const programsById = new Map(
    programs.filter((item) => item && item.id).map((item) => [item.id, item])
  );
  const extraPrograms = Array.isArray(morePrograms) ? morePrograms : [];

  grid.addEventListener("click", (event) => {
    const card = findCardFromTarget(event.target);
    handleCardActivation(card, overlay, body, programsById, extraPrograms);
  });

  grid.addEventListener("keydown", (event) => {
    if (!isActivationKey(event)) {
      return;
    }
    const card = findCardFromTarget(event.target);
    if (!card) {
      return;
    }
    event.preventDefault();
    handleCardActivation(card, overlay, body, programsById, extraPrograms);
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeProgramModal(overlay, body);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("show")) {
      closeProgramModal(overlay, body);
    }
  });
}

window.initSoftwareProgramModal = initSoftwareProgramModal;
