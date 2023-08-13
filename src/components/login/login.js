
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function Login() {
    const baseURL = `https://172.19.86.24`; 
    //const baseURL = `https://192.168.0.2`; 
    const [login_id, setlogin_id] = useState('')
    const [password, setpassword] = useState('')
 
    const user = {
      login_id: login_id,
      password: password
    };
    
    const client = axios.create({
      baseURL: `http://localhost:8000`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user) 
    });

    const handlelogin_id = (e) => {
        setlogin_id(e.target.value)
    }
 
    const handlepassword = (e) => {
        setpassword(e.target.value)
    }
 
    const onClickLogin = () => {
        //console.log('click login')
        //console.log('ID : ', login_id)
        //console.log('password : ', password)
        axios.post(baseURL + ':3000/backend/login',  {
          //axios.post('http://localhost:8000/backend/login',  {
          login_id: login_id,
          password: password
        })
        .then(res => {
            console.log(res)
            console.log('res.data.login_id :: ', res.data.login_id)
            if(res.data.login_id === undefined){
                // id 일치하지 않는 경우 login_id = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
                console.log('======================',res.data)
                alert('입력하신 id 가 일치하지 않습니다.')
            } else if(res.data.login_id === null){
                // id는 있지만, password 는 다른 경우 login_id = null , msg = undefined
                console.log('======================','입력하신 비밀번호 가 일치하지 않습니다.')
                alert('입력하신 비밀번호 가 일치하지 않습니다.')
            } else if(res.data.login_id === login_id) {
                // id, password 모두 일치 login_id = login_id1, msg = undefined
                console.log('======================','로그인 성공')
                sessionStorage.setItem('login_id', res.data.login_id)
            }
            // 작업 완료 되면 페이지 이동(새로고침)
            document.location.href = '/'
        })
        .catch()
    }
 
     useEffect(() => {
         axios.post(baseURL + ':3000/backend/login',  {
          //axios.post('http://localhost:8000/backend/login',  {
          login_id: login_id,
          password: password
        })
         .then(res => console.log(res))
         .catch()
     },[])
 
    return(
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor='input_id'>ID : </label>
                <input type='text' name='input_id' value={login_id} onChange={handlelogin_id} />
            </div>
            <div>
                <label htmlFor='input_password'>password : </label>
                <input type='password' name='input_password' value={password} onChange={handlepassword} />
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>Login</button>
            </div>
        </div>
    )
}
 
export default Login;

const defaultDiv = styled.div`
  *{
    padding: 0;
    margin: 0;
    border: none;
  }
  body{
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }
`;


const loginDiv = styled.div`
.login-wrapper{
    width: 400px;
    height: 350px;
    padding: 40px;
    box-sizing: border-box;
}

.login-wrapper > h2{
    font-size: 24px;
    color: #6A24FE;
    margin-bottom: 20px;
}
#login-form > input{
    width: 100%;
    height: 48px;
    padding: 0 10px;
    box-sizing: border-box;
    margin-bottom: 16px;
    border-radius: 6px;
    background-color: #F8F8F8;
}
#login-form > input::placeholder{
    color: #D2D2D2;
}
#login-form > input[type="submit"]{
    color: #fff;
    font-size: 16px;
    background-color: #6A24FE;
    margin-top: 20px;
}

`;


/*import React, { useState, useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      window.location.replace('http://localhost:3000/dashboard');
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();

    const user = {
      email: email,
      password: password
    };

    fetch('http://127.0.0.1:8000/api/v1/mall/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if (data.key) {
          localStorage.clear();
          localStorage.setItem('token', data.key);
          window.location.replace('http://localhost:3000/dashboard');
        } else {
          setEmail('');
          setPassword('');
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
    <div>
      {loading === false && <h1>Login</h1>}
      {errors === true && <h2>Cannot log in with provided credentials</h2>}
      {loading === false && (
        <form onSubmit={onSubmit}>
          <label htmlFor='email'>Email address:</label> <br />
          <input
            name='email'
            type='email'
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />{' '}
          <br />
          <label htmlFor='password'>Password:</label> <br />
          <input
            name='password'
            type='password'
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />{' '}
          <br />
          <input type='submit' value='Login' />
        </form>
      )}
    </div>
  );
};

export default Login;*/