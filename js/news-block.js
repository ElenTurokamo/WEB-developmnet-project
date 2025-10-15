async function loadNews() {
  const response = await fetch("news-data.json");
  const newsList = await response.json();

  const container = document.getElementById("news-list");
  container.innerHTML = "";

  newsList.forEach((news, index) => {
    const item = document.createElement("div");
    item.className = "news-item";
    item.textContent = news.title;
    item.addEventListener("click", () => openNewsModal(news));
    container.appendChild(item);
  });
}

function openNewsModal(news) {
  const modal = document.getElementById("news-modal");
  const modalContent = document.getElementById("news-modal-content");

  modalContent.innerHTML = `
    <h2>${news.title}</h2>
    <p>${news.content}</p>
  `;

  if (news.images && news.images.length > 0) {
    news.images.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.style.maxWidth = "100%";
      img.style.marginTop = "10px";
      modalContent.appendChild(img);
    });
  }

  modal.style.display = "flex";
}

function closeNewsModal() {
  document.getElementById("news-modal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", loadNews);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNewsModal();
  }
});