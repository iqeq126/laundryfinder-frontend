import axios from 'axios';
import { useState,useEffect } from 'react';
import styled from 'styled-components';

function Openweathermap() {
  const [location, setLocation] = useState('');
  const [result, setResult] = useState({});
  const [city, setCity] = useState('');
  const API_KEY = "af51e2b35e07cab517caed4e7a1653fd";// 각자 개인의 API KEY를 발급받아 사용해주세요. 
  function getDataByLocating(la, lon) {
    const APIKEY = 'af51e2b35e07cab517caed4e7a1653fd';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${la}&lon=${lon}&units=metric&appid=${APIKEY}`;

    fetch(url)
      .then((resp) => resp.json())
      .then((json) => Openweathermap(json))
  }
  const searchWeather = async (e) => {
    const url = `/data/2.5/weather?q=${location}&appid=${API_KEY}`;
    if(e.key === 'Enter') {
      try {
        const data = await axios({
          method: 'get',
          url: url,
        })
        setResult(data);
        console.log(data);
      } 
      catch(err) {
        alert(err);
      }
    }
  }
  useEffect(() => {
    // Get location information
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getDataByLocating(latitude, longitude);
      }
    );
  }, []);
  return (
    <AppWrap>
      <div className="appContentWrap">

        <input
          placeholder="도시를 입력하세요"
          value={location}
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchWeather}
        />
        {Object.keys(result).length !== 0 && (
          <ResultWrap>
            <div className="city">{result.data.name}</div>
            <div className="temperature">
              {Math.round((result.data.main.temp - 273.15) * 10) / 10}°C
            </div>
            <div className="sky">{result.data.weather[0].main}</div>
          </ResultWrap>
        )}
      </div>
    </AppWrap>
  );
}

export default Openweathermap;

const AppWrap = styled.div`
  width: 80vw;
  height: 80vh;

  .appContentWrap {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 20px;
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
  .temperature {
    font-size: 60px;
    margin-top: 8px;
  }
  .sky {
    font-size: 20px;
    text-align: right;
    margin-top: 8px;
  }
`;