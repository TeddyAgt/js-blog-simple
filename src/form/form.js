import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
const url = "https://restapi.fr/api/tedarticles";
const cancelBtn = document.querySelector("#cancel-btn");

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
      const response = await fetch(url, {
        method: "POST",
        body: jsonArticle,
        headers: {
          "Content-Type": "application/json",
        },
      });

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
