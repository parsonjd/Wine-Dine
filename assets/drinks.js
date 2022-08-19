let drinkIconEl = $(".drink-icon");
let cocktailInputEl = $("#search-cocktail-input");
let ingredientInputEl = $("#search-ingredient-input");
let searchCocktailBtn = $("#search-cocktail-button");
let searchIngBtn = $("#search-ingredient-button");

//dynamic elements boxes
let resultsBox = $("<div>");
let resultsCard = $("<div>");
let drinkImgBox = $("<div>");
let cardContent = $("<div>");
let recipeBox = $("<div>");
let ingredientsBox = $("<div>");

//dynamic element content
let drinkImgFigure = $("<figure>");
let drinkImage = $("<img>");
let recipeTitle = $("<p>");
let recipeLink = $("<a>");
let ingredientUl = $("<ul>");
let fiveDynCards = [];
let searchCocktailTitleButton = $("#cardTitleButton");

let drinks = {
  fetchCocktail(recipe) {
    let recipeURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${recipe}`;

    fetch(recipeURL)
      //fetch url to GET recipe data and parse to json
      .then((res) => res.json())
      // send that data to the display
      .then((data) => {
        drinks.displayCocktail(data);
        console.log(data);
      });
  },

  displayCocktail(data) {
    //display the name, picture, ingredients
    let drinks = data.drinks;
    let name;
    let img;

    console.log("data", data.drinks);

    // looping and pulling relevant data to function variables
    for (let i = 0; i < drinks.length; i++) {
      let ingredient = [];
      name = drinks[i].strDrink;
      img = drinks[i].strDrinkThumb + "/preview";
      if (drinks[i].strIngredient1)
        ingredient.push(drinks[i].strMeasure1 + " " + drinks[i].strIngredient1);
      if (drinks[i].strIngredient2)
        ingredient.push(drinks[i].strMeasure2 + " " + drinks[i].strIngredient2);
      if (drinks[i].strIngredient3)
        ingredient.push(drinks[i].strMeasure3 + " " + drinks[i].strIngredient3);
      if (drinks[i].strIngredient4)
        ingredient.push(drinks[i].strMeasure4 + " " + drinks[i].strIngredient4);
      if (drinks[i].strIngredient5)
        ingredient.push(drinks[i].strMeasure5 + " " + drinks[i].strIngredient5);

      //render the card setup

      resultsCard = $("<div>");
      resultsCard.addClass("card");
      resultsCard.addClass("column");
      resultsCard.addClass("is-one-fifth");
      resultsCard.addClass("is-flex");
      resultsCard.addClass("is-flex-wrap-wrap");
      resultsCard.addClass("mx-3");

      drinkImgBox = $("<div>");
      drinkImgBox.addClass("card-image");
      drinkImgBox.addClass("image");
      drinkImgBox.addClass("is-128x128");
      drinkImgBox.addClass("container");
      cardContent = $("<div>");
      cardContent.addClass("card-content");
      recipeBox = $("<div>");
      recipeBox.addClass("media-content");
      ingredientsBox = $("<div>");
      ingredientsBox.addClass("content");
      //dynamic element content
      drinkImgFigure = $("<figure>");
      drinkImgFigure.addClass("image");
      drinkImgFigure.addClass("is-4by3");
      drinkImgFigure.addClass("is-128x128");

      drinkImage = $("<img>");
      recipeTitle = $("<p>");
      recipeTitle.addClass("title");
      recipeTitle.addClass("is-4");
      recipeTitle.addClass("has-text-centered");
      recipeLink = $("<a>");
      recipeLink.addClass("subtitle");
      recipeLink.addClass("is-6");
      ingredientUl = $("<ul>");
      //populate data
      recipeTitle.text(name);
      drinkImage.attr("src", img);
      for (let j = 0; j < ingredient.length; j++) {
        let listEL = $("<li>");
        listEL.text(ingredient[j]);
        ingredientUl.append(listEL);
      }

      //render to screen
      drinkImgFigure.append(drinkImage);
      drinkImgBox.append(drinkImgFigure);
      recipeBox.append(recipeTitle);
      recipeBox.append(recipeLink);
      ingredientsBox.append(ingredientUl);
      cardContent.append(recipeBox);
      cardContent.append(ingredientsBox);
      resultsCard.append(drinkImgBox);
      resultsCard.append(cardContent);
      //assign id tag to each for later calling from fiveDynCards array
      fiveDynCards.push(resultsCard);
      resultsBox.append(resultsCard);
    }
    resultsBox.addClass("columns");
    resultsBox.appendTo("body");
  },

  fetchIngredient(ingredient) {
    let ingredientURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    fetch(ingredientURL)
      //fetch url to GET ingredients data and parse to json
      .then((res) => res.json())
      // send that data to the display
      .then((data) => {
        this.displayIngredient(data);
      });
  },

  displayIngredient(data) {
    //display the name, picture, ingredients
    //console.log("data", data);

    let drinks = data.drinks;
    let name;
    let img;

    //looping though the data
    for (let i = 0; i < 6; i++) {
      name = drinks[i].strDrink;
      img = drinks[i].strDrinkThumb + "/preview";

      //render the card setup

      resultsCard = $("<div>");
      resultsCard.addClass("card");
      resultsCard.addClass("column");
      resultsCard.addClass("is-one-fifth");
      resultsCard.addClass("is-flex");
      resultsCard.addClass("is-flex-wrap-wrap");
      resultsCard.addClass("mx-3");
      resultsCard.attr("id", "result-box-button" + i);
      resultsCard.attr("data-type", name);
      resultsCard.on("click", this.searchCocktailFromIngredient);

      drinkImgBox = $("<div>");
      drinkImgBox.addClass("card-image");
      drinkImgBox.addClass("image");

      drinkImgBox.addClass("container");
      cardContent = $("<div>");
      cardContent.addClass("card-content");
      cardContent.attr("id", "cardTitleButton");
      recipeBox = $("<div>");
      recipeBox.addClass("media-content");
      ingredientsBox = $("<div>");
      ingredientsBox.addClass("content");
      //dynamic element content
      drinkImgFigure = $("<figure>");
      drinkImgFigure.addClass("image");
      drinkImgFigure.addClass("is-4by3");
      drinkImgFigure.addClass("container");
      drinkImgFigure.addClass("is-128x128");
      drinkImgFigure.attr("data-type", name);

      drinkImage = $("<img>");
      drinkImage.attr("data-type", name);
      recipeTitle = $("<p>");
      recipeTitle.addClass("title");
      recipeTitle.addClass("is-4");
      recipeTitle.addClass("has-text-centered");
      recipeTitle.attr("data-type", name);
      recipeLink = $("<a>");
      recipeLink.addClass("subtitle");
      recipeLink.addClass("is-6");

      //populate data
      recipeTitle.text(name);
      drinkImage.attr("src", img);

      //render to screen
      recipeBox.append(recipeTitle);
      drinkImgFigure.append(drinkImage);
      drinkImgBox.append(drinkImgFigure);
      recipeBox.append(recipeLink);
      cardContent.append(recipeBox);
      cardContent.append(ingredientsBox);
      resultsCard.append(drinkImgBox);
      resultsCard.append(cardContent);
      //assign id tag to each for later calling from fiveDynCards array

      fiveDynCards.push(resultsCard);
      resultsBox.append(resultsCard);
    }
    resultsBox.addClass("columns");
    resultsBox.addClass("is-flex-wrap-wrap");
    resultsBox.addClass("box");
    resultsBox.appendTo("body");
    resultsBox.attr("id", "results_box");
    //resultsBox.attr("data-type", name);
  },

  searchCocktail(e) {
    resultsBox.empty();
    e.preventDefault();
    let name = cocktailInputEl.val();
    console.log("name", name);
    drinks.fetchCocktail(name);
    cocktailInputEl.val("");
  },
  searchIngredients(e) {
    resultsBox.empty();
    e.preventDefault();
    let name = ingredientInputEl.val();
    drinks.fetchIngredient(name);
    ingredientInputEl.val("");
  },

  searchCocktailFromIngredient(e) {
    console.log(e);
    console.log("clicked");
    e.preventDefault();
    let nameOftheDrink = e.target.getAttributeNode("data-type").value;
    console.log(nameOftheDrink);
    resultsBox.empty();
    drinks.fetchCocktail(nameOftheDrink);
  },
};

searchCocktailBtn.on("click", drinks.searchCocktail); //recipe onClcik
searchIngBtn.on("click", drinks.searchIngredients); //ingredients onClick
