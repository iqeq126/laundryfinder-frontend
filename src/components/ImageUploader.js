import React from 'react';

const saveImage = (dataUrl, filename) => {
  // 이미지를 저장할 경로
  const imagePath = `/images/${filename}`;

  // 이미지를 저장하는 로직을 작성합니다.
  // 이 예시에서는 이미지를 public 폴더에 저장하는 것으로 가정합니다.
  fetch(imagePath, {
    method: 'PUT',
    body: dataUrl,
  })
    .then(() => {
      console.log('Image saved successfully!');
    })
    .catch((error) => {
      console.error('Error saving image:', error);
    });
};

const ImageUploader = () => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        const filename = file.name;
        saveImage(dataUrl, filename);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default ImageUploader;
