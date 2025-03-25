// LOCAL STORAGE

// let allRecipe = JSON.parse(localStorage.getItem("all-recipe"));
// console.log(allRecipe);
// let recettesFavorites = allRecipe.slice(3, 8);
let recettesFavorites = [];
console.log(recettesFavorites);

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
const cardBox = document.getElementById("listeFav");

console.log(cardBox);

const afficheListeFav = () => {
  let listeFav = {
    favorites: [],
  };

  if (recettesFavorites) {
    recettesFavorites.forEach((recette) => {
      recette.ingredients = recette.ingredients.map((ingredient) => {
        if (ingredient.nom.includes("(")) {
          return (ingredient = ingredient.nom.split("(")[0]);
        } else {
          return (ingredient = ingredient.nom);
        }
      });
      listeFav.favorites.push(recette);
    });
  }

  // affichage liste
  if (listeFav.favorites.length > 0) {
    cardBox.innerHTML = "";

    listeFav.favorites.forEach((recette) => {
      const indexRecette = listeFav.favorites.indexOf(recette);

      // boite de chaque recette
      const card = document.createElement("div");
      card.classList.add("card-box");

      // ajoute le titre et la catégorie
      const cardTitle = document.createElement("div");
      cardTitle.id = "card-title";
      cardTitle.innerHTML = `
          <h3>${recette.nom}</h3>
          <p>${recette.categorie}</p>
        `;
      card.appendChild(cardTitle);

      // boite pour les ingrédients
      const cardDesc = document.createElement("div");
      cardDesc.id = "card-desc";
      recette.ingredients.forEach((ingredient) => {
        const pIngredient = document.createElement("p");
        pIngredient.classList.add("tag-ingredient");
        pIngredient.textContent = ingredient;
        cardDesc.appendChild(pIngredient);
      });
      card.appendChild(cardDesc);

      // Ajoute le footer
      const cardFooter = document.createElement("div");
      cardFooter.id = "card-footer";
      cardFooter.innerHTML = `<p>${recette.temps_preparation}</p>`;
      card.appendChild(cardFooter);
      // ajoute le bouton retirer favoris
      const cardButton = document.createElement("div");
      cardButton.id = "card-button";
      const buttonFav = document.createElement("button");
      buttonFav.id = "remove";
      buttonFav.setAttribute("value", indexRecette);
      buttonFav.textContent = "Retirer des favoris";
      cardButton.appendChild(buttonFav);
      cardFooter.appendChild(cardButton);

      // Ajoute la carte au conteneur principal
      cardBox.appendChild(card);
    });
  } else {
    cardBox.innerHTML = `
    <p class="msg-info">Liste vide</p>
    `;
  }
};

afficheListeFav();
