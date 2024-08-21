const createBtn = document.querySelector(".CreateBtn");
const searchBtn = document.querySelector(".SearchBtn");

createBtn.addEventListener("click", () => localStorage.setItem("Btn", "create"));
searchBtn.addEventListener("click", () => localStorage.setItem("Btn", "search"));

document.querySelector(".anchorID").addEventListener('click', () => localStorage.setItem("Btn", "newID"));