import React, {useState, useEffect} from 'react';
import './App.css';
import CountriesList from './Components/CountriesList/CountriesList';
import MainContent from './Components/MainContent/MainContent';
import axios from 'axios';

const App = (props) =>  {
  const [countries, setCountries] = useState([]); 
  const [countryInformation, setCountryInformation] = useState(
    // []
    {
      flag : "https://flagcdn.com/w320/jp.png",
      commonName: "Japan",
      coatOfArms: "https://mainfacts.com/media/images/coats_of_arms/jp.png",
      description: "Japan is an island country in East Asia. It is situated in the northwest Pacific Ocean, and is bordered on the west by the Sea of Japan, while extending from the Sea of Okhotsk in the north toward the East China Sea, Philippine Sea, and Taiwan in the south. Japan is a part of the Ring of Fire, and spans an archipelago of 6852 islands covering 377,975 square kilometers (145,937 sq mi); the five main islands are Hokkaido, Honshu, Shikoku, Kyushu, and Okinawa. Tokyo is the nation's capital and largest city, followed by Yokohama, Osaka, Nagoya, Sapporo, Fukuoka, Kobe, and Kyoto.",
      officialName : "Japan",
      population: 12583602,
      continent: "Asia",
      currencyName: "Japanese yen",
      currencySymbol: "¥",
      capital: "Tokyo"
    }
  );
  const [active, setActive] = useState(false)

  const fetchCountries = async () => {
    try {
        axios.get(`https://restcountries.com/v3.1/all`)
          .then(function (response) {
            console.log(response.data, 'Checking All Data')
            // const getAllCountries = response.data
            const getSortedCountries = response.data.sort((a , b) => {
              return a.name.common.localeCompare(b.name.common)
            // return setCountries(getAllCountries)
            })
            setCountries(getSortedCountries)    
        })
    } catch (error) {
        console.log(error);
      }   
  }

  useEffect(() => {
    fetchCountries();
  },[]);
  
  return (
      <div className="app">
        <div className='app__countries-list-wrapper'>
          <CountriesList countries={countries} setCountries={setCountries} 
          countryInformation={countryInformation} setCountryInformation={setCountryInformation}
          active={active} setActive={setActive}
          />
        </div>
        <div className='app__main-content-wrapper'>
          <MainContent countries={countries} setCountries={setCountries} 
          countryInformation={countryInformation} setCountryInformation={setCountryInformation}/>
        </div>
      </div>  
    );
  }
  export default App;