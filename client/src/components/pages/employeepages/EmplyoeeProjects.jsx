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
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesData } from '../../redux/features/employee/employeeSlice';
import { featchProjectData } from '../../redux/features/employee/projectSlice';


import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import { ModalStyle } from '../ModalStyle';

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



const EmplyoeeProjects = () => {

  const dispatch = useDispatch();

  const { projects, loading, error } = useSelector((state) => state.project)


  const [addedProject, setAddedProject] = useState(false);
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openEditProjectModal, setOpenEditProjectModal] = useState(false)
  const [employeesNameData, setEmployeesNameData] = useState([])
  const [projectList, setProjectList] = useState([])

  const [selectedProjectId, setSelectedProjectId] = useState(null)


  const [onHold, setOnHold] = useState(0)
  const [notStated, setNotStated] = useState(0)
  const [progress, setProgress] = useState(0)
  const [Completed, setCompleted] = useState(0)
 const [openCreateProjectModal, setOpenCreateProjectModal] = useState(false)
  const [loggedEmployeeData, setLoggedEmployeeData] = useState(null)


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



  const projectDashboardCountData = () => {
    const tasks = projectList.result;
    const completedTasks = tasks?.filter(task => {
      const status = task.status?.toLowerCase();
      return status === 'completed' || status === 'completed';  // Match both "Completed" and "Completed"
    }).length;
    const progressTasks = tasks?.filter(task => {
      const status = task.status?.toLowerCase();
      return status === 'progress' || status === 'progress';  // Match both "Completed" and "Completed"
    }).length;
    const notStatedTasks = tasks?.filter(notStated => {
      const status = notStated.status?.toLowerCase();
      return status === 'not stated' || status === 'not stated';  // Match both "Completed" and "Completed"
    }).length;
    const onHoldTasks = tasks?.filter(onHold => {
      const status = onHold.status?.toLowerCase();
      return status === 'on hold' || status === 'on hold';  // Match both "Completed" and "Completed"
    }).length;


    setCompleted(completedTasks);
    setProgress(progressTasks);
    setOnHold(onHoldTasks);
    setNotStated(notStatedTasks);


    console.log(completedTasks, "completedTasks");

  }


  useEffect(() => {
    getEmployeesNameData();
    // projectDashboardCountData();

    if (projects.length === 0) {
      dispatch(featchProjectData());

    }
  }, [addedProject, dispatch])





  const getEmployeesNameData = async () => {
    await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/getEmployeesName`)
      .then(res => {
        setEmployeesNameData(res.data.employeeNames)
         

      }).catch(err => {
        console.log(err);

      })


  }



  useEffect(() => {
    if (loggedEmployeeData) {

      const getProjectList = async () => {
        await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/listProjects/${loggedEmployeeData}`)
          .then(res => {
            const tasks = res.data.result;
            setProjectList(tasks)


            const completedTasks = tasks.filter(task => {
              const status = task.status?.toLowerCase();
              return status === 'completed' || status === 'completed';  // Match both "Completed" and "Completed"
            }).length;
            const progressTasks = tasks.filter(task => {
              const status = task.status?.toLowerCase();
              return status === 'progress' || status === 'progress';  // Match both "Completed" and "Completed"
            }).length;
            const notStatedTasks = tasks.filter(notStated => {
              const status = notStated.status?.toLowerCase();
              return status === 'not stated' || status === 'not stated';  // Match both "Completed" and "Completed"
            }).length;
            const onHoldTasks = tasks.filter(onHold => {
              const status = onHold.status?.toLowerCase();
              return status === 'on hold' || status === 'on hold';  // Match both "Completed" and "Completed"
            }).length;


            setCompleted(completedTasks);
            setProgress(progressTasks);
            setOnHold(onHoldTasks);
            setNotStated(notStatedTasks);

          }).catch(err => {
            console.log(err);

          })


      }

      getProjectList();

    }
    projectDashboardCountData();
  }, [loggedEmployeeData,addedProject])



  const formki = useFormik({
    initialValues: {
      title: null,
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
      axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/auth/createProject`, values)
        .then(res => {
           
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
      title: '',
      client: '',
      start_date: '',
      end_date: '',
      summary: '',
      team: '',
      estimated_hour: '',
      priority: '',
      description: '',
      status: '',
    },
    onSubmit: (values) => {
      axios.put(`${import.meta.env.VITE_APP_SERVER_URL}/auth/updateProject/${selectedProjectId}`, values)
        .then(res => {
           
          toast.success(res.data.msg);
          setOpenEditProjectModal(false);
          setAddedProject(addedProject === false ? true : false)
        }).catch(err => {
          console.log(err);
        });
    }
  });






  const columns = [
    {
      name: 'Title',
      selector: (row) => row.title,
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
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Action',
      // selector: (row) => row.progress,
      cell: row => <IconButton onClick={() => {
        setOpenEditProjectModal(true)
        setSelectedProjectId(row.id)
      }
      } sx={{ p: 0, m: 0 }}><EditNoteIcon row={row} /></IconButton>,
      sortable: true,
    },



    // Add more columns as needed
  ];








  // Fetch the task data when the edit modal is opened
  useEffect(() => {
    if (selectedProjectId) {
      // Fetch task details from the backend when a task ID is selected
      axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/listProjectsById/${selectedProjectId}`)
        .then(res => {
          const task = res.data; // Assuming the API returns the task data

      



          // Populate Formik form with fetched data
          formKiForEditProject.setValues({
            title: task.title,
            client: task.client,
            start_date: task.start_date,
            end_date: task.end_date,
            summary: task.summary,
            team: task.team,
            estimated_hour: task.estimated_hour,
            priority: task.priority,
            description: task.description,
            status: task.status,
          });
        }).catch(err => {
          console.error(err);
          toast.error('Failed to load task data');
        });
    }
  }, [selectedProjectId]); // Re-run this effect whenever selectedTaskId changes


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
                  <Typography variant='h6'>{Completed}</Typography>
                  <Typography variant='h6'>Total Completed</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item >
            <Card sx={{}}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box p={2} bgcolor="lightgoldenrodyellow">
                  <DonutSmallIcon sx={{
                    fontSize: "60px"
                  }} />
                </Box>
                <Box p={2}>
                  <Typography variant='h6'>{progress}</Typography>
                  <Typography variant='h6'>Total In Progress</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item >
            <Card sx={{}}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box p={2} bgcolor="lightblue">
                  <NoteAltOutlinedIcon sx={{
                    fontSize: "60px"
                  }} />
                </Box>
                <Box p={2}>
                  <Typography variant='h6'>{notStated}</Typography>
                  <Typography variant='h6'>Total Not Stated</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item >
            <Card sx={{}}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box p={2} bgcolor="orangered">
                  <PendingActionsRoundedIcon sx={{
                    fontSize: "60px"
                  }} />
                </Box>
                <Box p={2}>
                  <Typography variant='h6'>{onHold}</Typography>
                  <Typography variant='h6'>Total On Hold</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

        </Grid>

      </Box>
      <Box mt={4}>

        <Card sx={{  width: { xs: '93vw', sm: '70vw', md: '50vw', lg: '70vw', xl: '75vw' }, padding: 2 }}>
          <Typography variant="h6" mb={2}>List All Projects</Typography>
          <Divider />

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{
              display: {
                xs: "none",
                lg: "block"
              }
            }}>
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
        open={openEditProjectModal}
        onClose={() => setOpenEditProjectModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={ModalStyle}>
          <form action="" onSubmit={formKiForEditProject.handleSubmit} >


            <Grid container spacing={2}  >
              <Grid item mt={2} lg={4}>
                <FormLabel> Title<RequiredStar /> </FormLabel>
                <TextField
                  placeholder="Enter title"
                  size="small"
                  fullWidth
                  name="title"
                  value={formKiForEditProject.values.title}
                  onChange={formKiForEditProject.handleChange}
                />
              </Grid>

              <Grid item mt={2} lg={4}>
                <FormLabel> Client <RequiredStar /> </FormLabel>
                <Select
                  fullWidth
                  size="small"
                  name='client'
                  displayEmpty
                  value={formKiForEditProject.values.client}
                  onChange={formKiForEditProject.handleChange}
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
                  value={formKiForEditProject.values.priority}
                  onChange={formKiForEditProject.handleChange}
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="noraml">Noraml</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </Grid>

              <Grid item mt={2} lg={4}>
                <FormLabel> Status <RequiredStar /> </FormLabel>
                <Select
                  fullWidth
                  size="small"
                  name='status'
                  displayEmpty
                  value={formKiForEditProject.values.status}
                  onChange={formKiForEditProject.handleChange}
                >
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Progress">Progress</MenuItem>
                  <MenuItem value="Not Stated">Not Stated</MenuItem>
                  <MenuItem value="On Hold">On Hold</MenuItem>
                </Select>
              </Grid>


              <Grid item mt={2} lg={4}>
                <FormLabel> Estimated Hour<RequiredStar /> </FormLabel>
                <TextField
                  placeholder="Enter estimated hour"
                  size="small"
                  fullWidth
                  name="estimated_hour"
                  value={formKiForEditProject.values.estimated_hour}
                  onChange={formKiForEditProject.handleChange}
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
                  value={formKiForEditProject.values.start_date}
                  onChange={formKiForEditProject.handleChange}
                />
              </Grid>

              <Grid item mt={2} lg={4}>
                <FormLabel> End Date <RequiredStar /> </FormLabel>
                <TextField
                  type='date'
                  size="small"
                  fullWidth
                  name="end_date"
                  value={formKiForEditProject.values.end_date}
                  onChange={formKiForEditProject.handleChange}
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
                  value={formKiForEditProject.values.summary}
                  onChange={formKiForEditProject.handleChange}
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
                  value={formKiForEditProject.values.team}
                  onChange={formKiForEditProject.handleChange}
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
                  value={formKiForEditProject.values.description}
                  onChange={formKiForEditProject.handleChange}
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
        open={openCreateProjectModal}
        onClose={() => setOpenCreateProjectModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={ModalStyle}>
          <form action="" onSubmit={formki.handleSubmit} >


            <Grid container spacing={2}  >
              <Grid item mt={2} lg={4}>
                <FormLabel> Title<RequiredStar /> </FormLabel>
                <TextField
                  placeholder="Enter title"
                  size="small"
                  fullWidth
                  name="title"
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

export default EmplyoeeProjects
