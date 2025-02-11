import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../styles/sideNavbar.css';
import { Link, useNavigate } from 'react-router-dom';
import logoPH from '../assets/your-logo-goes-here.gif';
import { GlobalStateContext } from '../GlobalStateProvider';

export default function Sidebar(props) {
  const navigate = useNavigate();
  const [openContacts, setOpenContacts] = useState(false);
  const {globalState,setGlobalState, getData} = useContext(GlobalStateContext);

  useEffect(() => {
    getData();
    }, []);

  const logout = (e) => {
    e.stopPropagation()
    localStorage.removeItem('token')
    navigate('/')
  }

  const toggleContacts = () => setOpenContacts(!openContacts);

  return (
    <div id="sideNavbar" className="d-flex flex-column align-items-center">
      <button
        className="btn btn-primary align-self-end m-3 p-0 pulsing-button"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <img
          src={logoPH}
          className="rounded mx-auto d-block img-thumbnail"
          alt="Logo"
          style={{ maxHeight: '90px' }}
        />
      </button>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header d-flex flex-column align-items-center border bg-primary-subtle">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
          <img
            src={logoPH}
            className="rounded mx-auto d-block img-thumbnail d-block"
            alt="Logo"
            style={{ maxHeight: '150px' }}
          />

          <h5 className="offcanvas-title d-block" id="offcanvasRightLabel">
            {globalState.org?.name || `Kupah name`}
          </h5>
        </div>
        <div className="offcanvas-body">
          <div className="list-group list-group-light">
            <p className="list-group-item list-group-item-action px-3 border-0 fs-4"
              onClick={logout}>
              <i className="fa fa-sign-out fa-2x" aria-hidden="true"></i> התנתקות
            </p>
            <Link
              to="/account"
              className="list-group-item list-group-item-action px-3 border-0"
            >
              <i className="bi bi-house-door fs-2"></i>
              <span className="fs-4">עמוד ראשי </span>
            </Link>
            <div
              className="list-group-item list-group-item-action px-3 border-0"
              onClick={toggleContacts}>
              <i className="bi bi-person-rolodex fs-2"></i>
              <span className="fs-4"> אנשי קשר </span>
              {openContacts && (<div>
                <Link
                  to="/account/contacts"
                  className="list-group-item list-group-item-action px-3 border-0"
                >
                  איש קשר חדש
                </Link>
                <Link
                  to="/account/contactslist"
                  className="list-group-item list-group-item-action px-3 border-0"
                >
                  רשימת אנשי קשר
                </Link>
              </div>)}
            </div>

            <Link
              to="/account/donats"
              className="list-group-item list-group-item-action px-3 border-0"
            >
              <i className="bi bi-cash-coin fs-2"></i>
              <span className="fs-4">דוח תרומות </span>
            </Link>
            {/*             {props.user?.isAdmin && ( */}
            {/*               <> */}
            <Link
              to="#"
              className="list-group-item list-group-item-action px-3 border-0"
            >
              <i className="bi bi-file-earmark-person fs-2"></i>
              <span className="fs-4"> דוח גבאים </span>
            </Link>
            <Link
              to="#"
              className="list-group-item list-group-item-action px-3 border-0"
            >
              <i className="bi bi-buildings fs-2"></i>
              <span className="fs-4">דוח ערים </span>
            </Link>
            {/*               </> */}
            {/*             )} */}
            <Link
              to="#"
              className="list-group-item list-group-item-action px-3 border-0"
            >
              <i className="bi bi-filetype-exe fs-2"></i>
              <span className="fs-4"> הפקת דוחות </span>
            </Link>
            <Link
              to="#"
              className="list-group-item list-group-item-action px-3 border-0"
            >
              <i className="bi bi-telephone fs-2"></i>
              <span className="fs-4">ניהול מערכת טלפוני </span>
            </Link>
            <Link
              to="#"
              className="list-group-item list-group-item-action px-3 border-0"
            >
              <i className="bi bi-clock-history fs-2"></i>
              <span className="fs-4">היסטוריה </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
