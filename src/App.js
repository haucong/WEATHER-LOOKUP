import { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({})
  const api = {
    key: 'f68724363e9eb124bba89c614808f55f',
    base: 'https://api.openweathermap.org/data/2.5/',
  }

  const search = evt => {
    if ( evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res =>res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result)
      })
    }
  }

  const DateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septemper", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return ` ${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app' ) : 'app'}>
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='nhập địa điểm. vd: Can Tho, Paris..'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <div>
            <div className='location-box'>
              <div className='location'>
                {weather.name}, {weather.sys.country}
              </div>
              <div className='date'>{DateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°C </div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className="no-local">
            Hãy nhập địa điểm cần tra cứu thời tiết và nhiệt độ 🌞
          </div>
        )}
        ;
      </main>
    </div>
  )
}

export default App;
