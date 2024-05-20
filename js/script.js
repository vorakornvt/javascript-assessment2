
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const searchInputTwo = document.getElementById('searchInput2');


let savedData = {}

const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=1&tags=under_30_minutes&q=beef';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '058f5dc790mshc481d5c9563dfe3p1a91cbjsne3e394091825',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	}
};

async function foodAPI(){

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
	localStorage.setItem('data', JSON.stringify(result))
	} catch (error) {
	console.error(error);
	}
}

//save data in browers
window.addEventListener('load', loaddata)

function loaddata (){
	let data = localStorage.getItem('data')
	savedData = JSON.parse(data)
	console.log(savedData);
}
//save data


function displayInCard(savedData) {
	
	const beautyUrl = savedData.results[0].beauty_url;

	
	const cardImg = document.getElementById('card-img-top');
	cardImg.src = beautyUrl;
	cardImg.alt = 'Beauty Image'; 
}


displayInCard(savedData);

console.log(cardImg.src)






// searchButton.addEventListener('click', function(){
  
// 	loaddata (); //use foodAPI instead if you ready to test 
// 	displayData();

// })













// foodAPI();

