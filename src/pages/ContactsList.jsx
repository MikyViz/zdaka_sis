import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../styles/contacts.css'
import { GlobalStateContext } from "../GlobalStateProvider";

export default function ContactsList() {
  const { globalState, setGlobalState, getData } = useContext(GlobalStateContext);

  const [itsOK, setItsOk] = useState(false);
  const [isntOK, setIsntsOk] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!globalState.user || !globalState.org) { getData(); }
    else {
      const allUsersReq = async () => {
        try {
          const orgUserResponse = await axios.get(`http://localhost:8080/orgsUsers/${globalState.user.orgId}`,
            { headers: { 'authorization': `Bearer ${localStorage.getItem('token')}`, } })
          console.log('Response from server:', orgUserResponse?.data);
          const newList = [];
          for (const orgUser of orgUserResponse.data) {
            const usersOfOrgResponse = await axios.get(`http://localhost:8080/users/${orgUser.UserId}`,
              { headers: { 'authorization': `Bearer ${localStorage.getItem('token')}`, } }
            );
            newList.push(usersOfOrgResponse.data);
          }
          setList(newList);
          return newList;
        }
        catch (error) {
          setIsntsOk(true);
          console.error('Error sending data to server:', error);
        }
      };
      allUsersReq();
    }
  }, [globalState.user, globalState.org])

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100" style={{ background: 'rgb(175, 170, 211)' }}>
      {!globalState.user && <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>}
      {globalState.user && (
        <div className="card-wrapper">
        {list.map((user, index) => (
          <div key={index} className="card p-3 m-3">
            <h3>{user.degree || ''} {`${user.firstName} ${user.lastName}`}</h3>
            <p>{user.email}</p>
          </div>
          )
          )}
        </div>
      )}
    </div>)
};
