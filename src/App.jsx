import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from 'mdb-react-ui-kit';

import Login from './components/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Registration from './pages/Registration';
import SideNavbar from './components/SideNavbar';
import UserForm from './components/UserForm';


function App() {
  return (
    <Router>
      {/*           <Login /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/sidenavbar" element={<SideNavbar />} />
                <Route path="/userform" element={<UserForm />} />

      </Routes>
    </Router>
  );
}

export default App;
