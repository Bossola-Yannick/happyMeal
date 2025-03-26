// LOCAL STORAGE

// let allRecipe = JSON.parse(localStorage.getItem("all-recipe"));
// console.log(allRecipe);
let favoritesRecipes;
if (!localStorage.getItem("favorites")) {
  favoritesRecipes = JSON.parse(localStorage.getItem("favorite"));
} else {
  favoritesRecipes = allRecipe.slice(3, 8);
  localStorage.setItem("favorite", JSON.stringify(favoritesRecipes));
}
// let favoritesRecipes = allRecipe;
// let favoritesRecipes = [];

// console.log(favoritesRecipes);

// VARIABLE
let listeCat = [];
allRecipe.forEach((recipe) => {
  listeCat.push(recipe.categorie);
  listeCat = Array.from(new Set(listeCat));
});

// ELEMENTS:
const selectCategorie = document.getElementById("categorie");
if (selectCategorie) {
  listeCat.forEach((type) => {
    let option = document.createElement("option");
    option.textContent = type;
    selectCategorie.appendChild(option);
  });
}
const listFavBox = document.getElementById("listeFav");

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
const createModal = () => {
  const indexRecipeClicked = localStorage.getItem("id-clicked-recipe");
  const recipeClicked = favoritesRecipes[indexRecipeClicked];
  // console.log(recipeClicked);

  // boite modale
  const modalBox = document.createElement("div");
  modalBox.id = "modal";
  modalBox.classList.add("modal", "scroller");

  // boite modale close
  const modalClose = document.createElement("div");
  modalClose.id = "modal-close";
  modalClose.classList.add("modal-close");

  const modalCloseIcon = document.createElement("img");
  modalCloseIcon.setAttribute("src", "../assets/img/icon-close.png");
  modalClose.appendChild(modalCloseIcon);
  modalCloseIcon.addEventListener("click", closeModal);

  // boite modale header
  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  const modalH2 = document.createElement("h2");
  modalH2.innerText = "{recette}";

  const modalP1 = document.createElement("p");
  modalP1.innerText = "{temps preparation}";

  modalHeader.appendChild(modalH2);
  modalHeader.appendChild(modalP1);

  // boite modale sub header
  const modalSubHeader = document.createElement("div");
  modalSubHeader.classList.add("modal-sub-header");

  const modalSubHeaderH5 = document.createElement("h5");
  modalSubHeaderH5.innerText = "Ajouter aux menus de la semaine ?";

  const modalSubHeaderSelect = document.createElement("select");
  const modalSelectEx = document.createElement("option");
  modalSelectEx.innerText = "--Choisir un jour de la semaine--";
  modalSubHeaderSelect.appendChild(modalSelectEx);
  const jourSemaine = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
  ];
  jourSemaine.forEach((jour) => {
    const modalSelectOption = document.createElement("option");
    modalSelectOption.innerText = jour;
    modalSubHeaderSelect.appendChild(modalSelectOption);
  });

  modalSubHeader.appendChild(modalSubHeaderH5);
  modalSubHeader.appendChild(modalSubHeaderSelect);

  // boite modale body
  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");

  const modalListIngredients = document.createElement("ul");
  modalListIngredients.classList.add("ingredients");
  modalBody.appendChild(modalListIngredients);

  const modalIngredients = document.createElement("li");
  modalIngredients.innerHTML = `(ingredient nom) <span>(quantite)</span>`;
  modalListIngredients.appendChild(modalIngredients);

  const modalCookingStepsList = document.createElement("div");
  modalCookingStepsList.classList.add("cooking-steps");

  const modalCookingH3 = document.createElement("h3");
  modalCookingH3.innerText = "Etapes";
  modalCookingStepsList.appendChild(modalCookingH3);
  const modalCookingOl = document.createElement("ol");
  const modalCookingLi = document.createElement("li");
  modalCookingLi.innerText = "etapes X";
  modalCookingOl.appendChild(modalCookingLi);
  modalCookingStepsList.appendChild(modalCookingOl);

  // append toutes les boites dans modale box
  modalBox.appendChild(modalClose);
  modalBox.appendChild(modalHeader);
  modalBox.appendChild(modalSubHeader);
  modalBox.appendChild(modalBody);
  modalBox.appendChild(modalCookingStepsList);
  document.body.appendChild(modalBox);
  console.log(modalBox);
};

// affiche la liste des recipes favorites
const showListFav = () => {
  let listFav = {
    favorites: [],
  };

  if (favoritesRecipes) {
    favoritesRecipes.forEach((recipe) => {
      recipe.ingredients = recipe.ingredients.map((ingredient) => {
        if (ingredient.nom && ingredient.nom.includes("(")) {
          return (ingredient = ingredient.nom.split("(")[0]);
        } else if (ingredient.nom) {
          return (ingredient = ingredient.nom);
        } else {
          return ingredient;
        }
      });
      listFav.favorites.push(recipe);
    });
  }

  // console.log(listFav);

  // affichage liste
  if (listFav.favorites.length > 0) {
    listFavBox.innerHTML = "";

    listFav.favorites.forEach((recipe) => {
      const indexRecipe = listFav.favorites.indexOf(recipe);

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

      buttonFav.addEventListener("click", () => {
        favoritesRecipes.splice(indexRecipe, 1);
        showListFav();
        localStorage.setItem("favorite", JSON.stringify(favoritesRecipes));
        console.log(favoritesRecipes);
        console.log(listFav);
      });

      cardButton.appendChild(buttonFav);
      secondCard.appendChild(cardButton);

      // sous boite de chaque recette
      const card = document.createElement("div");
      card.id = "card-box";
      card.classList.add("card-box");
      card.setAttribute("value", indexRecipe);
      card.addEventListener("click", () => {
        localStorage.setItem("id-clicked-recipe", indexRecipe);
        openModal();
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
      recipe.ingredients.forEach((ingredient) => {
        const pIngredient = document.createElement("p");
        pIngredient.classList.add("tag-ingredient");
        pIngredient.textContent = ingredient;
        cardDesc.appendChild(pIngredient);
      });
      card.appendChild(cardDesc);

      // Ajoute le footer
      const cardFooter = document.createElement("div");
      cardFooter.id = "card-footer";
      cardFooter.innerHTML = `<p>${recipe.temps_preparation}</p>`;
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
createModal();
