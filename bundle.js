let weather = require('nodemisael');


//Getting DOM elements
const input = document.getElementById("inputBar");
const btn = document.getElementById("search");
const locBtn = document.getElementById("getLoc")
let errorTxt = document.getElementById("error");
           

//assigning event
btn.addEventListener('click', search)
locBtn.addEventListener('click',getLocation)
input.addEventListener('keyup',function(e){
    if (e.keyCode === 13) {
    search();
  }
});
//functions
async function search(){
    let city = input.value
    const currentType = "forecast" // use for fetch
    let myResults =  await weather.searchCity(currentType, city) // fetching

    if(myResults != "error"){
        DisplayResult(myResults);
        
    }else{
        errorTxt.style.visibility = "visible"
    }

}

function DisplayResult(res) {
    console.log(res)
    errorTxt.style.visibility = "hidden";
    currentDisplay(res);
    forecastDisplay(res);
}

function currentDisplay(res){
    let city = document.getElementById("city");
    let logo = document.getElementById("logo");
    let temp = document.getElementById("temp");
    let cond = document.getElementById("cond");
    let feels = document.getElementById("feels");

    city.innerText = `${res.location.name}  ${res.location.region}, ${res.location.country}`
    logo.src = res.current.condition.icon;
    temp.innerText = `${res.current.temp_f}°`;
    cond.innerText = `${res.current.condition.text}`
    feels.innerHTML = `Feels like: ${res.current.feelslike_f}°`

}

function forecastDisplay(res){
    let days = res.forecast.forecastday;
    let forecast = document.getElementById("forecast");
    
    
    for(let i = 1; i < days.length; i++){
        let logo = `<div class="box"><img id="logoFore" class="sunForecast" src="${days[i].day.condition.icon}">`;
        let date = `<div class="detail"><h3 id="dateForecast" class="dateForecast">${days[i].date}</h3>`;
        let text = ` <h2 id="condForecast" class="condForecast">${days[i].day.condition.text}</h2>`;
        let max = `<h3 id="maxTemp" class="tempForecast">Max: ${days[i].day.maxtemp_f}°</h3>`;
        let min = `<h3 id="minTemp" class="tempForecast">Min: ${days[i].day.mintemp_f}°</h3> </div></div>`;
        forecast.innerHTML += logo + date + text + max + min;
    }

}

function getLocation(){
    console.log("Here you will get the user location")
    let temp = document.getElementById("err")
    temp.parentNode.removeChild(temp)
    
}