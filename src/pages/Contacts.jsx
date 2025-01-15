import React, { useRef } from 'react';
import axios from 'axios';
import ContactForm from '../components/ContactForm'
import '../styles/contacts.css'
import { v4 as uuidv4 } from 'uuid';


export default function Contacts() {
  const createFormRef = useRef();
  const createReq = async (formData) => {
    try {
      // const Id = uuidv4();
      // formData.Id = Id;
      const dataWithId = { ...formData, Id: uuidv4() };
      console.log(dataWithId);
      if (localStorage.getItem('token')) {
        const createResponse = await axios.post('http://localhost:8080/users/', dataWithId, {
          headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        }); 
      }else console.log( '🐌');
      
      console.log('Response from server:', createResponse?.data);
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };
  return (
    <div className="wrapper d-flex flex-column align-items-center justify-content-center">
      <div className="w-50 p-3 ">
        <ContactForm 
        req = {createReq}
        btnText = 'Create an contact'
        styleClass='rounded-3 opacity-90' />
      </div>
    </div>)
};
