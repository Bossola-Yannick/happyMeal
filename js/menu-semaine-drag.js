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
const infoMsg = document.getElementById("infoMsg");

// bouton bas de page pour scroll to top
const noFitAll = window.matchMedia("(max-width: 1340px)");
const buttonBottom = document.getElementById("bottom-button");

console.log(noFitAll.matches);

if (noFitAll.matches) {
  buttonBottom.style.display = "flex";
  buttonBottom.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
} else {
  buttonBottom.style.display = "none";
}

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

    //couleur bg cards selon categorie
    if (recipe.categorie === "Entrée") {
      recipeTag.classList.add("starter");
    } else if (recipe.categorie === "Plat principal") {
      recipeTag.classList.add("dish");
    } else if (recipe.categorie === "Dessert") {
      recipeTag.classList.add("dessert");
    }

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

  if (JSON.parse(localStorage.getItem("shopping-list")).length > 0) {
    infoMsg.classList.add("blueMsg");
    infoMsg.innerHTML = "Liste de course généré !";
    setTimeout(() => {
      infoMsg.innerHTML = "";
      infoMsg.classList.remove("blueMsg");
    }, 700);
  }
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
        window.scrollTo(0, 0);
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

  const savedPlanning = JSON.parse(localStorage.getItem("saved-planning"));
  const recipeIn = savedPlanning.some((recipe) => recipe !== null);

  if (recipeIn) {
    infoMsg.classList.add("greenMsg");
    infoMsg.innerHTML = "Planning sauvegardé !";
    setTimeout(() => {
      infoMsg.innerHTML = "";
      infoMsg.classList.remove("greenMsg");
    }, 700);
  }
});

// rempli planning si sauvegarde
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

// evenement scroll
const scrollEvent = () => {
  const favList = document.getElementById("container-fav-list");
  const planning = document.getElementById("week-day-container");
  const tags = document.getElementsByClassName("tag-recipe");

  const positionList = favList.getBoundingClientRect();

  const containerHeight = favList.offsetHeight;

  document.addEventListener("scroll", (e) => {
    const scrolledValue = window.scrollY;

    // console.log(containerHeight);
    // console.log(scrolledValue);

    if (scrolledValue > positionList.y) {
      // container liste
      favList.style.backgroundColor = "#F5F1F1d2";
      favList.style.position = "fixed";
      favList.style.top = "0";
      favList.style.zIndex = "15";

      // planning decallage
      planning.style.transition = "none";
      planning.style.marginTop = `${containerHeight + 16}px`;
    } else {
      favList.style.backgroundColor = "transparent";
      favList.style.position = "static";
      favList.style.zIndex = "0";
      favList.style.transition = "position 0.6ms ease-in-out";

      planning.style.marginTop = "0";
    }
  });
};

scrollEvent();
