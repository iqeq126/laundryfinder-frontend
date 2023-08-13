import React, { useState } from 'react';
import axios from 'axios';

const OCRComponent = () => {
  const [imageFile, setImageFile] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const performOCR = async () => {
    if (!imageFile) {
      alert('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const response = await axios.post('https://api.ocr.space/parse/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          language: 'kor',
          isOverlayRequired: 'true',
          apikey: 'K84460092488957', // Replace with your actual API key
        },
      });

      if (response.data && response.data.ParsedResults) {
        const parsedText = response.data.ParsedResults[0]?.ParsedText;
        setRecognizedText(parsedText || 'No text recognized.');
      } else {
        setRecognizedText('Error in OCR processing.');
      }
    } catch (error) {
      console.error(error);
      setRecognizedText('Error in OCR processing.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={performOCR}>Recognize Text</button>
      <div>
        <h3>Recognized Text:</h3>
        <p>{recognizedText}</p>
      </div>
    </div>
  );
};

export default OCRComponent;
