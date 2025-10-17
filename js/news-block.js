// --- Глобальный массив для хранения новостей ---
let allNews = [];

// --- Загрузка новостей при старте ---
async function loadNews() {
  try {
    const response = await fetch("../json/news-data.json");
    allNews = await response.json();
    renderNews(allNews);
  } catch (error) {
    console.error("Ошибка загрузки новостей:", error);
  }
}

// --- Отрисовка новостей в контейнер ---
function renderNews(newsArray) {
  const container = document.getElementById("news-list");
  container.innerHTML = "";

  if (!newsArray.length) {
    const notFound = document.createElement("div");
    notFound.className = "news-item not-found";
    notFound.textContent = "Новость не найдена";
    container.appendChild(notFound);
    return;
  }

  newsArray.forEach((news) => {
    const item = document.createElement("div");
    item.className = "news-item";
    item.textContent = news.title;
    item.addEventListener("click", () => openNewsModal(news));
    container.appendChild(item);
  });
}

// --- Поиск по JSON ---
function searchNews(query) {
  const lowerQuery = query.trim().toLowerCase();
  if (lowerQuery === "") {
    renderNews(allNews);
    return;
  }

  const filtered = allNews.filter((news) =>
    news.title.toLowerCase().includes(lowerQuery)
  );

  renderNews(filtered);
}

// --- Открытие новости ---
function openNewsModal(news) {
  const modal = document.getElementById("news-modal");
  const modalContent = document.getElementById("news-modal-content");

  modalContent.innerHTML = `
    <h2>${news.title}</h2>
    <p>${news.content}</p>
  `;

  if (news.images && news.images.length > 0) {
    news.images.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.style.maxWidth = "100%";
      img.style.marginTop = "10px";
      modalContent.appendChild(img);
    });
  }

  modal.style.display = "flex";
}

// --- Закрытие модального окна ---
function closeNewsModal() {
  document.getElementById("news-modal").style.display = "none";
}

// --- Логика поиска и анимации поля ---
document.addEventListener("DOMContentLoaded", () => {
  loadNews();

  const searchContainer = document.querySelector(".search");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.querySelector(".search-icon");
  const navList = document.querySelector(".nav-list");

  // Анимация открытия/закрытия поиска
  searchButton.addEventListener("click", () => {
    searchContainer.classList.toggle("active");
    navList.classList.toggle("hide");

    if (searchContainer.classList.contains("active")) {
      searchInput.focus();
    } else {
      searchInput.value = "";
      renderNews(allNews);
    }
  });

  // Поиск по Enter
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchNews(searchInput.value);
    }
  });
});

// --- Закрытие модалки клавишей Esc ---
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNewsModal();
  }
});
