function initNews() {
  var grid = document.getElementById("newsGrid");
  var modal = document.getElementById("newsModal");
  if (!grid || !modal) return;

  var articles = window.newsData || [];

  grid.innerHTML = articles.map(function (item) {
    return (
      '<article class="news-card" data-id="' + item.id + '">' +
        '<div class="news-card-image">' +
          '<img src="' + item.image + '" alt="" loading="lazy">' +
        '</div>' +
        '<div class="news-card-body">' +
          '<div class="news-card-meta">' + item.date + ' &middot; by ' + item.author + '</div>' +
          '<h3 class="news-card-title">' + item.title + '</h3>' +
          '<p class="news-card-summary">' + item.summary + '</p>' +
          '<span class="news-card-link">Read more &rarr;</span>' +
        '</div>' +
      '</article>'
    );
  }).join("");

  grid.addEventListener("click", function (e) {
    var card = e.target.closest(".news-card");
    if (!card) return;
    var id = card.getAttribute("data-id");
    var item = articles.find(function (n) { return n.id === id; });
    if (!item) return;

    modal.querySelector(".news-modal-title").textContent = item.title;
    modal.querySelector(".news-modal-meta").innerHTML = item.date + ' &middot; by ' + item.author;
    modal.querySelector(".news-modal-content").innerHTML = item.content.join("\n");
    modal.classList.add("show");
  });

  var closeBtn = modal.querySelector(".news-modal-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      modal.classList.remove("show");
    });
  }
  modal.addEventListener("click", function (e) {
    if (e.target === modal) modal.classList.remove("show");
  });
}

window.initNews = initNews;
