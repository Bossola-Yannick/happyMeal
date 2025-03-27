$("body").on("click", ".card", function (e) {
  $(this).toggleClass("flip");
});

// fonction création de carte recette, Une par catégorie
const getRecipe = (recipe) => {
  let card = $("<article></article>").attr({ class: "card" });
  let favorisContainer = $("<div></div>").attr({ class: "container-favorite" });
  let iconFavorie = $("<img/>").attr({
    src: `../assets/img/icon-pasFavoris.png`,
    class: "favorite-icon",
    value: recipe.nom,
  });
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
  if (document.location.href != "http://127.0.0.1:5500/index.html") {
    cardImg.attr({ src: `../assets/img/${recipe.image}` });
  }
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
  cardFaceFront.append(favorisContainer);
  favorisContainer.append(iconFavorie);
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
