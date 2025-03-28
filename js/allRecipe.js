allRecipe = JSON.parse(localStorage.getItem("all-recipe"));
// initialisation des variables de categorie
let starter = [];
let dish = [];
let dessert = [];
// mise en place des recettes par catégorie
for (recipe of allRecipe) {
  if (recipe.categorie === "Entrée") {
    starter.push(recipe);
  } else if (recipe.categorie === "Plat principal") {
    dish.push(recipe);
  } else if (recipe.categorie === "Dessert") {
    dessert.push(recipe);
  }
}
for (const starterRecipe of starter) {
  getRecipe(starterRecipe);
}
for (const dishRecipe of dish) {
  getRecipe(dishRecipe);
}
for (const dessertRecipe of dessert) {
  getRecipe(dessertRecipe);
}
