// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function UserProfile() {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         // Предположим, что информация о пользователе хранится в локальном хранилище
//         // const storedUser = localStorage.getItem('user');
//         const token = localStorage.getItem('token');
//         try {
//             const meReq = async () => {
//                const meRes =await axios.get('http://localhost:8080/users/me', {
//                     headers: {
//                       'authorization': `Bearer ${localStorage.getItem('token')}`,
//                     }
//                   });
//                 if (meRes) {
//             setUser(meRes);
//         }
//         }} catch (error) {
//             console.log(error);
//         }
//     }, []);

//     if (!user) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div className="user-profile">
//             <h2>Добро пожаловать, {user.name}!</h2>
//             <p>Email: {user.email}</p>
//             {/* <p>Role: {user.role}</p> */}
//         </div>
//     );
// }



import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const meRes = await axios.get('http://localhost:8080/users/me', { headers: { 'Authorization': `Bearer ${token}`, }, });
                    if (meRes.data) {
                        setUser(meRes.data);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>;
    }

    return (
        <div className="user-profile p-3 ">
            <p className='fs-4'>Wellcome, {`${user.degree || ''} ${user.firstName} ${user.lastName}`}!</p>
            <p>Email: {user.email}</p>
            {/* <p>Role: {user.role}</p> */}
        </div>
    );
}
