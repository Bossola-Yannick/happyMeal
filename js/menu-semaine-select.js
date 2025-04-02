allRecipe = JSON.parse(localStorage.getItem("all-recipe"));

let recipesWeek;

if (localStorage.getItem("recipes-week") !== null) {
  recipesWeek = JSON.parse(localStorage.getItem("recipes-week"));
} else {
  recipesWeek = [];
  localStorage.setItem("recipes-week", JSON.stringify(recipesWeek));
  recipesWeek = JSON.parse(localStorage.getItem("recipes-week"));
}

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
                    <div class="button-select">
                        <label for="category">Entrée</label>
                        <select name="category" class="category-starter">
                            <option>--Choix--</option>
                        </select>
                    </div>
                  </div>
                  <div class="meal-box">
                    <div class="button-select">
                        <label for="category">Plat</label>
                        <select name="category" class="category-dish">
                            <option>--Choix--</option>
                        </select>
                    </div>
                  </div>
                  <div class="meal-box">
                    <div class="button-select">
                        <label for="category">Dessert</label>
                        <select name="category" class="category-dessert">
                            <option>--Choix--</option>
                        </select>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="separator">
              <!-- soir -->
              <div id="time-day" class="time-day">
                <h4 class="title-meal">Soir</h4>
                <div class="meal-box">
                    <div class="button-select">
                        <label for="category">Entrée</label>
                        <select name="category" class="category-starter">
                            <option>--Choix--</option>
                        </select>
                    </div>
                </div>
                <div class="meal-box">
                    <div class="button-select">
                        <label for="category">Plat</label>
                        <select name="category" class="category-dish">
                            <option>--Choix--</option>
                        </select>
                    </div>
                </div>
                <div class="meal-box">
                    <div class="button-select">
                        <label for="category">Dessert</label>
                        <select name="category" class="category-dessert">
                            <option>--Choix--</option>
                        </select>
                    </div>
                </div>
              </div>
            </div>
          </div>
      `;
  });
};
showPlanning();

const selectButton = () => {
  const selectStarter = document.getElementsByClassName("category-starter");
  const selectDish = document.getElementsByClassName("category-dish");
  const selectDessert = document.getElementsByClassName("category-dessert");

  recipesWeek.forEach((recipe) => {
    const index = recipesWeek.indexOf(recipe);
    if (recipe.categorie === "Entrée") {
      for (let select of selectStarter) {
        const option = document.createElement("option");
        option.innerHTML = `${recipe.nom}`;
        option.classList.add("option-select");
        option.setAttribute("value", index);
        select.appendChild(option);
      }
    } else if (recipe.categorie === "Plat principal") {
      for (let select of selectDish) {
        const option = document.createElement("option");
        option.innerHTML = `${recipe.nom}`;
        option.classList.add("option-select");
        option.setAttribute("value", index);
        select.appendChild(option);
      }
    } else {
      for (let select of selectDessert) {
        const option = document.createElement("option");
        option.innerHTML = `${recipe.nom}`;
        option.classList.add("option-select");
        option.setAttribute("value", index);
        select.appendChild(option);
      }
    }
  });
};

selectButton();
