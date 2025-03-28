allRecipe = JSON.parse(localStorage.getItem("all-recipe"));
let starter = JSON.parse(localStorage.getItem("starter"));
let dish = JSON.parse(localStorage.getItem("dish"));
let dessert = JSON.parse(localStorage.getItem("dessert"));

let recipeLoad = allRecipe;
for (const starterRecipe of starter) {
  getRecipe(starterRecipe);
}
for (const dishRecipe of dish) {
  getRecipe(dishRecipe);
}
for (const dessertRecipe of dessert) {
  getRecipe(dessertRecipe);
}

// Gestion des favoris
let favoritesRecipes = [];
$("body").on("click", ".favorite-icon", function (e) {
  e.stopPropagation();
  let attribute = $(this).attr("src");
  let recipeName = $(this).attr("value").trim().toLowerCase();
  let recipeFav = recipeLoad.find((u) => u.nom.toLowerCase() === recipeName);
  console.log(recipeFav);

  const favorite = "../assets/img/icon-fav.png";
  const noFavorite = "../assets/img/icon-pasFavoris.png";
  let favRecipes = [];

  if (attribute === noFavorite) {
    if (!localStorage.getItem("favorite")) {
      favRecipes.push(recipeFav);
      localStorage.setItem("favorite", JSON.stringify(favRecipes));
    } else {
      // mise en localStorage des favoris
      favRecipes = JSON.parse(localStorage.getItem("favorite")) || [];
      favRecipes.push(recipeFav);
      localStorage.setItem("favorite", JSON.stringify(favRecipes));
    }
    // mise en favori de la recette dans allRecipe apres récupération de l'index de celle-ci
    let index = allRecipe.findIndex((u) => u.nom.toLowerCase() === recipeName);
    allRecipe[index].favorite = "favorite";
    localStorage.setItem("all-recipe", JSON.stringify(allRecipe));
    $(this).attr({ src: favorite });
    document.location.href = "./allRecipe.html";
  } else {
    // Supprimer du localStorage des favoris
    let favRecipes = JSON.parse(localStorage.getItem("favorite")) || [];
    favRecipes = favRecipes.filter((u) => u.nom.toLowerCase() !== recipeName);
    localStorage.setItem("favorite", JSON.stringify(favRecipes));
    // suppresion des favoris de la recette dans allRecipe apres récupération de l'index de celle-ci
    let index = allRecipe.findIndex((u) => u.nom.toLowerCase() === recipeName);
    delete allRecipe[index].favorite;
    localStorage.setItem("all-recipe", JSON.stringify(allRecipe));
    $(this).attr({ src: noFavorite });
    document.location.href = "./allRecipe.html";
  }
});
