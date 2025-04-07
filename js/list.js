// récupération de la liste de course
let shoppingList = JSON.parse(localStorage.getItem("shopping-list"));
let listOfIngredients = new Object();
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
  shoppingList = JSON.parse(localStorage.getItem("shopping-list"));
  shoppingList = [];
  localStorage.setItem("shopping-list", JSON.stringify(shoppingList));
});
