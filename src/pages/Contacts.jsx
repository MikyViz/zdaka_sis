import React, { useState } from 'react';
import axios from 'axios';
import ContactForm from '../components/ContactForm'
import '../styles/contacts.css'
import { v4 as uuidv4 } from 'uuid';


export default function Contacts() {
  // const createFormRef = useRef();
  const [itsOK, setItsOk] = useState(false);
  const [isntOK, setIsntsOk] = useState(false);
  const createReq = async (formData) => {
    try {
      // const Id = uuidv4();
      // formData.Id = Id;
      const dataWithId = { ...formData, Id: uuidv4() };
      console.log(dataWithId);
      let createResponse;
      if (localStorage.getItem('token')) {
        createResponse = await axios.post('http://localhost:8080/users/', dataWithId, {
          headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        setItsOk(true);
      } else setIsntsOk(true);

      console.log('Response from server:', createResponse?.data);
    } catch (error) {
      setIsntsOk(true)
      console.error('Error sending data to server:', error);
    }
  };
  return (
    <div className="wrapper d-flex flex-column align-items-center justify-content-center">
      <div className="w-50 p-3 ">
        <ContactForm
          req={createReq}
          btnText='Create an contact'
          styleClass='rounded-3 opacity-90' />
       

      </div>
       {itsOK && (<div className="alert alert-success w-75 fs-3" role="alert">
          The contact was added successfull! 🎉🎉
        </div>)}
        {isntOK && (<div class="alert alert-danger w-75 fs-3" role="alert">
          Something go wrong, bro...😥
        </div>)}
    </div>)
};
