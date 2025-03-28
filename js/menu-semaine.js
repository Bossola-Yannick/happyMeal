let recipesWeek;

if (localStorage.getItem("recipes-week") !== null) {
  recipesWeek = JSON.parse(localStorage.getItem("recipes-week"));
} else {
  recipesWeek = [];
  localStorage.setItem("recipes-week", JSON.stringify(recipesWeek));
  recipesWeek = JSON.parse(localStorage.getItem("recipes-week"));
}

const recipeTag = () => {
  const recipeBox = document.getElementById("recipe-box");

  recipesWeek.forEach((recipe) => {
    const recipeTag = document.createElement("li");
    recipeTag.classList.add("draggable", "tag-recipe");
    recipeTag.innerText = recipe.nom;
    recipeBox.appendChild(recipeTag);
  });
};

recipeTag();

$(function () {
  $(".sortable").sortable({
    stop: function (event, ui) {
      ui.item.removeAttr("style");
    },
  });

  $(".draggable").draggable({
    helper: "clone",
    revert: "invalid",
  });

  $(".drop-recipe").droppable({
    accept: ".draggable",
    drop: function (e, ui) {
      //   console.log(ui.draggable);
      const recipeName = ui.draggable.text();
      $(this).append($("<li>").text(recipeName).addClass("tag-recipe"));
    },
  });

  //   $(".choose-recipe")
});
