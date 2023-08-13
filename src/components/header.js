/* Header.js */
/*
import React from 'react';
import "../style/header.css"
const Header = () => {
  return (
    <section id="header">
    <div class="wrapper">
    <a href="/"><div class="title"><i class="fas fa-kiss-wink-heart"></i> LaundryHelper</div></a>
        <ul class="lists">
        </ul>
        <a href="/login"><div class="log">Log In</div></a>
    </div>
</section>
  );
};

export default Header;*/
import "../style/header.css"
import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
//import Axios from 'axios';	// 추가
//import Authentication from "./login/authentication";
import Login from "./login/login";

// import UserInfo from "./UserInfo";
import UserInfoState from "./UserInfoState";
const MenuList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .ant-menu {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
`;

function Header() {
  const baseURL = '172.19.86.24';
  //const baseURL = '192.168.0.2'; 
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
      if(sessionStorage.getItem('login_id') === null){
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
        console.log('isLogin ?? :: ', isLogin)
        console.log(sessionStorage.getItem('login_id') )
        setIsLogin(false)
      } else {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
        setIsLogin(true)
        console.log(sessionStorage.getItem('login_id') )
        console.log('isLogin ?? :: ', isLogin)
      }
    })
/*
  const [auth, setAuth] = useState('')

  useEffect(() => {
    if (localStorage.getItem('login_id') !== null) {
      setAuth(true)
    }
  }, [])
*/
  // fetch to axios 수정 
  const handleLogout = async () => {
    try {
      const response = await fetch('https://'+ baseURL + ':3000/backend/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add any required request body data
      });

      if (response.ok) {
        // Handle successful logout
        console.log('Logout successful');
        sessionStorage.setItem('login_id', '') 
        if(sessionStorage.getItem('login_id') === null){
          setIsLogin(false)
        }
        document.location.href = '/'
      } else {
        // Handle logout failure
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }

  };

  return(
   <div>
   <section id="header">
      <div class="wrapper">
      <a href="/"><div class="title"><i class="fas fa-kiss-wink-heart"></i> LaundryHelper</div></a>
          <ul class="lists">
          </ul>
          {
         !sessionStorage.getItem('login_id') ?
          <p>로그인을 해주세요</p>
          : <p>{sessionStorage.getItem('login_id')}</p> 
          }
        </div>
        </section>
      <MenuList>
        <Menu>
          { 
          !sessionStorage.getItem('login_id')
            ?
            <Menu.Item key="login">
            <Link to="/login">
            로그인
            </Link>
          </Menu.Item>
            :
            <Menu.Item key="logout" onClick={handleLogout}>
            로그아웃
            </Menu.Item>
          }
          {
            <Menu.Item key="laundry">
              <Link to="/laundry">
              세탁소위치
              </Link>
            </Menu.Item>
          }
          {
            <Menu.Item key="weather">
              <Link to="/weather">
              날씨
              </Link>
            </Menu.Item>
          }
          {
            <Menu.Item key="yolov5-onnx">
            <Link to="https://172.19.86.24:3001/yolov5-onnxruntime-web">
            태그 인식
            </Link>
             </Menu.Item>
          }
        </Menu>
      </MenuList>
      
      <hr/>
    </div>
  )
}
export default Header;