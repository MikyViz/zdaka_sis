import React, { createContext, useState } from 'react';
import axios from 'axios';

// Создание контекста
const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {

  const [globalState, setGlobalState] = useState({
    user: null,
    org: null,
  });
  const getData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const meRes = await axios.get('http://localhost:8080/users/me', { headers: { 'Authorization': `Bearer ${token}`, }, });
        const myOrgRes = await axios.get(`http://localhost:8080/organizations/${meRes.data.orgId}`, { headers: { 'Authorization': `Bearer ${token}`, }, });
        if (meRes.data) {
          setGlobalState(prevState => (
            { ...prevState, user: meRes.data, org: myOrgRes.data }
          ));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState, getData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateProvider, GlobalStateContext };
