import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBCard,
  MDBCardBody,
  MDBBtn,
} from 'mdb-react-ui-kit';

const RegisretForm = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    org: '',
    cellPhone: '',
    password: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useImperativeHandle(ref, () => ({
    getFormData: () => formData,
  }));

  return (
    <form>
      <MDBInput
        wrapperClass="mb-4"
        label="Organization"
        id="org"
        type="text"
        value={formData.org}
        onChange={handleChange}
      />

      <MDBRow>
        <MDBCol col="6">
          <MDBInput
            wrapperClass="mb-4"
            label="First name"
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
          />
        </MDBCol>

        <MDBCol col="6">
          <MDBInput
            wrapperClass="mb-4"
            label="lastName"
            id="lastName"
            type="text"
            value={formData.lastName}
        onChange={handleChange}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol col="6">
          <MDBInput 
          wrapperClass="mb-4"
           label="Email" 
           id="email" 
           type="email"
           value={formData.email}
        onChange={handleChange}
           />
        </MDBCol>
        <MDBCol col="6">
          <MDBInput
            wrapperClass="mb-4"
            label="Cell phone"
            id="cellPhone"
            type="cell phone"
            value={formData.cellPhone}
        onChange={handleChange}
          />
        </MDBCol>
      </MDBRow>
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />

      {/*       <MDBRow> */}
      {/*         <MDBCol col="6"> */}
      {/*           <MDBInput */}
      {/*             wrapperClass="mb-4" */}
      {/*             label="Manager name" */}
      {/*             id="Manager name" */}
      {/*             type="text" */}
      {/*           /> */}
      {/*         </MDBCol> */}

      {/*         <MDBCol col="6"> */}
      {/*           <MDBInput */}
      {/*             wrapperClass="mb-4" */}
      {/*             label="Manager email" */}
      {/*             id="Manager email" */}
      {/*             type="text" */}
      {/*           /> */}
      {/*         </MDBCol> */}
      {/*       </MDBRow> */}
    </form>
  );
})
export default RegisretForm