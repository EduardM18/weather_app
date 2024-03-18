//request required items//
const apiKey = '9765eeccd9bdcb449e906b02c51bff6d';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
//getting html elements//
const locationInput = document.getElementById('locationInput');
const form = document.getElementById('search_form');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const locationElement2 = document.getElementById('location2');
const weather_img = document.getElementById('weather_img');
const windElement = document.getElementById('Wind');
const humdityElement = document.getElementById('humidity');
const dateElement = document.getElementById('date');
const recent_search_container = document.getElementById('recent_search_container');
const searches_container = document.getElementById('searches_container');
const background_img = document.getElementById('container_wrapper_img');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const error_p = document.getElementById('error_p');
//inspecting site first opening//
let is_firstOpening = false;
//inspecting error//
let is_error = false;
//searches array//
let searches = []
//sending default request//
if(is_firstOpening == false){
    fetchWeather('armenia');
    is_firstOpening = true;
}
//form submit//
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
    recent_search_container.removeChild(recent_search_container.lastElementChild);
    searches.unshift(locationInput.value);
    searchSaver()
});
//fetch weather function//
function fetchWeather(location) {
    errorElement.style.display = 'none';
    loading();
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        locationElement.textContent = data.name;
        locationElement2.textContent = data.name;
        changeImg(data);
        windElement.textContent = data.wind.speed + " " + 'km/h';
        humdityElement.textContent = 'Humdity:' + " " + data.main.humidity + "%";
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionElement.textContent = data.weather[0].description;
        getdate()
    })
    .catch(error => {
        errorElement.style.display = 'flex';
        error_p.textContent = 'Error fetching weather data:', error
        is_error = true;
    }).finally( () =>{
        turn_off_loading();
    })
} 
//loading functions//
function loading(){
    loadingElement.style.display = "block";
}
function turn_off_loading(){
    loadingElement.style.display = "none";
}
//getting current date//
function getdate(){
    const date = new Date;
    dateElement.textContent = `${locationElement.textContent} 
    ${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} 
    ${date.getHours()}:${date.getMinutes()}`;
}
//changing image of weather status//
function changeImg(data){
    if(data.weather[0].main == 'Clouds'){
        weather_img.src = "utils/media/imagies/clouds.png";
    }else if(data.weather[0].main == 'Clear'){
        weather_img.src = "utils/media/imagies/clear.png";
    }else if(data.weather[0].main == 'Rain'){
        weather_img.src = "utils/media/imagies/rain.png";
    }else if(data.weather[0].main == 'Drizzle'){
        weather_img.src = "utils/media/imagies/drizzle.png";
    }else if(data.weather[0].main == 'Mist'){
        weather_img.src = "utils/media/imagies/mist.png";
    }else if(data.weather[0].main == 'Snow'){
        weather_img.src = "utils/media/imagies/snow.png";
    }
}
//recent searches saver//
function searchSaver(){
    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }
    let unique_searches = searches.filter(onlyUnique);
    if(unique_searches.length > 6){
        unique_searches.pop()
    }
    const searches_container = document.createElement('div');
    searches_container.setAttribute("id","searches_container");
    for(let i = 0; i < unique_searches.length; i++){
        const search = document.createElement('div');
        search.classList.add("recent_search");
        search.textContent = searches[i];
        searches_container.appendChild(search)
        search.addEventListener('click',function(){
            fetchWeather(search.textContent);
        })
    }
    recent_search_container.appendChild(searches_container);
    locationInput.value = "";
}
//changing background image depending from season//
function changeMainImg(){
    const date = new Date;
    const month = date.getMonth()+1;
    if(month >= 0 && month <= 3){
        background_img.src = "utils/media/imagies/winther.jpg";
    }else if(month > 3 && month <= 6){
        background_img.src = "utils/media/imagies/spring.jpg";
    }else if(month > 6 && month <= 9){
        background_img.src = "utils/media/imagies/summer.jpg";
    }else if(month > 9 && month <= 12){
        background_img.src = "utils/media/imagies/autmn.jpg";
    }
}
changeMainImg()