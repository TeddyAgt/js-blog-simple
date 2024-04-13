import "./assets/styles/styles.scss";
import "./index.scss";

const articlesContainer = document.querySelector(".articles-container");
const url = "https://restapi.fr/api/tedarticles/";
const categoriesContainer = document.querySelector(".categories-list");

let articles;
let liElements;
let filter;

async function fetchArticles() {
  try {
    const response = await fetch(url, {
      method: "GET", // GET = Méthode par défaut, pas besoin de la préciser
    });
    articles = await response.json();
    if (!Array.isArray(articles)) articles = [articles];
    populateArticlesSection();
    createCategoryMenu();
  } catch (error) {
    console.log(error);
  }
}

function populateArticlesSection() {
  const articlesDOM = articles
    .filter((article) => {
      if (filter) {
        return article.category === filter;
      } else {
        return true;
      }
    })
    .map((article) => createArticle(article));

  articlesContainer.innerHTML = "";
  articlesContainer.append(...articlesDOM);
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) =>
    button.addEventListener("click", deleteArticle)
  );
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) =>
    button.addEventListener("click", redirectToForm)
  );
}

function createArticle(article) {
  const articleDOM = document.createElement("article");
  articleDOM.classList.add("article");
  articleDOM.innerHTML = `
           <img
             class="article__image"
             src="${article.picture}"
             alt="Portrait de l'auteur"
           />
           <h2 class="article__title">${article.title}</h2>
           <p class="article__author">${article.author} - ${new Date(
    article.createdAt
  ).toLocaleDateString("fr", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })}</p>
           <p class="article__content">
             ${article.content}
           </p>
           <div class="article__buttons-container">
             <button class="btn btn--primary edit-btn" data-id=${
               article._id
             }>Modifier</button>
             <button class="btn btn--danger delete-btn" data-id=${
               article._id
             }>Supprimer</button>
           </div>
       `;
  return articleDOM;
}

function createCategoryMenu() {
  const categoriesArr = generateCategoriesArray(articles);

  liElements = categoriesArr.map((category) => {
    return createLiElem(category);
  });
  categoriesContainer.innerHTML = "";
  categoriesContainer.append(...liElements);
}

function generateCategoriesArray(articles) {
  const categories = articles.reduce((acc, curr) => {
    acc[curr.category] ? acc[curr.category]++ : (acc[curr.category] = 1);
    return acc;
  }, {});
  return Object.keys(categories)
    .map((category) => {
      return [category, categories[category]];
    })
    .sort((a, b) => a[0].localeCompare(b[0]));
}

function createLiElem(category) {
  const liElem = document.createElement("li");
  liElem.innerHTML = `${category[0]} (<strong>${category[1]}</strong>)`;
  liElem.addEventListener("click", () => {
    if (filter === category[0]) {
      liElem.classList.remove("category--active");
      filter = null;
    } else {
      filter = category[0]; // On utilise les closures
      liElements.forEach((element) => {
        element.classList.remove("category--active");
      });
      liElem.classList.add("category--active");
    }

    populateArticlesSection();
  });
  return liElem;
}

async function deleteArticle(e) {
  console.log("in here");
  const id = e.target.dataset.id;
  const response = await fetch(`${url}${id}`, { method: "DELETE" });
  fetchArticles();
}

function redirectToForm(e) {
  console.log("in here");
  location.assign(`/form/form.html?id=${e.target.dataset.id}`);
}

fetchArticles();
