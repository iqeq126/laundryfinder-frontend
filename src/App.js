import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ListProduct from './components/ListProduct';
import WriteProduct from './components/WriteProduct';
import DetailProduct from './components/DetailProduct';
import ClothesProduct from './components/ClothesInformation';
import MapProduct from './components/MapProduct';
import Header from './components/header';
import Login from './components/login/login';
import Signup from './components/login/signup';
import Dropdown from './components/dropdown2';
import JSONDataFetching from './components/JSONDatafetching';
// eslint-disable-next-line
import GeoLocationComponent from './components/geoLocation';
//import LaundryFinder from './components/LaundryFinder';
import Mypage from './components/MyPage';
import UserInfo from './components/UserInfo';
// import UserInfoState from './components/UserInfoState';
import Authentication from './components/login/authentication';
import Openweathermap from './components/weather/openWeather';
import WebCamCapture from './components/WebCamCapture';
import WeatherApp from './components/weather/WeatherApp';
import Onnx from './components/onnx';
import OCRComponent from './components/OCRComponent';

function App() {
    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        if(sessionStorage.getItem('login_id') === null){
        // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
          console.log('isLogin ?? :: ', isLogin)
          setIsLogin(false)
        } else {
        // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
        // 로그인 상태 변경
          setIsLogin(true)
          console.log('isLogin ?? :: ', isLogin)
        }
      })
    
    return (
    <>
      <BrowserRouter>
      <Header path='/header' element={< Header/>}/>
      {
        sessionStorage.getItem('login_id') ?
        <Routes>
          <Route path='/ocr' element={< OCRComponent />}/>
          <Route path='/yolov5-onnx' element={< Onnx />}/>
          <Route path='/webcam' element={< WebCamCapture />}/>
          <Route path='/weather' element={ < WeatherApp/>}/>
          <Route path='/openweathermap' element={<Openweathermap />} />   
          <Route path='/login' element={<Login />} />         
          <Route path='/user' element={<UserInfo />} />
          <Route path='/laundry' element={<Mypage />} />
          <Route path='/loc' element={<GeoLocationComponent />} />
          <Route path='/dropdown' element={<Dropdown />} />
          <Route path='/json' element={<JSONDataFetching />} />
          <Route path='/clothes' element={< ClothesProduct/>}/>
          <Route path='/signup' element={< Signup/>}/>
          <Route path='/write' element={<WriteProduct />} />
          <Route path='/detail/:product_code' element={<DetailProduct />} />
          <Route path='/map' element={<MapProduct />} />
          <Route path='/*' element={<ListProduct />} />
        </Routes>
        :
        <Routes>
            <Route path='/login' element={<Login />} />
        </Routes>
        }
      </BrowserRouter>
    </>
  );
}
/*
import React, { Component } from 'react';

class App extends Component {
    state = {
        posts: []
    };

    async componentDidMount() {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/');
            const posts = await res.json();
            this.setState({
                posts
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                {this.state.posts.map(item => (
                    <div key={item.id}>
                        <h1>{item.title}</h1>
                        <span>{item.content}</span>
                    </div>
                ))}
            </div>
        );
    }
}
*/
export default App;