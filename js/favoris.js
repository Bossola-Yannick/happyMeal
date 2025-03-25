// LOCAL STORAGE

// let allRecipe = JSON.parse(localStorage.getItem("all-recipe"));
// console.log(allRecipe);
let favoritesRecipes;
if (localStorage.getItem("favorites")) {
  favoritesRecipes = JSON.parse(localStorage.getItem("favorite"));
} else {
  favoritesRecipes = allRecipe.slice(3, 8);
  localStorage.setItem("favorite", JSON.stringify(favoritesRecipes));
}
// let favoritesRecipes = allRecipe;
// let favoritesRecipes = [];

console.log(favoritesRecipes);

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

console.log(listFavBox);

// affiche la modale
const showModal = () => {};

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

  const openModal = () => {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("overlay").style.display = "block";
  };

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
      // buttonFav.innerHTML = "Retirer des favoris";

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
