import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [login_id, setlogin_id] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlelogin_idChange = (event) => {
    setlogin_id(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/backend/token/login', { login_id, password });
      // Assuming the server responds with an authentication token
      const authToken = response.data.token;
      // Store the authentication token in local storage
      localStorage.setItem('authToken', authToken);
      // Redirect or perform other actions upon successful login
    } catch (error) {
      setError('Invalid login_id or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="login_id">login_id:</label>
        <input
          type="text"
          id="login_id"
          value={login_id}
          onChange={handlelogin_idChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;