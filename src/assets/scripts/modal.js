const body = document.querySelector("body");

let calc;
let modal;
let cancelBtn;
let confirmBtn;

export function openModal(message) {
  createCalc();
  createModal(message);
  calc.append(modal);
  body.append(calc);
  return new Promise((resolve, reject) => {
    calc.addEventListener("click", () => {
      resolve(false);
      calc.remove();
    });
    cancelBtn.addEventListener("click", () => {
      resolve(false);
      calc.remove();
    });
    confirmBtn.addEventListener("click", () => {
      resolve(true);
      calc.remove();
    });
  });
}

function createCalc() {
  calc = document.createElement("div");
  calc.classList.add("calc");
}

function createModal(message) {
  modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
  <p>${message}</p>
  `;
  cancelBtn = document.createElement("button");
  cancelBtn.classList.add("btn", "btn--danger");
  cancelBtn.innerText = "Annuler";
  confirmBtn = document.createElement("button");
  confirmBtn.classList.add("btn", "btn--primary");
  confirmBtn.innerText = "Confirmer";
  modal.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  modal.append(cancelBtn, confirmBtn);
}
