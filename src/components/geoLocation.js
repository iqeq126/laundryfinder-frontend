import React, { useEffect, useState } from 'react';
 // eslint-disable-next-line
//const { kakao } = window;

const GeoLocationComponent = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          error => {
            setError(error.message);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    }, []);
  
    return (
      <div>
        {latitude && longitude ? (
          <p>
            Latitude: {latitude}, Longitude: {longitude}
          </p>
        ) : (
          <p>Loading...</p>
        )}
        {error && <p>Error: {error}</p>}
      </div>
    );
  };
  
  export default GeoLocationComponent;