import { Box, Button, Card, Divider, FormLabel, MenuItem, Select, TextField, Typography, InputLabel, Modal, Grid2, Grid, IconButton } from '@mui/material';

import React, { useEffect, useState } from 'react'
import FactCheckIcon from '@mui/icons-material/FactCheck';
import DataTable from 'react-data-table-component';
import { customStyles } from '../ReactDataTableStyle';
import RequiredStar from '../../RequiredStar';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';

import EditNoteIcon from '@mui/icons-material/EditNote';
import { useLocation } from 'react-router-dom';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const EmployeeTasks = () => {
  const [loggedEmployeeData, setLoggedEmployeeData] = useState(null)
  const [addedTask, setAddedTask] = useState(false);
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false)
  const [openEditTaskModal, setOpenEditTaskModal] = useState(false)
  const [employeesNames, setEmployeesNames] = useState([])
  const [projectNames, setProjectsNames] = useState([])

  const location = useLocation(); // To track route changes
  const [tasksList, setTasksList] = useState([])





  useEffect(() => {
    const employeeData1 = localStorage.getItem("employeeData");
    // Check if there's valid employee data in localStorage
    if (employeeData1) {
      const parsedEmployeeData = JSON.parse(employeeData1);
      if (parsedEmployeeData && parsedEmployeeData.first_name) {
        setLoggedEmployeeData(parsedEmployeeData.first_name);
       
      }
    }
  }, [location]); // Dependency on location (route changes)


  const getEmployeesNameData = async () => {
    await axios.get("http://localhost:8787/auth/getEmployeesName")
      .then(res => {
        setEmployeesNames(res.data.employeeNames)
        // console.log(res.data.employeeNames);

      }).catch(err => {
        console.log(err);

      })


  }
  const getProjectsNames = async () => {
    await axios.get("http://localhost:8787/auth/getByProjectName")
      .then(res => {
        setProjectsNames(res.data.projectNames)

      }).catch(err => {
        console.log(err);

      })


  }







  useEffect(() => {
    if (loggedEmployeeData) {
      const getTasksList = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/listTasks/${loggedEmployeeData}`);
          setTasksList(res.data.result);
          // console.log(res.data.result); // Debugging log
        } catch (err) {
          console.log(err);
        }
      };

      getTasksList();
    }
  }, [loggedEmployeeData]); // Dependency on loggedEmployeeData




  useEffect(() => {
    getEmployeesNameData();
    getProjectsNames();
  }, [])


  const formki = useFormik({
    initialValues: {

      tital: tasksList.map((item)=>{item.tital}),
      // tital: null,
      project: null,
      start_date: null,
      end_date: null,
      summary: null,
      team: null,
      estimated_hour: null,
      priority: null,
      description: null,
    },
    onSubmit: (values) => {
      axios.post("http://localhost:8787/auth/createTasks", values)
        .then(res => {
          if (res.data.status === 500) {
            toast.error("Error while creating task")
          }

          // console.log(res.data.msg);
          toast.success(res.data.msg);

          setOpenCreateTaskModal(false)
          setAddedTask(addedTask === false ? true : false)

        }).catch(err => {
          console.log(err);

        })
    }
  })






  const columns = [
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Project',
      selector: (row) => row.project,
      sortable: true,
    },
    {
      name: 'Team',
      selector: (row) => row.team,
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: (row) => row.start_date,
      sortable: true,
    },
    {
      name: 'End Date',
      selector: (row) => row.end_date,
      sortable: true,
    },
    {
      name: 'Estimated Hour',
      selector: (row) => row.estimated_hour,
      sortable: true,
    },
    {
      name: 'Priority',
      selector: (row) => row.priority,
      sortable: true,
    },
    {
      name: 'Progress',
      selector: (row) => row.progress,
      sortable: true,
    },
    {
      name: 'Action',
      // selector: (row) => row.progress,
      cell: row => <IconButton onClick={() => setOpenEditTaskModal(true)} sx={{ p: 0, m: 0 }}><EditNoteIcon row={row} /></IconButton>,
      sortable: true,
    },



    // Add more columns as needed
  ];
  return (
    <Box>
      <ToastContainer position='bottom-right' />
      <Box>
        <Grid container spacing={4}>
          <Grid item >
            <Card sx={{}}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box p={2} bgcolor="success.main">
                  <FactCheckIcon sx={{
                    fontSize: "60px"
                  }} />
                </Box>
                <Box p={2}>
                  <Typography variant='h6'>5</Typography>
                  <Typography variant='h6'>Total Caomplated</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item >
            <Card sx={{}}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box p={2} bgcolor="lightgoldenrodyellow">
                  <FactCheckIcon sx={{
                    fontSize: "60px"
                  }} />
                </Box>
                <Box p={2}>
                  <Typography variant='h6'>2</Typography>
                  <Typography variant='h6'>Total In Progress</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item >
            <Card sx={{}}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box p={2} bgcolor="lightblue">
                  <FactCheckIcon sx={{
                    fontSize: "60px"
                  }} />
                </Box>
                <Box p={2}>
                  <Typography variant='h6'>5</Typography>
                  <Typography variant='h6'>Total Not Stated</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item >
            <Card sx={{}}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box p={2} bgcolor="orangered">
                  <FactCheckIcon sx={{
                    fontSize: "60px"
                  }} />
                </Box>
                <Box p={2}>
                  <Typography variant='h6'>5</Typography>
                  <Typography variant='h6'>Total On Hold</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

        </Grid>

      </Box>
      <Box mt={4}>

        <Card sx={{ width: "75vw", padding: 2 }}>
          <Typography variant="h6" mb={2}>List All Task</Typography>
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
              // data={employeesData.filter(item => item.designation.toLowerCase().includes(searchTerm.toLowerCase()))}
              data={tasksList}
              pagination
              paginationPerPage={entries}
              customStyles={customStyles}
            />
          </Box>
        </Card>

      </Box>








      <Modal
        open={openEditTaskModal}
        onClose={() => setOpenEditTaskModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <form action="" onSubmit={formki.handleSubmit} >
            <Typography>Edit Task </Typography>


            <Grid container spacing={2}  >
              <Grid item mt={2} lg={4}>
                <FormLabel> Title<RequiredStar /> </FormLabel>
                <TextField
                  placeholder="Enter tital"
                  size="small"
                  fullWidth
                  name="tital"
                  value={formki.values.title}
                  onChange={formki.handleChange}
                />
              </Grid>

              <Grid item mt={2} lg={4}>
                <FormLabel> Client <RequiredStar /> </FormLabel>
                <Select
                  fullWidth
                  size="small"
                  name='client'
                  displayEmpty
                  value={formki.values.client}
                  onChange={formki.handleChange}
                >
                  <MenuItem value="Sharan">Sharan</MenuItem>
                  <MenuItem value="Raju">Raju</MenuItem>
                  <MenuItem value="Basavaraj">Basavaraj</MenuItem>
                </Select>
              </Grid>
              <Grid item mt={2} lg={4}>
                <FormLabel> Priority <RequiredStar /> </FormLabel>
                <Select
                  fullWidth
                  size="small"
                  name='priority'
                  displayEmpty
                  value={formki.values.priority}
                  onChange={formki.handleChange}
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="noraml">Noraml</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </Grid>


              <Grid item mt={2} lg={4}>
                <FormLabel> Estimated Hour<RequiredStar /> </FormLabel>
                <TextField
                  placeholder="Enter estimated hour"
                  size="small"
                  fullWidth
                  name="estimated_hour"
                  value={formki.values.estimated_hour}
                  onChange={formki.handleChange}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} >
              <Grid item mt={2} lg={4}>
                <FormLabel> Start Date<RequiredStar /> </FormLabel>
                <TextField
                  type='date'
                  size="small"
                  fullWidth
                  name="start_date"
                  value={formki.values.start_date}
                  onChange={formki.handleChange}
                />
              </Grid>

              <Grid item mt={2} lg={4}>
                <FormLabel> End Date <RequiredStar /> </FormLabel>
                <TextField
                  type='date'
                  size="small"
                  fullWidth
                  name="end_date"
                  value={formki.values.end_date}
                  onChange={formki.handleChange}
                />
              </Grid>


              <Grid item mt={2} lg={4}>
                <FormLabel> Summary<RequiredStar /> </FormLabel>
                <TextField
                  placeholder="Enter summary"
                  type='text'
                  size="small"
                  fullWidth
                  name="summary"
                  value={formki.values.summary}
                  onChange={formki.handleChange}
                />
              </Grid>
            </Grid>



            <Grid container spacing={2}  >


              <Grid item mt={2} lg={4}>
                <FormLabel> Team <RequiredStar /> </FormLabel>
                <Select
                  fullWidth
                  size="small"
                  name='team'
                  displayEmpty
                  value={formki.values.team}
                  onChange={formki.handleChange}
                >
                  {employeesNames.map((items, index) => (
                    <MenuItem key={index} value={items}>{items}</MenuItem>
                  ))}


                </Select>
              </Grid>


              <Grid item mt={2} lg={4}>
                <FormLabel> Description </FormLabel>
                <TextField
                  placeholder="Enter title"
                  size="small"
                  fullWidth
                  name="description"
                  value={formki.values.description}
                  onChange={formki.handleChange}
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

    </Box>
  )
}

export default EmployeeTasks

