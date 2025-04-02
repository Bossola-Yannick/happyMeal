// LOCAL STORAGE

allRecipe = JSON.parse(localStorage.getItem("all-recipe"));
// // console.log(allRecipe);
// let favoritesRecipes = JSON.parse(localStorage.getItem("favorite"));
if (localStorage.getItem("favorite") !== null) {
  favoritesRecipes = JSON.parse(localStorage.getItem("favorite"));
} else {
  favoritesRecipes = [];
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
  document.body.classList.add("no-scroll");
};

// ferme la modale
const closeModal = () => {
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("modal");

  overlay.style.display = "none";
  modal.style.display = "none";
  document.body.classList.remove("no-scroll");
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
        <img src="../assets/img/${recette.image}" class="img-modal"/>
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
                  `<li>${ingredient.nom}: <span>${ingredient.quantite}${ingredient.unite}</span> </li>`
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
  const modalClose = document.getElementById("modal-close");
  modalClose.addEventListener("click", () => {
    closeModal();
  });
};

// affiche la liste des recipes favorites
const showListFav = (categorie) => {
  const titlePage = document.getElementById("title-favorite");
  // affichage liste
  const count = countRecipesByCategory(categorie);

  if (count > 0 && favoritesRecipes.length > 0) {
    titlePage.style.display = "flex";
    listFavBox.innerHTML = "";

    favoritesRecipes.forEach((recipe) => {
      const exists = recipesWeek.some(
        (recipWeek) =>
          recipWeek.nom === recipe.nom &&
          recipWeek.categorie === recipe.categorie
      );

      if (categorie === "Liste entière" || recipe.categorie === categorie) {
        const indexRecipe = favoritesRecipes.indexOf(recipe);

        // boite recette
        const card = document.createElement("div");
        card.id = "card-box";
        card.classList.add("card-box");
        card.setAttribute("value", indexRecipe);

        //couleur bg cards selon categorie
        if (recipe.categorie === "Entrée") {
          card.classList.add("starter");
        } else if (recipe.categorie === "Plat principal") {
          card.classList.add("dish");
        } else if (recipe.categorie === "Dessert") {
          card.classList.add("dessert");
        }

        // sous boite
        const subCard = document.createElement("div");
        subCard.classList.add("sub-card");

        // ajoute le bouton retirer favoris
        const cardButton = document.createElement("div");
        cardButton.id = "card-button";
        const buttonFav = document.createElement("button");
        buttonFav.id = "remove";
        buttonFav.classList.add("button-fav-remove");
        buttonFav.setAttribute("value", indexRecipe);

        // event pour supprimer des favoris
        buttonFav.addEventListener("click", (e) => {
          e.stopPropagation();
          // CODE YANNICK
          // suppresion des favoris de la recette dans allRecipe apres récupération de l'index de celle-ci
          let allRecipe = JSON.parse(localStorage.getItem("all-recipe"));

          let index = allRecipe.findIndex(
            (u) => u.nom.toLowerCase() === recipe.nom.toLowerCase()
          );
          console.log(index);

          delete allRecipe[index].favorite;
          // Fin code YANNICK
          localStorage.setItem("all-recipe", JSON.stringify(allRecipe));
          favoritesRecipes.splice(indexRecipe, 1);
          selectOption();
          showListFav("Liste entière");
          localStorage.setItem("favorite", JSON.stringify(favoritesRecipes));
        });

        cardButton.appendChild(buttonFav);
        // card.appendChild(cardButton);

        // event pour afficher la modale de la recette
        subCard.addEventListener("click", () => {
          openModal();
          createModal(indexRecipe);
        });

        // ajoute l'image
        const imgCard = document.createElement("img");
        imgCard.setAttribute("src", `../assets/img/${recipe.image}`);
        imgCard.classList.add("image-recipe");
        // card.appendChild(imgCard);

        // ajoute le titre et la catégorie
        const cardTitle = document.createElement("div");
        cardTitle.id = "card-title";
        cardTitle.innerHTML = `

          <h3>${recipe.nom}</h3>
          <p>${recipe.categorie}</p>
        `;
        // card.appendChild(cardTitle);

        // boite pour les ingrédients
        const cardDesc = document.createElement("div");
        cardDesc.id = "card-desc";
        recipe.ingredients.map((ingredient) => {
          const pIngredient = document.createElement("p");
          pIngredient.classList.add("tag-ingredient");
          pIngredient.textContent = ingredient.nom;
          cardDesc.appendChild(pIngredient);
        });

        const cardDescTwo = document.createElement("div");
        cardDescTwo.classList.add("card-desc-two");
        cardDescTwo.innerHTML = `
        <img src="../assets/img/icon-cook.png" />
        <p>Préparation: ${recipe.temps_preparation}</p>`;

        // card.appendChild(cardDesc);

        // ajoute les elements img / titre / desc a la sub card
        subCard.appendChild(cardButton);
        subCard.appendChild(imgCard);
        subCard.appendChild(cardTitle);
        subCard.appendChild(cardDescTwo);
        subCard.appendChild(cardDesc);

        card.appendChild(subCard);

        // Ajoute le footer
        const cardFooter = document.createElement("div");
        cardFooter.id = "card-footer";
        cardFooter.innerHTML = ` 
        ${
          exists
            ? `
          <h4>Retirer des recettes de la semaine?</h4>
          <button id="remove-recipe-day" type="submit" class="button-action" action="remove" value="${indexRecipe}">
              <img src="../assets/img/icon-remove.png" />
          </button>`
            : `
          <h4>Ajouter aux recettes de la semaine?</h4>
          <button id="add-recipe-day" type="submit" class="button-action" action="add" value="${indexRecipe}">
              <img src="../assets/img/icon-add.png" />
          </button>`
        }
        `;

        card.appendChild(cardFooter);

        cardFooter.addEventListener("click", (e) => {
          e.stopPropagation();
        });

        // évènement boutons
        const buttonAction = cardFooter.querySelector(".button-action");
        buttonAction.addEventListener("click", (e) => {
          // e.stopPropagation();
          const button = e.currentTarget;
          const action = button.getAttribute("action");
          const recipeIndex = button.getAttribute("value");
          const titleButton = cardFooter.querySelector("h4");
          console.log(titleButton);

          if (action === "add") {
            // ajoute la recette aux recettes de la semaine
            recipesWeek.push(favoritesRecipes[recipeIndex]);
            localStorage.setItem("recipes-week", JSON.stringify(recipesWeek));

            // change le bouton en bouton supprimer
            button.setAttribute("action", "remove");
            button.innerHTML = `<img src="../assets/img/icon-remove.png" />`;
            titleButton.textContent = "Retirer des recettes de la semaine?";
          } else if (action === "remove") {
            // supprime la recette aux recettes de la semaine
            recipesWeek.splice(recipeIndex, 1);
            localStorage.setItem("recipes-week", JSON.stringify(recipesWeek));

            // change le bouton en bouton ajouter
            button.setAttribute("action", "add");
            button.innerHTML = `<img src="../assets/img/icon-add.png" />`;
            titleButton.textContent = "Ajouter aux recettes de la semaine?";
          }
        });

        // Ajoute la carte au conteneur principal
        // card.appendChild(card);
        listFavBox.appendChild(card);
      }
    });
  } else {
    titlePage.style.display = "none";
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
