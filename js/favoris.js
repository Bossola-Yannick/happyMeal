// LOCAL STORAGE

// let allRecipe = JSON.parse(localStorage.getItem("all-recipe"));
// console.log(allRecipe);
let favoritesRecipes;
if (localStorage.getItem("favorite") !== null) {
  favoritesRecipes = JSON.parse(localStorage.getItem("favorite"));
} else {
  favoritesRecipes = allRecipe.slice(3, 8);
  localStorage.setItem("favorite", JSON.stringify(favoritesRecipes));
  favoritesRecipes = JSON.parse(localStorage.getItem("favorite"));
}

console.log(favoritesRecipes);

// VARIABLE
let listCategory = [];
allRecipe.forEach((recipe) => {
  listCategory.push(recipe.categorie);
  listCategory = Array.from(new Set(listCategory));
});
const dayOfWeek = [
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
  "dimanche",
];

// ELEMENTS:
const listFavBox = document.getElementById("listeFav");
const selectCategorie = document.getElementById("categorie");
if (selectCategorie) {
  listCategory.forEach((type) => {
    let option = document.createElement("option");
    option.textContent = type;
    selectCategorie.appendChild(option);
  });
}

// affiche la modale
const openModal = () => {
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("modal");

  overlay.style.display = "block";
  modal.style.display = "flex";
};

// ferme la modale
const closeModal = () => {
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("modal");

  overlay.style.display = "none";
  modal.style.display = "none";
};

// creer la modale avec les infos de la recette selectionnée

const createModal = (index) => {
  const modalBox = document.getElementById("modal");
  modalBox.innerHTML = "";

  // const recipeChoose = localStorage.getItem("favorite");
  // console.log(recipeChoose);

  favoritesRecipes.forEach((recette) => {
    if (favoritesRecipes.indexOf(recette) === index) {
      console.log(recette);
      modalBox.innerHTML += `
        <div class="modal-header">
          <h2>${recette.nom}</h2>
          <p>Préparation: ${recette.temps_preparation}</p>
        </div>
        <div id="modal-close" class="modal-close">
          <img id="modal-icon-close" src="../assets/img/icon-close.png" />
        </div>
         <div class="modal-sub-header">
          <h5>Ajouter aux menus de la semaine?</h5>
          <select id="dayOfWeekSelect">
            <option>--choisir un jour de la semaine--</option>
            ${dayOfWeek
              .map((day) => `<option value="${day}">${day}</option>`)
              .join("")}
          </select>
        </div>
        <div class="modal-body">
          <ul class="ingredients">
            ${recette.ingredients
              .map(
                (ingredient) =>
                  `<li>${ingredient.nom}: <span>${ingredient.quantite}</span> </li>`
              )
              .join("")}
          </ul>
          <div class="cooking-steps">
            <h3>Etapes de préparations</h3>
            <ol>
            ${recette.etapes.map((etape) => `<li>${etape}</li>`).join("")}
            </ol>
          </div>
        </div>
      `;
    }
  });

  const modalCloseIcon = document.getElementById("modal-icon-close");
  modalCloseIcon.addEventListener("click", (e) => {
    console.log(e);
    closeModal();
  });
};

// createModal(1);

// affiche la liste des recipes favorites
const showListFav = () => {
  // affichage liste
  if (favoritesRecipes.length > 0) {
    listFavBox.innerHTML = "";

    favoritesRecipes.forEach((recipe) => {
      const indexRecipe = favoritesRecipes.indexOf(recipe);

      // boite recette
      const secondCard = document.createElement("div");
      secondCard.id = "top-box-card";
      // ajoute le bouton retirer favoris
      const cardButton = document.createElement("div");
      cardButton.id = "card-button";
      const buttonFav = document.createElement("button");
      buttonFav.id = "remove";
      buttonFav.classList.add("button-fav-remove");
      buttonFav.setAttribute("value", indexRecipe);

      // event pour supprimer des favoris
      buttonFav.addEventListener("click", () => {
        favoritesRecipes.splice(indexRecipe, 1);
        showListFav();
        localStorage.setItem("favorite", JSON.stringify(favoritesRecipes));
      });

      cardButton.appendChild(buttonFav);
      secondCard.appendChild(cardButton);

      // sous boite de chaque recette
      const card = document.createElement("div");
      card.id = "card-box";
      card.classList.add("card-box");
      card.setAttribute("value", indexRecipe);

      // event pour afficher la modale de la recette
      card.addEventListener("click", () => {
        openModal();
        createModal(indexRecipe);
      });

      // ajoute le titre et la catégorie
      const cardTitle = document.createElement("div");
      cardTitle.id = "card-title";
      cardTitle.innerHTML = `
          <h3>${recipe.nom}</h3>
          <p>${recipe.categorie}</p>
        `;
      card.appendChild(cardTitle);

      // boite pour les ingrédients
      const cardDesc = document.createElement("div");
      cardDesc.id = "card-desc";
      recipe.ingredients.map((ingredient) => {
        const pIngredient = document.createElement("p");
        pIngredient.classList.add("tag-ingredient");
        pIngredient.textContent = ingredient.nom;
        cardDesc.appendChild(pIngredient);
      });
      card.appendChild(cardDesc);

      // Ajoute le footer
      const cardFooter = document.createElement("div");
      cardFooter.id = "card-footer";
      cardFooter.innerHTML = `<p>Préparation: ${recipe.temps_preparation}</p>`;
      card.appendChild(cardFooter);

      // Ajoute la carte au conteneur principal
      secondCard.appendChild(card);
      listFavBox.appendChild(secondCard);
    });
  } else {
    listFavBox.innerHTML = `
    <p class="msg-info">Liste vide</p>
    `;
  }
};

showListFav();
