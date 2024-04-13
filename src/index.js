import "./assets/styles/styles.scss";
import "./index.scss";

const articlesContainer = document.querySelector(".articles-container");
const url = "https://restapi.fr/api/tedarticles/";

async function fetchArticles() {
  try {
    const response = await fetch(url, {
      method: "GET", // GET = Méthode par défaut, pas besoin de la préciser
    });
    let articles = await response.json();
    if (!Array.isArray(articles)) articles = [articles];
    populateArticlesSection(articles);
  } catch (error) {
    console.log(error);
  }
}

function populateArticlesSection(articles) {
  const articlesDOM = articles.map((article) => createArticle(article));

  articlesContainer.innerHTML = "";
  articlesContainer.append(...articlesDOM);
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) =>
    button.addEventListener("click", deleteArticle)
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
             <button class="btn btn--primary" data-id=${
               article._id
             }>Modifier</button>
             <button class="btn btn--danger delete-btn" data-id=${
               article._id
             }>Supprimer</button>
           </div>
       `;
  return articleDOM;
}

async function deleteArticle(e) {
  console.log("in here");
  const id = e.target.dataset.id;
  const response = await fetch(`${url}${id}`, { method: "DELETE" });
  fetchArticles();
}

fetchArticles();
