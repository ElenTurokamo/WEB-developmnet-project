// function searchRecipes() {
//     const input = document.getElementById('searchInput');
//     const filter = input.value.trim().toLowerCase();
//     const recipes = document.querySelectorAll('.news-item');

//     if (filter === '') {
//         recipes.forEach(recipe => {
//             recipe.style.display = '';
//         });
//         return;
//     }

//     let found = false;

//     recipes.forEach(recipe => {
//         const title = recipe.querySelector('h2')?.textContent.toLowerCase() || '';
//         if (title.includes(filter)) {
//             recipe.style.display = ''; 
//             found = true;
//         } else {
//             recipe.style.display = 'none';
//         }
//     });

//     if (!found) {
//         recipes.forEach(recipe => (recipe.style.display = 'none'));
//         console.log('Новость не найдена');
//     }
// }

// document.getElementById('searchInput').addEventListener('keydown', function (e) {
//     if (e.key === 'Enter') {
//         e.preventDefault();
//         searchRecipes();
//     }
// });


document.addEventListener("DOMContentLoaded", () => {
  const searchContainer = document.querySelector(".search");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.querySelector(".search-icon");
  const navList = document.querySelector(".nav-list");
  const newsItems = document.querySelectorAll(".news-item");

  // Анимация открытия/закрытия поиска
  searchButton.addEventListener("click", () => {
    searchContainer.classList.toggle("active");
    navList.classList.toggle("hide");

    if (searchContainer.classList.contains("active")) {
      searchInput.focus();
    } else {
      searchInput.value = "";
      resetNews();
    }
  });

  // Запуск поиска по Enter
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchRecipes();
    }
  });

  // Основная функция поиска
  function searchRecipes() {
    const filter = searchInput.value.trim().toLowerCase();

    if (filter === "") {
      resetNews();
      return;
    }

    let found = false;

    newsItems.forEach((item) => {
      const title =
        item.querySelector("h2")?.textContent.toLowerCase() ||
        item.querySelector("a")?.textContent.toLowerCase() ||
        "";

      if (title.includes(filter)) {
        item.style.display = "";
        found = true;
      } else {
        item.style.display = "none";
      }
    });

    if (!found) {
      console.log("Новость не найдена");
    }
  }

  // Сброс фильтра — показать все новости
  function resetNews() {
    newsItems.forEach((item) => (item.style.display = ""));
  }
});
