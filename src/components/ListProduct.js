import React, { useRef, useEffect, useState } from 'react';
import './main.css';
import { useNavigate } from 'react-router';
import ProductItem from './ProductItem';
import Select from 'react-select';
function ListProduct() {
  const navigate = useNavigate();
  const [items, setProductList] = useState([]);
  const product_name = useRef();
  const user = useRef();

  const options1 = [
    { value: 'cleanser_cl', label: '염소 표백제O', image: `${process.env.PUBLIC_URL}/tag_images/cleanser_cl.png` },
    { value: 'cleanser_cl_no', label: '염소 표백제X', image: `${process.env.PUBLIC_URL}/tag_images/cleanser_cl_no.png` },
    { value: 'cleanser_o2', label: '산소 표백제O', image: `${process.env.PUBLIC_URL}/tag_images/cleanser_o2.png` },
    { value: 'cleanser_o2_no', label: '산소 표백제X', image: `${process.env.PUBLIC_URL}/tag_images/cleanser_o2_no.png` },
    { value: 'cleanser_cl_o2', label: '염소&산소 표백제O', image: `${process.env.PUBLIC_URL}/tag_images/cleanser_cl_o2.png` },
    { value: 'cleanser_cl_o2_no', label: '염소&산소 표백제X', image: `${process.env.PUBLIC_URL}/tag_images/cleanser_cl_o2_no.png` },
  ];
  const options2 = [
    { value: 'dry_floor_shade', label: '그늘진 바닥 건조', image: `${process.env.PUBLIC_URL}/tag_images/dry_floor_shade.png` },
    { value: 'dry_floor_sun', label: '햇빛 바닥 건조', image: `${process.env.PUBLIC_URL}/tag_images/dry_floor_sun.png` },
    { value: 'dry_hanger_shade', label: '그늘진 곳에 옷걸이', image: `${process.env.PUBLIC_URL}/tag_images/dry_hanger_shade.png` },
    { value: 'dry_hanger_sun', label: '햇빛 옷걸이', image: `${process.env.PUBLIC_URL}/tag_images/dry_hanger_sun.png` },
    { value: 'dry_hand_no', label: '손으로 짜기 금지', image: `${process.env.PUBLIC_URL}/tag_images/dry_hand_no.png` },
    { value: 'dry_hand_weak', label: '손으로 약하게 짜기', image: `${process.env.PUBLIC_URL}/tag_images/dry_hand_weak.png` },
    { value: 'dry_machine_no', label: '건조기 사용 X', image: `${process.env.PUBLIC_URL}/tag_images/dry_machine_no.png` },
    { value: 'dry_machine_yes', label: '건조기 사용 O', image: `${process.env.PUBLIC_URL}/tag_images/dry_machine_yes.png` },
  ];
  const options3 = [
    { value: 'drycleaning_yes', label: '드라이클리닝 O', image: `${process.env.PUBLIC_URL}/tag_images/drycleaning_yes.png` },
    { value: 'drycleaning_yes_oil', label: '(석유계)드라이클리닝 O', image: `${process.env.PUBLIC_URL}/tag_images/drycleaning_yes_oil.png` },
    { value: 'drycleaning_yes_sqecial', label: '(전문점)드라이클리닝 O', image: `${process.env.PUBLIC_URL}/tag_images/drycleaning_yes_special.png` },
    { value: 'drycleaning_no', label: '드라이클리닝 X', image: `${process.env.PUBLIC_URL}/tag_images/drycleaning_no.png` },
    { value: 'wetcleaning_yes', label: '웨트클리닝 O', image: `${process.env.PUBLIC_URL}/tag_images/wetcleaning_yes.png` },
    { value: 'wetcleaning_weak', label: '(약한)웨트클리닝 O', image: `${process.env.PUBLIC_URL}/tag_images/wetcleaning_weak.png` },
    { value: 'wetcleaning_very_weak', label: '(아주 약한)웨트클리닝 O', image: `${process.env.PUBLIC_URL}/tag_images/wetcleaning_very_weak.png` },
  ];
  const options4 = [
    { value: 'iron_80_120', label: '다림질 80~120', image: `${process.env.PUBLIC_URL}/tag_images/iron_80_120.png` },
    { value: 'iron_80_120_onclothes', label: '(옷 위에)다림질 80~120', image: `${process.env.PUBLIC_URL}/tag_images/iron_80_120_onclothes.png` },
    { value: 'iron_140_160', label: '다림질 140~160', image: `${process.env.PUBLIC_URL}/tag_images/iron_140_160.png` },
    { value: 'iron_140_160_onclothes', label: '(옷 위에)다림질 140~160', image: `${process.env.PUBLIC_URL}/tag_images/iron_140_160_onclothes.png` },
    { value: 'iron_180_210', label: '다림질 180~210', image: `${process.env.PUBLIC_URL}/tag_images/iron_180_210.png` },
    { value: 'iron_180_210', label: '(옷 위에)다림질 180~210', image: `${process.env.PUBLIC_URL}/tag_images/iron_180_210_onclothes.png` },
    { value: 'iron_no', label: '다림질 X', image: `${process.env.PUBLIC_URL}/tag_images/iron_no.png` },
  ];
  const options5 = [
    { value: 'washing_machine_30_handonly', label: '약하게 손세탁', image: `${process.env.PUBLIC_URL}/tag_images/washing_machine_30_handonly.png` },
    { value: 'washing_machine_30', label: '(약🖐️)30도 세탁기', image: `${process.env.PUBLIC_URL}/tag_images/washing_machine_30.png` },
    { value: 'washing_machine_40_approx', label: '(약🖐️)40도 세탁기', image: `${process.env.PUBLIC_URL}/tag_images/washing_machine_40_approx.png` },
    { value: 'washing_machine_40', label: '40도 세탁기', image: `${process.env.PUBLIC_URL}/tag_images/washing_machine_40.png` },
    { value: 'washing_machine_60', label: '60도 세탁기', image: `${process.env.PUBLIC_URL}/tag_images/washing_machine_60.png` },
    { value: 'washing_machine_95', label: '(삶기O)95도 세탁기', image: `${process.env.PUBLIC_URL}/tag_images/washing_machine_95.png` },
  ];
  function getList(url) {
    fetch(url)
      .then(response => { return response.json(); })
      .then(data => { setProductList(data); });
  }
  useEffect(() => { getList('/list'); }, []);

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [selectedOption3, setSelectedOption3] = useState('');
  const [selectedOption4, setSelectedOption4] = useState('');
  const [selectedOption5, setSelectedOption5] = useState('');
  const [useDropdown, setUseDropdown] = useState(true);
  const [customOption, setCustomOption] = useState('');
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if(selectedOption !== null)
    getList(`/list?user=${sessionStorage.getItem('login_id')}&tag=${selectedOption.value}`);
  else
    getList(`/list?user=${sessionStorage.getItem('login_id')}`);
  };
  const handleSelectChange1 = (selectedOption1) => {
    setSelectedOption1(selectedOption1);
    if(selectedOption1 !== null)
      getList(`/list?user=${sessionStorage.getItem('login_id')}&tag=${selectedOption1.value}`);
    else
      getList(`/list?user=${sessionStorage.getItem('login_id')}`);
  };
  const handleSelectChange2 = (selectedOption2) => {
    setSelectedOption2(selectedOption2);
    if(selectedOption2 !== null)
      getList(`/list?user=${sessionStorage.getItem('login_id')}&tag=${selectedOption2.value}`);
    else
      getList(`/list?user=${sessionStorage.getItem('login_id')}`);
  };
  const handleSelectChange3 = (selectedOption3) => {
    setSelectedOption3(selectedOption3);
    if(selectedOption3 !== null)
      getList(`/list?user=${sessionStorage.getItem('login_id')}&tag=${selectedOption3.value}`);
    else
      getList(`/list?user=${sessionStorage.getItem('login_id')}`);
  };
  const handleSelectChange4 = (selectedOption4) => {
    setSelectedOption4(selectedOption4);
    if(selectedOption4 !== null)
      getList(`/list?user=${sessionStorage.getItem('login_id')}&tag=${selectedOption4.value}`);
    else
      getList(`/list?user=${sessionStorage.getItem('login_id')}`);
  };
  const handleSelectChange5 = (selectedOption5) => {
    setSelectedOption5(selectedOption5);
    if(selectedOption5 !== null)
      getList(`/list?user=${sessionStorage.getItem('login_id')}&tag=${selectedOption5.value}`);
    else
      getList(`/list?user=${sessionStorage.getItem('login_id')}`);
  };

  const handleCheckboxChange = () => {
    setUseDropdown(!useDropdown);
  };
  const handleInputChange = (event) => {
    setCustomOption(event.target.value);
  };


  return (
    <>
      <h2>옷장</h2>
      옷이름: <input name='product_name' ref={product_name} />
      <button type='button' onClick={()=>{
          getList(`/list?product_name=${product_name.current.value}`)
      }}>조회</button>
      <div>
      <Select
              id="dropdown1"
              value={selectedOption1}
              onChange={handleSelectChange1}
              options={options1}
              getOptionLabel={(option) => (
                <div>
                  <img src={option.image} alt="Option" style={{ width: '30px', marginRight: '10px' }} 
                  />
                  {option.label}
                </div>
              )}
              isClearable
              placeholder="-- 표백제 --"
            />
      <Select
              id="dropdown2"
              value={selectedOption2}
              onChange={handleSelectChange2}
              options={options2}
              getOptionLabel={(option) => (
                <div>
                  <img src={option.image} alt="Option" style={{ width: '30px', marginRight: '10px' }} 
                  />
                  {option.label}
                </div>
              )}
              isClearable
              placeholder="-- 건조방법--"
            />

            <Select
              id="dropdown3"
              value={selectedOption3}
              onChange={handleSelectChange3}
              options={options3}
              getOptionLabel={(option) => (
                <div>
                  <img src={option.image} alt="Option" style={{ width: '30px', marginRight: '10px' }} />
                  {option.label}
                </div>
              )}
              isClearable
              placeholder="-- 세탁소 --"
            />
            <Select
              id="dropdown4"
              value={selectedOption4}
              onChange={handleSelectChange4}
              options={options4}
              getOptionLabel={(option) => (
                <span>
                  <img src={option.image} alt="Option" style={{ width: '30px', marginRight: '10px' }} />
                  {option.label}
                </span>
              )}
              isClearable
              placeholder="-- 다림질 --"
            />
            <Select
              id="dropdown5"
              value={selectedOption5}
              onChange={handleSelectChange5}
              options={options5}
              getOptionLabel={(option) => (
                <span>
                  <img src={option.image} alt="Option" style={{ width: '30px', marginRight: '10px' }} />
                  {option.label}
                </span>
              )}
              isClearable
              placeholder="-- 세탁방법 --"
            />
            </div>
      <br /><br />

      <button onClick={()=> navigate('/write')}>등록</button>
      <hr />
      등록된 옷 수: {items.length}
      <br /><br />
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
    </>
  );
};
export default ListProduct;