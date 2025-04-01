allRecipe = JSON.parse(localStorage.getItem("all-recipe"));

// affiche la modale
const openModal = () => {
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("modal");

  overlay.style.display = "block";
  modal.style.display = "flex";
};

// ferme la modale
const closeModal = () => {
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("modal");

  overlay.style.display = "none";
  modal.style.display = "none";
};

// creer la modale avec les infos de la recette selectionnée
const createModal = (index) => {
  const modalBox = document.getElementById("modal");
  modalBox.innerHTML = "";

  allRecipe.forEach((recipe) => {
    if (allRecipe.indexOf(recipe) === index) {
      recipeModal = recipe;

      modalBox.innerHTML += `
          <img src="../assets/img/${recipe.image}" class="img-modal"/>
          <div class="modal-header">
            <h1>${recipe.nom}</h1>
            <div class="cook-time">
              <img src="../assets/img/icon-cook.png" />
              <p>Préparation: ${recipe.temps_preparation}</p>
            </div>
          </div>
          <div id="modal-close" class="modal-close">
            <img id="modal-icon-close" src="../assets/img/icon-close.png" />
          </div>
          <div class="modal-body">
            <ul class="ingredients">
              ${recipe.ingredients
                .map(
                  (ingredient) =>
                    `<li>${ingredient.nom}: <span>${ingredient.quantite}${ingredient.unite}</span> </li>`
                )
                .join("")}
            </ul>
            <div class="cooking-steps">
              <h3>Etapes de préparations</h3>
              <ol>
              ${recipe.etapes.map((etape) => `<li>${etape}</li>`).join("")}
              </ol>
            </div>
          </div>        
        `;
    }
  });

  // event fermeture modale
  const modalClose = document.getElementById("modal-close");
  modalClose.addEventListener("click", (e) => {
    closeModal();
  });
};
