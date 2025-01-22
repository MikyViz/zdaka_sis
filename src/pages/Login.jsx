import { useState, useEffect, useContext } from 'react';

import axios from 'axios';

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { GlobalStateContext } from '../GlobalStateProvider';
function Login() {
  const navigate = useNavigate();
  const { globalState, setGlobalState } = useContext(GlobalStateContext);

  const updateUser = (user) => { setGlobalState(prevState => (
    { ...prevState, user }
  )); };

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(false);

  const formChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/account');
    }
  }, [navigate]);


  const loginReq = async () => {

    try {
      const loginResponse = await axios.post('http://localhost:8080/users/login/', userData);
      setError(false);
      console.log(`Server response 👉 ${loginResponse.data}`);
      // updateUser(loginResponse.data)
      localStorage.setItem(`token`, loginResponse.data.token);
      navigate('/account');


    } catch (error) {
      console.log(error);
      setError(true);
    }

  }

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol xs={12} md={6}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol xs={12} md={6}>

          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
            <MDBBtn floating size="md" tag="a" className="me-2">
              <MDBIcon fab icon="google" />
            </MDBBtn>
            <MDBBtn floating size="md" tag="a" className="me-2">
              <MDBIcon fab icon="facebook-f" />
            </MDBBtn>
            <MDBBtn floating size="md" tag="a" className="me-2">
              <MDBIcon fab icon="x-twitter" />
            </MDBBtn>
            <MDBBtn floating size="md" tag="a" className="me-2">
              <MDBIcon fab icon="linkedin-in" />
            </MDBBtn>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="email"
            type="email"
            onChange={formChange}
            size="lg"
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="password"
            type="password"
            onChange={formChange}
            size="lg"
          />

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Remember me"
            />
            <Link to="!#">Forgot password?</Link>
          </div>

          <div className="text-center text-md-start mt-4 pt-2">
            <MDBBtn className="mb-0 px-5" size="lg" onClick={loginReq}>
              Login
            </MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">
              Don't have an account?{' '}
              <Link to="/registration" className="link-danger">
                Register
              </Link>
            </p>
          </div>
        </MDBCol>
      </MDBRow>

      {error && (<div className="alert alert-danger" role="alert">
        Email or password isn't correct, check it out!
      </div>)}

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2024. All rights reserved.
        </div>

        <div>
          <MDBBtn
            tag="a"
            color="none"
            className="mx-3"
            style={{ color: 'white' }}
          >
            <MDBIcon fab icon="facebook-f" size="md" />
          </MDBBtn>
          <MDBBtn
            tag="a"
            color="none"
            className="mx-3"
            style={{ color: 'white' }}
          >
            <MDBIcon fab icon="x-twitter" size="md" />
          </MDBBtn>
          <MDBBtn
            tag="a"
            color="none"
            className="mx-3"
            style={{ color: 'white' }}
          >
            <MDBIcon fab icon="google" size="md" />
          </MDBBtn>
          <MDBBtn
            tag="a"
            color="none"
            className="mx-3"
            style={{ color: 'white' }}
          >
            <MDBIcon fab icon="linkedin-in" size="md" />
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
}
export default Login;
