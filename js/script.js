let allRecipe;
let starter = [];
let dish = [];
let dessert = [];
// JSON: récupération des données
const getJson = async () => {
  try {
    const reponse = await fetch("./data/data.json");
    const infos = await reponse.json();
    return infos.recettes;
  } catch (error) {
    console.error("Erreur de chargement: ", error);
  }
};
getJson();

// JSON: récupération de toutes les recettes et mise en localStorage
if (!localStorage.getItem("all-recipe")) {
  getJson().then((infos) => {
    allRecipe = infos;
    localStorage.setItem("all-recipe", JSON.stringify(allRecipe));
    // console.log(allRecipe);
  });
} else {
  allRecipe = JSON.parse(localStorage.getItem("all-recipe"));
  //   console.log(allRecipe);
}

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
