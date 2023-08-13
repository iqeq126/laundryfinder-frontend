import React, { useEffect, useState } from 'react';
import axios from 'axios';
const LaundryFinder = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [laundries, setLaundries] = useState([]);
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
  
    useEffect(() => {
      if (latitude && longitude) {
        const searchLaundries = async () => {
          try {
            const response = await axios.get(
              `https://dapi.kakao.com/v2/local/search/keyword.json?query=세탁소&y=${latitude}&x=${longitude}`,
              {
                headers: {
                  Authorization: 'd4c9cbd2d1063e593ba0a92d69fae691'
                }
              }
            );
  
            setLaundries(response.data.documents);
          } catch (error) {
            setError('Failed to fetch laundries.');
          }
        };
  
        searchLaundries();
      }
    }, [latitude, longitude]);
  
    return (
      <div>
        {latitude && longitude ? (
          <div>
            <h2>Laundries near your location:</h2>
            <ul>
              {laundries.map(laundry => (
                <li key={laundry.id}>{laundry.place_name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {error && <p>Error: {error}</p>}
      </div>
    );
  };
  export default LaundryFinder; 