function createSoftwareCard(program) {
  const tagHtml = program.category
    ? `<span class="software-card-tag ${program.category}">${program.category}</span>`
    : "";

  return `
    <article class="software-card" data-program-id="${program.id}" tabindex="0" role="button" aria-label="Open ${program.title} details">
      <img class="software-card-image" src="${program.image}" alt="${program.title} screenshot" loading="lazy">
      <div class="software-card-body">
        <div class="software-card-header">
          <h4>${program.title}</h4>
          ${tagHtml}
        </div>
        <p>${program.description}</p>
      </div>
    </article>
  `;
}

function createMoreProgramsCard() {
  return `
    <article class="software-card more-programs-card" data-program-id="more-programs" tabindex="0" role="button" aria-label="Open more programs details">
      <div class="more-programs-icon">+</div>
      <h4>MORE PROGRAMS</h4>
      <p>Open the full list of additional built-in tools and utilities.</p>
    </article>
  `;
}

function renderSoftwareGrid(containerId, programs) {
  const grid = document.getElementById(containerId);
  if (!grid) {
    return;
  }

  grid.innerHTML =
    programs.map(createSoftwareCard).join("") + createMoreProgramsCard();
}

window.renderSoftwareGrid = renderSoftwareGrid;
