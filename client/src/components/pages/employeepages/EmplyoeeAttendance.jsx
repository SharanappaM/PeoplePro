import { Box, Button, Card, Divider, FormLabel, MenuItem, Select, TextField, Typography, InputLabel, Modal, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
// import { customStyles } from '../../ReactDataTableStyle';
import { useFormik } from "formik"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import RequiredStar from '../../../RequiredStar';
import { customStyles } from '../ReactDataTableStyle';
import RequiredStar from '../../RequiredStar';
import { useSelector } from 'react-redux';


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



const EmplyoeeAttendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [entries, setEntries] = useState(7);
  const [searchTerm, setSearchTerm] = useState('');
  const [employeesNameData, setEmployeesNameData] = useState([])
  const [employeesName, setEmployeesName] = useState(false)
  const { loading, data, error } = useSelector((state) => state.post);
  const [loggedEmpData ,setLoggedEmpData] = useState(null)

  
  




  



  const getEmployeesNameData = async () => {
    await axios.get("http://localhost:8787/auth/getEmployeesName")
      .then(res => {
        setEmployeesNameData(res.data.employeeNames)
         

      }).catch(err => {
        console.log(err);

      })


  }


  const getDepartmentData = async () => {
    await axios.get(`http://localhost:8787/auth/attendanceList/${loggedEmpData}`)
      .then(res => {
        setAttendanceList(res.data.result)
         

      }).catch(err => {
        console.log(err);

      })


  }


  const formikFOrattendece = useFormik({
    initialValues: {
      emplyoee_name: "",
      date: '',
      in_time: '',
      out_time: '',
    },


    onSubmit: (values) => {
      // Handle form submission

      const formadat = {
        ...values,
        emplyoee_name: loggedEmpData
      }
      axios
        .post(`http://localhost:8787/auth/addemployeeattendance/${loggedEmpData}`, formadat)
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
   
    getDepartmentData();
    getEmployeesNameData();

    const empData = localStorage.getItem("employeeData");
    if (empData) {
      const parsedData = JSON.parse(empData);
      setLoggedEmpData(parsedData.first_name);

    }


   
  }, [employeesName])


  
  useEffect(() => {
    if (loggedEmpData) {
      getDepartmentData();
    }
  }, [loggedEmpData]);


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
      <Box sx={{ display: "flex", flexDirection:{
        xs:"column",
        md:"row",
        sm:"column",
        lg:"row"
      },justifyContent: "space-around", mt: 2 }}>
        <Card sx={{ p: 4, mb:{
          xs:5,
          lg:0
        },width: {
          lg:"35%",
          xs:"100%",
          sm:"90%",
          md:"45%"
        }, height: "50%" }}>
          <Typography variant="h6" mb={2}>Add Attendance</Typography>
          <Divider />

          <form action="" onSubmit={formikFOrattendece.handleSubmit} >



            <Grid container spacing={2}  >
              <Grid item mt={2} lg={12}>
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


        </Card>

        <Card sx={{ width:{
           lg:"60%",
           xs:"100%",
           sm:"80%",
           md:"70%"
        }, padding: 2 }}>
          <Typography variant="h6" mb={2}>View Attendance</Typography>
          <Divider />

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>




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


     
    </>
  );
};

export default EmplyoeeAttendance;

