import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from '../components/ContactForm'
import { GlobalStateContext } from '../GlobalStateProvider';
import '../styles/contacts.css'
import { v4 as uuidv4 } from 'uuid';


export default function Contacts() {
  const [itsOK, setItsOk] = useState(false);
  const [isntOK, setIsntsOk] = useState(false);
  const { globalState, getData } = useContext(GlobalStateContext);
  useEffect(() => {
    if (!globalState)
      getData();
  }, []);
  useEffect(() => {
    if (itsOK || isntOK) {
      const timer = setTimeout(() => {
        setItsOk(false);
        setIsntsOk(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [itsOK, isntOK]);

  const createReq = async (formData) => {
    try {

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
        setIsntsOk(false);
      } else {
        setItsOk(false);
        setIsntsOk(true);
      }

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
      {isntOK && (<div className="alert alert-danger w-75 fs-3" role="alert">
        Something go wrong, bro...😥
      </div>)}
    </div>)
};
