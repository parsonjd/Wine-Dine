
//Global Variables
let searchMeal = document.querySelector('#search-meal-ingredient');
let mealInput = document.querySelector('#meal-ingredient');
let results = document.querySelector('#results');
let empty = document.querySelector('#empty');

//Handle the form submission
searchMeal.addEventListener('submit', handleMeal);

//Grab the input and pass it to the getMeal function.  Clear old results.
function handleMeal(e) {
    e.preventDefault();
    let mealSearch = mealInput.value.trim();
    getMeal(mealSearch);
    results.innerText = '';
    empty.innerText = '';

}


//Pass user input to the Spoonacular API 
async function getMeal(mealSearch) {
    try {
        let response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${mealSearch}&number=6&offset=5&addRecipeInformation=true&addRecipeNutrition=true&apiKey=ae1f25e01c664da9a5953b00493bb0a3`);
        let data = await response.json();

        //If nothing returned from API, post this message to the page
        if (!data.results.length) {
            empty.innerText = 'There are no recipes based off your selection.  Please try again.'
            mealInput.value = '';

            //Pass API data to display the data function
        } else {
            displayMeal(data);
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

//Display API data to the page
function displayMeal(data) {
    for (let i = 0; i < data.results.length; i++) {
        //Variables to store data to be used from API
        let recipeName = data.results[i].title;
        let recipeImg = data.results[i].image;
        let calories = data.results[i].nutrition.nutrients[0].amount;
        let fat = data.results[i].nutrition.nutrients[1].amount;
        let carbs = data.results[i].nutrition.nutrients[3].amount;
        let makeTime = data.results[i].readyInMinutes;
        let recipeSite = data.results[i].sourceUrl;

        //Create HTML elements to hold API data
        let div = document.createElement('div');
        div.setAttribute('class', 'column is-one-third ');

        let cardDiv = document.createElement('div');
        cardDiv.setAttribute('class', 'card is-centered');

        let cardHeadDiv = document.createElement('div');
        cardHeadDiv.setAttribute('class', 'card-header');

        let h1 = document.createElement('h1');
        h1.setAttribute('class', 'card-header-title is-size-5 is-centered');
        h1.innerText = recipeName;

        let divImage = document.createElement('div');
        divImage.setAttribute('class', 'card-image');

        let figImg = document.createElement('figure');
        figImg.setAttribute('class', 'image is 2by1')

        let newImg = document.createElement('img');
        newImg.src = recipeImg;

        let contentDiv = document.createElement('div');

        divImage.setAttribute('class', 'card-content');

        let ul = document.createElement('ul');

        let calLI = document.createElement('li');
        calLI.innerText = `Calories: ${calories} cal`;

        let fatLI = document.createElement('li');
        fatLI.innerText = `Fat: ${fat} g`;

        let carbLI = document.createElement('li');
        carbLI.innerText = `Carbs: ${carbs} g`;

        let timeLI = document.createElement('li');
        timeLI.innerText = `Time to Make: ${makeTime} mins`;

        recipeLinkLI = document.createElement('li');
        newAnchorTag = document.createElement('a');
        newAnchorTag.href = recipeSite;
        newAnchorTag.innerText = `Recipe: ${recipeName}`;

        //Display the HTML elements to the results div
        div.append(cardDiv);
        cardDiv.append(cardHeadDiv);
        cardHeadDiv.append(h1);
        cardHeadDiv.append(divImage);
        divImage.append(figImg);
        figImg.append(newImg);
        divImage.append(contentDiv);
        contentDiv.append(ul);
        ul.append(calLI);
        ul.append(fatLI);
        ul.append(carbLI);
        ul.append(timeLI);
        ul.append(recipeLinkLI);
        recipeLinkLI.append(newAnchorTag);

        results.append(div);

        //Clear user input
        mealInput.value = '';
    }
}
