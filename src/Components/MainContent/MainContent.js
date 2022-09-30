import React, {} from 'react';
import './maincontent.css';

const MainContent = (props) =>  {

  const putComma = (population = 0) => {
    return Number(population).toLocaleString('en-US') 
  }

   return (
      <div className="mc-wrapper">
        <div className='mc__country-wrapper'>
          <div className='mc__country-title-wrapper'>
            <h2 className='countries__title'>
              Country
            </h2>
          </div>
          <div className='mc__country-flag-wrapper'>
            <img className='mc__country-flag' src={props.countryInformation.flag} alt="Flag"></img>
          </div>
          <div className='mc__country-name-wrapper'>
            <h3 className='mc__country-name'>
              {props.countryInformation.commonName}
            </h3>
          </div>
          <div className='mc__country-des-wrapper'>
            <span className='mc__country-des'>
              {props.countryInformation.description}
            </span>
          </div>
        </div>
        <div className='mc__det-wrapper'>
          <div className='mc__det-title-wrapper'>
            <h2 className='app__title'>
              Country Details
            </h2>
          </div>
          <div className='mc__det-container'>
            <div className='mc__det-coa-wrapper'>
              <img className='mc__det-coa' src={props.countryInformation.coatOfArms} alt="Coat of Arms"></img>
            </div>
            <div className='mc__info-wrapper'>
              <div className='app__info-wrapper'>
                <h3 className='app__title-2'>
                  Official Name
                </h3>
                <span className='app__sub-title'>
                  {props.countryInformation.officialName}
                </span>
              </div>
              <div className='app__info-wrapper'>
                <h3 className='app__title-2'>
                  Population
                </h3>
                <span className='app__sub-title'>
                  {putComma(props.countryInformation.population)}
                </span>
              </div>
              <div className='app__info-wrapper'>
                <h3 className='app__title-2'>
                  Continent
                </h3>
                <span className='app__sub-title'>
                  {props.countryInformation.continent}
                </span>
              </div>
              <div className='app__info-wrapper'>
                <h3 className='app__title-2'>
                  Currency
                </h3>
                <span className='app__sub-title'>
                  {props.countryInformation.currencyName}
                </span>
                <span className='app__sub-title'>
                 ( {props.countryInformation.currencySymbol} )
                </span>
              </div>
              <div className='app__info-wrapper'>
                <h3 className='app__title-2'>
                  Capital
                </h3>
                <span className='app__sub-title'>
                  {props.countryInformation.capital}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
export default MainContent;