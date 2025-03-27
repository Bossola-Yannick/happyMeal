getJson().then(() => {
  // récupération de TOUTES les recettes
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
  localStorage.setItem("starter", JSON.stringify(starter));
  localStorage.setItem("dish", JSON.stringify(dish));
  localStorage.setItem("dessert", JSON.stringify(dessert));
  // fonction de génération d'un nombre pour récupération d'une recette aléatoire par categorie
  const getNumRandom = (arrayRecipe) => {
    let numMax = arrayRecipe.length - 1;
    let numRandom = Math.floor(Math.random() * (numMax - 1) + 1);
    return arrayRecipe[numRandom];
  };
  // récupération des recettes "entrée"
  starter = JSON.parse(localStorage.getItem("starter"));
  // récupération des recettes "plat_principal"
  dish = JSON.parse(localStorage.getItem("dish"));
  // récupération des recettes "dessert"
  dessert = JSON.parse(localStorage.getItem("dessert"));
  // recette aléatoire par categorie récupéré
  let randomStarter = getNumRandom(starter);
  let randomDish = getNumRandom(dish);
  let randomDessert = getNumRandom(dessert);
  getRecipe(randomStarter);
  getRecipe(randomDish);
  getRecipe(randomDessert);
});

$("#search").on("keyup", function () {
  $("#resultSearch").empty();
  let searchRecipe = $(this).val();
  searchRecipe = searchRecipe.toLowerCase();
  search(searchRecipe);
  searchInIngredient(searchRecipe);
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
  // $("#resultSearch").empty();
});
