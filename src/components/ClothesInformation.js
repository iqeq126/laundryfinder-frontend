/*import React, { useEffect, useState } from 'react';
import './main.css';
function FoodProduct() {
  const [setProductList] = useState([]);

function getList(url) {
  fetch(url)
    .then(response => { return response.json(); })
    .then(data => { setProductList(data); });
}
useEffect(() => { getList('/food'); }, []);
return (
  <>
{getList('/food')}
  </>
);
};*/
/*
import React, { useRef, useEffect, useState } from 'react';
import './main.css';
//import { useNavigate } from 'react-router';
import axios from 'axios';


const FoodProduct = () => {
  const [foodData, setFoodData] = useState([])
  useEffect(() =>{
    async function fetchFoodData(){
      const response = await axios.get('http://127.0.0.1:8080/')
      const {desc_kor, nutr_count1, nutr_count2, nutr_count3} = response.foodData

      setFoodData({desc_kor, nutr_count1, nutr_count2, nutr_count3})
    }
    fetchFoodData()
  }, [])
  return (
      <>
        <li>{foodData.desc_kor}</li>
      </>
  )
  }
  */
import React, { /*useRef,*/ useEffect, useState } from 'react';
import './main.css';
// const cors = require('cors')
import axios from 'axios';

const URL = "/clothes";
function ClothesProduct() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchData = async () => {
    try {
      setError(null);
      setData(null);
      setLoading(true);

      const response = await axios.get(URL);

      setData(response.data);
    } catch(e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if(loading) return <div>Loading...</div>;
  if(error)   return <div>Error...</div>;
  if(!data)   return <div>Null...</div>;
  return(
    <>
    <div className="ClothesProduct">
        <p>식품이름 : { data.body.items }</p>
    </div>
    </>
  );
}
export default ClothesProduct;