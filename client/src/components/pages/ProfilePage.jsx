import { Box, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Card, CardContent, Avatar, Grid } from "@mui/material";
import { Email, Phone, Business, Work, Payments } from "@mui/icons-material";

const ProfilePage = () => {
    const [role1, setRole1] = useState(null)
    const [loggedEmployeeData, setLoggedEmployeeData] = useState(null)
    const [loggedAdminData, setLoggedAdminData] = useState(null)
    const location = useLocation(); // To track route changes
    const { loading, data, error } = useSelector((state) => state.post);


    const parsedEmployeeData = JSON.parse(loggedEmployeeData)
    console.log(parsedEmployeeData, "parsedEmployeeData");


    const adminParsedData = JSON.parse(loggedAdminData)
    console.log(loggedAdminData, "loggedAdminData");


    const employeeData = {
        employee_id: 1001,
        first_name: "Sharan",
        last_name: "Hbd",
        contact_number: "974250",
        gender: "Male",
        email: "sharanappahbd@gmail.com",
        username: "Sharanappa_M",
        office_shift: "Morning Shift",
        role: "Normal Role",
        department: "IT",
        designation: "SDE",
        basic_salary: "62000",
        hourly_rate: "3265",
        payslip_type: "Per Month",
        employee_picture: "https://via.placeholder.com/150", // Replace with actual image URL
        payment_status: "Paid",
    };

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
                        <Card
                            sx={{
                                maxWidth: 380,
                                borderRadius: 3,
                                boxShadow: 5,
                                background: "linear-gradient(135deg, #2196F3 30%, #21CBF3 90%)",
                                color: "#fff",
                                overflow: "hidden",
                                textAlign: "center",
                                
                            }}
                        >
                            {/* Avatar and Name */}
                            <Box sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Avatar
                                    src={parsedEmployeeData?.employee_picture}
                                    sx={{ width: 100, height: 100, mb: 1, border: "3px solid white" }}
                                />
                                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                    {parsedEmployeeData?.first_name} {parsedEmployeeData?.last_name}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    @{parsedEmployeeData?.username}
                                </Typography>
                            </Box>

                            {/* Details Section */}
                            <CardContent
                                sx={{
                                    backgroundColor: "#fff",
                                    color: "#333",
                                    borderTopLeftRadius: 25,
                                    borderTopRightRadius: 25,
                                    p: 3,
                                }}
                            >
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} display="flex" alignItems="center">
                                        <IconButton sx={{ color: "#2196F3" }}>
                                            <Email />
                                        </IconButton>
                                        <Typography variant="body2">{parsedEmployeeData?.email}</Typography>
                                    </Grid>

                                    <Grid item xs={12} display="flex" alignItems="center">
                                        <IconButton sx={{ color: "#2196F3" }}>
                                            <Phone />
                                        </IconButton>
                                        <Typography variant="body2">{parsedEmployeeData?.contact_number}</Typography>
                                    </Grid>

                                    <Grid item xs={12} display="flex" alignItems="center">
                                        <IconButton sx={{ color: "#2196F3" }}>
                                            <Business />
                                        </IconButton>
                                        <Typography variant="body2">{parsedEmployeeData?.department}</Typography>
                                    </Grid>

                                    <Grid item xs={12} display="flex" alignItems="center">
                                        <IconButton sx={{ color: "#2196F3" }}>
                                            <Work />
                                        </IconButton>
                                        <Typography variant="body2">{parsedEmployeeData?.designation}</Typography>
                                    </Grid>

                                    <Grid item xs={12} display="flex" alignItems="center">
                                        <IconButton sx={{ color: "#2196F3" }}>
                                            <Payments />
                                        </IconButton>
                                        <Typography variant="body2">
                                            ₹{parsedEmployeeData?.basic_salary} ({parsedEmployeeData?.payslip_type})
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
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