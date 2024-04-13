import "./assets/styles/styles.scss";
import "./index.scss";

const articlesContainer = document.querySelector(".articles-container");
const url = "https://restapi.fr/api/tedarticles";

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
  //   const articlesDOM = articles.map((article) => createArticle(article));
  //   articlesContainer.innerHTML = "";
  const articlesDOM = articles.map((article) => {
    const articleDOM = document.createElement("article");
    articleDOM.classList.add("article");
    articleDOM.innerHTML = `
                 <img
                   class="article__image"
                   src="${article.picture}"
                   alt="Portrait de l'auteur"
                 />
                 <h2 class="article__title">${article.title}</h2>
                 <p class="article__author">${article.author} - ${article.category}</p>
                 <p class="article__content">
                   ${article.content}
                 </p>
                 <div class="article__buttons-container">
                   <button class="btn btn--primary">Modifier</button>
                   <button class="btn btn--danger" data-id=${article._id}>Supprimer</button>
                 </div>
             `;
    return articleDOM;
  });
  articlesContainer.append(...articlesDOM);
}

// function createArticle(article) {
//   const articleElement = document.createElement("article");
//   articleElement.classList.add("article");
//   articleElement.innerHTML = `
//             <img
//               class="article__image"
//               src="${article.picture}"
//               alt="Portrait de l'auteur"
//             />
//             <h2 class="article__title">${article.title}</h2>
//             <p class="article__author">${article.author} - ${article.category}</p>
//             <p class="article__content">
//               ${article.content}
//             </p>
//             <div class="article__buttons-container">
//               <button class="btn btn--primary">Modifier</button>
//               <button class="btn btn--danger" data-id=${article.id}>Supprimer</button>
//             </div>
//         `;
//   return articleElement;
// }

fetchArticles();
