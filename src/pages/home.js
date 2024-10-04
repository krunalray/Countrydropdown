import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

//const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
const regions = [
  { value: 'Africa', label: 'Africa' },
  { value: 'Americas', label: 'Americas' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Oceania', label: 'Oceania' },

]
const Home = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryData, setCountryData] = useState(null);

  // Fetch countries based on selected region
  useEffect(() => {
    if (selectedRegion) {
      const fetchCountries = async () => {
        try {
          const response = await axios.get(`https://restcountries.com/v3.1/region/${selectedRegion}`);
          if(response.data && response.data.length > 0){
            const countryArray = [];
            for(let i = 0; i < response.data.length; i++){
              const countryObj = response.data[i];
              countryObj.label = response.data[i].name.common;
              countryObj.value = response.data[i].name.common;
              countryArray.push(countryObj);
            }
             setCountries(countryArray);
             setSelectedCountry('');
          }
         
        } catch (error) {
          console.error('Error fetching countries:', error);
        }
      };
      fetchCountries();
    }
  }, [selectedRegion]);

  // Fetch country data based on selected country
  useEffect(() => {
    if (selectedCountry) {
      const fetchCountryData = async () => {
        try {
          const response = await axios.get(`https://restcountries.com/v3.1/name/${selectedCountry}`);
          
          setCountryData(response.data[0]);
        } catch (error) {
          console.error('Error fetching country data:', error);
        }
      };
      fetchCountryData();
    }
  }, [selectedCountry]);
  console.log(countryData);
  
  return (
    <div style={{ padding: '20px' }} className='container card'>
      <div className='col-sm-12 col-md-12 d-flex align-items-center justify-content-center'>
        <h2>Select a Region and Country</h2>
      </div>

      {/* Dropdown for Region Selection */}
      <div className='row mt-2'>
        <div className='col-sm-2 col-md-2 text-end d-flex align-items-center justify-content-end'>
            Region:            
        </div>
        <div className='col-3 col-md-3'>
        <Select 
            defaultValue={selectedRegion}
            isSearchable={false}
            placeholder="Select Region"
            options={regions}
            onChange={e => {
                setSelectedCountry('');
                setCountries([]);
                setSelectedRegion(e.value);                
                setCountryData(null);                                                                   
            }} />
        </div>
        <div className='col-sm-2 col-md-2 text-end d-flex align-items-center justify-content-end'>
            Country:            
        </div>
        <div className='col-3 col-md-3'>
        <Select 
            simpleValue
             value={countries.filter(function (option) {
              return option.value === selectedCountry;
            })}
            placeholder="Select Country"
            options={countries}
            onChange={e => {              
              setSelectedCountry(e.name.common)               
            }} /> 
        </div>
      </div>
      {countryData && (
        <div className='container mt-3 w-50'>
            <div className='card'>
                <div class="d-flex align-items-center p-2">
                    <div class="flex-shrink-0">
                        <div style={{ border:'1px solid #f1f1f1',borderRadius:'5px',}} className='p-1'>
                            <img
                            src={countryData.flags.png}
                            alt={`Flag of ${countryData.name.common}`}
                            className="img-fluid"
                            style={{ width: '200px', height: 'auto'}}
                            />
                        </div>
                </div>
                <div class="flex-grow-1 ms-3">
                    <div class="card-body">
                    <h5 class="card-title">{countryData.name.common}</h5>
                    <p class="card-text mb-0"><strong>Population:</strong> {countryData.population.toLocaleString()}</p>
                    <p class="card-text"><strong>Area:</strong> {countryData.area.toLocaleString()} km²</p>
                </div>
                </div>
                </div>
              </div>           
        </div>
        
      )}
    </div>
  );
};

export default Home;
