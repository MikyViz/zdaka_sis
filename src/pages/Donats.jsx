import { GlobalStateContext } from "../GlobalStateProvider";
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { getJewishMonthBoundaries } from '../utils/jewishCalendar';

function Donats() {
    const { globalState, setGlobalState, getData } = useContext(GlobalStateContext);
    const [list, setList] = useState([]);
    const url = 'http://localhost:8080';

    useEffect(() => {
        if (!globalState.user || !globalState.org) {
            getData();
        }
        else {
            const fetchData = async () => {
                try {
                    // Get Jewish month boundaries
                    const { start, end } = getJewishMonthBoundaries();
                    const startDate = start.toISOString().split('T')[0];
                    const endDate = end.toISOString().split('T')[0];
                    
                    // Fetch donations and users in parallel
                    const [donationsResponse, usersData] = await Promise.all([
                        axios.get(`${url}/donats/currentMonth/${globalState.org.Id}`, {
                            headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` },
                            params: {
                                startDate,
                                endDate
                            }
                        }),
                        fetchUsers()
                    ]);
                    
                    const donations = donationsResponse.data;
                    
                    // Map donations to users
                    const updatedUsers = usersData.map(user => {
                        // Find donation for this user if exists
                        const userDonation = donations.find(donation => donation.userId === user.Id);
                        
                        return {
                            ...user,
                            input: !userDonation, // If donation exists, show it instead of input
                            currency: userDonation?.currency || user.currency,
                            amount: userDonation?.amount || user.amount
                        };
                    });
                    
                    setList(updatedUsers);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            
            const fetchUsers = async () => {
                const newList = [];
                if (globalState.user.isManager) {
                    const orgUserResponse = await axios.get(`${url}/users/manager-contacts/${globalState.org.Id}`,
                        { headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` } });
                    
                    orgUserResponse.data.forEach((user) => {
                        user.show = false;
                        newList.push(user);
                    });
                }
                
                if (globalState.user.isGabbay) {
                    const assignedUsersResponse = await axios.get(`${url}/users/assign-gabbay/${globalState.user.Id}`,
                        { headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` } });
                    newList.push(...assignedUsersResponse.data);
                }
                
                return newList;
            };
            
            fetchData();
        }
    }, [globalState.user, globalState.org]);

    const donation = async(index, amount)=> {
        try {
            if (list[index].currency && amount) {
                setList(prevList => {
                    const newList = [...prevList];
                    newList[index].input = false;
                    newList[index].amount = amount;
                    return newList;
                });
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
                            {user.input ? <InputGroup className="mb-3" >
                                <DropdownButton
                                    variant="outline-secondary"
                                    title={<span style={{ color: 'white' }}>{user.currency || 'currency'}</span>}
                                    onSelect={(eventKey) => handleSelect(eventKey, index)}
                                >
                                    <Dropdown.Item eventKey="₪">₪</Dropdown.Item>
                                    <Dropdown.Item eventKey="$">$</Dropdown.Item>
                                    <Dropdown.Item eventKey="€">€</Dropdown.Item>
                                </DropdownButton>
                                <Form.Control 
                                    placeholder="Enter donation amount" 
                                    onKeyDown={(e) => { if (e.code === 'Enter') donation(index, e.target.value) }}
                                    onBlur={(e) => {
                                        if (e.target.value) {
                                            donation(index, e.target.value);
                                        } else {
                                            setList(prevList => {
                                                const newList = [...prevList];
                                                newList[index].input = false;
                                                return newList;
                                            });
                                        }
                                    }}
                                    autoFocus
                                />
                            </InputGroup> : 
                             <InputGroup className="mb-3 text-light" onDoubleClick={()=>{setList(prevList=>{
                                const newList = [...prevList];
                                newList[index].input = true;
                                return newList;
                             })}}>
                             <InputGroup.Text className="text-light" >{user.currency}</InputGroup.Text>
                             <InputGroup.Text className="text-light">{user.amount}</InputGroup.Text>
                           </InputGroup>}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );

}
export default Donats