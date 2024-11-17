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





const Employees = () => {
  const [employeesData, setEmployeesData] = useState([]);
  const [departmentName, setDepartmentName] = useState([]);
  const [designationName, setDesignationName] = useState([]);
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const [openEmployeeModal, setOpenEmployeeModal] = React.useState(false);
  const handleOpenEmployeeModal = () => setOpenEmployeeModal(true);
  const handleCloseEmployeeModal = () => setOpenEmployeeModal(false);


  const formKi = useFormik({
    initialValues: {
      firstname: null,
      lastname: null,
      employeeid: null,
      contactnumber: null,
      gender: "",
      email: null,
      username: null,
      officeshift: "",
      password: null,
      role: "",
      department: "",
      designation: "",
      basicsalary: null,
      hourlyrate: null,
      paysliptype: "",
      profilepicture: null
    },
    onSubmit: (values) => {
      axios.post("http://localhost:8787/auth/addEmployees", values)
        .then(res => {
          console.log(res.data.msg);
          toast.success(res.data.msg)
          if(res.data.status===true){
            setOpenEmployeeModal(false)
          }
          

        }).catch(err => {
          console.log(err);

        })
    }
  })


  const getByDepartmetName = () => {
    axios.get("http://localhost:8787/auth/getByDepartmentName")
      .then(res => {
        console.log(res.data);
        setDepartmentName(res.data.getDepartment_name);

      }).catch(err => {
        console.log(err);

      })
  }



  const getByDesignationName = () => {
    axios.get("http://localhost:8787/auth/getBydesignationName")
      .then(res => {
        console.log(res.data);
        setDesignationName(res.data.designation_name);

      }).catch(err => {
        console.log(err);

      })
  }


  const getEmployeeData = () => {
    axios.get("http://localhost:8787/auth/listEmployees")
      .then(res => {
        setEmployeesData(res.data.result)
        console.log(res.data.result);

      }).catch(err => {
        console.log(err);

      })


  }
  useEffect(() => {
    getEmployeeData();
    getByDepartmetName();
    getByDesignationName()
  }, [])

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
      <ToastContainer position='bottom-right' />
      <Card sx={{ width: "75vw", padding: 2 }}>
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
          <form action="" onSubmit={formKi.handleSubmit}>


            <Grid container spacing={2}  >
              <Grid item mt={2} lg={4}>
                <FormLabel> Name<RequiredStar /> </FormLabel>
                <TextField
                  placeholder="Enter firstname"
                  size="small"
                  fullWidth
                  name="firstname"
                  value={formKi.values.firstname}
                  onChange={formKi.handleChange}
                />
              </Grid>
              <Grid item mt={2} lg={4} >
                <FormLabel>last Name<RequiredStar /> </FormLabel>
                <TextField
                  placeholder="Enter last name"
                  size="small"
                  fullWidth
                  name="lastname"
                  value={formKi.values.lastname}
                  onChange={formKi.handleChange}
                />
              </Grid>


              <Grid item mt={2} lg={4}>
                <FormLabel> Employee ID <RequiredStar /> </FormLabel>
                <TextField
                  placeholder="Enter  Employee ID "
                  size="small"
                  fullWidth
                  name="employeeid"
                  value={formKi.values.employeeid}
                  onChange={formKi.handleChange}
                />
              </Grid>

            </Grid>

            <Grid container spacing={2} >

              <Grid item mt={2} lg={4}>
                <FormLabel>Contact Number<RequiredStar /> </FormLabel>
                <TextField
                  placeholder="Enter Contact Number"
                  size="small"
                  fullWidth
                  name="contactnumber"
                  value={formKi.values.contactnumber}
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

            </Grid>




            <Grid container spacing={2} >
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
                <FormLabel> Office Shift <RequiredStar /> </FormLabel>
                <Select
                  fullWidth
                  size="small"
                  name='officeshift'
                  value={formKi.values.officeshift}
                  onChange={formKi.handleChange}
                >
                  <MenuItem value="Morning Shift">Morning Shift</MenuItem>
                  <MenuItem value="Afternoon Shift">Afternoon Shift</MenuItem>
                  <MenuItem value="Night Shift">Night Shift</MenuItem>
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
                  <MenuItem value="Normal Role">Normal Role</MenuItem>
                </Select>
              </Grid>


              <Grid item mt={2} lg={4}>
                <FormLabel> Department <RequiredStar /> </FormLabel>
                <Select
                  fullWidth
                  size="small"
                  name='department'
                  value={formKi.values.department}
                  onChange={formKi.handleChange}

                >
                  {departmentName.map((items, index) => (
                    <MenuItem key={index} value={items}>{items}</MenuItem>

                  ))}
                </Select>
              </Grid>
              <Grid item mt={2} lg={4}>
                <FormLabel> Designation <RequiredStar /> </FormLabel>
                <Select
                  fullWidth
                  size="small"
                  name='designation'
                  value={formKi.values.designation}
                  onChange={formKi.handleChange}

                >
                  {designationName.map((items, index) => (
                    <MenuItem key={index} value={items}>{items}</MenuItem>

                  ))}
                </Select>
              </Grid>


            </Grid>



            <Grid container spacing={2} >
              <Grid item mt={2} lg={4}>
                <FormLabel> Basic Salary <RequiredStar /> </FormLabel>
                <TextField
                  placeholder="Enter Basic Salary "
                  size="small"
                  fullWidth
                  name="basicsalary"
                  value={formKi.values.basicsalary}
                  onChange={formKi.handleChange}
                />
              </Grid>
              <Grid item mt={2} lg={4}>
                <FormLabel>Hourly Rate<RequiredStar /> </FormLabel>
                <TextField
                  placeholder="Enter Hourly Rate"
                  size="small"
                  fullWidth
                  name="hourlyrate"
                  value={formKi.values.hourlyrate}
                  onChange={formKi.handleChange}
                />
              </Grid>

              <Grid item mt={2} lg={4}>
                <FormLabel> Payslip Type  <RequiredStar /> </FormLabel>
                <Select
                  fullWidth
                  size="small"
                >
                  <MenuItem value="Per Month">Per Month</MenuItem>
                </Select>
              </Grid>

            </Grid>


            <Grid container spacing={2} >

              <Grid item mt={2} lg={4}>
                <FormLabel>Profile Picture <RequiredStar /> </FormLabel>
                <input type="file"
                  name="profilepicture"
                  value={formKi.values.profilepicture}
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

export default Employees
