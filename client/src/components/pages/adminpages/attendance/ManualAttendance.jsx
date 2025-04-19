
import { Box, Button, Card, Divider, FormLabel, MenuItem, Select, TextField, Typography, InputLabel, Modal, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { customStyles } from '../../ReactDataTableStyle';
import { useFormik } from "formik"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequiredStar from '../../../RequiredStar';





const ManualAttendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [entries, setEntries] = useState(7);
  const [searchTerm, setSearchTerm] = useState('');
  const [employeesNameData, setEmployeesNameData] = useState([])
  const [employeesName, setEmployeesName] = useState(false)

  const [openAddAttendanceModal, setOpenAttendenceModal] = useState(false)


  const getDepartmentData = async () => {
    await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/attendanceList`)
      .then(res => {
        setAttendanceList(res.data.result)
        console.log(res.data.result);

      }).catch(err => {
        console.log(err);

      })


  }
  const getEmployeesNameData = async () => {
    await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/getEmployeesName`)
      .then(res => {
        setEmployeesNameData(res.data.employeeNames)
        console.log(res.data.employeeNames);

      }).catch(err => {
        console.log(err);

      })


  }


  const formik = useFormik({
    initialValues: {
      date: '',
      emplyoee_name: '',
    },

    onSubmit: (values) => {
      // Handle form submission
      console.log('Form submitted with values:', values);
      axios
        .post(`${import.meta.env.VITE_APP_SERVER_URL}/auth/departments`, values)
        .then((response) => {
          // console.log('Employee added successfully', response);
          toast.success(response.data.msg)
          setEmployeesName(employeesName === false ? true : false)
        })
        .catch((error) => {
          console.error('Error adding employee', error);
        });
    },
  });


  const formikFOrattendece = useFormik({
    initialValues: {
      emplyoee_name: '',
      date: '',
      in_time: '',
      out_time: '',
    },


    onSubmit: (values) => {
      // Handle form submission
      console.log('Form submitted with values:', values);
      axios
        .post(`${import.meta.env.VITE_APP_SERVER_URL}/auth/addemplyoeeattendance`, values)
        .then((response) => {
          // console.log('Employee added successfully', response);
          toast.success(response.data.msg)
          setEmployeesName(employeesName === false ? true : false)
          setOpenAttendenceModal(false)
        })
        .catch((error) => {
          console.error('Error adding employee', error);
        });
    },
  });





  useEffect(() => {
    getDepartmentData();
    getEmployeesNameData();
  }, [employeesName])

  const columns = [
    {
      name: 'Employee ',
      selector: (row) => row.emplyoee_name,
      sortable: true,
    },
    {
      name: 'Date',
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: 'In Time',
      selector: (row) => row.in_time,
      sortable: true,
    },
    {
      name: 'Out Time',
      selector: (row) => row.out_time,
      sortable: true,
    },
    {
      name: 'Total time',
      sortable: true,
    },
    // Add more columns as needed
  ];




  return (
    <>

      <ToastContainer position='bottom-right' />
      <Box sx={{ display: "flex", justifyContent: "space-around",flexDirection:{
        xs:"column",
        md:"row",
        sm:"column",
        lg:"row"
      }, mt: 2 }}>
        <Card sx={{ p: 4, mb:{
          xs:5,
          lg:0
        },width: {
          lg:"35%",
          xs:"100%",
          sm:"90%",
          md:"45%"
        }, height: "50%" }}>
          <Typography variant="h6" mb={2}>Filter Attendance</Typography>
          <Divider />
          <form action="" onSubmit={formik.handleSubmit}>
            <Box sx={{ mt: 2 }}>
              <FormLabel> Date</FormLabel>
              <TextField
                placeholder="Enter  name"
                size="small"
                fullWidth
                name='department_name'
                type='date'

              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <FormLabel>Employee</FormLabel>
              <Select
                labelId="department-select-label"
                id="department-select"
                fullWidth
                size="small"
                name='department_head'
                onChange={formik.handleChange}
                value={formik.values.department_head}

              >

                {employeesNameData.map((items, index) => (
                  <MenuItem key={index} value={items}>{items}</MenuItem>
                ))}

              </Select>
            </Box>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <Button type='submit' variant="contained" >
                Save
              </Button>
            </Box>

          </form>



        </Card>

        <Card sx={{ width: {
         lg:"60%",
         xs:"100%",
         sm:"80%",
         md:"70%"
        }, padding: 2 }}>
          <Typography variant="h6" mb={2}>View Attendance</Typography>
          <Divider />

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>




           <Box  sx={{
              display:{
                xs:"none",
                lg:"block",
                sm:"none",
                md:"block"
              }
            }}>
           <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>Search</Typography>
              <TextField
                size="small"
                placeholder='search departments'
                sx={{ ml: 1 }}
                value={searchTerm}

                variant="outlined"
              />
            </Box>
           </Box>

            <Button onClick={() => setOpenAttendenceModal(true)} variant='outlined'>Add Attendance</Button>


          </Box>

          <Box sx={{ mt: 2 }}>
            <DataTable
              columns={columns}
              // data={epartmentData.filter(item => item.designation.toLowerCase().includes(searchTerm.toLowerCase()))}
              data={attendanceList}
              pagination
              paginationPerPage={entries}
              customStyles={customStyles}
            />
          </Box>
        </Card>
      </Box>


      <Modal
        open={openAddAttendanceModal}
        onClose={() => setOpenAttendenceModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: 'translate(-50%, -50%)',
          width: {
            lg: "auto",
            xs: "95vw"
          },
          height: {
            lg: "auto",
            xs: "80vh"
          },
          bgcolor: "background.paper",
          boxShadow: "2px solid #000",
          p: 3,
          overflow:{
            xs:"scroll",
            lg:"none"
          }
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Attendance Information
          </Typography>
          <form action="" onSubmit={formikFOrattendece.handleSubmit} >



            <Grid container spacing={2}  >
              <Grid item mt={2} lg={6}>
                <FormLabel> Attendance Date<RequiredStar /> </FormLabel>
                <TextField

                  size="small"
                  fullWidth
                  name="date"
                  type='date'
                  value={formikFOrattendece.values.date}
                  onChange={formikFOrattendece.handleChange}
                />
              </Grid>
              <Grid item mt={2} lg={6}>
                <FormLabel>Employee</FormLabel>
                <Select
                  labelId="department-select-label"
                  id="department-select"
                  fullWidth
                  size="small"
                  name='emplyoee_name'
                  value={formikFOrattendece.values.emplyoee_name}
                  onChange={formikFOrattendece.handleChange}

                >

                  {employeesNameData.map((items, index) => (
                    <MenuItem key={index} value={items}>{items}</MenuItem>
                  ))}

                </Select>
              </Grid>


            </Grid>
            <Grid container spacing={2}  >
              <Grid item mt={2} lg={6}>
                <FormLabel> In Time<RequiredStar /> </FormLabel>
                <TextField
                  // placeholder="Enter firstname"
                  size="small"
                  fullWidth
                  name="in_time"
                  type='time'
                  value={formikFOrattendece.values.in_time}
                  onChange={formikFOrattendece.handleChange}
                />
              </Grid>
              <Grid item mt={2} lg={6}>
                <FormLabel> Out Time<RequiredStar /> </FormLabel>
                <TextField
                  // placeholder="Enter firstname"
                  size="small"
                  fullWidth
                  name="out_time"
                  type='time'
                  value={formikFOrattendece.values.out_time}
                  onChange={formikFOrattendece.handleChange}
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
  );
};

export default ManualAttendance;

