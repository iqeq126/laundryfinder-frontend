//import React, { /*useRef,*/ useEffect } from 'react';
//import './MyApp.css';
//const cors = require('cors')
//import axios from 'axios';
//const { kakao } = window;
/*function MapProduct() {  useEffect(()=>{
    const container = document.getElementById('map');
    const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level : 3
    };
    const map = new kakao.maps.Map(container, options); //eslint-disable-line no-unused-vars
  }, [])
  return(
    <div id="map" style={{
        width: '500px',
        height: '500px'
    }}></div>
  );
}
export default MapProduct;*/
import React, { useState } from 'react'
import MapContainer from './MapContainer'
function MapProduct() {
  const [InputText, setInputText] = useState('')
  const [Place, setPlace] = useState('')

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
     // eslint-disable-next-line
    setInputText('병천면' + '세탁소')
    setPlace(InputText)
  }

  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
        <button type="submit">검색</button>
      </form>
      <MapContainer searchPlace={Place} />
    </>
  )
}

export default MapProduct;