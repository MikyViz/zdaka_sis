import React from "react"
import ContactForm from '../components/ContactForm'
import '../styles/contacts.css'

export default function Contacts() {
  return(
  <div className="wrapper d-flex flex-row justify-content-evenly">
    <div className="w-50 p-3 ">
      <ContactForm styleClass='rounded-3 opacity-90'/>
    </div>
  </div>)
};
