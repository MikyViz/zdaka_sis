import React, { useRef } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from 'mdb-react-ui-kit';
import '../styles/registration.css';
import RegisterForm from '../components/RegisterForm';

function Registration() {
  const registerFormRef = useRef();
  const registerReq = async () => {
    try {
      const orgId = uuidv4();
      const formData = registerFormRef.current.getFormData();
      const orgData = {
        Id: orgId,
        name: formData.org
      };

      const managerData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        cellPhone: formData.cellPhone,
        email: formData.email,
        password: formData.password,
        OrganizationId: orgId
      };
      console.log(orgData);
      console.log(managerData);
      
      const orgResponse = await axios.post('http://localhost:8080/organizations/', orgData);
      const managerResponse = await axios.post('http://localhost:8080/users/register', managerData);

      console.log('Response from server:', orgResponse.data);
      console.log('Response from server:', managerResponse.data);
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  return (
    <MDBContainer
      fluid
      className="p-4 background-radial-gradient overflow-hidden"
    >
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1
            className="my-5 display-3 fw-bold ls-tight px-3"
            style={{ color: 'hsl(218, 81%, 95%)' }}
          >
            The best offer <br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>for your kupah</span>
          </h1>

          <p className="px-3" style={{ color: 'hsl(218, 81%, 85%)' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora
            at cupiditate quis eum maiores libero veritatis? Dicta facilis sint
            aliquid ipsum atque?
          </p>
        </MDBCol>

        <MDBCol md="6" className="position-relative">
          <div
            id="radius-shape-1"
            className="position-absolute rounded-circle shadow-5-strong"
          ></div>
          <div
            id="radius-shape-2"
            className="position-absolute shadow-5-strong"
          ></div>

          {/*            👇 CARD 👇 */}

          <MDBCard className="my-5 bg-glass">
            <MDBCardBody className="p-5">
              <RegisterForm ref={registerFormRef}/>
              <MDBBtn className="w-100 mb-4" size="md" onClick={registerReq}>
                sign up
              </MDBBtn>

              <div className="text-center">
                <p>or sign up with:</p>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: '#1266f1' }}
                >
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: '#1266f1' }}
                >
                  <MDBIcon fab icon="x-twitter" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: '#1266f1' }}
                >
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: '#1266f1' }}
                >
                  <MDBIcon fab icon="linkedin-in" size="sm" />
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Registration;
