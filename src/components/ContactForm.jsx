import { useState, useEffect } from 'react';
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
    Id: '',
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
    isActive: false,
    instructions: '',
    additionalInfo: '',
  });

  useEffect(() => {
    if (props.user) {
      setFormData({
        Id: props.user.Id || '',
        firstName: props.user.firstName || '',
        lastName: props.user.lastName || '',
        country: props.user.country || '',
        city: props.user.city || '',
        street: props.user.street || '',
        houseNum: props.user.houseNum || '',
        apt: props.user.apt || '',
        email: props.user.email || '',
        floor: props.user.floor || '',
        cellPhone: props.user.cellPhone || '',
        number: props.user.number || '',
        isActive: props.user.isActive || false,
        instructions: props.user.instructions || '',
        additionalInfo: props.user.additionalInfo || '',
      });
    }
  }, [props.user]);

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (props.user)
    //   props.req(props.user)
    // else
      props.req(formData);
  };

  return (
    <MDBContainer fluid className={`${props.styleClass} p-4 bg-light bg-gradient overflow-hidden`}>
      <form>
        <MDBRow className="mb-3"> 
          {/* TODO Добавить поле с обращением */}
          <MDBCol md="6">
            <MDBInput id="firstName" label="First name" value={formData.firstName} onChange={handleChange} />
          </MDBCol>
          <MDBCol md="6">
            <MDBInput id="lastName" label="Last name" value={formData.lastName} onChange={handleChange} />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol md="4">
            <MDBInput id="country" label="Country" value={formData.country} onChange={handleChange} />
          </MDBCol>
          <MDBCol md="4">
            <MDBInput id="city" label="City" value={formData.city} onChange={handleChange} />
          </MDBCol>
          {/* TODO: Add neighborhood form */}
          <MDBCol md="4">
            <MDBInput id="street" label="Street" value={formData.street} onChange={handleChange} />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol md="4">
            <MDBInput id="houseNum" label="House Number" value={formData.houseNum} onChange={handleChange} />
          </MDBCol>
          <MDBCol md="4">
            <MDBInput id="apt" label="Apartment Number" value={formData.apt} onChange={handleChange} />
          </MDBCol>
          <MDBCol md="4">
            <MDBInput id="floor" label="Floor" value={formData.floor} onChange={handleChange} />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol md="6">
            <MDBInput type="email" id="email" label="Email" value={formData.email} onChange={handleChange} />
          </MDBCol>
          <MDBCol md="6">
            <MDBInput type="tel" id="cellPhone" label="Phone" value={formData.cellPhone} onChange={handleChange} />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol md="3">
            <MDBSwitch id="isActive" label="Is active" checked={formData.isActive} onChange={handleChange} />
          </MDBCol>
          <MDBCol md="3" className="form-outline" data-mdb-input-init style={{ maxWidth: "150px" }}>
            <MDBInput type="number" label="Number" id="number" className="form-control" value={formData.number} onChange={handleChange} />
          </MDBCol>
        </MDBRow>
        <MDBInput className="mb-3" id="instructions" label="Instructions" value={formData.instructions} onChange={handleChange} />
        <MDBInput
          wrapperClass="mb-4"
          type='textarea'
          id="additionalInfo"
          rows={4}
          label="Additional information"
          value={formData.additionalInfo}
          onChange={handleChange}
        />
        <MDBBtn className="mb-4" block onClick={handleSubmit}>
          {props.btnText}
        </MDBBtn>
      </form>
    </MDBContainer>
  );
};

export default ContactForm;
