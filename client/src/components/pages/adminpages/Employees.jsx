import { Box, Button, Card, Divider, FormLabel, MenuItem, Select, TextField, Typography, InputLabel, Modal, Grid2, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import RequiredStar from '../../RequiredStar';

import axios, { } from "axios"
import { customStyles } from '../ReactDataTableStyle';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesData } from '../../redux/features/employee/employeeSlice';
import { ModalStyle } from '../ModalStyle';


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


  const dispatch = useDispatch();
  // const { employees, loading, error } = useSelector((state) => state.employee);


  const [employeesData, setEmployeesData] = useState([]);
  const [employeeCreated, setEmployeesCreated] = useState(false);
  const [departmentName, setDepartmentName] = useState([]);
  const [designationName, setDesignationName] = useState([]);
  const [entries, setEntries] = useState(10);
 

  const [openEmployeeModal, setOpenEmployeeModal] = React.useState(false);
  const handleOpenEmployeeModal = () => setOpenEmployeeModal(true);
  const handleCloseEmployeeModal = () => setOpenEmployeeModal(false);


  const formKi = useFormik({
    initialValues: {
      first_name: null,
      last_name: null,
      contact_number: null,
      gender: "",
      email: null,
      username: null,
      office_shift: "",
      password: null,
      role: "",
      department: "",
      designation: "",
      basic_salary: null,
      hourly_rate: null,
      payslip_type: "",
      employee_picture: null
    },
    onSubmit: (values) => {
      axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/auth/addEmployees`, values)
        .then(res => {
      
          toast.success(res.data.msg)
          
          if (res.data.status === true) {
            setOpenEmployeeModal(false)
            setEmployeesCreated(employeeCreated === false ? true : false)
          }
          if(res.data.error){
            toast.error(res.data.error)
          }


        }).catch(err => {
          console.log(err);

        })
    }
  })


  const getByDepartmetName = () => {
    axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/getByDepartmentName`)
      .then(res => {
         
        setDepartmentName(res.data.getDepartment_name);

      }).catch(err => {
        console.log(err);

      })
  }



  const getByDesignationName = () => {
    axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/getBydesignationName`)
      .then(res => {
         
        setDesignationName(res.data.designation_name);

      }).catch(err => {
        console.log(err);

      })
  }


  const getEmployeeData = () => {
    axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/listEmployees`)
      .then(res => {
        setEmployeesData(res.data.result)

      }).catch(err => {
        console.log(err);

      })


  }
  useEffect(() => {
    getEmployeeData();
    getByDepartmetName();
    getByDesignationName()
  }, [employeeCreated])








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
      selector: (row) => (
        <p style={{color:"green", fontWeight:"bold"}}>Active</p>
    ),
      sortable: true,
    },

    // Add more columns as needed
  ];


  const handleDeleteAllEmplyoess = () => {
    const ifUserConfirmed  = window.confirm("Are you sure you want to delete all employees?")
    if(ifUserConfirmed){

      axios.delete(`${import.meta.env.VITE_APP_SERVER_URL}/auth/deleteAllEmployees`)
      .then(res => {
        toast.success(res.data.msg)
        setEmployeesCreated(employeeCreated === false ? true : false)

      }).catch(err => {
        console.log(err);

      })

    }

  }


  return (
    <>
      <ToastContainer position='bottom-right' />
      <Card sx={{
        width: { xs: '93vw', sm: '70vw', md: '50vw', lg: '70vw', xl: '75vw' }
        , padding: 2
      }}>
        <Typography variant="h6" mb={2}>List All Employees</Typography>
        <Divider />

        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{
            display: {
              xs: "none",
              xl: "block",
              lg: "block",
            }
          }}>
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


          </Box>

          <Button variant='outlined' onClick={handleOpenEmployeeModal}> Add Employees </Button>
          <Button variant='outlined' onClick={handleDeleteAllEmplyoess}> Delete All Employees </Button>
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
       
        <Box sx={ModalStyle} >
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
                  name='office_shift'
                  value={formKi.values.office_shift}
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
                  name='role'
                  value={formKi.values.role}
                  onChange={formKi.handleChange}
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
                  name="basic_salary"
                  value={formKi.values.basic_salary}
                  onChange={formKi.handleChange}
                />
              </Grid>
              <Grid item mt={2} lg={4}>
                <FormLabel>Hourly Rate<RequiredStar /> </FormLabel>
                <TextField
                  placeholder="Enter Hourly Rate"
                  size="small"
                  fullWidth
                  name="hourly_rate"
                  value={formKi.values.hourly_rate}
                  onChange={formKi.handleChange}
                />
              </Grid>

              <Grid item mt={2} lg={4}>
                <FormLabel> Payslip Type  <RequiredStar /> </FormLabel>
                <Select
                  fullWidth
                  size="small"
                  name="payslip_type"
                  value={formKi.values.payslip_type}
                  onChange={formKi.handleChange}

                >
                  <MenuItem value="Per Month">Per Month</MenuItem>
                </Select>
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
