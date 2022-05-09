import React,{useState,useEffect} from 'react';
import Search from './search';
import '../Cards.css';

function WeatherAPI(){
    
    const [weatherData={},setWeatherData]= useState(()=>{
        grabWeatherData();
    })

    const [weatherTemp={},setWeatherTemp]= useState(weatherData.main);
    const [weatherIcon={},setWeatherIcon]= useState(weatherData.weather);

    const [searchName,setSearchName]= useState("Ithaca");

    useEffect(()=>{
        grabWeatherData(searchName)
    },[searchName])
    
    async function grabWeatherData(searchName){
        const url=`http://api.openweathermap.org/data/2.5/weather?q=${searchName}&appid=308f55416ac8415d74c54aca01205022`
        try{
        var response = await fetch(url,{
            method: 'GET'
        })

        response = await response.json();
        setWeatherData(response);
        setWeatherIcon(response.weather[0]); 
        setWeatherTemp(response.main);

        console.log(response);
        console.log(searchName);
       
    }catch(error){
        console.error(error);
    }
        
    }
    
    function convertTemp(tempKelvin){
        var tempCelcius = tempKelvin - 273.15
        tempCelcius = Math.round(tempCelcius);
        return tempCelcius;
    }


    const handleName = (data)=>{
        let target = data.target;
        let value = target.value;

        setSearchName(value);
        console.log(value)
        
    }
    
        if(weatherData.cod == 404){
            return(
                <div>
                    <Search searchName={searchName} setSearchName={setSearchName} grabWeatherData={grabWeatherData}/>
                    <h3>"{searchName}" Was Not Found</h3>
                    
                </div>
            )
        }else{
            return(
                <div>
                <p><Search searchName={searchName} setSearchName={setSearchName} grabWeatherData={grabWeatherData}/></p>
                <br/>
                <p>{weatherData.name}</p>
                <p> Your local weather condition:</p> 
                    <p> Temperature: {convertTemp(weatherTemp.temp)}°C</p> 
                    <p> Feels Like: {convertTemp(weatherTemp.feels_like)}°C</p>
                    <p> Humidity: {weatherTemp.humidity}% </p>
                    <p> Description: {weatherIcon.description} </p>
                    {/* <img src={"http://openweathermap.org/img/wn/"+weatherIcon.icon+"@2x.png"}></img> */}
                </div>
            );
        }
}

export default WeatherAPI;