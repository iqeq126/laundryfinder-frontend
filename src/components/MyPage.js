import MyPageMap from "./MyPageMap";
import React, { useState, useEffect, useRef } from 'react'
import ProductItem from "./ProductItem";
const Mypage = () => {
  const [InputText, setInputText] = useState('');
  const [Place, setPlace] = useState('');
  const [items, setProductList] = useState([]);
  const product_name = useRef();
  const user = useRef();


  const onChange = (e) => {
    setInputText(e.target.value)
  }

  function getList(url) {
    fetch(url)
      .then(response => { return response.json(); })
      .then(data => { setProductList(data); });
  }
  useEffect(() => { getList(`/list2?user=${sessionStorage.getItem('login_id')}&tag=cleaning`); }, []);
/*
  const handleSubmit = (e) => {
    e.preventDefault()
     // eslint-disable-next-line
    setPlace(InputText)
    setInputText('')
  }*/
  return (
    <>
            <div className="kakaoMap middle2">
          <div className="common">
            <MyPageMap searchPlaces={Place} />
          </div>
        </div>
      <div style={{
        display: 'grid',
        gridTemplateRows: '1fr',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
      }}></div>
      <h2>세탁소가 필요한 옷</h2>
      <div style={{
        display: 'grid',
        gridTemplateRows: '1fr',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
      }}>
      <img src="./tag_images/drycleaning_yes.png" width="150px" height="150px"/>
      <img src="./tag_images/drycleaning_yes_special.png" width="150px" height="150px"/>
      <img src="./tag_images/drycleaning_yes_oil.png" width="150px" height="150px"/>
      <img src="./tag_images/wetcleaning_yes.png" width="150px" height="150px"/>
      <img src="./tag_images/wetcleaning_weak.png" width="150px" height="150px"/>
      <img src="./tag_images/wetcleaning_very_weak.png" width="150px" height="150px"/><br />
      </div>
      <div>
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
      </>
  );
};



export default Mypage;