import { Box, Button, Card, Divider, FormLabel, MenuItem, Select, TextField, Typography, InputLabel, Modal, Grid2, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import RequiredStar from '../../RequiredStar';

import axios, { } from "axios"
import { customStyles } from '../ReactDataTableStyle';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};





const ManageClinets = () => {
    const [clientData, setClientData] = useState([]);
    const [entries, setEntries] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    const [openAddClientModal, setAddCliantModal] = React.useState(false);
    const handleOpenClientModal = () => setAddCliantModal(true);
    const handleCloseClientModal = () => setAddCliantModal(false);


    const formKi = useFormik({
        initialValues: {
            first_name: null,
            last_name: null,
            contact_number: null,
            gender: "",
            email: null,
            username: null,
            password: null,
            client_picture: null
        },
        onSubmit: (values) => {
            axios.post("http://localhost:8787/auth/createClient", values)
                .then(res => {
                    if (res.data.msg === "Query Error") {
                        toast.error("Same Erro Ouccred")
                    }
                    console.log(res.data.msg);
                    toast.success(res.data.msg)
                
                    if (res.data.status === true) {
                        setAddCliantModal(false)
                    }


                }).catch(err => {
                    console.log(err);

                })
        }
    })








    const getEmployeeData = () => {
        axios.get("http://localhost:8787/auth/listEmployees")
            .then(res => {
                setClientData(res.data.result)
                console.log(res.data.result);

            }).catch(err => {
                console.log(err);

            })


    }
    useEffect(() => {
        getEmployeeData();
    }, [])

    const columns = [
        {
            name: 'First Name',
            selector: (row) => row.first_name,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: (row) => row.last_name,
            sortable: true,
        },
        {
            name: 'Contact Number',
            selector: (row) => row.contact_number,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: (row) => row.gender,
            sortable: true,
        },


        {
            name: 'Status',
            selector: (row) => "Active",
            sortable: true,
        },

        // Add more columns as needed
    ];


    return (
        <>
            <ToastContainer position='bottom-right' />
            <Card sx={{ width: "75vw", padding: 2 }}>
                <Typography variant="h6" mb={2}>List All Clients</Typography>
                <Divider />

                <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography>Show</Typography>
                        <Select
                            value={entries}

                            size="small"
                            sx={{ ml: 1 }}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                        <Typography sx={{ ml: 1 }}>entries</Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography>Search</Typography>
                        <TextField
                            size="small"
                            sx={{ ml: 1 }}
                            value={searchTerm}

                            variant="outlined"
                        />
                    </Box>

                    <Button variant='outlined' onClick={handleOpenClientModal}> Add Client </Button>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <DataTable
                        columns={columns}
                        // data={employeesData.filter(item => item.designation.toLowerCase().includes(searchTerm.toLowerCase()))}
                        data={clientData}
                        pagination
                        paginationPerPage={entries}
                        customStyles={customStyles}
                    />
                </Box>
            </Card>


            <Modal
                open={openAddClientModal}
                onClose={handleCloseClientModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add New Client
                    </Typography>
                    <form action="" onSubmit={formKi.handleSubmit}>


                        <Grid container spacing={2}  >
                            <Grid item mt={2} lg={4}>
                                <FormLabel> Name<RequiredStar /> </FormLabel>
                                <TextField
                                    placeholder="Enter first_name"
                                    size="small"
                                    fullWidth
                                    name="first_name"
                                    value={formKi.values.first_name}
                                    onChange={formKi.handleChange}
                                />
                            </Grid>
                            <Grid item mt={2} lg={4} >
                                <FormLabel>last Name<RequiredStar /> </FormLabel>
                                <TextField
                                    placeholder="Enter last name"
                                    size="small"
                                    fullWidth
                                    name="last_name"
                                    value={formKi.values.last_name}
                                    onChange={formKi.handleChange}
                                />
                            </Grid>



                            <Grid item mt={2} lg={4}>
                                <FormLabel> Gender <RequiredStar /> </FormLabel>
                                <Select
                                    fullWidth
                                    size="small"
                                    name='gender'
                                    displayEmpty

                                    value={formKi.values.gender}
                                    onChange={formKi.handleChange}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Others">Others</MenuItem>
                                </Select>
                            </Grid>





                        </Grid>

                        <Grid container spacing={2} >

                            <Grid item mt={2} lg={4}>
                                <FormLabel>Contact Number<RequiredStar /> </FormLabel>
                                <TextField
                                    placeholder="Enter Contact Number"
                                    size="small"
                                    fullWidth
                                    name="contact_number"
                                    value={formKi.values.contact_number}
                                    onChange={formKi.handleChange}
                                />
                            </Grid>




                            <Grid item mt={2} lg={4}>
                                <FormLabel>Email<RequiredStar /> </FormLabel>
                                <TextField
                                    placeholder="Enter Email"
                                    size="small"
                                    fullWidth
                                    name="email"
                                    value={formKi.values.email}
                                    onChange={formKi.handleChange}
                                />
                            </Grid>

                            <Grid item mt={2} lg={4}>
                                <FormLabel>Username<RequiredStar /> </FormLabel>
                                <TextField
                                    placeholder="Enter Username"
                                    size="small"
                                    fullWidth
                                    name="username"
                                    value={formKi.values.username}
                                    onChange={formKi.handleChange}
                                />
                            </Grid>

                        </Grid>




                        <Grid container spacing={2} >


                            <Grid item mt={2} lg={4}>
                                <FormLabel>Password<RequiredStar /> </FormLabel>
                                <TextField
                                    placeholder="Enter Password"
                                    size="small"
                                    fullWidth
                                    name="password"
                                    value={formKi.values.password}
                                    onChange={formKi.handleChange}
                                />
                            </Grid>

                            <Grid item mt={2} lg={4}>
                                <FormLabel>Profile Picture <RequiredStar /> </FormLabel>
                                <input type="file"
                                    name="client_picture"
                                    value={formKi.values.client_picture}
                                    onChange={formKi.handleChange}
                                />
                            </Grid>


                        </Grid>



                        <Box mt={2}>
                            <Button variant='contained'>Reset</Button>
                            <Button type='submit' variant='contained' sx={{ ml: 5 }}>Save</Button>
                        </Box>

                    </form>

                </Box>
            </Modal>
        </>
    )
}

export default ManageClinets