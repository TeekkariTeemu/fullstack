//importataan kaikki oleellinen
import { useState, useEffect  } from 'react'
import './index.css'
import axios from 'axios'

//määritellään tarvittavat komponentit
//Komponentti tekee ja esittää listan maista
//Object.values, hakee objektin arvot. Käytetään koska languages muuttujilla eri nimet
const List = ({ countries, handleShow }) => {
  if (countries.length === 0) {
    return <p>Not a country</p>
  } else if (countries.length === 1) {
    const country = countries[0]
    console.log("kielet")
    console.log(Object.values(country.languages))
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li>{language}</li>
          ))}
        </ul>
        <img src ={country.flags.png} alt ={country.flags.alt}/>
        <Weather 
         country={country}
        />
      </div>
    )
  } 
  else if (countries.length >= 9) {
    return <p>Too many matches, specify more</p>
  }
  else {
    return (
      <ul>
        {countries.map((country) => (
          <div key={country.cca3}>
            <li>{country.name.common} <button onClick={() => handleShow(country)}>Show</button> </li>
          </div>
        ))}
        
      </ul>
    )
  }
}

//Esitetään Sää
const Weather = ({ country }) => {
  console.log(country)
  const [weather, setWeather] = useState([])
  //haetaan maitten tiedot
  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY
    const cityName = country.capital[0]
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    axios
      .get(url)
      .then((response) => {
        setWeather(response.data)
      })
  }, [])
  //varmistetaan, että kaikki vaadittavat tiedot löytyvät, ettei tule Error
  if (!weather.wind || !weather.main || !weather.weather || !weather.weather[0]) {
    return null
  }
  
 const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  return (
    <div>
      <h2>Weather in {country.capital[0]}</h2>
      <p>Temperature: {Math.round(weather.main.temp - 273.15)} °C</p>
      <img src = {icon} alt ={weather.weather[0].description}/>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

//komponentissa määritellää filtteri
const Filter = (props) => {
  const { value, onChange } = props
  console.log(props)
  console.log({value})
  console.log({onChange})
  return (
    <div>
        filter:
        <input
          value={value}
          onChange={onChange}
        />
      </div>
  )}

//määritellään sovelluksen runko
function App() {
  //tarvittavat hookit
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  //tapahtumankäsittelijä vastaa filtteristä
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  //tapahtumankäsittelijä valitsee maan, jonka nappia painetaan.
  const handleShow = (country) => {
    setFilter(country.name.common)
  }
  const filteredCountries = countries.filter((country) =>
  country.name.common.toLowerCase().includes(filter.toLowerCase())
)

  return (
    <div>
    <Filter 
    value={filter} 
    onChange={handleFilter}
    />
    <List 
    countries={filteredCountries}
    handleShow={handleShow}
    />
  </div>
  )
}

export default App
