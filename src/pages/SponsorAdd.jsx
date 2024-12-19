import React from 'react';
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

export default function SponsorAdd() {
  return (
    <MDBContainer fluid className="p-4 bg-light bg-gradient overflow-hidden">
      <form>
        <MDBRow className="mb-3">
          <MDBCol md="6">
            <MDBInput id="first-name" label="First name" />
          </MDBCol>
          <MDBCol md="6">
            <MDBInput id="last-name" label="Last name" />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol md="4">
            <MDBInput id="country" label="Country" />
          </MDBCol>
          <MDBCol md="4">
            <MDBInput id="city" label="City" />
          </MDBCol>
          <MDBCol md="4">
            <MDBInput id="street" label="Street" />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol md="4">
            <MDBInput id="house-number" label="House Number" />
          </MDBCol>
          <MDBCol md="4">
            <MDBInput id="apartment-number" label="Apartment Number" />
          </MDBCol>
          <MDBCol md="4">
            <MDBInput id="floor" label="Floor" />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol md="6">
            <MDBInput type="email" id="email" label="Email" />
          </MDBCol>
          <MDBCol md="6">
            <MDBInput type="tel" id="phone" label="Phone" />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol md="12">
            <MDBSwitch defaultChecked id="is-active" label="Is active" />
          </MDBCol>
        </MDBRow>
        <MDBBtnGroup className="mb-3">
          <MDBRadio
            btn
            btnColor="secondary"
            id="pay-program-1"
            name="options"
            wrapperTag="span"
            label="Pay program 1"
          />
          <MDBRadio
            btn
            btnColor="secondary"
            id="pay-program-2"
            name="options"
            wrapperClass="mx-2"
            wrapperTag="span"
            label="Pay program 2"
          />
          <MDBRadio
            btn
            btnColor="secondary"
            id="pay-program-3"
            name="options"
            wrapperTag="span"
            label="Pay program 3"
          />
        </MDBBtnGroup>
        <MDBInput className="mb-3" id="instructions" label="Instructions" />
        <MDBInput
          wrapperClass="mb-4"
          textarea
          id="additional-info"
          rows={4}
          label="Additional information"
        />

        <MDBBtn className="mb-4" type="submit" block>
          Create an account
        </MDBBtn>
      </form>
    </MDBContainer>
  );
}
