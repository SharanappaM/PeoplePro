import { Box, Button, Card, Divider, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios, { } from "axios"
import { customStyles } from '../../ReactDataTableStyle';
import LoadingComponent from '../../../layouts/LoadingComponent';







const OrganizationChart = () => {
  const [employeesData, setEmployeesData] = useState([]);
  const [employeeCreated, setEmployeesCreated] = useState(false);
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading , setLoading] = useState(false)

  const getEmployeeData = () => {
    setLoading(true)
    axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/listEmployees`)
      .then(res => {
        setEmployeesData(res.data.result)
        setLoading(false)

      }).catch(err => {
        console.log(err);
        setLoading(false)

      })


  }
  useEffect(() => {
    getEmployeeData();
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




  return (
    <>

      <Card sx={{  width: { xs: '93vw', sm: '70vw', md: '50vw', lg: '70vw', xl: '75vw' }, padding: 2 }}>
        <Typography variant="h6" mb={2}>Organization Chart</Typography>
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


        </Box>

       {
        loading ? <LoadingComponent/> : <Box sx={{ mt: 2 }}>
        <DataTable
          columns={columns}
          // data={employeesData.filter(item => item.designation.toLowerCase().includes(searchTerm.toLowerCase()))}
          data={employeesData}
          pagination
          paginationPerPage={entries}
          customStyles={customStyles}
        />
      </Box>
       }
      </Card>



    </>
  )
}

export default OrganizationChart

