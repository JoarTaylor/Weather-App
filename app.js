const container = document.querySelector('.container');
let searchField = document.querySelector('.search-field');
const searchButton = document.querySelector('.search-button');
const searchContainer = document.querySelector('.search-container');

let deletedCitys = [];

const recoverCitys = document.createElement('button');
recoverCitys.innerHTML = "Recover Deleted Citys";
recoverCitys.classList.add('hide');
searchContainer.appendChild(recoverCitys);


//get value of search button
searchButton.addEventListener('click', getSearch);
searchField.addEventListener('keydown', (event) => {
    if(event.key === "Enter") {
        getSearch();
    }
})

function getSearch() {
    let searchString = searchField.value;
    searchField.value = '';

    let url= "https://api.openweathermap.org/data/2.5/weather?q=" + searchString + "&units=metric&appid=96196581009ceee5cfcf8592e7cb5eb4"
        
    //call function and use data
    getWeather(url).then((data) => { 
        const cityCard = document.createElement('div');
        cityCard.className = "city-card";
        cityCard.classList.add('card-styling');

        const deleteCard = document.createElement('button');
        deleteCard.innerHTML = 'Close';

        imgSrc = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

        cityCard.innerHTML = `<h3>${data.name}</3> <h4>${data.main.temp} °C</h4><p>${data.weather[0].description}</p> <img src=${imgSrc}></img>
        `
        cityCard.appendChild(deleteCard);
        container.appendChild(cityCard);

        deleteCard.addEventListener('click', () => {
            container.removeChild(cityCard);

            deletedCitys.push(cityCard);
            recoverCitys.classList.remove('hide');
        })

        recoverCitys.addEventListener('click', () => {
            container.appendChild(cityCard);
        })

        //drag and drop citycards to change position in array. clickevent- "dragover" "drop"
        
    });
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

