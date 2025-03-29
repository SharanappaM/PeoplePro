import { Box, Button, Card, Divider, FormLabel, MenuItem, Select, TextField, Typography, InputLabel, Modal, Grid, Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useFormik } from "formik"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { customStyles } from '../ReactDataTableStyle';
import RequiredStar from '../../RequiredStar';
import { useSelector } from 'react-redux';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import StreamIcon from '@mui/icons-material/Stream';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const EmpLeaveRequest = () => {

  const [employeesName, setEmployeesName] = useState(false)
  const { loading, data, error } = useSelector((state) => state.post);

  const [loggedEmpData, setLoggedEmpData] = useState(null)

  const [leaveList, setLeaveList] = useState([])


  const getLeaveList = () => {
    axios.get(`http://localhost:8787/auth/listLeaveRequests/${loggedEmpData}`)
      .then(res => {
         
        setLeaveList(res.data);

      }).catch(err => {
        console.log(err);

      })
  }


  const columns = [
    {
      name: 'Name',
      selector: (row) => row.employee_name,
      sortable: true,
    },


    {
      name: 'From',
      selector: (row) => row.from_date,
      sortable: true,
    },
    {
      name: 'To',
      selector: (row) => row.to_date,
      sortable: true,
    },
    {
      name: 'Reason For Leave',
      selector: (row) => row.reason_for_leave,
      sortable: true,
    },
    {
      name: 'Leave Type',
      selector: (row) => row.leave_type,
      sortable: true,
    },
    {
      name: 'Leave Status',
      selector: (row) => row.leave_status,
      sortable: true,
    },




    // Add more columns as needed
  ];

  const formik = useFormik({
    initialValues: {
      employee_name: "",
      team_email_id: '',
      from_date: '',
      to_date: '',
      reason_for_leave: '',
      leave_type: '',
      leave_status: '',
    },


    onSubmit: (values) => {
      const formadat = {
        ...values,
        employee_name: loggedEmpData,
        leave_status: "Pending",

      }
      axios
        .post(`http://localhost:8787/auth/createLeave`, formadat)
        .then((response) => {
           
          toast.success(response.data.msg)
          setEmployeesName(employeesName === false ? true : false)
        })
        .catch((error) => {
          console.error('Error adding employee', error);
        });
    },
  });





  useEffect(() => {



    const empData = localStorage.getItem("employeeData");
    if (empData) {
      const parsedData = JSON.parse(empData);
      setLoggedEmpData(parsedData.first_name);
      console.log(parsedData.first_name, "parsedData.first_name");
    }



  }, [employeesName])





  useEffect(() => {
    if (loggedEmpData) {
      getLeaveList();
    }

  }, [loggedEmpData])


  return (
    <>

      <ToastContainer position='bottom-right' />
      <Box sx={{
        display: "flex", justifyContent: "space-around", flexDirection: {
          xs: "column",
          md: "row",
          sm: "column",
          lg: "row"
        },
      }}>



        <Card
          sx={{
            mb: { xs: 5, lg: 0 },
            width: { xs: "100%", sm: "90%", md: "45%", lg: "50%" },
            p: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Leave View
          </Typography>
          <Divider />

          <Stack direction="row" spacing={2} mt={2} flexWrap="wrap" justifyContent="center">
            {/* Casual Leave */}
            <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: "48%" }, p: 1 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box p={2} bgcolor="violet" display="flex" alignItems="center" justifyContent="center">
                  <HomeWorkIcon sx={{ fontSize: "60px", color: "white" }} />
                </Box>
                <Box p={2}>
                  <Typography variant="h6">Casual Leave</Typography>
                  <Typography>2-Balance</Typography>
                </Box>
              </Box>
            </Box>

            {/* Compensatory Off */}
            <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: "48%" }, p: 1 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box p={2} bgcolor="darkcyan" display="flex" alignItems="center" justifyContent="center">
                  <StreamIcon sx={{ fontSize: "60px", color: "white" }} />
                </Box>
                <Box p={2}>
                  <Typography variant="h6">Compensatory Off</Typography>
                  <Typography>2-Balance</Typography>
                </Box>
              </Box>
            </Box>
          </Stack>

          <br />

          <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
            {/* Sick Leave */}
            <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: "48%" }, p: 1 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box p={2} bgcolor="error.main" display="flex" alignItems="center" justifyContent="center">
                  <LocalHospitalIcon sx={{ fontSize: "60px", color: "white" }} />
                </Box>
                <Box p={2}>
                  <Typography variant="h6">Sick Leave</Typography>
                  <Typography>2-Balance</Typography>
                </Box>
              </Box>
            </Box>

            {/* Leave Without Pay */}
            <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: "48%" }, p: 1 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box p={2} bgcolor="success.main" display="flex" alignItems="center" justifyContent="center">
                  <MoneyOffIcon sx={{ fontSize: "60px", color: "white" }} />
                </Box>
                <Box p={2}>
                  <Typography variant="h6">Leave Without Pay</Typography>
                  <Typography>2-Balance</Typography>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Card>



        <Card sx={{
          p: 4, width: {
            lg: "45%",
            xs: "100%",
            sm: "90%",
            md: "45%"
          }, height: "50%"
        }}>
          <Typography variant="h6" mb={2}>Apply Leave </Typography>
          <Divider />

          <form action="" onSubmit={formik.handleSubmit} >



            <Grid container spacing={2}  >
              <Grid item mt={2} lg={6}>
                <FormLabel>Employee Name or Id<RequiredStar /> </FormLabel>
                <TextField

                  size="small"
                  fullWidth
                  // name="employee_name"
                  disabled
                  type='text'
                  value={loggedEmpData}
                // onChange={formik.handleChange}
                />
              </Grid>


              <Grid item mt={2} lg={6}>
                <FormLabel>Leave Type</FormLabel>
                <Select
                  fullWidth
                  size="small"
                  name='leave_type'
                  displayEmpty
                  value={formik.values.leave_type}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="" disabled>Choose..</MenuItem>
                  <MenuItem value="Casual Leave">Casual Leave</MenuItem>
                  <MenuItem value="Compensatory Off">Compensatory Off</MenuItem>
                  <MenuItem value="Sick Leave">Sick Leave</MenuItem>
                  <MenuItem value="Leave Without Pay">Leave Without Pay</MenuItem>
                </Select>
              </Grid>




            </Grid>
            <Grid container spacing={2}  >
              <Grid item mt={2} lg={6}>
                <FormLabel> From<RequiredStar /> </FormLabel>
                <TextField
                  // placeholder="Enter firstname"
                  size="small"
                  fullWidth
                  name="from_date"
                  type='date'
                  value={formik.values.from_date}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item mt={2} lg={6}>
                <FormLabel> To<RequiredStar /> </FormLabel>
                <TextField
                  // placeholder="Enter firstname"
                  size="small"
                  fullWidth
                  name="to_date"
                  type='date'
                  value={formik.values.to_date}
                  onChange={formik.handleChange}
                />
              </Grid>

            </Grid>



            <Grid container spacing={2}  >
              <Grid item mt={2} lg={6}>
                <FormLabel>Reason for leave</FormLabel>
                <TextField

                  size="small"
                  placeholder='Enter here...'
                  fullWidth
                  name="reason_for_leave"
                  type='text'
                  value={formik.values.reason_for_leave}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item mt={2} lg={6}>
                <FormLabel>Team Email Id</FormLabel>
                <TextField

                  size="small"
                  placeholder='Enter here...'
                  fullWidth
                  name="team_email_id"
                  type='text'
                  value={formik.values.team_email_id}
                  onChange={formik.handleChange}
                />
              </Grid>



            </Grid>




            <Box mt={2}>
              <Button variant='contained'>Reset</Button>
              <Button type='submit' variant='contained' sx={{ ml: 5 }}>Save</Button>
            </Box>

          </form>


        </Card>


      </Box>


      <Box mt={2}>

        <Card sx={{ width: { xs: '93vw', sm: '70vw', md: '50vw', lg: '70vw', xl: '78vw' }, padding: 2 }}>
          <Typography variant="h6" mb={2}>Total Applied Leaves</Typography>
          <Divider />


          <Box sx={{ mt: 2 }}>
            <DataTable
              columns={columns}
              // data={employeesData.filter(item => item.designation.toLowerCase().includes(searchTerm.toLowerCase()))}
              data={leaveList}
              pagination
              // paginationPerPage={entries}
              customStyles={customStyles}
            />
          </Box>
        </Card>

      </Box>



    </>
  );
};

export default EmpLeaveRequest;

