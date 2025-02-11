import { useState, useEffect, useContext } from 'react';
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
import { GlobalStateContext } from '../GlobalStateProvider';

const ContactForm = function (props) {
  // const [itsOK, setItsOk] = useState(false);
  // const [isntOK, setIsntsOk] = useState(false);
  const { globalState, setGlobalState } = useContext(GlobalStateContext);
  const [formData, setFormData] = useState({
    Id: '',
    degree: '',
    firstName: '',
    lastName: '',
    isGabbay: false,
    isManager: false,
    password: '',
    country: '',
    city: '',
    street: '',
    houseNum: '',
    apt: '',
    email: '',
    floor: '',
    cellPhone: '',
    num: null,
    isActive: false,
    instructions: '',
    additionalInfo: '',
  });

  useEffect(() => {
    if (props.user) {
      setFormData({
        Id: props.user.Id || '',
        degree: props.user.degree || '',
        firstName: props.user.firstName || '',
        lastName: props.user.lastName || '',
        isGabbay: props.user.isGabbay || false,
        isManager: props.user.isManager || false,
        password: '',
        country: props.user.country || '',
        city: props.user.city || '',
        street: props.user.street || '',
        houseNum: props.user.houseNum || '',
        apt: props.user.apt || '',
        email: props.user.email || '',
        floor: props.user.floor || '',
        cellPhone: props.user.cellPhone || '',
        num: props.user.num || null,
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
    try {
      e.preventDefault();
      props.req(formData);
      setItsOk(true);
      setIsntsOk(false);
    } catch (error) {
      setIsntsOk(true);
      setItsOk(false);
      console.log("🙅 "+ error);
      
    }
  };

  if (!globalState.user) {
    return <div className="spinner-border p-4 fs-3 " style={{color: 'white'}} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>;
  }

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
        {(props.user && (props.user.Id === globalState.user.Id)) && <MDBRow>
          <MDBCol>
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </MDBCol>
        </MDBRow>}
        <MDBRow className="mb-3">
          <MDBCol md="3">
            <MDBSwitch id="isActive" label="Is active" checked={formData.isActive} onChange={handleChange} />
          </MDBCol>
          {globalState.user.isManager && <MDBCol md="3">
            <MDBSwitch id="isGabbay" label="Is gabbay" checked={formData.isGabbay} onChange={handleChange} />
          </MDBCol>}
          {globalState.user.isGabbay && <MDBCol md="3" className="form-outline" data-mdb-input-init style={{ maxWidth: "150px" }}>
            <MDBInput type="number" label="Number" id="num" className="form-control" value={formData.num} onChange={handleChange} />
          </MDBCol>}
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
      {/* {itsOK && (<div className="alert alert-success w-75 fs-3" role="alert">
          Oky doky! 🎉🎉
        </div>)}
        {isntOK && (<div className="alert alert-danger w-75 fs-3" role="alert">
          Something go wrong, bro...😥
        </div>)} */}
    </MDBContainer>
  );
};

export default ContactForm;
