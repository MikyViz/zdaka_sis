import { GlobalStateContext } from "../GlobalStateProvider";
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';

function Donats() {
    const { globalState, setGlobalState, getData } = useContext(GlobalStateContext);
    const [list, setList] = useState([]);
    const url = 'http://localhost:8080';

    useEffect(() => {
        if (!globalState.user || !globalState.org) {
            getData();
        }
        else {
            const allUsersReq = async () => {
                try {
                    const newList = [];
                    if (globalState.user.isManager) {
                        const orgUserResponse = await axios.get(`http://localhost:8080/users/manager-contacts/${globalState.org.Id}`,
                            { headers: { 'authorization': `Bearer ${localStorage.getItem('token')}`, } });
                        console.log('Response from server:', orgUserResponse?.data);
                        orgUserResponse.data.forEach((user) => {
                            user.show = false;
                            newList.push(user);
                        });

                    }
                    if (globalState.user.isGabbay) {
                        const assignedUsersResponse = await axios.get(`http://localhost:8080/users/assign-gabbay/${globalState.user.Id}`,
                            { headers: { 'authorization': `Bearer ${localStorage.getItem('token')}`, } });
                        newList.push(...assignedUsersResponse.data);
                    }
                    setList(newList);
                    return newList;
                }
                catch (error) {
                    console.error('Error sending data to server:', error);
                }
            };
            allUsersReq();
        }
    }, [globalState.user, globalState.org]);
    const donation = async(index, amount)=> {
        try {
            if (list[index].currency && amount) {
            const reqData = {
                currency: list[index].currency,
                amount: parseFloat(amount),
                userId: list[index].Id,
                orgId: globalState.org.Id
            }
            console.log(reqData);
            const createDonat = await axios.post(`${url}/donats/`, reqData, { headers: { 'authorization': `Bearer ${localStorage.getItem('token')}`, } }, )     
            // console.log(createDonat); 
        }
        } catch (error) {
            console.log('😕💩'+error);
            
        }
        
        console.log('its coming in bro');
    };

    const handleSelect = (eventKey, index) => {
        setList(prevList => {
            const newList = [...prevList];
            newList[index].currency = eventKey;
            return newList;
        });
    };

    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Donation</th>
                </tr>
            </thead>
            <tbody>
                {list.map((user, index) => (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>
                            <InputGroup className="mb-3" >
                                <DropdownButton
                                    variant="outline-secondary"
                                    title={<span style={{ color: 'white' }}>{user.currency || 'currency'}</span>}
                                    onSelect={(eventKey) => handleSelect(eventKey, index)}
                                >
                                    <Dropdown.Item eventKey="₪">₪</Dropdown.Item>
                                    <Dropdown.Item eventKey="$">$</Dropdown.Item>
                                    <Dropdown.Item eventKey="€">€</Dropdown.Item>
                                </DropdownButton>
                                <Form.Control placeholder="Enter donation amount" onKeyDown={(e) => { if (e.code === 'Enter') donation(index, e.target.value) }} />
                            </InputGroup>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );

}
export default Donats