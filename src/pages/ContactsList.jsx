import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Row, Col, Card, Badge, Spinner } from 'react-bootstrap';
import ContactForm from '../components/ContactForm';
import '../styles/contacts.css';
import { GlobalStateContext } from "../GlobalStateProvider";

export default function ContactsList() {
  const { globalState, setGlobalState, getData } = useContext(GlobalStateContext);
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedGabbay, setSelectedGabbay] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const editPutReq = async (user) => {
    try {
      const putResponse = await axios.put(`http://localhost:8080/users/${user.Id}`,
        user,
        { headers: { 'authorization': `Bearer ${localStorage.getItem('token')}`, } });
      console.log('Response from server:', putResponse?.data);
    }
    catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  const assignGabbay = async () => {
    try {
      const response = await axios.post('http://localhost:8080/users/assign-gabbay', {
        gabbayId: selectedGabbay,
        userId: selectedUser,
      }, {
        headers: { 'authorization': `Bearer ${localStorage.getItem('token')}`, }
      });
      console.log('Response from server:', response?.data);
      setShowAssignModal(false);
      setSelectedGabbay('');
      setSelectedUser('');
    } catch (error) {
      console.error('Error assigning user to gabbay:', error);
    }
  };

  useEffect(() => {
    if (!globalState.user || !globalState.org) {
      getData();
    }
    else {
      const allUsersReq = async () => {
        try {
          const newList = [];
          if (globalState.user.isManager) {
            // const orgUserResponse = await axios.get(`http://localhost:8080/orgsUsers/${globalState.user.orgId}`,
            //   { headers: { 'authorization': `Bearer ${localStorage.getItem('token')}`, } });
            // console.log('Response from server:', orgUserResponse?.data);
            // for (const orgUser of orgUserResponse.data) {
            //   const usersOfOrgResponse = await axios.get(`http://localhost:8080/users/${orgUser.UserId}`,
            //     { headers: { 'authorization': `Bearer ${localStorage.getItem('token')}`, } }
            //   );
            //   usersOfOrgResponse.data.show = false;
            //   newList.push(usersOfOrgResponse.data);
            // }

            const orgUserResponse = await axios.get(`http://localhost:8080/users/manager-contacts/${globalState.org}`,
              { headers: { 'authorization': `Bearer ${localStorage.getItem('token')}`, } });
            console.log('Response from server:', orgUserResponse?.data);
            orgUserResponse.data.forEach((user) => {
              user.show = false;
              newList.push(user);
            });

          }
          if (globalState.user.isGabbay) {
            const assignedUsersResponse = await axios.get(`http://localhost:8080/users/assign-gabbay/${globalState.user.Id}`, { headers: { 'authorization': `Bearer ${localStorage.getItem('token')}`, } });
            newList.push(...assignedUsersResponse.data);
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
  }, [globalState.user, globalState.org]);

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
    <div className="container-fluid" style={{ background: 'rgb(175, 170, 211)', minHeight: '100vh' }}>
      {!globalState.user && <Spinner animation="border" role="status" className="d-flex justify-content-center align-items-center">
        <span className="visually-hidden">Loading...</span>
      </Spinner>}
      {globalState.user && (
        <div className="container py-4">
          {globalState.user.isManager && <Row className="mb-3">
            <Col>
              <Button variant="primary" onClick={() => setShowAssignModal(true)}>Assign User to Gabbay</Button>
            </Col>
          </Row>}
          <Row>
            {list.map((user, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card onClick={() => shower(index)} style={{ cursor: 'pointer' }}>
                  <Card.Body>
                    <Card.Title>
                      {user.degree || ''} {`${user.firstName} ${user.lastName}`}
                      {user.isGabbay && <Badge bg="warning" className="ms-2">Gabbay</Badge>}
                    </Card.Title>
                    {user.show && (
                      <>
                        {user.email && <Card.Text>{user.email}</Card.Text>}
                        {user.cellPhone && <Card.Text>{user.cellPhone}</Card.Text>}
                        {user.homePhone && <Card.Text>{user.homePhone}</Card.Text>}
                        {(user.street || user.houseNum || user.apt) && (
                          <Card.Text>{`${user.street || ''} ${user.houseNum || ''}/${user.apt || ''} ${user.flore || ''}${user.flore ? '-th floor' : ''}`}</Card.Text>
                        )}
                        {(user.neighborhood || user.city || user.country) && (
                          <Card.Text>{`${user.neighborhood || ''}, ${user.city || ''}, ${user.country || ''}`}</Card.Text>
                        )}
                        {user.instructions && <Card.Text className="overflow-auto">{user.instructions}</Card.Text>}
                      </>
                    )}
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between align-items-center">
                    <div>
                      {user.isManager && <Badge bg="primary" className="me-1">Manager</Badge>}
                      {user.isActive ? (
                        <Badge bg="success">Active</Badge>
                      ) : (
                        <Badge bg="danger">Inactive</Badge>
                      )}
                    </div>
                    <div>
                      <Button variant="link" size="sm" onClick={(e) => { e.stopPropagation(); handleEditClick(user); }}>
                        <i className="bi bi-pencil-square fs-5"></i>
                      </Button>
                      <Button variant="link" size="sm" onClick={(e) => { e.stopPropagation(); handleDeleteClick(user.Id); }}>
                        <i className="bi bi-trash fs-5"></i>
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
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
      {showAssignModal && (
        <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Assign User to Gabbay</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formGabbay">
                <Form.Label>Select Gabbay</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedGabbay}
                  onChange={(e) => setSelectedGabbay(e.target.value)}
                >
                  <option value="">Select Gabbay</option>
                  {list.filter(user => user.isGabbay).map((gabbay) => (
                    <option key={gabbay.Id} value={gabbay.Id}>
                      {`${gabbay.firstName} ${gabbay.lastName}`}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formUser" className="mt-3">
                <Form.Label>Select User</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="">Select User</option>
                  {list.filter(user => !user.isGabbay).map((user) => (
                    <option key={user.Id} value={user.Id}>
                      {`${user.firstName} ${user.lastName}`}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" className="mt-3" onClick={assignGabbay}>
                Assign
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
