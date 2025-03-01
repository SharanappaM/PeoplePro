import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const ProfilePage = () => {
    const [role1, setRole1] = useState(null)
    const [loggedEmployeeData, setLoggedEmployeeData] = useState(null)
    const [loggedAdminData, setLoggedAdminData] = useState(null)
    const location = useLocation(); // To track route changes
    const { loading, data, error } = useSelector((state) => state.post);


    const parsedEmployeeData = JSON.parse(loggedEmployeeData)
    const adminParsedData = JSON.parse(loggedAdminData)
    console.log(loggedAdminData,"loggedAdminData");
    



    useEffect(() => {
        const role11 = localStorage.getItem("role")
        const employeeData = localStorage.getItem("employeeData")
        const adminData = localStorage.getItem("adminData")
        setRole1(role11)
        setLoggedEmployeeData(employeeData)
        setLoggedAdminData(adminData)
        // setEmail(email1)

        // if (role11 === "employee") {
        // const employeeData1 = localStorage.getItem("employeeData");
        // // Check if there's valid employee data in localStorage
        // if (employeeData1) {
        //     const parsedEmployeeData = JSON.parse(employeeData1);
        //     if (parsedEmployeeData && parsedEmployeeData.first_name) {
        //         setLoggedEmployeeData(parsedEmployeeData.first_name);

        //     }
        // }

        // }





    }, [location])

    return (
        <div>
            {
                role1 === "employee" ? (
                    <div>
                        <Typography>Username : {parsedEmployeeData.username}</Typography>
                        <Typography>Name: {parsedEmployeeData.first_name}</Typography>
                        <Typography>Role: {role1}</Typography>
                    </div>
                ) : (
                    <div>
                    <Typography>Username : {adminParsedData?.username}</Typography>
                    {/* <Typography>Name: {adminParsedData.first_name}</Typography> */}
                    <Typography>Role: {role1}</Typography>
                </div>
                )
            }




        </div>
    )
}

export default ProfilePage