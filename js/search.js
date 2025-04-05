allRecipe = JSON.parse(localStorage.getItem("all-recipe"));

const normalize = (search) => {
  return search
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

const search = (searchRecipe) => {
  const searchNormalize = normalize(searchRecipe);
  let result = allRecipe.filter((u) =>
    normalize(u.nom).includes(searchNormalize)
  );
  let resultIngredients = allRecipe.filter((recipe) =>
    recipe.ingredients.some((ingredient) =>
      normalize(ingredient.nom).includes(searchNormalize)
    )
  );
  result = result.concat(resultIngredients);
  result = [...new Set(result)];
  console.log(result);
  console.log(resultIngredients);
  for (const element of result) {
    let item = $("<p></p>").text(element.nom).attr({ class: "searchResult" });
    $("#resultSearch").append(item);
  }
  if ($("#search").val() === "") {
    $("#resultSearch").empty();
    randomRecipe();
    return;
  }
};
