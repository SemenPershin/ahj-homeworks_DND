import { Card } from "./Card";

const addButtons = document.querySelectorAll(".add_button")

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
  new Card(button);
  })
})