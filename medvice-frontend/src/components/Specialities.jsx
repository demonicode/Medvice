import axios from 'axios';
import { useState } from 'react';
import {Image} from "@nextui-org/react";
import {Accordion, AccordionItem} from "@nextui-org/react";
import {Spacer} from "@nextui-org/react";
import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import {Button} from "@nextui-org/react";



const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [response, setResponse] = useState('');


  const uploadImage = async (formData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('JWT token not found in local storage.');
      return;
    }

    const config = {
      method: 'post',
      url: `${process.env.API_URL}/models/skincancer`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: formData,
      maxBodyLength: Infinity,
    };

    try {
      const response = await axios(config);
      setResponse(response.data); // Assuming the response data is what you want to display
    } catch (error) {
      console.error('Error uploading image:', error);
      setResponse('Error uploading image');
    }
  };

  const uploadImageWebcam = async () => {
    const res = await fetch(imgSrc);
    const blob = await res.blob();
    const formData = new FormData();
    formData.append("file", blob, "image.jpg");
    uploadImage(formData);
  };
  

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    uploadImageWebcam();
  }, [webcamRef, setImgSrc]);

  return (
    <>
      {!imgSrc ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <Spacer y={3} />
          
        </>
      ) : (
        <img
          src={imgSrc}
          alt="Captured"
          style={{ width: '100%' }} // Adjust width as needed
        />
      )}
      <Spacer y={5} />
      <Button onClick={capture}>Capture photo</Button>
      {response && <div className="mt-4">Result : {JSON.stringify(response.result)}</div>}
      <Spacer y={10} />
    </>
  );
};

const Specialities = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [response, setResponse] = useState('');
  const [showCam, setShowCam] = useState(true);

  const handleImageChange = (e) => {
    setResponse('');
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setShowCam(false);
      };

      reader.readAsDataURL(e.target.files[0]);
      const formData = new FormData();
      formData.append('file', imageFile);
      uploadImage(formData);
    }
  };

  const uploadImage = async (formData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('JWT token not found in local storage.');
      return;
    }

    const config = {
      method: 'post',
      url: `${process.env.API_URL}/models/skincancer`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: formData,
      maxBodyLength: Infinity,
    };

    try {
      const response = await axios(config);
      setResponse(response.data); // Assuming the response data is what you want to display
    } catch (error) {
      console.error('Error uploading image:', error);
      setResponse('Error uploading image');
    }
  };

  return (
    <Accordion>
      <AccordionItem key="1" aria-label="Accordion 1" title="Skin Cancer Detection">
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">

        {showCam? <WebcamCapture/> : (<div></div>)}
        {selectedImage && <Image width={300} src={selectedImage}/>}    
          <Spacer y={5} />
          <input type="file" onChange={handleImageChange} className="mb-4" />
          <Spacer y={10} />
          {response && <div className="mt-4">Result : {JSON.stringify(response.result)}</div>}
        </div>
      </div>
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Diabetes"></AccordionItem>
    </Accordion>  

    
  );
};

export default Specialities;
