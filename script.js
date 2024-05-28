
/** 
 *searchBtn stores a reference to the HTML element with the ID 'searchBtn'.
 *@type{object}
 */
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const cards = document.getElementById('card-present');
const searchterm = document.getElementById('searchterm');
/** 
*chartType  stores a reference to the HTML element with the ID 'chartType'.
*@type{object}
 */


const chartType = document.getElementById('chartType');

let savedData = {};

async function foodAPI(query) {
    const url = `https://tasty.p.rapidapi.com/recipes/list?from=5&size=10&q=${query}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '058f5dc790mshc481d5c9563dfe3p1a91cbjsne3e394091825',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        localStorage.setItem('data', JSON.stringify(result));
        displayInCard(result);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Adds a click event listener to the `searchBtn` element. When the button is clicked,
 * the function retrieves the value from the `searchInput` element and checks if it is empty.
 * If the input is empty, it displays a warning message. If the input is not empty,
 * it stores the query in local storage, calls the `foodAPI` function with the query,
 * and resets any validation messages and styles.
 */
searchBtn.addEventListener('click', function() {
    const query = searchInput.value;
    if (query === '') {
        validation.innerHTML = "<p4>Please fill the Ingredient</p4>" 
        validation.className ="alert alert-warning"
        searchInput.className = "border border-warning form-control text-center"
    } else {
        localStorage.setItem('searchfood', query);
        foodAPI(query);
        validation.innerHTML = '';
        validation.className = '';
        searchInput.className = 'form-control text-center';
    }
});


// searchBtn.addEventListener('click', function() {
//     const query = searchInput.value;
//     if (query === '') {
//         validation.innerHTML = "<p4>Please fill the Ingredient</p4>" 
//         validation.className ="alert alert-warning"
//         searchInput.className = "border border-warning form-control text-center"
//     } else {
//         loaddata(); 
//         displayInCard(savedData);
//         validation.innerHTML = '';
//         validation.className = '';
//         searchInput.className = 'form-control text-center';
//     }
// });


function loaddata() {
    let data = localStorage.getItem('data');
    savedData = JSON.parse(data);
    console.log(savedData);
}


/**
 * The `displayInCard` function displays search results in card on the webpage.
 * It updates the searchterm element to show the current search term and creates a set of cards
 * to display each result for 10 cards. Each card includes an image, name, description, tutorial link, a heart icon
 * button, and a nutrition chart.
 *
 * @param {Object} savedData - The data object containing search results.
 * @param {Array} savedData.results - An array of result objects.
 * @param {string} savedData.results[].id - id for each menu.
 * @param {string} savedData.results[].thumbnail_url - The URL of the thumbnail image.
 * @param {string} savedData.results[].keywords - The keywords associated with the result.
 * @param {string} savedData.results[].name - The name of the result.
 * @param {string} savedData.results[].description - The description of the result.
 * @param {string} savedData.results[].original_video_url - The URL of the tutorial video.
 * @param {Object} savedData.results[].nutrition - The nutrition information object.
 * @param {number} savedData.results[].nutrition.calories - The number of calories.
 * @param {number} savedData.results[].nutrition.carbohydrates - The amount of carbohydrates.
 * @param {number} savedData.results[].nutrition.fat - The amount of fat.
 * @param {number} savedData.results[].nutrition.fiber - The amount of fiber.
 * @param {number} savedData.results[].nutrition.protein - The amount of protein.
 * @param {number} savedData.results[].nutrition.sugar - The amount of sugar.
 */

function displayInCard(savedData) {
    searchterm.innerHTML = "<p4>results for </p4>" + "<h4><strong>" + localStorage.getItem('searchfood') + "</strong></h4>";
    searchterm.className = "alert alert-success";

    console.log(savedData.results[0]);
    cards.innerHTML = "";

    for (let i = 0; i < savedData.results.length; i++) {
        var newRow = document.createElement('div');
        newRow.className = 'row mb-3'; 

        var newCard = document.createElement('div');
        newCard.className = 'card col-5';

        var NutritionCard = document.createElement('div');
        NutritionCard.className = 'card col';
        newRow.appendChild(NutritionCard);

        var newImg = document.createElement('img');
        newImg.className = 'card-img-top';
        newImg.id = savedData.results[i].id;
        newImg.setAttribute('src', savedData.results[i].thumbnail_url);
        newImg.setAttribute('alt', savedData.results[i].keywords);
        newCard.appendChild(newImg);

        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        var cardName = document.createElement('h5');
        cardName.className = 'card-title border-bottom';
        cardName.innerHTML = savedData.results[i].name;
        cardBody.appendChild(cardName);

        var cardDescription = document.createElement('p');
        cardDescription.className = 'card-title border-bottom';
        cardDescription.innerHTML = savedData.results[i].description;
        cardBody.appendChild(cardDescription);


        var cardLink = document.createElement('a');
        cardLink.className = 'btn btn-primary';
        cardLink.innerHTML = "Tutorial";
        cardLink.setAttribute('href', `tutorial.html?id=${savedData.results[i].id}`);
        cardBody.appendChild(cardLink);

    
        var heartBox  = document.createElement('button');
        heartBox.className = "btn btn-secondary";
        heartBox.style.width = "60px";
        heartBox.id = `heartbox${i}`
        cardBody.appendChild(heartBox);

      
        var heartIcon = document.createElement('i');
        heartIcon.className = 'bi bi-heart-fill mx-auto';
        heartIcon.style.cursor = 'pointer';
        heartBox.appendChild(heartIcon);


     heartBox.addEventListener('click', function(event) {
        event.target.className = "btn btn-success";
        console.log("clicked");

    });

        var canvas = document.createElement('canvas');
        canvas.id = `chart${i}`;
        NutritionCard.appendChild(canvas);

        newCard.appendChild(cardBody);
        newRow.appendChild(newCard); 
        cards.appendChild(newRow); 

        var ctx = canvas.getContext('2d');
        var nutrition = savedData.results[i].nutrition;
        new Chart(ctx, {
            type: chartType.value || 'pie',
            data: {
                labels: ['Calories', 'Carbohydrates', 'Fat', 'Fiber', 'Protein', 'Sugar'],
                datasets: [{
                    label: 'Nutrition',
                    data: [
                        nutrition.calories,
                        nutrition.carbohydrates,
                        nutrition.fat,
                        nutrition.fiber,
                        nutrition.protein,
                        nutrition.sugar
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}