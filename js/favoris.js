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

let recipesWeek;

if (localStorage.getItem("recipes-week") !== null) {
  recipesWeek = JSON.parse(localStorage.getItem("recipes-week"));
} else {
  recipesWeek = [];
  localStorage.setItem("recipes-week", JSON.stringify(recipesWeek));
  recipesWeek = JSON.parse(localStorage.getItem("recipes-week"));
}

// console.log(favoritesRecipes);

// VARIABLE
let recipeModal;
let listCategory = [];
allRecipe.forEach((recipe) => {
  listCategory.push(recipe.categorie);
  listCategory = Array.from(new Set(listCategory));
});

// ELEMENTS:
const listFavBox = document.getElementById("listeFav");
const selectCategorie = document.getElementById("categorie");

// compte le nombre de recettes par catégorie
const countRecipesByCategory = (categorie) => {
  if (categorie === "Liste entière") {
    return favoritesRecipes.length;
  }
  return favoritesRecipes.filter((recipe) => recipe.categorie === categorie)
    .length;
};

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

  favoritesRecipes.forEach((recette) => {
    if (favoritesRecipes.indexOf(recette) === index) {
      recipeModal = recette;

      const exists = recipesWeek.some(
        (recipe) =>
          recipe.nom === recipeModal.nom &&
          recipe.categorie === recipeModal.categorie
      );

      modalBox.innerHTML += `
        <div class="modal-header">
          <h1>${recette.nom}</h1>
          <div class="cook-time">
            <img src="../assets/img/icon-cook.png" />
            <p>Préparation: ${recette.temps_preparation}</p>
          </div>
        </div>
        <div id="modal-close" class="modal-close">
          <img id="modal-icon-close" src="../assets/img/icon-close.png" />
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
        ${
          exists
            ? `
        <div id="button-remove-footer" class="modal-footer-remove">
          <h4>Retirer des recettes de la semaine?</h4>
          <button id="remove-recipe-day" type="submit" class="button-remove">
              <img src="../assets/img/icon-remove.png" />
          </button>
        </div>`
            : `<div id="button-add-footer" class="modal-footer-add">
          <h4>Ajouter aux recettes de la semaine?</h4>
          <button id="add-recipe-day" type="submit" class="button-add">
              <img src="../assets/img/icon-add.png" />
          </button>
        </div>`
        }
        
      `;
    }
  });

  // ajouter un plat a la liste de la semaine
  const addRecipeDay = document.getElementById("add-recipe-day");
  if (addRecipeDay) {
    addRecipeDay.addEventListener("click", () => {
      recipesWeek.push(recipeModal);
      localStorage.setItem("recipes-week", JSON.stringify(recipesWeek));
      createModal(index);
    });
  }

  // retirer un plat a la liste de la semaine
  const removeRecipeDay = document.getElementById("button-remove-footer");
  if (removeRecipeDay) {
    removeRecipeDay.addEventListener("click", () => {
      const indexRecipe = recipesWeek.indexOf(recipeModal);
      recipesWeek.splice(indexRecipe, 1);
      localStorage.setItem("recipes-week", JSON.stringify(recipesWeek));
      createModal(index);
    });
  }

  // event fermeture modale
  const modalCloseIcon = document.getElementById("modal-icon-close");
  modalCloseIcon.addEventListener("click", (e) => {
    closeModal();
  });
};

// affiche la liste des recipes favorites
const showListFav = (categorie) => {
  // affichage liste
  const count = countRecipesByCategory(categorie);

  console.log();
  if (count > 0 && favoritesRecipes.length > 0) {
    listFavBox.innerHTML = "";

    favoritesRecipes.forEach((recipe) => {
      if (categorie === "Liste entière" || recipe.categorie === categorie) {
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
          selectOption();
          showListFav("Liste entière");
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
      }
    });
  } else {
    listFavBox.innerHTML = `
    <div class="empty-list">
      <h3 class="msg-info">Oops, on dirait bien que cette liste est vide</h3>
      <img src="../assets/img/GLaPatate-detourer.png"/>
    </div>
    `;
  }
};

// rempli le select d'option avec le nombre de recette par catégorie
const selectOption = () => {
  if (selectCategorie) {
    selectCategorie.innerHTML = "";
    const fullListOption = document.createElement("option");
    fullListOption.textContent = `Liste entière (${countRecipesByCategory(
      "Liste entière"
    )})`;
    fullListOption.value = "Liste entière";
    selectCategorie.appendChild(fullListOption);

    listCategory.forEach((type) => {
      let option = document.createElement("option");
      const count = countRecipesByCategory(type);
      option.innerHTML = `${type} (${count})`;
      option.value = type;
      selectCategorie.appendChild(option);
    });
  }

  selectCategorie.addEventListener("change", (e) => {
    const catSelected = e.target.value;
    showListFav(catSelected);
  });
};

selectOption();
showListFav("Liste entière");
