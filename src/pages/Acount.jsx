import { Outlet } from 'react-router-dom';

import SideNavbar from '../components/SideNavbar.jsx'
import Dashboard from './Dashbodr.jsx'
import Contacts from './Contacts.jsx'

export default function Acount() {
    return(
        <>
            <SideNavbar />
            <Outlet />
        </>
    );
}