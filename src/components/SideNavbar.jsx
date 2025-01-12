import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../styles/sideNavbar.css';
import { Link } from 'react-router-dom';
import logoPH from '../assets/your-logo-goes-here.gif';

export default function Sidebar(props) {
  return (
    <div id="sideNavbar" className="d-flex flex-column align-items-center">
      <button
        className="btn btn-primary align-self-end m-3 p-0 pulsing-button"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        {/*         <span style={{fontSize: "30px"}}>🫎</span>👇 */}
        <img
          src={logoPH}
          className="rounded mx-auto d-block img-thumbnail d-block"
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
            Kupah name
          </h5>
        </div>
        <div className="offcanvas-body">
          <div class="list-group list-group-light">
            <a
              href="#"
              className="list-group-item list-group-item-action px-3 border-0"
            >
              <i className="bi bi-house-door fs-2"></i>
              <span className="fs-4">עמוד ראשי </span>
            </a>
            <a
              href="/acount/contacts"
              className="list-group-item list-group-item-action px-3 border-0"
            >
              <i className="bi bi-person-rolodex fs-2"></i>
              <span className="fs-4"> אנשי קשר </span>
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action px-3 border-0"
            >
              <i className="bi bi-cash-coin fs-2"></i>
              <span className="fs-4">דוח תרומות </span>
            </a>
{/*             {props.user?.isAdmin && ( */}
{/*               <> */}
                <a
                  href="#"
                  className="list-group-item list-group-item-action px-3 border-0"
                >
                  <i className="bi bi-file-earmark-person fs-2"></i>
                  <span className="fs-4"> דוח גבאים </span>
                </a>
                <a
                  href="#"
                  className="list-group-item list-group-item-action px-3 border-0"
                >
                  <i className="bi bi-buildings fs-2"></i>
                  <span className="fs-4">דוח ערים </span>
                </a>
{/*               </> */}
{/*             )} */}
            <a
              href="#"
              className="list-group-item list-group-item-action px-3 border-0"
            >
              <i className="bi bi-filetype-exe fs-2"></i>
              <span className="fs-4"> הפקת דוחות </span>
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action px-3 border-0"
            >
              <i className="bi bi-telephone fs-2"></i>
              <span className="fs-4">ניהול מערכת טלפוני </span>
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action px-3 border-0"
            >
              <i className="bi bi-clock-history fs-2"></i>
              <span className="fs-4">היסטוריה </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
