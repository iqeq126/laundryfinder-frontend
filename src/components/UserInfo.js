import React, { useEffect, useState } from 'react';

const UserInfo = () => {
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
        <div>로그인을 해주세요</div>
      : 
        <div>ID : {JSON.stringify(userData?.user?.login_id)}</div>
  );
};

export default UserInfo;