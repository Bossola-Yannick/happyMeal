allRecipe = JSON.parse(localStorage.getItem("all-recipe"));

const search = (searchRecipe) => {
  let resultName = allRecipe.filter((u) =>
    u.nom.toLowerCase().includes(searchRecipe)
  );
  let resultIngredients = allRecipe.filter((recipe) =>
    recipe.ingredients.some((ingredient) =>
      ingredient.nom.toLowerCase().includes(searchRecipe)
    )
  );
  console.log(resultName);
  console.log(resultIngredients);
  for (const element of resultName) {
    let item = $("<p></p>").text(element.nom).attr({ class: "searchResult" });
    $("#resultSearch").append(item);
  }
  for (const element of resultIngredients) {
    let itemIngredient = $("<p></p>")
      .text(element.nom)
      .attr({ class: "searchResult" });
    $("#resultSearch").append(itemIngredient);
  }
  if (allRecipe.length == resultName.length) {
    $("#resultSearch").empty();
    return;
  }
};
