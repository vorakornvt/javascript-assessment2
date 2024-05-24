
// const searchBtn = document.getElementById('searchBtn');
// const searchInput = document.getElementById('searchInput');
// const searchInputTwo = document.getElementById('searchInput2');
// const cards = document.getElementById('card-present');
// const searchterm = document.getElementById('searchterm')

// let savedData = {};

// async function foodAPI(query){

// const q = query;


// const url = `https://tasty.p.rapidapi.com/recipes/list?from=5&size=10&q=${q}`;
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '058f5dc790mshc481d5c9563dfe3p1a91cbjsne3e394091825',
//             'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
//         }
//     };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.json();
//   console.log(result)
// 	localStorage.setItem('data', JSON.stringify(result));
  

//   displayInCard(result);
  
// } catch (error) {
//   console.error(error);
// }
// }




// // searchBtn.addEventListener('click', function() {
// //   const query = searchInput.value; // Get query from search input
// //   localStorage.setItem('searchfood', searchInput.value)
// //   foodAPI(query); 
// //   console.log("clicked");
  
// // });



// searchBtn.addEventListener('click', function() {
//   loaddata(); 
//   console.log("clicked");
//   displayInCard(savedData);
    
// });



// function loaddata() {
//   let data = localStorage.getItem('data');
//   savedData = JSON.parse(data);
//   console.log(savedData);
// }



// function displayInCard(savedData) {
//   searchterm.innerHTML = "<p4>search for </p4>" + "<h4><strong>" + localStorage.getItem('searchfood') + "</strong></h4>";

//   console.log(savedData.results[0]);
//   cards.innerHTML = "";

//   for (let i = 0; i < savedData.results.length; i++) {


//       // Create row element
//       var newRow = document.createElement('div');
//       newRow.className = 'row mb-3'; 

//       // Create card element
//       var newCard = document.createElement('div');
//       newCard.className = 'card col-5 '; 

//       //Create Card Nutrition
//       var NutritionCard = document.createElement('div');
//       NutritionCard.className = 'card col-5'
      
//       //Create content Nutrition
//       var canvas = document.createElement('canvas');
//       canvas.id = 'myChart'

//       NutritionCard.appendChild(canvas);


//       // Create image element
//       var newImg = document.createElement('img');
//       newImg.className = 'card-img-top';
//       newImg.id = savedData.results[i].id;
//       newImg.setAttribute('src', savedData.results[i].thumbnail_url);
//       newImg.setAttribute('alt', savedData.results[i].keywords);
//       newCard.appendChild(newImg);

//       // Create card body element
//       var cardBody = document.createElement('div');
//       cardBody.className = 'card-body';

//       // Create card title element
//       var cardName = document.createElement('h5');
//       cardName.className = 'card-title border-bottom';
//       cardName.innerHTML = savedData.results[i].name;
//       cardBody.appendChild(cardName);

//       // Create tutorial link element
//       var cardLink = document.createElement('a');
//       cardLink.className = 'btn btn-primary';
//       cardLink.innerHTML = "Tutorial";
//       cardLink.setAttribute("href", savedData.results[i].original_video_url);
//       cardBody.appendChild(cardLink);

//       newCard.appendChild(cardBody);
//       newRow.appendChild(newCard); 
//       cards.appendChild(newRow); 

//       displayNutrition(savedData);
   
//   }
// }



// function displayNutrition(){


//   for (let i = 0; i < savedData.results.length; i++) {
//   var nutrition = savedData.results[i].nutrition;

//   const ctx = document.getElementById('myChart');

//   new Chart(ctx, {
//     type: 'doughnut',
//     data: {
//       labels: ['Calories', 'Carbohydrates', 'Fat', 'Fiber', 'Protein', 'Sugar'],
//       datasets: [{
//         label: 'Nutrition',
//         data: [
//           nutrition.calories,
//           nutrition.carbohydrates,
//           nutrition.fat,
//           nutrition.fiber,
//           nutrition.protein,
//           nutrition.sugar
//         ],
//         borderWidth: 1
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });
// }
// }












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

searchBtn.addEventListener('click', function() {
    const query = searchInput.value;
    localStorage.setItem('searchfood', searchInput.value);
    foodAPI(query);
    console.log("clicked");
});

// searchBtn.addEventListener('click', function() {
//   loaddata(); 
//   console.log("clicked");
//   displayInCard(savedData);
    
// });


function loaddata() {
    let data = localStorage.getItem('data');
    savedData = JSON.parse(data);
    console.log(savedData);
}

function displayInCard(savedData) {
 
  searchterm.innerHTML = "<p4>search for </p4>" + "<h4><strong>" + localStorage.getItem('searchfood') + "</strong></h4>";

    console.log(savedData.results[0]);
    cards.innerHTML = "";

    for (let i = 0; i < savedData.results.length; i++) {
        // Create row element
        var newRow = document.createElement('div');
        newRow.className = 'row mb-3'; 

        // Create card element
        var newCard = document.createElement('div');
        newCard.className = 'card col';

        // Create card element
         var NutritionCard = document.createElement('div');
        NutritionCard.className = 'card col';
        newRow.appendChild(NutritionCard);

        // Create image element
        var newImg = document.createElement('img');
        newImg.className = 'card-img-top';
        newImg.id = savedData.results[i].id;
        newImg.setAttribute('src', savedData.results[i].thumbnail_url);
        newImg.setAttribute('alt', savedData.results[i].keywords);
        newCard.appendChild(newImg);

        // Create card body element
        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        // Create card title element
        var cardName = document.createElement('h5');
        cardName.className = 'card-title border-bottom';
        cardName.innerHTML = savedData.results[i].name;
        cardBody.appendChild(cardName);

        // Create card title element
        var cardName = document.createElement('p');
        cardName.className = 'card-title border-bottom';
        cardName.innerHTML = savedData.results[i].description;
        cardBody.appendChild(cardName);

        // Create tutorial link element
        var cardLink = document.createElement('a');
        cardLink.className = 'btn btn-primary';
        cardLink.innerHTML = "Tutorial";
        cardLink.setAttribute('href', savedData.results[i].original_video_url);
        cardBody.appendChild(cardLink);

        // Create canvas element for Chart.js
        var canvas = document.createElement('canvas');
        canvas.id = `chart${i}`;
        NutritionCard.appendChild(canvas);

        newCard.appendChild(cardBody);
        newRow.appendChild(newCard); 
        cards.appendChild(newRow); 

        // Initialize Chart.js on the new canvas
        var ctx = canvas.getContext('2d');
        var nutrition = savedData.results[i].nutrition;
        new Chart(ctx, {
            type: 'doughnut',
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






















//   const beautyUrl = savedData.results[0].beauty_url;
//   const foodName = savedData.results[0].name;
//   const description = savedData.results[0].description;
//   const link = savedData.results[0].original_video_url; 

//   const cardImg = document.getElementById('card-img-top');
//   const cardTitle = document.getElementById('card-title');
//   const cardDescription = document.getElementById('card-text');
//   const cardLink = document.getElementById('link');

//   if (beautyUrl === null || beautyUrl === "null") {
//     cardImg.src = "./img/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg";
//   } else {
//     cardImg.src = beautyUrl;
//   }


//   cardImg.alt = foodName; 
//   cardTitle.innerHTML = foodName; 
//   cardDescription.innerHTML = description;

//   if (cardLink) {
//     cardLink.setAttribute("href", link);
//   }
// }



