import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import SideNavbar from '../components/SideNavbar.jsx'
import Dashboard from './Dashboard.jsx'
import Contacts from './Contacts.jsx'

export default function Account() {
    const navigate = useNavigate();
    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token) navigate('/')
    }, [navigate])

    return (
        <>
            <SideNavbar />
            <Outlet />
        </>
    );
}