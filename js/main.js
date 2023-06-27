const list = document.querySelector("#currentList");
const url = "https://food-protein-api.onrender.com/api";

//http://localhost:8000/api
//https://food-protein-api.onrender.com/api

document.addEventListener("DOMContentLoaded", () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let keys = Object.keys(data);
      for (let key of keys) {
        const li = document.createElement("li");
        li.textContent = key;
        list.appendChild(li);
      }
    })
    .catch((error) => {
      console.error("Got error", error);
    });
});
