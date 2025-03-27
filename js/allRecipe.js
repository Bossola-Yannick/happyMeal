allRecipe = JSON.parse(localStorage.getItem("all-recipe"));
for (const recipe of allRecipe) {
  getRecipe(recipe);
}
