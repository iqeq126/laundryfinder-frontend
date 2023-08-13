import React, { useEffect, useState } from 'react';

function JSONDataFetching() {
  const [jsonData, setJsonData] = useState(null);
  const apiUrl = '/getWthrDataList?serviceKey=RCRS2BYQrxm9Ughup5pUew%2BQJljutDtoR2FFUrfs8MxNosEYPRHmBqLEWifOLl7vi6jgSc45OWHSmfZySLoUiQ%3D%3D&dataType=json&numOfRows=10&pageNo=1&dataCd=ASOS&dateCd=DAY&startDt=20230401&endDt=20230405&stnIds=232'; // Replace with your API URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };

    fetchData();
  }, []);

  if (!jsonData) {
    return <div>Loading...</div>;
  }

  return (
    <pre>{JSON.stringify(jsonData, null, 2)}</pre>
  );
}

export default JSONDataFetching;
