import React, { useEffect, useState } from 'react';

const UserInfoState = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/backend/token/user');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
     JSON.stringify(userData?.detail) ?
        <div></div>
      : 
        <div>ID : {JSON.stringify(userData?.user?.login_id)}</div>
  );
};

export default UserInfoState;