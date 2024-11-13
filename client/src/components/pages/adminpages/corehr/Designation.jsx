


import { Box, Button, Card, Divider, FormLabel, MenuItem, Select, TextField, Typography, InputLabel } from '@mui/material';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const Designation = () => {
  const [data, setData] = useState([]);
  const [department, setDepartment] = useState('');
  const [designationName, setDesignationName] = useState('');
  const [description, setDescription] = useState('');
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

  const handleSave = () => {
    const newData = {
      department,
      designation: designationName,
      description,
    };
    setData([...data, newData]);
    setDepartment('');
    setDesignationName('');
    setDescription('');
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
        {/* Left Section: Form for Adding New Designation */}
        <Card sx={{ p: 4, width: "45%" }}>
          <Typography variant="h6" mb={2}>Add New Designation</Typography>
          <Divider />

          {/* Department Head */}
          <Box sx={{ mt: 2 }}>
            <FormLabel>Department Head</FormLabel>
            <Select
              labelId="department-select-label"
              id="department-select"
              fullWidth
              size="small"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              {/* Add more departments here */}
            </Select>
          </Box>

          {/* Designation Name */}
          <Box sx={{ mt: 2 }}>
            <FormLabel>Designation Name</FormLabel>
            <TextField
              placeholder="Enter designation name"
              size="small"
              fullWidth
              value={designationName}
              onChange={(e) => setDesignationName(e.target.value)}
            />
          </Box>

          {/* Description */}
          <Box sx={{ mt: 2 }}>
            <FormLabel>Description</FormLabel>
            <TextField
              placeholder="Enter description"
              size="small"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>

          {/* Save Button */}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Card>

        <Card sx={{ width: "50%", padding: 2 }}>
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
      </Box>
    </>
  );
};

export default Designation;
