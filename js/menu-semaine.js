allRecipe = JSON.parse(localStorage.getItem("all-recipe"));

let recipesWeek;

if (localStorage.getItem("recipes-week") !== null) {
  recipesWeek = JSON.parse(localStorage.getItem("recipes-week"));
} else {
  recipesWeek = [];
  localStorage.setItem("recipes-week", JSON.stringify(recipesWeek));
  recipesWeek = JSON.parse(localStorage.getItem("recipes-week"));
}

// elements DOM
const dataBoxes = document.getElementsByClassName("drop-recipe");

// affiche planning
const showPlanning = () => {
  const weekDay = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  const weekDayContainer = document.getElementById("week-day-container");

  weekDay.forEach((day) => {
    weekDayContainer.innerHTML += `
    <div class="day">
          <h2>${day}</h2>
          <div class="box-planning">
            <!-- midi -->
            <div id="time-day" class="time-day">
              <h4 class="title-meal">Midi</h4>
              <div class="meal-time-box">
                <div class="meal-box">
                  <h3>Entrée</h3>
                  <div class="drop-recipe"></div>
                </div>
                <div class="meal-box">
                  <h3>Plat</h3>
                  <div class="drop-recipe"></div>
                </div>
                <div class="meal-box">
                  <h3>Dessert</h3>
                  <div class="drop-recipe"></div>
                </div>
              </div>
            </div>
            <hr class="separator">
            <!-- soir -->
            <div id="time-day" class="time-day">
              <h4 class="title-meal">Soir</h4>
              <div class="meal-box">
                <h3>Entrée</h3>
                <div class="drop-recipe"></div>
              </div>
              <div class="meal-box">
                <h3>Plat</h3>
                <div class="drop-recipe"></div>
              </div>
              <div class="meal-box">
                <h3>Dessert</h3>
                <div class="drop-recipe"></div>
              </div>
            </div>
          </div>
        </div>
    `;
  });
};
showPlanning();

// gestion de la liste des recettes
let selectRecipe;
const recipeTag = () => {
  const recipeBox = document.getElementById("list-recipe-box");

  // création des étiquettes des recettes disponible
  recipesWeek.forEach((recipe) => {
    const recipeTag = document.createElement("li");
    recipeTag.classList.add("tag-recipe", "recipe");
    recipeTag.setAttribute("draggable", "true");
    recipeTag.innerText = recipe.nom;
    recipeBox.appendChild(recipeTag);
  });

  // clone l'element d'origine sur le planning, change son affichage et ajoute un evenement drag + remove
  let listRecipe = document.getElementsByClassName("tag-recipe");
  for (let recipe of listRecipe) {
    recipe.addEventListener("dragstart", (e) => {
      let recipeTag = e.target.innerText;
      let newElementTag = document.createElement("div");
      newElementTag.classList.add("tag-recipe", "recipe");
      newElementTag.setAttribute("draggable", "true");

      const newElementP = document.createElement("p");
      newElementP.innerText = recipeTag;
      newElementTag.appendChild(newElementP);

      const newElementImg = document.createElement("img");
      newElementImg.setAttribute("src", "../assets/img/icon-remove.png");
      newElementImg.classList.add("remove-tag");
      newElementTag.appendChild(newElementImg);
      newElementImg.addEventListener("dragstart", (e) => {
        e.preventDefault();
      });
      newElementImg.addEventListener("click", () => {
        newElementTag.remove();
      });

      selectRecipe = newElementTag;
    });
  }
};
recipeTag();

// drag et drop
const dropBox = () => {
  let dropBox = document.getElementsByClassName("drop-recipe");

  for (let box of dropBox) {
    box.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    box.addEventListener("drop", (e) => {
      if (selectRecipe) {
        box.innerHTML = "";
        box.appendChild(selectRecipe);
        selectRecipe.style.backgroundColor = "#beca0f75";
        selectRecipe.addEventListener("dragstart", (e) => {
          selectRecipe = e.target;
        });
        selectRecipe = null;
      }
    });
  }
};
dropBox();

// recup data du planning pour local storage shopping liste
const generateShoppingList = () => {
  const shoppingList = [];

  for (let box of dataBoxes) {
    const recipeName = box.querySelector("p")?.innerText || null;
    if (recipeName) {
      recipesWeek.forEach((recipe) => {
        if (recipeName === recipe.nom) {
          shoppingList.push(recipe.ingredients);
        }
      });
    }
  }
  localStorage.setItem("shopping-list", JSON.stringify(shoppingList));
  return shoppingList;
};

// generation shopping liste evenement
const getShoppingList = document.getElementById("get-shopping-list");
getShoppingList.addEventListener("click", () => {
  generateShoppingList();
});

// sauvegarder menu semaine
const savePlanningWeek = () => {
  let savePlanning = [];
  for (let box of dataBoxes) {
    if (box.children.length === 0) {
      savePlanning.push(null);
    } else {
      const recipeName = box.querySelector("p")?.innerHTML || null;
      savePlanning.push(recipeName);
    }
  }
  localStorage.setItem("saved-planning", JSON.stringify(savePlanning));
};

// remplir planning
const fillPlanning = () => {
  const planningSaved = JSON.parse(localStorage.getItem("saved-planning"));
  const boxRecipe = document.getElementsByClassName("drop-recipe");
  planningSaved.forEach((element, index) => {
    const box = boxRecipe[index];
    box.innerHTML = "";

    if (element) {
      // recréer l'etiquette de la recette
      const newElementTag = document.createElement("div");
      newElementTag.classList.add("saved-recipe", "recipe");

      const newElementP = document.createElement("p");
      newElementP.innerText = element;
      newElementTag.appendChild(newElementP);

      // div icon
      const boxIcons = document.createElement("div");
      boxIcons.classList.add("box-icons");

      // icon info recette
      const newElementInfo = document.createElement("img");
      newElementInfo.setAttribute("src", "../assets/img/icon-info.png");
      newElementInfo.classList.add("info-tag");
      boxIcons.appendChild(newElementInfo);

      newElementInfo.addEventListener("click", () => {
        let index;
        allRecipe.forEach((recipe) => {
          if (element === recipe.nom) {
            index = allRecipe.indexOf(recipe);
          }
        });
        openModal();
        createModal(index);
      });

      // icon remove image
      const newElementImg = document.createElement("img");
      newElementImg.setAttribute("src", "../assets/img/icon-remove.png");
      newElementImg.classList.add("remove-tag");
      boxIcons.appendChild(newElementImg);

      newElementImg.addEventListener("click", () => {
        newElementTag.remove();
      });

      newElementTag.appendChild(boxIcons);

      box.appendChild(newElementTag);
    }
  });
};

// événement sauvegarder planning
const buttonSave = document.getElementById("save-planning");
buttonSave.addEventListener("click", (e) => {
  savePlanningWeek();
  fillPlanning();
});

if (localStorage.getItem("saved-planning") !== null) {
  fillPlanning();
}

// bouton reset
const buttonReset = document.getElementById("reset-planning");
buttonReset.addEventListener("click", () => {
  localStorage.removeItem("saved-planning");
  localStorage.removeItem("shopping-list");
  for (let box of dataBoxes) {
    box.innerHTML = "";
  }
});
