// génération données fictive
recipes = JSON.parse(localStorage.getItem("favorite"));
let shoppingList = [];
let listOfIngredients = new Object();
for (recipe of recipes) {
  shoppingList.push(recipe.ingredients);
}
console.log(shoppingList);

// mise en tableau des ingrédients
const listIngredients = () => {
  for (const recipe of shoppingList) {
    for (const ingredient of recipe) {
      // ajout de la quantité si l'ingrédient est déjà dans le tableau
      if (listOfIngredients[ingredient.nom]) {
        listOfIngredients[ingredient.nom][0] += parseInt(ingredient.quantite);
      } else {
        listOfIngredients[ingredient.nom] = [
          parseInt(ingredient.quantite),
          ingredient.unite,
        ];
      }
    }
  }
  return listOfIngredients;
};
const myShoppingList = listIngredients();

// génération de la liste
for (const item in myShoppingList) {
  let itemList = $("<li></li>").attr({ class: "list-item" });
  let ingredient = $("<p></p>")
    .text(item)
    .attr({ class: "item-name", value: item });
  let quantity = $("<span></span>")
    .text(`${myShoppingList[item][0]} ${myShoppingList[item][1]}`)
    .attr({ id: "quantity" });
  let deleteItemDiv = $("<span></span>").attr({ class: "delete" });
  let deleteIcon = $("<img/>").attr({
    src: "../assets/img/icon-close.png",
    alt: "supprimer ingrédient de la liste",
    class: "delete-item",
    value: item,
  });
  deleteItemDiv.append(deleteIcon);
  itemList.append(ingredient);
  itemList.append(quantity);
  itemList.append(deleteItemDiv);
  $("#my-shopping-list").append(itemList);
}

// suppression d'un élément de la liste
$("body").on("click", ".delete-item", function () {
  let itemValue = $(this).attr("value");
  $(".list-item").remove(`:contains(${itemValue})`);
});
// impression de la liste
$("body").on("click", ".buttonPrint", function () {
  print();
});
// suppression de la liste
$("body").on("click", ".buttonDeletePrint", function () {
  $(".list-item").remove();
});
