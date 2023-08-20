import axios from 'axios';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from 'react';
import background from './Sky.jpg'

function App() {

  const [data, setData] = useState({});
  const apiKey = "8a5031a099afe5eaf56bde7c0cdc95d9";
  const [inputCity,setInputCity] = useState("")

  const myStyle = {
    backgroundImage: `url(${background})`,
    height: '100vh',
    backgroundRepeat: 'no-repeat'
  }
  
  const getDetails = (cityName) => {
    if(!cityName)
    return ;
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    axios.get(apiURL).then(res => {
      //console.log("response:- " ,res.data);
      setData(res.data);
    })
    .catch((err) => {
      console.log("err" ,err);
    })
  }

  const handleClick = () => {
    getDetails(inputCity);
  }
  
  const handleInputChange = (e) => {
    //console.log('value:',e.target.value);
    setInputCity(e.target.value);
  }
  return (
    <div className="mainWeather" style={myStyle}>
      <link rel='icon' type='image/x-icon' href="./icon.png"></link>
      <div className="bground">
        <h1 className="heading">Sky Cast</h1>
        <br/>
        <div className="searchBox">
        <input type="text" className="weather-form" value={inputCity} onChange={handleInputChange} placeholder='Enter City'/>
        <br className="space" />
        <button className="cityButton" type="button" onClick={handleClick}>Search City</button>
        </div>
      </div> 
      {Object.keys(data).length > 0 && 
        <div className="col-md-12 text-center mt-5">
        <div className="shadow rounded resultBox">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrK_1X1h0lJEtruf24xl7jppJxG-6NWe2SqVIn6wtLTNHsOwoEURQqcTEc4ga3kt_goNY&usqp=CAU" className="weatherIcon" />
          <h5 className="weatherCity">{data?.name}</h5>
          <h6>country: {data?.sys?.country}</h6>
          <h6 className="weatherTemp">{((data?.main?.temp)-273.15).toFixed(2)}°C</h6>
            <h6 className="others">Feels Like: {((data?.main?.feels_like-273.15)).toFixed(2)}°C</h6>
            <h6 className="others">Min Temperature of the Day is: {((data?.main?.temp_min)-273.15).toFixed(2)}°C</h6>
            <h6 className="others">Max Temperature of the Day is: {((data?.main?.temp_max)-273.15).toFixed(2)}°C</h6>
            <h6 className="others">Pressure: {data?.main?.pressure}</h6>
            <h6 className="others">humidity: {data?.main?.humidity}</h6>
            <h6 className="others">visibility: {data?.visibility}</h6>
        </div>
      </div>}
    </div>
  );
}

export default App;
