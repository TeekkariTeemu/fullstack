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
            <li>{country.name.common} <button onClick={() => handleShow(country)}>Show</button>
 </li>
          </div>
        ))}
      </ul>
    )
  }
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
