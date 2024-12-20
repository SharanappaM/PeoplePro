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



const Projects = () => {
  const [addedProject, setAddedProject] = useState(false);
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openCreateProjectModal, setOpenCreateProjectModal] = useState(false)
  const [openEditProjectModal, setOpenEditProjectModal] = useState(false)
  const [employeesNameData, setEmployeesNameData] = useState([])
  const [projectList, setProjectList] = useState([])



  const getEmployeesNameData = async () => {
    await axios.get("http://localhost:8787/auth/getEmployeesName")
      .then(res => {
        setEmployeesNameData(res.data.employeeNames)
        console.log(res.data.employeeNames);

      }).catch(err => {
        console.log(err);

      })


  }
  const getProjectList = async () => {
    await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/listProjects`)
      .then(res => {
        setProjectList(res.data.result)
        console.log(res.data.result);

      }).catch(err => {
        console.log(err);

      })


  }


  useEffect(() => {
    getEmployeesNameData();
    getProjectList();
  }, [addedProject])


  const formki = useFormik({
    initialValues: {
      tital: null,
      client: null,
      start_date: null,
      end_date: null,
      summary: null,
      team: null,
      estimated_hour: null,
      priority: null,
      description: null,
    },
    onSubmit: (values) => {
      axios.post("http://localhost:8787/auth/createProject", values)
        .then(res => {
          console.log(res.data.msg);
          toast.success(res.data.msg);
          setOpenCreateProjectModal(false)
          setAddedProject(addedProject === false ? true : false)

        }).catch(err => {
          console.log(err);

        })
    }
  })
  const formKiForEditProject = useFormik({
    initialValues: {
      tital: employeesNameData.map((item)=>{item.tital}),
      client: null,
      start_date: null,
      end_date: null,
      summary: null,
      team: null,
      estimated_hour: null,
      priority: null,
      description: null,
    },
    onSubmit: (values) => {
      axios.post("http://localhost:8787/auth/createProject", values)
        .then(res => {
          console.log(res.data.msg);
          toast.success(res.data.msg);
          setOpenCreateProjectModal(false)
          setAddedProject(addedProject === false ? true : false)

        }).catch(err => {
          console.log(err);

        })
    }
  })





  const columns = [
    {
      name: 'Tital',
      selector: (row) => row.tital,
      sortable: true,
    },
    {
      name: 'Client',
      selector: (row) => row.client,
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
      cell: row => <IconButton onClick={()=>setOpenEditProjectModal(true)} sx={{ p: 0, m: 0 }}><EditNoteIcon row={row} /></IconButton>,
      sortable: true,
    },



    // Add more columns as needed
  ];


  const handleDeleteAllProjects = ()=>{
    axios.delete("http://localhost:8787/auth/deleteAllProjects")
    .then(res=>{
      toast.success(res.data.msg)
        setAddedProject(addedProject=== false ? true :false)
      
    }).catch(err=>{
      console.log(err);
      
    })
  }
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
          <Typography variant="h6" mb={2}>List All Projects</Typography>
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

            <Button variant='outlined' onClick={handleDeleteAllProjects}> Delete All Projects </Button>

            <Button variant='outlined' onClick={() => setOpenCreateProjectModal(true)}> Add  </Button>
          </Box>

          <Box sx={{ mt: 2 }}>
            <DataTable
              columns={columns}
              // data={employeesData.filter(item => item.designation.toLowerCase().includes(searchTerm.toLowerCase()))}
              data={projectList}
              pagination
              paginationPerPage={entries}
              customStyles={customStyles}
            />
          </Box>
        </Card>

      </Box>


      <Modal
        open={openCreateProjectModal}
        onClose={() => setOpenCreateProjectModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <form action="" onSubmit={formki.handleSubmit} >


            <Grid container spacing={2}  >
              <Grid item mt={2} lg={4}>
                <FormLabel> Title<RequiredStar /> </FormLabel>
                <TextField
                  placeholder="Enter tital"
                  size="small"
                  fullWidth
                  name="tital"
                  value={formki.values.tital}
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
                  {employeesNameData.map((items, index) => (
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






      <Modal
        open={openEditProjectModal}
        onClose={() => setOpenEditProjectModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <form action="" onSubmit={formki.handleSubmit} >


            <Grid container spacing={2}  >
              <Grid item mt={2} lg={4}>
                <FormLabel> Title<RequiredStar /> </FormLabel>
                <TextField
                  placeholder="Enter tital"
                  size="small"
                  fullWidth
                  name="tital"
                  value={formKiForEditProject.values.tital}
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
                  {employeesNameData.map((items, index) => (
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

export default Projects
