import {format} from 'date-fns'



window.addEventListener('keypress',function(e){
    if(e.code === 'Enter'){
        searchLocationWeather()
    }
})

class Weather{
    constructor(){
        this.dateElement = document.getElementById('date')
        this.temperatureElement = document.getElementById('temperature')
        this.locationElement = document.getElementById('location')
        this.iconElement = document.getElementById('icon')
        this.weatherTerm = document.getElementById('weatherTerm')
        this.bodyElement = document.querySelector('body')
    }

    setTemperature(fromWeatherData){
        const temperatureData = fromWeatherData.main.temp
        const formattedTempData = `${temperatureData}°C`
        this.temperatureElement.textContent = formattedTempData
    }

    setLocation(locationData){
        const locationInfo = locationData.name
        this.locationElement.textContent = locationInfo
    }

    setIconImage(weatherData){
        const iconId = weatherData.weather[0].icon
        let imgURL = `https://openweathermap.org/img/wn/${iconId}@4x.png`

        this.iconElement.src = imgURL
    }

    setWeatherTerm(weatherData){
        const weatherTermDescription = weatherData.weather[0].description

        this.weatherTerm.textContent = weatherTermDescription
    }

    setBackgroundImage(weatherData){
        const iconName = weatherData.weather[0].icon
        const lengthOfIconName = iconName.length
        const LastIndexofIconName = lengthOfIconName - 1
        const lastCharacter = iconName[LastIndexofIconName]

        if(lastCharacter === 'n'){
            this.bodyElement.className = 'active'
        }else {
            this.bodyElement.classList.remove('active')
        }
    }

    get setDate(){
        let dateToday = format(new Date(), 'MMM do')

        this.dateElement.textContent = `Today, ${dateToday}`
    }
}

class searchController{
    constructor(){
        this.searchButton = document.querySelector('label')
        this.inputElement = document.querySelector('input')
    }

}

const weatherToday = new Weather()

async function getCurrentWeather(searchLocation){

    if(searchLocation === undefined){
        searchLocation = 'London'
    }

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&units=metric&appid=10db400606fb6ced08dc3d4a1196becf`,{mode:'cors'})

    const weatherData = await response.json()

    weatherToday.setTemperature(weatherData)
    weatherToday.setLocation(weatherData)
    weatherToday.setIconImage(weatherData)
    weatherToday.setWeatherTerm(weatherData)
    weatherToday.setBackgroundImage(weatherData)
    weatherToday.setDate
}

getCurrentWeather()

const searchLocation = new searchController()
const searchBtn = searchLocation.searchButton

searchBtn.addEventListener('click',searchLocationWeather)

function searchLocationWeather(){
    const inputValue = searchLocation.inputElement.value
    
    if(inputValue == ''){
        alert('the field cannot be empty')
    }else{
        const formatInputValue = inputValue.trim().toLowerCase()
        getCurrentWeather(formatInputValue)
        searchLocation.inputElement.value = ''
    } 
}

