import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const ProfilePage = () => {
    const [role1, setRole1] = useState(null)
    const [loggedEmployeeData, setLoggedEmployeeData] = useState(null)
    const location = useLocation(); // To track route changes
    const { loading, data, error } = useSelector((state) => state.post);

    console.log(data, "data");

    useEffect(() => {
        const role11 = localStorage.getItem("role")
        const employeeData1 = localStorage.getItem("employeeData");
        // Check if there's valid employee data in localStorage
        if (employeeData1) {
            const parsedEmployeeData = JSON.parse(employeeData1);
            if (parsedEmployeeData && parsedEmployeeData.first_name) {
                setLoggedEmployeeData(parsedEmployeeData.first_name);

            }
        }


    }, [location])

    return (
        <div>

            <Typography>Username : {data.employeeData.username}</Typography>
            <Typography>Name: {data.employeeData.first_name}</Typography>
            <Typography>Role: {data.role}</Typography>
        </div>
    )
}

export default ProfilePage