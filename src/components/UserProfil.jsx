import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { GlobalStateContext } from '../GlobalStateProvider';

export default function UserProfile() {
    // const [user, setUser] = useState(null);
    const { globalState, setGlobalState, getData } = useContext(GlobalStateContext);

    const updateUser = (user, org) => { setGlobalState(prevState => (
      { ...prevState, user, org }
    )); };

    useEffect(() => {
    getData();
    }, []);

    if (!globalState.user) {
        return <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>;
    }

    return (
        <div className="user-profile p-3 ">
            <p className='fs-4'>Wellcome, {`${globalState.user.degree || ''} ${globalState.user.firstName} ${globalState.user.lastName}`}!</p>
            <p>Email: {globalState.user.email}</p>
            {/* <p>Role: {user.role}</p> */}
        </div>
    );
}
