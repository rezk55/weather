
let findLocation = document.getElementById('findLocation');
let btnFind = document.getElementById('btnFind');
let day1 = document.getElementById('day1');
let dateDay1 = document.getElementById('dateDay1');
let country = document.getElementById('country');
let tempDay1 = document.getElementById('tempDay1');
let iconDay1 = document.getElementById('iconDay1');
let statDay1 = document.getElementById('statDay1');
let day2 = document.getElementById('day2');
let iconDay2 = document.getElementById('iconDay2'); 
let maxTempDay2 = document.getElementById('maxTempDay2'); 
let minTempDay2 = document.getElementById('minTempDay2'); 
let statDay2 = document.getElementById('statDay2'); 
let day3 = document.getElementById('day3');
let iconDay3 = document.getElementById('iconDay3'); 
let maxTempDay3 = document.getElementById('maxTempDay3'); 
let minTempDay3 = document.getElementById('minTempDay3'); 
let statDay3 = document.getElementById('statDay3');
let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

getWatherForMyLocation();

btnFind.addEventListener('click',function(){
    if(findLocation.value.length>2){
        getWeather(findLocation.value);
    }
});

findLocation.addEventListener("keyup",function(){
    if(findLocation.value.length>2){
        getWeather(findLocation.value);
    }
});

async function getWeather(loc){
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d572708ad70e4d5c90f164334233012&q=${loc}&days=3`);
    let dataAr = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d572708ad70e4d5c90f164334233012&q=${loc}&days=3&lang=ar`);
    let response = await data.json();
    let responseAr = await dataAr.json();
    let futureData = response.forecast.forecastday;
    let futureDataAr = responseAr.forecast.forecastday;
    let date = new Date(response.current.last_updated); 
    console.log(response);
    day1.innerHTML = days[date.getDay()];
    dateDay1.innerHTML =  date.getDate() + monthes[date.getMonth()];
    country.innerHTML = response.location.name;
    tempDay1.innerHTML = response.current.temp_c + "°C";
    iconDay1.setAttribute('src','https:'+response.current.condition.icon);
    statDay1.innerHTML = response.current.condition.text+'-'+responseAr.current.condition.text;
    descDay(day2,iconDay2,maxTempDay2,minTempDay2,statDay2,1);
    descDay(day3,iconDay3,maxTempDay3,minTempDay3,statDay3,2);


    function descDay(day,iconDay,maxTempDay,minTempDay,statDay,index){
        day.innerHTML = days[date.getDay()+index];
        iconDay.setAttribute('src','https:'+futureData[index].day.condition.icon);
        maxTempDay.innerHTML = futureData[index].day.maxtemp_c + "°C";
        minTempDay.innerHTML = futureData[index].day.mintemp_c + "°C";
        statDay.innerHTML = futureData[index].day.condition.text+'-'+ futureDataAr[index].day.condition.text; 
    }
}

async function getWatherForMyLocation() {
    const request = await fetch("https://ipinfo.io/json?token=fb5d6149e0eca6");
    const jsonResponse = await request.json();
    getWeather(jsonResponse.region);

}
