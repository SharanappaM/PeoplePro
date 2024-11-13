import { Box, Button, Card, Divider, FormLabel, MenuItem, Select, TextField, Typography, InputLabel } from '@mui/material';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const OrganizationChart = () => {
  const [data, setData] = useState([]);
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {
      name: 'Department Head',
      selector: (row) => row.department,
      sortable: true,
    },
    {
      name: 'Designation Name',
      selector: (row) => row.designation,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      sortable: true,
    },
    // Add more columns as needed
  ];


  return (
    <>
      <Card sx={{  padding: 2 }}>
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

        <Box sx={{ mt: 2 }}>
          <DataTable
            columns={columns}
            data={data.filter(item => item.designation.toLowerCase().includes(searchTerm.toLowerCase()))}
            pagination
            paginationPerPage={entries}
          />
        </Box>
      </Card>
    </>
  )
}

export default OrganizationChart
