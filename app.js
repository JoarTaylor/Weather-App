const container = document.querySelector('.container');
let searchField = document.querySelector('.search-field');
const searchButton = document.querySelector('.search-button');

//get value of search button
searchButton.addEventListener('click', getSearch);
searchField.addEventListener('keydown', (event) => {
    if(event.keyCode === 13) {
        getSearch();
    }
})

function getSearch() {
    let searchString = searchField.value;
    let citys = [];
    let newObject = {
        city: searchString
    }
    searchField.value = '';
    citys.push(newObject);
    
    //loop through citys
    for(let i=0; i<citys.length; i++){
        let url= "https://api.openweathermap.org/data/2.5/weather?q=" + citys[i].city + "&units=metric&appid=96196581009ceee5cfcf8592e7cb5eb4"
        
        //call function and use data
        getWeather(url).then((data) => { 
            const deleteCard = document.createElement('button');
            deleteCard.innerHTML = 'Close';

            const cityCard = document.createElement('div');
            cityCard.classList.add('card-styling');

            const weatherImg = document.createElement('img');
            weatherImg.src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

            const cityHeader = document.createElement('h3');
            cityHeader.innerHTML = data.name;

            const temp = document.createElement('div');
            temp.innerHTML = data.main.temp + ' °C';
            temp.classList.add('temp');

            const weatherInfo = document.createElement('div');
            weatherInfo.innerHTML = data.weather[0].description;

            container.appendChild(cityCard);
            cityCard.appendChild(deleteCard);
            cityCard.appendChild(cityHeader);
            cityCard.appendChild(temp);
            cityCard.appendChild(weatherImg);
            cityCard.appendChild(weatherInfo);
            
            
            deleteCard.addEventListener('click', () => {
                cityCard.classList.add('hide');
            })
        });
    }
}

//fetch weather function
async function getWeather(url) {
    let response = await fetch(url);
    if(response.ok) {
        let data = await response.json();
        return data;
        
    } else {
        console.log("HTTP-Error: " + response.status);
    }
    
}

