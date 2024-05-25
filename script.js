
    // 2 document for variable
    // 2 document for function


// @type {object}
// @type {number}
// @type {string}
// @type {boolean}

// quote = store a reference to ...



//local storage 
// 

//new twchnologies
//chart.js
//bootrap icon


const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const cards = document.getElementById('card-present');
const searchterm = document.getElementById('searchterm');
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

// searchBtn.addEventListener('click', function() {
//     const query = searchInput.value;
//     if (query === '') {
//         validation.innerHTML = "<p4>Please fill the Ingredient</p4>" 
//         validation.className ="alert alert-warning"
//         searchInput.className = "border border-warning form-control text-center"
//     } else {
//         localStorage.setItem('searchfood', query);
//         foodAPI(query);
//         validation.innerHTML = '';
//         validation.className = '';
//         searchInput.className = 'form-control text-center';
//     }
// });


searchBtn.addEventListener('click', function() {
    const query = searchInput.value;
    if (query === '') {
        validation.innerHTML = "<p4>Please fill the Ingredient</p4>" 
        validation.className ="alert alert-warning"
        searchInput.className = "border border-warning form-control text-center"
    } else {
        loaddata(); 
        displayInCard(savedData);
        validation.innerHTML = '';
        validation.className = '';
        searchInput.className = 'form-control text-center';
    }
});


function loaddata() {
    let data = localStorage.getItem('data');
    savedData = JSON.parse(data);
    console.log(savedData);
}


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
        cardLink.setAttribute('href', savedData.results[i].original_video_url);
        cardBody.appendChild(cardLink);

        // Create button container for heart icon
        var heartBox  = document.createElement('button');
        heartBox.className = "btn btn-secondary";
        heartBox.style.width = "60px";
        heartBox.id = `heartbox${i}`
        cardBody.appendChild(heartBox);

        // Create heart icon
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