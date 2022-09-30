import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import './countriesList.css';

const CountriesList = (props) =>  {

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(props.countries.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.countries.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, props.countries]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % props.countries.length;
    setItemOffset(newOffset);
  };

  const handleSelected = (e) => {
    // debugger
    console.log(e.target.innerHTML, "Checks country name ")
    const countryUrl = e.target.innerHTML
    Promise.all([
      // fetch("https://restcountries.com/v3.1/name/Peru"),
      // fetch("https://en.wikipedia.org/api/rest_v1/page/summary/Peru"),
      fetch(`https://restcountries.com/v3.1/name/${countryUrl}`),
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${countryUrl}`)
    ]).then(function (responses) {
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(function (data) {
      console.log(data, "Checks Data");
      console.log(data[0][0].name.common, "Checks current details")
      console.log(data[1].extract, "Checks current description")
      console.log(Object.entries(data[0][0].currencies)[0][1].name, "Checks currency name")
      console.log(Object.entries(data[0][0].currencies)[0][1].symbol , "Checks currency symbol")

      props.setCountryInformation(prevState => {
        return {...prevState, 
          commonName : data[0][0].name.common,
          flag : (data[0][0].flags.png) || (data[0][0].flags.svg),
          description : data[1].extract,
          coatOfArms : data[0][0].coatOfArms.svg || data[0][0].coatOfArms.png,
          officialName : data[0][0].name.common,
          population : data[0][0].population,
          continent : data[0][0].continents[0],
          currencyName : Object.entries(data[0][0].currencies)[0][1].name,
          currencySymbol : Object.entries(data[0][0].currencies)[0][1].symbol,
          capital : data[0][0].capital
        }
      })
      console.log(props.countryInformation.commonName, "Check new data");
    }).catch(function (error) {
      console.log(error);
    });
  }

   return (
      <div className="countries-list">
        <div className='countries-list__title-wrapper'>
          <h1 className='app__title'>
            Countries List
          </h1>
        </div>
        <div className='countries-list__txt-wrapper'>

          <ul className='countries-list__txt-container'>

            {currentItems.map((country) => {
              return (
                <li
                  onClick={() => props.setActive(country.name.common)}
                  className =
                    { 
                      props.active === country.name.common
                        ?
                          'countries-list__txt-red'
                        :
                          'countries-list__txt-black' 
                    } 
                  key={country.name.common}
                >
                  <a onClick={handleSelected}>
                    {country.name.common}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="pagination-wrapper">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName='page-num'
            previousLinkClassName='page-num'
            nextLinkClassName='page-num'
            activeLinkClassName='active'
          />
        </div>
      </div>
    );
  }
export default CountriesList;