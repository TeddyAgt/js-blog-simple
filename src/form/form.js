import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
const url = "https://restapi.fr/api/tedarticles/";
const cancelBtn = document.querySelector("#cancel-btn");
let articleId;

async function initForm() {
  articleId = new URL(location).searchParams.get("id");
  if (articleId) {
    const response = await fetch(`${url}${articleId}`);
    if (response.status < 299) {
      const article = await response.json();
      fillForm(article);
    }
  }
}
initForm();

function fillForm(article) {
  const author = document.querySelector("#author");
  const title = document.querySelector("#title");
  const picture = document.querySelector("#picture");
  const category = document.querySelector("#category");
  const content = document.querySelector("#content");
  author.value = article.author || "";
  title.value = article.title || "";
  picture.value = article.picture || "";
  category.value = article.category || "";
  content.value = article.content || "";
}

let errors = [];

form.addEventListener("submit", handleSubmit);

cancelBtn.addEventListener("click", () => location.assign("/index.html"));

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);

  //   Méthode 1

  //   const entries = formData.entries();
  //   const article = Array.from(formData.entries()).reduce((acc, curr) => {
  //     acc[curr[0]] = curr[1];
  //     return acc;
  //   }, {});

  //   Méthode 2

  const article = Object.fromEntries(formData.entries());
  if (isFormValid(article)) {
    try {
      const jsonArticle = JSON.stringify(article);
      let response;
      if (articleId) {
        response = await fetch(`${url}${articleId}`, {
          method: "PATCH",
          body: jsonArticle,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        response = await fetch(url, {
          method: "POST",
          body: jsonArticle,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      if (response.status < 299) {
        location.assign("/index.html");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

function isFormValid(article) {
  errors = [];
  if (
    !article.author ||
    !article.title ||
    !article.picture ||
    !article.category ||
    !article.content
  ) {
    errors.push("Vous devez renseigner tous les champs");
  } else {
    errors = [];
  }
  if (errors.length) {
    let errorHTML = "";
    errors.forEach((error) => {
      errorHTML += `<li>${error}</li>`;
      return false;
    });
    errorElement.innerHTML = errorHTML;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
}
