import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ProductItem from '../ProductItem';
function WeatherApp() {
  const [city, setCity] = useState('');
  const [icon, setIcon] = useState('');
  const [status, setStatus] = useState('');
  const [temp, setTemp] = useState('');
  const [InputText, setInputText] = useState('');
  const [laundry, setLaundry] = useState('');
  const [result, setResult] = useState({});
  const [Place, setPlace] = useState('');
  const [items, setProductList] = useState([]);
  const product_name = useRef();
  const user = useRef();

  // Function to print weather data on the screen
  function printWeatherData(data) {
    // Handle the case when the weather data is not available
    if (data.weather === undefined) {
      setCity('Fail to load');
      setIcon('fail.png');
      setStatus('도시 이름을 찾을 수 없습니다.');
      setTemp('영어로 제대로 입력해주세요 :)');
      return;
    }

    setCity(data.name);
    setIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    setStatus(data.weather[0].description);
    setTemp(`${data.main.temp}ºC`);
    if(data.weather[0].description.indexOf('broken') != -1 || data.weather[0].description.indexOf('mist') != -1 || data.weather[0].description.indexOf('scattered') != -1) {
      setLaundry(`그늘진 빨래 널기 좋은 날입니다.`);
      getList(`/list2?user=${sessionStorage.getItem('login_id')}&tag=shade`);
    }
    else if(data.weather[0].description.indexOf('sky') != -1 || data.weather[0].description.indexOf('few') != -1) {
      setLaundry(`햇빛 빨래 좋은 날입니다.`)
      getList(`/list2?user=${sessionStorage.getItem('login_id')}&tag=sun`);
    }
    else {
      setLaundry(`빨래하기 안좋은 날입니다. 건조기를 이용해주세요`);
      getList(`/list2?user=${sessionStorage.getItem('login_id')}&tag=machine_yes`);
    }
  }

  // Function to get weather data based on location
  function getDataByLocating(la, lon) {
    const APIKEY = 'af51e2b35e07cab517caed4e7a1653fd';
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${la}&lon=${lon}&units=metric&appid=${APIKEY}`;

    fetch(URL)
      .then((resp) => resp.json())
      .then((json) => printWeatherData(json));
  }

  // Function to handle location fetching failure
  function failLocating() {
    setCity('위치 정보를 불러오는데 실패했습니다.');
    setIcon('fail.png');
    setStatus('Fail to load');
    setTemp('정보공유가 싫으시면 검색을 이용해주세요 :)');
  }

  // Function to get weather data based on search
  function getDataBySearching(city) {
    const APIKEY = 'af51e2b35e07cab517caed4e7a1653fd';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`;

    fetch(URL)
      .then((resp) => resp.json())
      .then((json) => printWeatherData(json));
  }
  const onChange = (e) => {
    setInputText(e.target.value)
  }

  function getList(url) {
    fetch(url)
      .then(response => { return response.json(); })
      .then(data => { setProductList(data); });
  }

  useEffect(() => {
    // Get location information
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getDataByLocating(latitude, longitude);
      },
      failLocating
    );
  }, []);

  // Function to handle search button click
  function handleSearch() {
    getDataBySearching(city.toLowerCase());
    setCity('');
  }

  // Function to handle input keydown event
  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      getDataBySearching(city.toLowerCase());
      setCity('');
    }
  }
  return (
    <>
        <AppWrap>
      <div>
        <h1>오늘의 빨래</h1>
      <div style={{
        display: 'grid',
        gridTemplateRows: '1fr',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
      }}>
        {items.map(
          ({ product_code, product_name, filename, tag }) => (
            <ProductItem
              product_code={product_code}
              product_name={product_name}
              filename={filename}
              key={product_code}
              tag={tag}
            />
          )
        )}
        </div>
        </div>
        <hr></hr>

    <div className="appContentWrap">
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <ResultWrap>
      <div id="city">{city}</div>
      <img id="icon" src={icon} alt="Weather Icon" />
      <div id="status">{status}</div>
      <div id="temp">{temp}</div>
      <div id="laundry">{laundry}</div>
      </ResultWrap>
    </div>
    </AppWrap>

        </>
  );
  /*
  return (
    <AppWrap>
      <div className="appContentWrap">
        <input
          placeholder="도시를 입력하세요"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          onKeyDown={handleKeyDown}
        />
        {Object.keys(result).length !== 0 && (
          <ResultWrap>
            <div className="city">{result.data.name}</div>
            <div className="temperature">
              {Math.round((result.data.main.temp - 273.15) * 10) / 10}°C
            </div>
            <div className="sky">{result.data.weather[0].main}</div>

            <div id="city">{city}</div>
            <img id="icon" src={icon} alt="Weather Icon" />
             <div id="status">{status}</div>
            <div id="temperature">{Math.round((temp- 273.15) * 10) / 10}°C</div>
          </ResultWrap>
        )}
      </div>
    </AppWrap>
    
  );*/
}


export default WeatherApp;
const AppWrap = styled.div`
  width: 80vw;
  height: 80vh;

  .appContentWrap {
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 20px;
  }
  @media screen and (max-width:1500px) {
    .appContentWrap {
      top: 45%;
    }
  }
  @media screen and (min-width:1501px) {
    .appContentWrap {
      top: 70%;
    }
  }
  input {
    padding: 16px;
    border: 2px black solid;
    border-radius: 16px;
  }

`;

const ResultWrap = styled.div`
  margin-top: 60px;
  border: 1px black solid;
  padding: 10px;
  border-radius: 8px;

  .city {
    font-size: 24px;
  }
  .temp {
    font-size: 60px;
    margin-top: 8px;
  }
  .status {
    font-size: 20px;
    text-align: right;
    margin-top: 8px;
  }
`;