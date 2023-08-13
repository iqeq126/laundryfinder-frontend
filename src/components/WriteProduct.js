import React, { useState, useEffect, useRef } from 'react';
import { useNavigate} from 'react-router';
import './main.css';
import axios from 'axios';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import IFrameComponent from './IFrameComponent';
import ImageUploader from './ImageUploader';
import Swal from "sweetalert2";
//import { setFips } from 'crypto';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;



function WriteProduct() {
  //const baseURL = 'https://192.168.0.2:3000';
  const baseURL = 'https://172.19.86.24:3000';
  const navigate = useNavigate();
  const product_name = useRef();
  const description = useRef();
  const img = useRef();
  const tag_image = useRef();
  const options = [
    { value: 'cleanser_cl', label: '염소 표백제O', image: `${process.env.PUBLIC_URL}/tag_images/cleanser_cl.png` },
    { value: 'cleanser_cl_no', label: '염소 표백제X', image: `${process.env.PUBLIC_URL}/tag_images/cleanser_cl_no.png` },
    { value: 'cleanser_o2', label: '산소 표백제O', image: `${process.env.PUBLIC_URL}/tag_images/cleanser_o2.png` },
    { value: 'cleanser_o2_no', label: '산소 표백제X', image: `${process.env.PUBLIC_URL}/tag_images/cleanser_o2_no.png` },
    { value: 'cleanser_cl_o2', label: '염소&산소 표백제O', image: `${process.env.PUBLIC_URL}/tag_images/cleanser_cl_o2.png` },
    { value: 'cleanser_cl_o2_no', label: '염소&산소 표백제X', image: `${process.env.PUBLIC_URL}/tag_images/cleanser_cl_o2_no.png` },
  ];
  const options1 = [
    { value: 'dry_hand_no', label: '손으로 짜기 금지', image: `${process.env.PUBLIC_URL}/tag_images/dry_hand_no.png` },
    { value: 'dry_hand_weak', label: '손으로 약하게 짜기', image: `${process.env.PUBLIC_URL}/tag_images/dry_hand_weak.png` },
    { value: 'dry_machine_no', label: '건조기 사용 X', image: `${process.env.PUBLIC_URL}/tag_images/dry_machine_no.png` },
    { value: 'dry_machine_yes', label: '건조기 사용 O', image: `${process.env.PUBLIC_URL}/tag_images/dry_machine_yes.png` },
    { value: 'dry_floor_shade', label: '그늘진 바닥 건조', image: `${process.env.PUBLIC_URL}/tag_images/dry_floor_shade.png` },
    { value: 'dry_floor_sun', label: '햇빛 바닥 건조', image: `${process.env.PUBLIC_URL}/tag_images/dry_floor_sun.png` },
    { value: 'dry_hanger_shade', label: '그늘진 곳에 옷걸이', image: `${process.env.PUBLIC_URL}/tag_images/dry_hanger_shade.png` },
    { value: 'dry_hanger_sun', label: '햇빛 옷걸이', image: `${process.env.PUBLIC_URL}/tag_images/dry_hanger_sun.png` },
  ]
  const options2 = [
    { value: 'dry_hand_no', label: '손으로 짜기 금지', image: `${process.env.PUBLIC_URL}/tag_images/dry_hand_no.png` },
    { value: 'dry_hand_weak', label: '손으로 약하게 짜기', image: `${process.env.PUBLIC_URL}/tag_images/dry_hand_weak.png` },
    { value: 'dry_machine_no', label: '건조기 사용 X', image: `${process.env.PUBLIC_URL}/tag_images/dry_machine_no.png` },
    { value: 'dry_machine_yes', label: '건조기 사용 O', image: `${process.env.PUBLIC_URL}/tag_images/dry_machine_yes.png` },
    { value: 'dry_floor_shade', label: '그늘진 바닥 건조', image: `${process.env.PUBLIC_URL}/tag_images/dry_floor_shade.png` },
    { value: 'dry_floor_sun', label: '햇빛 바닥 건조', image: `${process.env.PUBLIC_URL}/tag_images/dry_floor_sun.png` },
    { value: 'dry_hanger_shade', label: '그늘진 곳에 옷걸이', image: `${process.env.PUBLIC_URL}/tag_images/dry_hanger_shade.png` },
    { value: 'dry_hanger_sun', label: '햇빛 옷걸이', image: `${process.env.PUBLIC_URL}/tag_images/dry_hanger_sun.png` },
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
  const [myImage, setImage] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] =useState('');
  const [selectedOption3, setSelectedOption3] = useState('');
  const [selectedOption4, setSelectedOption4] = useState('');
  const [selectedOption5, setSelectedOption5] = useState('');   
  const [useDropdown, setUseDropdown] = useState(true);
  const [customOption, setCustomOption] = useState('');
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const handleSelectChange1 = (selectedOption1) => { 
    setSelectedOption1(selectedOption1);
  };
  const handleSelectChange2 = (selectedOption2) => {
    setSelectedOption2(selectedOption2);
  };
  const handleSelectChange3 = (selectedOption3) => {
    setSelectedOption3(selectedOption3);
  };
  const handleSelectChange4 = (selectedOption4) => {
    setSelectedOption4(selectedOption4);
  };
  const handleSelectChange5 = (selectedOption5) => {
    setSelectedOption5(selectedOption5);
  };

  const handleCheckboxChange = () => {
    setUseDropdown(!useDropdown);
  };
  const handleInputChange = (event) => {
    setCustomOption(event.target.value);
  };
  useEffect(() => {
    const messageListener = (event) => {
      const selectedValue = event.data.toString();
      const matchingOption = options.find(option => option.value === selectedValue);
      const matchingOption2 = options2.find(option => option.value === selectedValue);
      const matchingOption3 = options3.find(option => option.value === selectedValue);
      const matchingOption4 = options4.find(option => option.value === selectedValue);
      const matchingOption5 = options5.find(option => option.value === selectedValue);

      if (matchingOption) {
        handleSelectChange(matchingOption.value);
        setSelectedOption(matchingOption.value);
        Swal.fire({
          title: "☆성공★",
          imageUrl: 'https://cdn4.iconfinder.com/data/icons/project-status-stickers-with-white-border/82/thumbs-up-hand-sticker-256.png',
          html: `
          태그가 입력되었습니다.
          <hr />
          입력되지 않은 부분은 추가로 입력해주세요
          `,
          confirmButtonText: "확인",
      });
        //alert(matchingOption.value);
      }
      if (matchingOption2) {
  
        handleSelectChange2(matchingOption2.value);
        setSelectedOption2(matchingOption2.value);
        Swal.fire({
          title: "☆성공★",
          imageUrl: 'https://cdn4.iconfinder.com/data/icons/project-status-stickers-with-white-border/82/thumbs-up-hand-sticker-256.png',
          html: `
          태그가 입력되었습니다.
          <hr />
          입력되지 않은 부분은 추가로 입력해주세요
          `,
          confirmButtonText: "확인",
      });
       // alert(matchingOption2.value);
      }
      if (matchingOption3) {

        handleSelectChange3(matchingOption3.value);
        setSelectedOption3(matchingOption3.value);
        Swal.fire({
          title: "☆성공★",
          imageUrl: 'https://cdn4.iconfinder.com/data/icons/project-status-stickers-with-white-border/82/thumbs-up-hand-sticker-256.png',
          html: `
          태그가 입력되었습니다.
          <hr />
          입력되지 않은 부분은 추가로 입력해주세요
          `,
          confirmButtonText: "확인",
      });
        //alert(matchingOption3.value);
      }
      if (matchingOption4) {
        Swal.fire({
          title: "☆성공★",
          imageUrl: 'https://cdn4.iconfinder.com/data/icons/project-status-stickers-with-white-border/82/thumbs-up-hand-sticker-256.png',
          html: `
          태그가 입력되었습니다.
          <hr />
          입력되지 않은 부분은 추가로 입력해주세요
          `,
          confirmButtonText: "확인",
      });
        handleSelectChange4(matchingOption4.value);
        setSelectedOption4(matchingOption4.value);
        //alert(matchingOption4.value);
      }
      if (matchingOption5) {
        Swal.fire({
          title: "☆성공★",
          imageUrl: 'https://cdn4.iconfinder.com/data/icons/project-status-stickers-with-white-border/82/thumbs-up-hand-sticker-256.png',
          html: `
          태그가 입력되었습니다.
          <hr />
          입력되지 않은 부분은 추가로 입력해주세요
          `,
          confirmButtonText: "확인",
      });
        handleSelectChange5(matchingOption5.value);
        setSelectedOption5(matchingOption5.value);
        //alert(matchingOption5.value);
      }
    };
    
  
    window.addEventListener('message', messageListener);
  
    return () => {
      window.removeEventListener('message', messageListener);
    };
  }, [ ]);

  const handleImage = (event) => {
    const file = event.target.files[0]; // 이미지 파일에 접근
  
    const reader = new FileReader();
    reader.onload = () => {
      const imageDataURL = reader.result; // 이미지 데이터 URL
      setImage(imageDataURL); // 이미지 데이터 URL을 상태에 업데이트
    };
    reader.readAsDataURL(file); // 이미지 파일을 데이터 URL로 변환
  
    // 나머지 코드
  };

  const handleSubmit = async () => {
    const selectedImgFile = img.current.files[0];
    //const selectedTagFiles = tag_image.current.files;
  
    
    //if (!selectedImgFile || !selectedTagFiles || selectedTagFiles.length === 0) {
      // Handle the case when no file is selected
    //  console.log('Please select an image and at least one tag file.');
     // return;
    //}
    const tagNames2 = Array.from([selectedOption, selectedOption1, selectedOption2, selectedOption3, selectedOption4, selectedOption5]);
    const values = Object.values(tagNames2).filter(item => item && item.value !== null).map(item => item.value);
    /*const tagNames = Array.from(selectedTagFiles).map((file) => {
      const fileName = file.name.split('/').pop(); // Extract the file name from the path
      const cleanFileName = fileName.replace('.png', ''); // Remove the .png extension
      return `${cleanFileName}`; // Construct the URL with baseURL and the modified file name
    });*/
    //const imgPath = URL.createObjectURL('img');
    /*const form = new FormData();
    form.append('user', sessionStorage.getItem('login_id'));
    form.append('product_name',  product_name.current.value);
    form.append('description',  description.current.value);
    form.append('filename',  img.current.files[0].name);
    form.append('tag', values);
*//*
const formData = new FormData();
formData.append('images', img.current.files[0]);

const payload = {
  user: sessionStorage.getItem('login_id'),
  product_name: product_name.current.value,
  description: description.current.value,
  tag: values
};
for (const key in payload) {
  formData.append(key, payload[key]);
}*/
//alert(img.current.files[0]);
const payload = new FormData();
payload.append('user', sessionStorage.getItem('login_id'));
payload.append('product_name', product_name.current.value);
payload.append('description', description.current.value);
//payload.append('images', myImage);
payload.append('filename', img.current.files[0].name);
payload.append('images', img.current.files[0]);
values.forEach((value) => {
  payload.append('tag', value);
});

try {
  const response = await axios.post(`${baseURL}/insert`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  if (response.status === 200) {
    const data = response.data;
    console.log(JSON.stringify(data));
  } else {
    throw new Error('Network response was not ok.');
  }
} catch (error) {
  console.log(`error: ${error}`);
}
/*    const payload = {
      user: sessionStorage.getItem('login_id'),
      product_name: product_name.current.value,
      description: description.current.value,
      images: myImage,
      filename: img.current.files[0].name,
      tag: values
      //tag : tagNames// Convert to a  list
    };


    try {
      const response = await axios.post(`${baseURL}/insert`, payload,{//payload, {
        headers: {
          //'Content-Type' : 'multipart/form-data'
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        //navigate('/');
        const data = response.data;
        console.log(JSON.stringify(data));
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.log(`error: ${error}`);
    }*/
  };
  

  return (
    <>
      <h2>옷 정보 등록</h2>
      <table>
        <tbody>
          <tr>
            <td>유저명</td>
            <td>
              <input defaultValue={sessionStorage.getItem('login_id')} readOnly />
            </td>
          </tr>
          <tr>
            <td>옷 이름</td>
            <td>
              <input ref={product_name} />
            </td>
          </tr>
          <tr>
            <td>옷 설명</td>
            <td>
              <textarea rows='5' cols='60' ref={description}  />
            </td>
          </tr>
          <tr>
            <td>옷 이미지</td>
            <td>
              <input type='file' accept='image/*' ref={img} onChange={handleImage}/>
              <div>{myImage && ( <img alt="sample" src={myImage}
                                           style={{ margin: "auto", width: "100px", height: "100px"}} /> )}</div>
            </td>
            <td>태그</td>
            <td>
            <Select
              id="dropdown"
              value={options.find(option => option.value === selectedOption) ? options.find(option => option.value === selectedOption) : selectedOption}
              onChange={handleSelectChange}
              options={options}
              getOptionLabel={(option) => (
                <div>
                  <img src={option.image} alt="Option" style={{ width: '30px', marginRight: '10px' }} />
                  {option.label}
                </div>
              )}
              isClearable
              placeholder="-- 표백제 --"
            />
            <Select
              id="dropdown1"
              value={selectedOption1}
              onChange={handleSelectChange1}
              options={options1}
              getOptionLabel={(option1) => (
                <div>
                  <img src={option1.image} alt="Option2" style={{ width: '30px', marginRight: '10px' }} />
                  {option1.label}
                </div>
              )}
              isClearable
              placeholder="-- 건조방법1 --"
            />
            <Select
              id="dropdown2"
              value={options2.find(option => option.value === selectedOption2) ? options2.find(option => option.value === selectedOption2) : selectedOption2}
              onChange={handleSelectChange2}
              options={options2}
              getOptionLabel={(option2) => (
                <div>
                  <img src={option2.image} alt="Option2" style={{ width: '30px', marginRight: '10px' }} />
                  {option2.label}
                </div>
              )}
              isClearable
              placeholder="-- 건조방법2--"
            />
            <Select
              id="dropdown3"
              value={options3.find(option => option.value === selectedOption3) ? options3.find(option => option.value === selectedOption3) : selectedOption3}
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
              value={options4.find(option => option.value === selectedOption4) ? options4.find(option => option.value === selectedOption4) : selectedOption4}
              onChange={handleSelectChange4}
              options={options4}
              getOptionLabel={(option) => (
                <div>
                  <img src={option.image} alt="Option" style={{ width: '30px', marginRight: '10px' }} />
                  {option.label}
                </div>
              )}
              isClearable
              placeholder="-- 다림질 --"
            />
            <Select
              id="dropdown5"
              value={options5.find(option => option.value === selectedOption5) ? options5.find(option => option.value === selectedOption5) : selectedOption5}
              onChange={handleSelectChange5}
              options={options5}
              getOptionLabel={(option) => (
                <div>
                  <img src={option.image} alt="Option" style={{ width: '30px', marginRight: '10px' }} />
                  {option.label}
                </div>
              )}
              isClearable
              placeholder="-- 세탁방법 --"
            />
              
            </td>
            <IFrameComponent></IFrameComponent>
          </tr>
          <tr>
            <td colSpan='2' align='center'>
              <button type='button' onClick={handleSubmit}>
                확인
              </button>
              <button onClick={() => navigate('/')}>목록</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
const AppStyle = styled.div`
  margin: 0 8px 0 8px;
  img {
    max-width: 325px;
  }
  label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
export default WriteProduct;

/*import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import './main.css';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

function WriteProduct() {
  const baseURL = 'https://192.168.0.4:3000';
  const navigate = useNavigate();
  const product_name = useRef();
  const description = useRef();
  const img = useRef();
  const tag_image = useRef();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('User', sessionStorage.getItem('login_id'));
    formData.append('product_name', product_name.current.value);
    formData.append('description', description.current.value);
    formData.append('filename', img.current.files[0]);
    formData.append('tag', tag_image.current.files[0]);

    try {
      const response = await axios.post(`${baseURL}/insert`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'//,'application/json',
        },
      });

      if (response.status === 200) {
        navigate('/');
        const data = response.data;
        console.log(JSON.stringify(data));
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  return (
    <>
      <h2>옷 정보 등록</h2>
      <table>
        <tbody>
          <tr>
            <td>유저명</td>
            <td>
              <input defaultValue={sessionStorage.getItem('login_id')} readOnly />
            </td>
          </tr>
          <tr>
            <td>옷 이름</td>
            <td>
              <input ref={product_name} />
            </td>
          </tr>
          <tr>
            <td>옷 설명</td>
            <td>
              <textarea rows='5' cols='60' ref={description} />
            </td>
          </tr>
          <tr>
            <td>옷 이미지</td>
            <td>
              <input type='file' ref={img} />
            </td>
            <td>태그</td>
            <td>
              <input type='file' multiple={true} ref={tag_image} />
            </td>
          </tr>
          <tr>
            <td colSpan='2' align='center'>
              <button type='button' onClick={handleSubmit}>
                확인
              </button>
              <button onClick={() => navigate('/')}>목록</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default WriteProduct;*/

/*import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import './main.css';
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

function WriteProduct() {
  //const baseURL = '172.19.87.48';
  const baseURL = 'https://192.168.0.4:3000';
  const navigate = useNavigate();
  const product_name = useRef();
  const description = useRef();
  const img = useRef();
  const tag_image = useRef();
  function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }
  const csrfToken = getCookie('csrftoken'); 
  return (
    <>
      <h2>옷 정보 등록</h2>
      <table>
        <tbody>
        <tr>
            <td>유저명</td>
            <td><input defaultValue={sessionStorage.getItem('login_id')} readOnly/></td>
          </tr>
          <tr>
            <td>옷 이름</td>
            <td><input ref={product_name} /></td>
          </tr>
          <tr>
            <td>옷 설명</td>
            <td><textarea rows='5' cols='60' ref={description} /></td>
          </tr>
          <tr>
            <td>옷 이미지</td>
            <td>
              <input type='file' ref={img} />
            </td>
            <td>태그</td>
            <td>
              <input type='file' multiple={true} ref={tag_image} />
            </td>
          </tr>
          <tr>
            <td colSpan='2' align='center'>
              <button type='button' onClick={() => {
                const form = new FormData();
                form.append('User', sessionStorage.getItem('login_id').valueOf());
                form.append('product_name', product_name.current.value);
                form.append('description', description.current.value);
                form.append('filename', img.current.value.split('/').pop().split('\\').pop());
                form.append('tag', tag_image.current.value.split('/').pop().split('\\').pop());
                fetch(baseURL + '/insert', {
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                  },
                  mode: 'cors',
                  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                  credentials: 'include', // include, *same-origin, omit
                  method: 'post',
                  encType: 'application/json',//'multipart/form-data',
                  //body: JSON.stringify(form),                   
                })
                .then((response) => {
                  if(response.ok){
                    navigate('/');
                    return response.json();
                  }
                  throw new Error('Network response was not ok.');
                })
                .then((data) => {
                  console.log(JSON.stringify(data));
                }).catch((error)=>{
                  console.log(`error: ${error}`)
                });
              }}>확인</button>
              <button onClick={() => navigate('/')}>목록</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default WriteProduct;*/