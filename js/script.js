let allRecipe;

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

getJson();
