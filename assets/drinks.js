//Global Variables
let searchDrinkIng = document.querySelector("#search-ingredient");
let drinkIng = document.querySelector("#drink-ingredient");
let searchCocktail = document.querySelector("#search-cocktail");
let cocktail = document.querySelector("#cocktail");
let results = document.querySelector("#results");

//Handle the form submission for ingredient
searchDrinkIng.addEventListener("submit", handleDrinkIng);

//Grab the user input and pass it to the GetDrinkbyIng function
function handleDrinkIng(e) {
  e.preventDefault();
  let drinkIngSearch = drinkIng.value.trim();
  results.innerText = "";
  empty.innerText = "";
  drinkIng.value = "";

  if (drinkIngSearch) {
    getDrinkByIng(drinkIngSearch);
  }
}

//Handle form submission for cocktail
searchCocktail.addEventListener("submit", handleCocktail);

//Grab user input and pass to getDrinkByCoc function
function handleCocktail(e) {
  e.preventDefault();
  let cocktailSearch = cocktail.value.trim();
  results.innerText = "";
  empty.innerText = "";

  if (cocktailSearch) {
    getDrinkByCoc(cocktailSearch);
  }
}

//Pass user input into Coctaildb API, get the response and dynamically display the HTML
async function getDrinkByIng(ingredient) {
  try {
    let response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    let data = await response.json();

    let counter = 0;
    for (let i = 0; i < data.drinks.length; i++) {
      //Only display the first six drinks
      if (counter < 6) {
        //Build the bulma HTML and load it with API data
        let div = document.createElement("div");
        div.setAttribute("class", "column is-one-third ");

        let cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "card is-centered");

        let cardHeadDiv = document.createElement("div");
        cardHeadDiv.setAttribute(
          "class",
          "card-header is-flex-direction-column is-align-content-center"
        );
        let h1 = document.createElement("h1");
        h1.setAttribute(
          "class",
          "card-header-title is-size-4 is-justify-content-center"
        );
        h1.innerText = data.drinks[i].strDrink;
        h1.setAttribute("data-type", data.drinks[i].strDrink);
        let divImage = document.createElement("div");
        divImage.setAttribute("class", "card-image p-3");
        let figImg = document.createElement("figure");
        figImg.setAttribute(
          "class",
          "image is 2by1 is-centered results-card-image"
        );
        let newImg = document.createElement("img");
        newImg.src = data.drinks[i].strDrinkThumb;
        newImg.setAttribute("data-type", data.drinks[i].strDrink);

        //Display to the results div
        div.append(cardDiv);
        cardDiv.append(cardHeadDiv);
        cardHeadDiv.append(h1);
        cardHeadDiv.append(divImage);
        divImage.append(figImg);
        figImg.append(newImg);
        results.append(div);
        counter += 1;
      } else {
        return;
      }
    }
  } catch (e) {
    //The API returns an error if there is not a response instead of null so use the catch to display to user to select something else.
    empty.innerText = "Sorry, no results.  Please select another ingredient!";
    drinkIng.value = "";
  }
}
//Listen for a click on any of the six cards displayed from getDrinkByIng Function and pass to drinkToRecipe
results.addEventListener("click", drinkToRecipe);

//Grab the card the user clicked on and pass it to getDrinkbyCoc so we can display the recipe
function drinkToRecipe(e) {
  let target = e.target;
  let drink = target.getAttributeNode("data-type").value;
  results.innerText = "";
  getDrinkByCoc(drink);
}

//Pass user input to Coctaildb API and display the recipe card
async function getDrinkByCoc(drink) {
  try {
    let response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`
    );
    let data = await response.json();
    console.log(data);

    //This API returns null when there is no response so use if statement to display to the user to try again
    if (data.drinks === null) {
      empty.innerText = "Sorry, no results.  Please select another ingredient!";
      cocktail.value = "";
      return;
    }

    //Build the bulma HTML and load it with API data
    let div = document.createElement("div");
    div.setAttribute("class", "column is-one-third");
    let cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card p-3");
    cardDiv.setAttribute("id", "recipe");
    let cardHeadDiv = document.createElement("div");
    cardHeadDiv.setAttribute(
      "class",
      "card-header is-flex-direction-column is-align-content-center"
    );
    let h1 = document.createElement("h1");
    h1.setAttribute(
      "class",
      "card-header-title is-size-4 is-justify-content-center"
    );
    h1.innerHTML = data.drinks[0].strDrink;
    let divImage = document.createElement("div");
    divImage.setAttribute("class", "card-image card-content");
    let figImg = document.createElement("figure");
    figImg.setAttribute("class", "image is 2by1 results-card-image");
    let newImg = document.createElement("img");
    let link = data.drinks[0].strDrinkThumb;
    newImg.src = link;
    let ingredientList = document.createElement("div");
    ingredientList.classList.add("results-card-ingredients");

    //Display to the results div
    div.append(cardDiv);
    cardDiv.append(cardHeadDiv);
    cardHeadDiv.append(h1);
    cardHeadDiv.append(divImage);
    divImage.append(figImg);
    figImg.append(newImg);

    divImage.append(ingredientList);

    //There are 16 ingredient and measure properties but only a handful are used.  Run if statements to only display ingredient or measure if value is not null
    for (i = 1; i < 16; i++) {
      if (data.drinks[0][`strIngredient${i}`] == null) {
        break;
      } else {
        let ingredient = document.createElement("h2");
        ingredient.setAttribute("class", "is-size-6");
        ingredient.setAttribute("id", "ingredient");
        if (data.drinks[0][`strMeasure${i}`] !== null) {
          ingredient.innerText =
            data.drinks[0][`strMeasure${i}`] +
            ": " +
            data.drinks[0][`strIngredient${i}`];
          ingredientList.append(ingredient);
        } else {
          ingredient.innerText = data.drinks[0][`strIngredient${i}`];
          ingredientList.append(ingredient);
        }
      }
    }

    let instructions = document.createElement("div");
    instructions.setAttribute("id", "instructions");
    instructions.innerText = data.drinks[0].strInstructions;

    ingredientList.append(instructions);
    results.append(div);
    cocktail.value = "";
  } catch (e) {
    console.log(Error, e);
  }
}
