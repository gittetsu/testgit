const button = document.getElementById("js-button");
const closeElement = document.getElementById("js-close");
const openElement = document.getElementById("js-open");

button.addEventListener("click", function () {
  closeElement.classList.remove("show");
  openElement.classList.add("show");
  button.style.display = "none";
});
