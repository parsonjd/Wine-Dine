let searchMeal = document.querySelector('#search-meal');
let mealInput = document.querySelector('#meal-input');
let results = document.querySelector('#results');
let empty = document.querySelector('#empty');

searchMeal.addEventListener('submit', handleMeal);

function handleMeal(e) {
    e.preventDefault();
    console.log(e);
    let mealSearch = mealInput.value.trim();
    getMeal(mealSearch);

}


async function getMeal(mealSearch) {
    let response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${mealSearch}&number=5&addRecipeInformation=true&addRecipeNutrition=true&apiKey=ae1f25e01c664da9a5953b00493bb0a3`);
    let data = await response.json();
    console.log(data);

    if (!data.results.length) {
        empty.innerText = "There are no recipes based off your selection.  Please try again."
    } else {
        for (let i = 0; i < data.results.length; i++) {
            let recipeName = data.results[i].title;
            let recipeImg = data.results[i].image;
            let calories = data.results[i].nutrition.nutrients[0].amount;
            let fat = data.results[i].nutrition.nutrients[1].amount;
            let carbs = data.results[i].nutrition.nutrients[3].amount;
            let makeTime = data.results[i].readyInMinutes;
            let recipeSite = data.results[i].sourceUrl;

            let div = document.createElement('div');
            div.setAttribute('class', 'column');

            let cardDiv = document.createElement('div');
            cardDiv.setAttribute('class', 'card is-centered');

            let cardHeadDiv = document.createElement('div');
            cardHeadDiv.setAttribute('class', 'card-header');
            let h1 = document.createElement('h1');
            h1.setAttribute('class', 'card-header-title');
            h1.setAttribute('class', 'is-size-5');
            h1.setAttribute('class', 'is-centered');
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
            recipeLinkLI = document.createElement('li');
            newAnchorTag = document.createElement('a');
            newAnchorTag.href = recipeSite;
            newAnchorTag.innerText = `Recipe: ${recipeName}`;


            div.append(cardDiv);
            cardDiv.append(cardHeadDiv);
            cardHeadDiv.append(h1);
            cardHeadDiv.append(divImage);
            divImage.append(figImg);
            figImg.append(newImg);
            divImage.append(contentDiv);
            contentDiv.append(ul);
            ul.append(calLI);
            ul.append(recipeLinkLI);
            recipeLinkLI.append(newAnchorTag);

            results.append(div);
        }
    }
}
