import { Box, Button, Card, Divider, FormLabel, MenuItem, Select, TextField, Typography, InputLabel, Modal, Grid2, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import RequiredStar from '../../RequiredStar';

import axios, {} from "axios"
import { customStyles } from '../ReactDataTableStyle';


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





const Employees = () => {
  const [employeesData, setEmployeesData] = useState([]);
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const [openEmployeeModal, setOpenEmployeeModal] = React.useState(false);
  const handleOpenEmployeeModal = () => setOpenEmployeeModal(true);
  const handleCloseEmployeeModal = () => setOpenEmployeeModal(false);




  const getEmployeeData = ()=>{
    axios.get("http://localhost:8787/auth/listEmployees")
    .then(res=>{
      setEmployeesData(res.data.result)
      console.log(res.data.result);

    }).catch(err=>{
      console.log(err);
      
    })
  
    
  }
  useEffect(()=>{
    getEmployeeData();
  },[])

  const columns = [
    {
      name: 'First Name',
      selector: (row) => row.firstname,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row) => row.lastname,
      sortable: true,
    },
    {
      name: 'Contact Number',
      selector: (row) => row.contactnumber,
      sortable: true,
    },
    {
      name: 'Gender',
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: 'Designation',
      selector: (row) => row.designation,
      sortable: true,
    },
    {
      name: 'Role',
      selector: (row) => row.role,
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
      <Card sx={{width:"75vw", padding: 2 }}>
        <Typography variant="h6" mb={2}>List All Employees</Typography>
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

          <Button variant='outlined' onClick={handleOpenEmployeeModal}> Add Employees </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <DataTable
            columns={columns}
            // data={employeesData.filter(item => item.designation.toLowerCase().includes(searchTerm.toLowerCase()))}
            data={employeesData}
            pagination
            paginationPerPage={entries}
            customStyles={customStyles}
          />
        </Box>
      </Card>


      <Modal
        open={openEmployeeModal}
        onClose={handleCloseEmployeeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Employee
          </Typography>


          <Grid container spacing={2}  >
            <Grid item mt={2} lg={4}>
              <FormLabel> Name<RequiredStar /> </FormLabel>
              <TextField
                placeholder="Enter  name"
                size="small"
                fullWidth />
            </Grid>
            <Grid item mt={2} lg={4} >
              <FormLabel>last Name<RequiredStar /> </FormLabel>
              <TextField
                placeholder="Enter last name"
                size="small"
                fullWidth />
            </Grid>


            <Grid item mt={2} lg={4}>
              <FormLabel> Employee ID <RequiredStar /> </FormLabel>
              <TextField
                placeholder="Enter  Employee ID "
                size="small"
                fullWidth />
            </Grid>

          </Grid>

          <Grid container spacing={2} >

            <Grid item mt={2} lg={4}>
              <FormLabel>Contact Number<RequiredStar /> </FormLabel>
              <TextField
                placeholder="Enter Contact Number"
                size="small"
                fullWidth />
            </Grid>

            <Grid item mt={2} lg={4}>
              <FormLabel> Gender <RequiredStar /> </FormLabel>
              <Select
                fullWidth
                size="small"
              >
                <MenuItem value="HR">Sharan</MenuItem>
              </Select>
            </Grid>


            <Grid item mt={2} lg={4}>
              <FormLabel>Email<RequiredStar /> </FormLabel>
              <TextField
                placeholder="Enter Email"
                size="small"
                fullWidth />
            </Grid>

          </Grid>




          <Grid container spacing={2} >
            <Grid item mt={2} lg={4}>
              <FormLabel>Username<RequiredStar /> </FormLabel>
              <TextField
                placeholder="Enter Username"
                size="small"
                fullWidth />
            </Grid>

            <Grid item mt={2} lg={4}>
              <FormLabel>Password<RequiredStar /> </FormLabel>
              <TextField
                placeholder="Enter Password"
                size="small"
                fullWidth />
            </Grid>



            <Grid item mt={2} lg={4}>
              <FormLabel> Office Shift <RequiredStar /> </FormLabel>
              <Select
                fullWidth
                size="small"
              >
                <MenuItem value="HR">Sharan</MenuItem>
              </Select>
            </Grid>


          </Grid>



          <Grid container spacing={2} >



            <Grid item mt={2} lg={4}>
              <FormLabel> Role <RequiredStar /> </FormLabel>
              <Select
                fullWidth
                size="small"
              >
                <MenuItem value="HR">Sharan</MenuItem>
              </Select>
            </Grid>


            <Grid item mt={2} lg={4}>
              <FormLabel> Department <RequiredStar /> </FormLabel>
              <Select
                fullWidth
                size="small"
              >
                <MenuItem value="HR">Sharan</MenuItem>
              </Select>
            </Grid>
            <Grid item mt={2} lg={4}>
              <FormLabel> Designation <RequiredStar /> </FormLabel>
              <Select
                fullWidth
                size="small"
              >
                <MenuItem value="HR">Sharan</MenuItem>
              </Select>
            </Grid>


          </Grid>



          <Grid container spacing={2} >
            <Grid item mt={2} lg={4}>
              <FormLabel> Basic Salary <RequiredStar /> </FormLabel>
              <TextField
                placeholder="Enter Basic Salary "
                size="small"
                fullWidth />
            </Grid>
            <Grid item mt={2} lg={4}>
              <FormLabel>Hourly Rate<RequiredStar /> </FormLabel>
              <TextField
                placeholder="Enter Hourly Rate"
                size="small"
                fullWidth />
            </Grid>

            <Grid item mt={2} lg={4}>
              <FormLabel> Payslip Type  <RequiredStar /> </FormLabel>
              <Select
                fullWidth
                size="small"
              >
                <MenuItem value="HR">Sharan</MenuItem>
              </Select>
            </Grid>

          </Grid>


          <Grid container spacing={2} >

            <Grid item mt={2} lg={4}>
              <FormLabel>Profile Picture <RequiredStar /> </FormLabel>
              <input type="file" />
            </Grid>

          </Grid>


        <Box mt={2}>
          <Button variant='contained'>Reset</Button>
          <Button variant='contained' sx={{ml:5}}>Save</Button>
        </Box>

        </Box>
      </Modal>
    </>
  )
}

export default Employees
