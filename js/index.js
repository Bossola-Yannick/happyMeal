// récupération de TOUTES les recettes
allRecipe = JSON.parse(localStorage.getItem("all-recipe"));
// récupération des recettes "entrée"
starter = JSON.parse(localStorage.getItem("starter"));
// récupération des recettes "plat_principal"
dish = JSON.parse(localStorage.getItem("dish"));
// récupération des recettes "dessert"
dessert = JSON.parse(localStorage.getItem("dessert"));

// fonction de récupération d'une recette aléatoire par categorie
const getNumRandom = (arrayRecipe) => {
  let numMax = arrayRecipe.length - 1;
  let numRandom = Math.floor(Math.random() * (numMax - 1) + 1);
  return arrayRecipe[numRandom];
};

// recette aléatoire par categorie récupéré
let randomStarter = getNumRandom(starter);
let randomDish = getNumRandom(dish);
let randomDessert = getNumRandom(dessert);

// fonction création de carte recette, Une par catégorie
const getRecipe = (recipe) => {
  let card = $("<article></article>").attr({ class: "card" });
  // ajout de condition pour la catégorie
  if (recipe.categorie === "Entrée") {
    card.attr({ class: "card starter" });
  } else if (recipe.categorie === "Plat principal") {
    card.attr({ class: "card dish" });
  } else if (recipe.categorie === "Dessert") {
    card.attr({ class: "card dessert" });
  }
  let cardFaceFront = $("<div></div>").attr({
    class: "card-face card-front",
  });
  let cardContainerImg = $("<div></div>").attr({
    class: "card-container-img",
  });
  let cardImg = $("<img/>").attr({
    src: `./assets/img/${recipe.image}`,
    alt: `${recipe.nom}`,
    class: "card-image",
  });
  let cardCategorie = $("<p></p>")
    .text(recipe.categorie)
    .attr({ class: "card-categorie" });
  let cardTitleFront = $("<h3></h3>")
    .text(recipe.nom)
    .attr({ class: "card-title" });
  let cardTitleBack = $("<h3></h3>")
    .text(recipe.nom)
    .attr({ class: "card-title" });
  let cardTime = $("<p></p>")
    .text(recipe.temps_preparation)
    .attr({ class: "card-time" });
  let cardFaceBack = $("<div></div>").attr({ class: "card-face card-back" });
  // gérer le tableau des ingrédient
  let ingredientList = [];
  for (const ingredient of recipe.ingredients) {
    ingredientList.push(ingredient.nom);
  }
  let cardIngredient = $("<p></p>")
    .text(`ingredient : ${ingredientList}`)
    .attr({});
  // gestion des étapes de préparation
  //
  let cardPreparing = $("<div></div>").text("Préparation :").attr({});
  let numStage = 1;
  for (const etape of recipe.etapes) {
    let preparing = $("<p></p>").text(`${numStage} : ${etape}`);
    cardPreparing.append(preparing);
    numStage += 1;
  }
  // insersion des élément entre eux
  card.append(cardFaceFront);
  cardFaceFront.append(cardContainerImg);
  cardContainerImg.append(cardImg);
  cardFaceFront.append(cardCategorie);
  cardFaceFront.append(cardTitleFront);
  cardFaceFront.append(cardTime);
  card.append(cardFaceBack);
  cardFaceBack.append(cardTitleBack);
  cardFaceBack.append(cardIngredient);
  cardFaceBack.append(cardPreparing);

  // insertion dans le DOM
  $("#container-card").append(card);
};

getRecipe(randomStarter);
getRecipe(randomDish);
getRecipe(randomDessert);

$("#search").on("keyup", function () {
  $("#resultSearch").empty();
  let searchRecipe = $(this).val();
  searchRecipe = searchRecipe.toLowerCase();
  search(searchRecipe);
});

// gestion des résultat de la recherche

$("body").on("click", ".searchResult", function (e) {
  let mySearch = e.target.innerHTML.trim().toLowerCase();
  let myResult = allRecipe.filter((u) =>
    u.nom.toLowerCase().trim().includes(mySearch.trim())
  );
  $("#container-card").empty();
  getRecipe(myResult[0]);
  $("#search").text("");
  $("#resultSearch").empty();
  console.log(mySearch);
  console.log(myResult);
});
