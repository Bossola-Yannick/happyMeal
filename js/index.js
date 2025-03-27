// fonction de génération d'un nombre pour récupération d'une recette aléatoire par categorie
const getNumRandom = (arrayRecipe) => {
  let numMax = arrayRecipe.length - 1;
  let numRandom = Math.floor(Math.random() * (numMax - 1) + 1);
  return arrayRecipe[numRandom];
};

// récupération de TOUTES les recettes
allRecipe = JSON.parse(localStorage.getItem("all-recipe"));
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

$("#search").on("keyup", function () {
  $("#resultSearch").empty();
  let searchRecipe = $(this).val();
  searchRecipe = searchRecipe.toLowerCase();
  search(searchRecipe);
  console.log(e.target.value);
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
  $("#resultSearch").empty();
  console.log(mySearch);
  console.log(myResult);
});
