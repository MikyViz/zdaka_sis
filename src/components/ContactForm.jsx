import { useState, useImperativeHandle, forwardRef } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBSwitch,
  MDBBtn,
  MDBRadio,
  MDBBtnGroup,
} from 'mdb-react-ui-kit';

const ContactForm = function (props) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    street: '',
    houseNum: '',
    apt: '',
    email: '',
    floor: '',
    cellPhone: '',
    number: '',
    isActive: false, //TODO in DB it's not bool & it's named 'status'
    instructions: '',
    additionalInfo: '',
  });

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,   
    
    }));
    };
    console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.req(formData);
  };

  return (
    <MDBContainer fluid className={`${props.styleClass} p-4 bg-light bg-gradient overflow-hidden`}>
      <form>
        <MDBRow className="mb-3">
          <MDBCol md="6">
            <MDBInput id="firstName" label="First name" onChange={handleChange} />
          </MDBCol>
          <MDBCol md="6">
            <MDBInput id="lastName" label="Last name" onChange={handleChange} />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol md="4">
            <MDBInput id="country" label="Country" onChange={handleChange} />
          </MDBCol>
          <MDBCol md="4">
            <MDBInput id="city" label="City" onChange={handleChange} />
          </MDBCol>
          {/*           // TODO: Add neighborhood form */}
          <MDBCol md="4">
            <MDBInput id="street" label="Street" onChange={handleChange} />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol md="4">
            <MDBInput id="houseNum" label="House Number" onChange={handleChange} />
          </MDBCol>
          <MDBCol md="4">
            <MDBInput id="apt" label="Apartment Number" onChange={handleChange} />
          </MDBCol>
          <MDBCol md="4">
            <MDBInput id="floor" label="Floor" onChange={handleChange} />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol md="6">
            <MDBInput type="email" id="email" label="Email" onChange={handleChange} />
          </MDBCol>
          <MDBCol md="6">
            <MDBInput type="tel" id="cellPhone" label="Phone" onChange={handleChange} />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol md="3">
          {/* //TODO repair */}
            <MDBSwitch id="isActive" label="Is active" onChange={handleChange} /> 
          </MDBCol>
          <MDBCol md="3" className="form-outline" data-mdb-input-init style={{ maxWidth: "150px" }}>
            <MDBInput type="number" label="Number" id="number" className="form-control" onChange={handleChange} />
          </MDBCol>
        </MDBRow>

        <MDBInput className="mb-3" id="instructions" label="Instructions" onChange={handleChange} />
        <MDBInput
          wrapperClass="mb-4"
          type='textarea'
          id="additionalInfo"
          rows={4}
          label="Additional information"
          onChange={handleChange}
        />

        <MDBBtn className="mb-4" block onClick={handleSubmit}>
          {props.btnText}
        </MDBBtn>
      </form>
    </MDBContainer>
  );
};

export default ContactForm
