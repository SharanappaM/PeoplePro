import { Box, Button, Card, Divider, FormLabel, MenuItem, Select, TextField, Typography, InputLabel } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';
import { customStyles } from '../../ReactDataTableStyle';
import LoadingComponent from '../../../layouts/LoadingComponent';

const Designation = () => {
  const [designationData, setDesignationData] = useState([]);
  const [entries, setEntries] = useState(7);
  const [searchTerm, setSearchTerm] = useState('');
  const [depratmentName, setDepartmentName] = useState([])
  const [addedDesignation, setAddedDesignation] = useState(false)

  const [loading , setLoading] = useState(false)
  const columns = [
    {
      name: 'Department',
      selector: (row) => row.department_name,
      sortable: true,
    },
    {
      name: 'Designation Name',
      selector: (row) => row.designation_name,
      sortable: true,
    }
  ];



  const getByDepartmetName = () => {
    axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/getByDepartmentName`)
      .then(res => {
         
        setDepartmentName(res.data.getDepartment_name);

      }).catch(err => {
        console.log(err);

      })
  }

  const getByDepartmets = () => {
    setLoading(true)
    axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/listDesignations`)
      .then(res => {
         
        setDesignationData(res.data.result);
        setLoading(false)
      }).catch(err => {
        console.log(err);
        setLoading(false)

      })
  }


  const handelDeleteAlltDesignations=()=>{
    const ifUserConfirmed  = window.confirm("Are you sure you want to delete all designations?")
    if(ifUserConfirmed){
    axios.delete(`${import.meta.env.VITE_APP_SERVER_URL}/auth/deleteAllDesignations`)
    .then(res=>{
       
      toast.success(res.data.msg)
      
    }).catch(err=>{
      console.log(err);
      
    })
  }

  }

  useEffect(() => {
    getByDepartmetName()
    getByDepartmets();
  }, [addedDesignation])

  const formKi = useFormik({
    initialValues: {
      department_name: null,

      designation_name: null,
 
    },
    onSubmit: (values) => {
      setLoading(true)
      axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/auth/createDesignation`, values)
        .then(res => {
          toast.success(res.data.msg)
          setLoading(false)
          setAddedDesignation(addedDesignation === false ? true : false)

        }).catch(err => {
          console.log(err);
          setLoading(false)
        })

    }
  }

  )

  return (
    <>
     <ToastContainer position='bottom-right' />
      <Box sx={{ display: "flex",flexDirection:{
        xs:"column",
        md:"row",
        sm:"column",
        lg:"row"
      }, justifyContent: "space-around", mt: 2 }}>
        {/* Left Section: Form for Adding New Designation */}
        <Card sx={{ p: 4, mb:{
          xs:5,
          lg:0
        },width: {
          lg:"35%",
          xs:"100%",
          sm:"90%",
          md:"45%"
        }, height:"50%"   }}>
          <Typography variant="h6" mb={2}>Add New Designation</Typography>
          <Divider />

          {/* Department Head */}
          <form action="" onSubmit={formKi.handleSubmit}>
            <Box sx={{ mt: 2 }}>
              <FormLabel>Department</FormLabel>
              <Select
                labelId="department-select-label"
                id="department-select"
                fullWidth
                size="small"
                name='department_name'
                value={formKi.values.department_name}
                onChange={formKi.handleChange}

              >
                {depratmentName.map((items, index) => (
                  <MenuItem key={index} value={items}>{items}</MenuItem>

                ))}
              </Select>
            </Box>
            <Box sx={{ mt: 2 }}>
              <FormLabel>Designation Name</FormLabel>
              <TextField
                placeholder="Enter designation name"
                size="small"
                fullWidth
                name='designation_name'
                value={formKi.values.designation_name}
                onChange={formKi.handleChange}

              />
            </Box>
          

            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <Button type='submit' variant="contained" >
                Save
              </Button>
            </Box>
          </form>
        </Card>

       
        {
          loading ? <LoadingComponent/> : <Card sx={{ width: {
            lg:"60%",
            xs:"100%",
            sm:"80%",
            md:"70%"
  
          },  padding: 2 }}>
            <Typography variant="h6" mb={2}>Designation List</Typography>
            <Divider />
  
            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{
                display:{
                  xs:"none",
                  lg:"block",
                  sm:"none",
                  md:"block"
                }
              }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>Show</Typography>
                <Select
                  value={entries}
                  onChange={(e) => setEntries(e.target.value)}
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
                  sx={{ ml: 1 }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  variant="outlined"
                />
              </Box>
             </Box>
  
  
              <Button variant='outlined' onClick={handelDeleteAlltDesignations}>Delete All Designations</Button>
  
            </Box>
  
            <Box sx={{ mt: 2 }}>
              <DataTable
                columns={columns}
                // data={data.filter(item => item.designation.toLowerCase().includes(searchTerm.toLowerCase()))}
                data={designationData}
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

export default Designation;
