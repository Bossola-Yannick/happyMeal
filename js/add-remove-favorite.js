allRecipe = JSON.parse(localStorage.getItem("all-recipe"));
let recipeLoad = allRecipe;
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
    if (document.location.href != "http://127.0.0.1:5500/index.html") {
      document.location.href = "./allRecipe.html";
    } else document.location.href = "../index.html";
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
    if (document.location.href != "http://127.0.0.1:5500/index.html") {
      document.location.href = "./allRecipe.html";
    } else document.location.href = "../index.html";
  }
});
