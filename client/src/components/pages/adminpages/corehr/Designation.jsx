import { Box, Button, Card, Divider, FormLabel, MenuItem, Select, TextField, Typography, InputLabel } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';
import { customStyles } from '../../ReactDataTableStyle';

const Designation = () => {
  const [designationData, setDesignationData] = useState([]);
  const [entries, setEntries] = useState(7);
  const [searchTerm, setSearchTerm] = useState('');
  const [depratmentName, setDepartmentName] = useState([])
  const [addedDesignation, setAddedDesignation] = useState(false)


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



  const getByDepartmetHeadName = () => {
    axios.get("http://localhost:8787/auth/getByDepartmentName")
      .then(res => {
        console.log(res.data);
        setDepartmentName(res.data.getDepartment_name);

      }).catch(err => {
        console.log(err);

      })
  }
  const getByDepartmets = () => {
    axios.get("http://localhost:8787/auth/listDesignations")
      .then(res => {
        console.log(res.data);
        setDesignationData(res.data.result);

      }).catch(err => {
        console.log(err);

      })
  }


  const handelDeleteAlltDesignations=()=>{

  }

  useEffect(() => {
    getByDepartmetHeadName()
    getByDepartmets();
  }, [addedDesignation])

  const formKi = useFormik({
    initialValues: {
      department_name: null,

      designation_name: null,
      description: null
    },
    onSubmit: (values) => {
      axios.post("http://localhost:8787/auth/createDesignation", values)
        .then(res => {
          toast.success(res.data.msg)
          setAddedDesignation(addedDesignation === false ? true : false)

        }).catch(err => {
          console.log(err);
        })

    }
  }

  )

  return (
    <>
     <ToastContainer position='bottom-right' />
      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
        {/* Left Section: Form for Adding New Designation */}
        <Card sx={{ p: 4, width: "35%", height:"50%"   }}>
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
            <Box sx={{ mt: 2 }}>
              <FormLabel>Description</FormLabel>
              <TextField
                placeholder="Enter description"
                size="small"
                fullWidth
                name='description'
                value={formKi.values.description}
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

        <Card sx={{ width: "60%", padding: 2 }}>
          <Typography variant="h6" mb={2}>Designation List</Typography>
          <Divider />

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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


            <Button onClick={handelDeleteAlltDesignations}>Delete All Designations</Button>

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
      </Box>
    </>
  );
};

export default Designation;
