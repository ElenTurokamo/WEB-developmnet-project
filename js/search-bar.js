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
  const searchInput = searchContainer.querySelector("input");
  const searchButton = searchContainer.querySelector(".search-icon");
  const navList = document.querySelector(".nav-list");

  searchButton.addEventListener("click", () => {
    searchContainer.classList.toggle("active");
    navList.classList.toggle("hide");
    if (searchContainer.classList.contains("active")) {
      searchInput.focus();
    } else {
      searchInput.value = "";
    }
  });
});