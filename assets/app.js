// let searchDrinkIng = document.querySelector('#search-drink-ingredient');
// let drinkIng = document.querySelector('#drink-ingredient');
// let results = document.querySelector('#results');

// searchDrinkIng.addEventListener('submit', handleDrinkIng);

// function handleDrinkIng(e) {
//     e.preventDefault();
//     let drinkIngSearch = drinkIng.value.trim();

//     if (drinkIngSearch) {
//         getDrink(drinkIngSearch);
//     }

// }

// async function getDrink(ingredient) {
//     let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
//     let data = await response.json();

//     let counter = 0;
//     for (let i = 0; i < data.drinks.length; i++) {
//         console.log(counter);

//         if (counter < 5) {
//             let newDiv = document.createElement('div');
//             newDiv.setAttribute('class', 'column is-one-fifth')

//             let newFig = document.createElement('figure');
//             newFig.setAttribute('class', 'is-2by1');
//             let newImg = document.createElement('img');
//             newImg.src = data.drinks[i].strDrinkThumb;
//             newDiv.appendChild(newFig);
//             newFig.appendChild(newImg);
//             results.append(newDiv);
//             counter += 1;
//         } else {
//             return;
//         }


//     }

// }