allRecipe = JSON.parse(localStorage.getItem("all-recipe"));
for (const recipe of allRecipe) {
  let card = $("<article></article>").attr({ class: "card" });
  // ajout de condition pour la catégorie
  if (recipe.categorie === "Entrée") {
    card.attr({ class: "card starter" });
  } else if (recipe.categorie === "Plat principal") {
    card.attr({ class: "card dish" });
  } else if (recipe.categorie === "Dessert") {
    card.attr({ class: "card dessert" });
  }
  let cardFaceFront = $("<div></div>").attr({ class: "card-face card-front" });
  let cardContainerImg = $("<div></div>").attr({
    class: "card-container-img",
  });
  let cardImg = $("<img/>").attr({
    src: `../assets/img/${recipe.image}`,
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
  let cardIngredient = $("<p></p>").text(`ingredient : `).attr({});
  for (const ingredient of recipe.ingredients) {
    let oneIngredient = $("<span></span>").text(` ${ingredient.nom}, `);
    cardIngredient.append(oneIngredient);
  }
  // gestion des étapes de préparation
  //
  let cardPreparing = $("<div></div>").text("Préparation :").attr({});
  let numStage = 0;
  for (const etape of recipe.etapes) {
    let preparing = $("<p></p>").text(`${numStage + 1} : ${etape}`);
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
}
