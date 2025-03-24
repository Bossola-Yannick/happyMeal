console.log(allRecipe);
let insertCard = document.getElementById("container-card");
for (recipe of allRecipe) {
  let card = document.createElement(`<article class="card dish">
    <div class="card-container-img">
      <img
        src="./assets/img/${recipe.image}.jpg"
        alt=""
        class="card-image"
      />
    </div>
    <p class="categorie">${recipe.categorie}</p>
    <h3 class="card-title">${recipe.nom}</h3>
    <p class="card-time">temps de prépa : ${recipe.temps_preparation}</p>
    </article>
   `);
  card.appendChild(insertCard);
}
