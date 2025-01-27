import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; 
import ContactForm from '../components/ContactForm'
import '../styles/contacts.css'
import { GlobalStateContext } from "../GlobalStateProvider";

export default function ContactsList() {
  const { globalState, setGlobalState, getData } = useContext(GlobalStateContext);
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const editPutReq = async (user) => {
    try {
      const putResponse = await axios.put(`http://localhost:8080/users/${user.Id}`,
        user,
        { headers: { 'authorization': `Bearer ${localStorage.getItem('token')}`, } })
      console.log('Response from server:', putResponse?.data);}
      catch (error) {
        console.error('Error sending data to server:', error);
      }
    }

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
            usersOfOrgResponse.data.show = false;
            newList.push(usersOfOrgResponse.data);
          }
          setList(newList);
          return newList;
        }
        catch (error) {
          console.error('Error sending data to server:', error);
        }
      };
      allUsersReq();
    }
  }, [globalState.user, globalState.org])

  const shower = (index) => {
    setList(prevList => {
      const newList = prevList.map((item, i) => {
        if (i === index) { return { ...item, show: !item.show }; }
        return item;
      });
      return newList;
    });
  };


  const handleEditClick = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentUser(null);
  };

  const handleDeleteClick = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/users/${userId}`, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setList(prevList => prevList.filter(user => user.Id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100" style={{ background: 'rgb(175, 170, 211)' }}>
      {!globalState.user && <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>}
      {globalState.user && (
        <div className="card-wrapper">
          {list.map((user, index) => (
            <div key={index} className={`card p-3 m-3 ${user.show ? 'expanded' : ''}`} onClick={() => shower(index)}>
              <div className="d-flex justify-content-between align-items-center">
                <h3>{user.degree || ''} {`${user.firstName} ${user.lastName}`}
                  {user.isGabbay && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                    Gabbay
                    <span className="visually-hidden">isGabbay</span>
                  </span>}
                </h3>
                <div>
                  <Button variant="link" onClick={(e) => { e.stopPropagation(); handleEditClick(user); }}>
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  <Button variant="link" onClick={(e) => { e.stopPropagation(); handleDeleteClick(user.Id); }}>
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              </div>
              {user.show && <>{user.email && <p>{user.email}</p>}
                {user.cellPhone && <p>{user.cellPhone}</p>}
                {user.homePhone && <p>{user.homePhone}</p>}
                {(user.street || user.houseNum || user.apt) && <p>{`${user.street || ''} ${user.houseNum || ''}/${user.apt || ''} ${user.flore || ''}${user.flore ? '-th flore' : ''}`}</p>}
                {(user.neighborhood || user.city || user.country) && <p>{`${user.neighborhood || ''}, ${user.city || ''}, ${user.country || ''}`}</p>}
                {user.instructions && <div className="overflow-y-scroll">{user.instructions}</div>}
              </>}
              <div className="d-flex flex-row align-items-center mt-2">
                {user.isManager && <span className="badge bg-primary">Manager</span>}
                {user.isActive && <span className="badge bg-success">Active</span>}
                {!user.isActive && <span className="badge bg-danger">Inactive</span>}
              </div>
              {/* TODO add the num rendering */}

            </div>
          )
          )}
        </div>
      )}
      {currentUser && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ContactForm user={currentUser} btnText='Save Changes' req={editPutReq} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>)
};
