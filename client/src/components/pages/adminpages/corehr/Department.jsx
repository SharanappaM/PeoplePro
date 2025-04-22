
import { Box, Button, Card, Divider, FormLabel, MenuItem, Select, TextField, Typography, InputLabel } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { customStyles } from '../../ReactDataTableStyle';
import { useFormik } from "formik"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartmentData } from '../../../redux/features/employee/departmentSlice';
import LoadingComponent from '../../../layouts/LoadingComponent';

const Department = () => {


  const [entries, setEntries] = useState(7);
  const [searchTerm, setSearchTerm] = useState('');
  const [employeesNameData, setEmployeesNameData] = useState([])
  const [departmentList, setDepartmentList] = useState([])
  const [addedDepartment, setAddedDepartment] = useState(false)
  const [loading , setLoading] = useState(false)



  const getEmployeesNameData = async () => {
   
    await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/getEmployeesName`)
      .then(res => {
        setEmployeesNameData(res.data.employeeNames)
       

      }).catch(err => {
        console.log(err);
       
      })


  }

  const getListDepartments = async () => {
    setLoading(true)
    await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/listDepartments`)
      .then(res => {
        setDepartmentList(res.data)
        // setAddedDepartment(addedDepartment === false ? true : false)
        setLoading(false)

      }).catch(err => {
        console.log(err);
        setLoading(false)
      })


  }


  const handelDeleteAlltDepartments = () => {
    const ifUserConfirmed  = window.confirm("Are you sure you want to delete all departments?")
    if(ifUserConfirmed){
      axios.delete(`${import.meta.env.VITE_APP_SERVER_URL}/auth/deleteAlltDepartments`)
      .then(res => {
        toast.success(res.data.msg)
        setAddedDepartment(addedDepartment === false ? true : false)
      }).catch(err => {
        console.log(err);

      })


    }

   

  }

  const formik = useFormik({
    initialValues: {
      department_name: '',
      department_head: '',
    },

    onSubmit: (values) => {
      setLoading(true)
      axios
        .post(`${import.meta.env.VITE_APP_SERVER_URL}/auth/department`, values)
        .then((response) => {
           
          toast.success(response.data.msg)
          setLoading(false)
          setAddedDepartment(addedDepartment === false ? true : false)
        })
        .catch((error) => {
          console.error('Error adding employee', error);
          setLoading(false)
        });
    },
  });





  useEffect(() => {
    getEmployeesNameData();
    getListDepartments();
  }, [addedDepartment])


  const columns = [
    {
      name: 'Department Head',
      selector: (row) => row.department_head,
      sortable: true,
    },
    {
      name: 'Designation Name',
      selector: (row) => row.department_name,
      sortable: true,
    },
    {
      name: 'Created',
      selector: (row) => row.created_date,
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
          <Typography variant="h6" mb={2}>Add New Department</Typography>
          <Divider />
          <form action="" onSubmit={formik.handleSubmit}>
            <Box sx={{ mt: 2 }}>
              <FormLabel> Name</FormLabel>
              <TextField
                placeholder="Enter  name"
                size="small"
                fullWidth
                name='department_name'
                onChange={formik.handleChange}
                value={formik.values.department_name}

              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <FormLabel>Department Head</FormLabel>
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

       {
        loading ? <LoadingComponent/> :
        <Card sx={{ width: {
          lg:"60%",
          xs:"100%",
          sm:"80%",
          md:"70%"

        }, padding: 2 }}>
          <Typography variant="h6" mb={2}>List All Departments</Typography>
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

            <Button variant='outlined' onClick={handelDeleteAlltDepartments}>Delete All Departments</Button>
          </Box>

          <Box sx={{ mt: 2 }}>
            <DataTable
              columns={columns}
              // data={epartmentData.filter(item => item.designation.toLowerCase().includes(searchTerm.toLowerCase()))}
              data={departmentList.result}
              pagination
              paginationPerPage={entries}
              customStyles={customStyles}
            />
          </Box>
        </Card>
       }
      </Box>
    </>
  );
};

export default Department;

