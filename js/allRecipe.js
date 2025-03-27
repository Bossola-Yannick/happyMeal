allRecipe = JSON.parse(localStorage.getItem("all-recipe"));
let recipeLoad = allRecipe;
for (const recipe of recipeLoad) {
  getRecipe(recipe);
}

// Gestion des favoris
let favoritesRecipes = [];
$("body").on("click", ".favorite-icon", function (e) {
  e.stopPropagation();
  let attribute = $(this).attr("src");
  let recipeName = $(this).attr("value").trim().toLowerCase();
  let recipeFav = recipeLoad.find((u) => u.nom.toLowerCase() === recipeName);
  const favorite = "../assets/img/icon-fav.png";
  const noFavorite = "../assets/img/icon-pasFavoris.png";

  if (attribute === noFavorite) {
    // mise en localStorage des favoris
    let favRecipes = JSON.parse(localStorage.getItem("favorite")) || [];
    favRecipes.push(recipeFav);
    localStorage.setItem("favorite", JSON.stringify(favRecipes));
    $(this).attr({ src: favorite });
  } else {
    // Supprimer du localStorage des favoris
    let favRecipes = JSON.parse(localStorage.getItem("favorite")) || [];
    favRecipes = favRecipes.filter((u) => u.nom.toLowerCase() !== recipeName);
    localStorage.setItem("favorite", JSON.stringify(favRecipes));
    $(this).attr({ src: noFavorite });
  }
});
