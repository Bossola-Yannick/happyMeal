allRecipe = JSON.parse(localStorage.getItem("all-recipe"));

const search = (searchRecipe) => {
  let resultName = allRecipe.filter((u) =>
    u.nom.toLowerCase().includes(searchRecipe)
  );
  console.log(resultName);
  for (const element of resultName) {
    let item = $("<p></p>").text(element.nom).attr({ class: "searchResult" });
    $("#resultSearch").append(item);
  }
  if (allRecipe.length == resultName.length) {
    $("#resultSearch").empty();
    return;
  }
};
