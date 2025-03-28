let recipesWeek;

if (localStorage.getItem("recipes-week") !== null) {
  recipesWeek = JSON.parse(localStorage.getItem("recipes-week"));
} else {
  recipesWeek = [];
  localStorage.setItem("recipes-week", JSON.stringify(recipesWeek));
  recipesWeek = JSON.parse(localStorage.getItem("recipes-week"));
}

$(function () {
  $(".sortable").sortable({
    stop: function (event, ui) {
      ui.item.removeAttr("style"); // Supprime l'attribut style de l'élément trié
    },
  });

  $(".draggable").draggable({
    helper: "clone",
    revert: "invalid",
  });

  $(".drop-recipe").droppable({
    accept: ".draggable",
    drop: function (e, ui) {
      console.log(e.target.textContent);
      $(this).append(
        $("<li>").text(ui.draggable.text()).addClass("tag-recipe")
      );
    },
  });

  //   $(".choose-recipe")
});
