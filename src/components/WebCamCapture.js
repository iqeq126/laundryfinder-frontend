import React, { useRef, useState } from 'react';
import axios from 'axios';

const WebCamCapture = () => {
  const videoRef = useRef(null);
  const [imageData, setImageData] = useState('');
  const baseURL = 'https://172.19.87.96';
  //const baseURL = 'https://192.168.0.4';
  const startWebcam = () => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.log('Error accessing webcam:', error);
        });
    }
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const capturedImage = canvas.toDataURL('image/jpeg');
    setImageData(capturedImage);

    // 이미지 데이터를 Django REST Framework로 전송
    const requestData = {
      image: capturedImage,
    };

    axios.post(baseURL + ':3000/api2/label/', requestData)
      .then((response) => {
        console.log('Labeling result:', response.data);
        // 라벨링 결과 처리
      })
      .catch((error) => {
        console.log('Error labeling image:', error);
        // 에러 처리
      });
  };

  return (
    <div>
      <button onClick={startWebcam}>Start Webcam</button>
      <br />
      <video ref={videoRef} autoPlay />
      <br />
      <button onClick={captureImage}>Capture Image</button>
      <br />
      {imageData && <img src={imageData} alt="Captured" />}
    </div>
  );
};

export default WebCamCapture;