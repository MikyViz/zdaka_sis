import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Registration from './pages/Registration';
import SideNavbar from './components/SideNavbar';
import ContactForm from './components/ContactForm';
import Contacts from './pages/Contacts';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        {/* <Route path="/contacts" element={<Contacts />} /> */}

        <Route path="/sidenavbar" element={<SideNavbar />} />
        <Route path="/userform" element={<ContactForm />} />

        <Route path="/account" element={<Account />}>
          <Route index element={<Dashboard />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
