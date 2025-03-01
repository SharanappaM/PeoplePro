// import { Box, Button, Card, Divider, FormLabel, MenuItem, Select, TextField, Typography, InputLabel, Modal, Grid2, Grid, IconButton } from '@mui/material';

// import React, { useEffect, useState } from 'react'
// import FactCheckIcon from '@mui/icons-material/FactCheck';
// import DataTable from 'react-data-table-component';
// import { customStyles } from '../ReactDataTableStyle';
// import RequiredStar from '../../RequiredStar';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import { toast, ToastContainer } from 'react-toastify';

// import EditNoteIcon from '@mui/icons-material/EditNote';
// import { useLocation } from 'react-router-dom';


// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 800,
//   bgcolor: 'background.paper',
//   // border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };



// const EmployeeTasks = () => {
//   const [loggedEmployeeData, setLoggedEmployeeData] = useState(null)
//   const [addedTask, setAddedTask] = useState(false);
//   const [entries, setEntries] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false)
//   const [openEditTaskModal, setOpenEditTaskModal] = useState(false)
//   const [employeesNames, setEmployeesNames] = useState([])
//   const [projectNames, setProjectsNames] = useState([])

//   const location = useLocation(); // To track route changes
//   const [tasksList, setTasksList] = useState([])


//  const [onHold, setOnHold] = useState(0)
//   const [notStated, setNotStated] = useState(0)
//   const [progress, setProgress] = useState(0)
//   const [completed, setCompleted] = useState(0)


  
  // const projectDashboardCountData = () => {
  //   const tasks = tasksList;
  //   const completedTasks = tasks?.filter(task => {
  //     const status = task.status?.toLowerCase();
  //     return status === 'completed' || status === 'completed';  // Match both "Completed" and "Caomplated"
  //   }).length;
  //   const progressTasks = tasks?.filter(task => {
  //     const status = task.status?.toLowerCase();
  //     return status === 'progress' || status === 'progress';  // Match both "Completed" and "Caomplated"
  //   }).length;
  //   const notStatedTasks = tasks?.filter(notStated => {
  //     const status = notStated.status?.toLowerCase();
  //     return status === 'not stated' || status === 'not stated';  // Match both "Completed" and "Caomplated"
  //   }).length;
  //   const onHoldTasks = tasks?.filter(onHold => {
  //     const status = onHold.status?.toLowerCase();
  //     return status === 'on hold' || status === 'on hold';  // Match both "Completed" and "Caomplated"
  //   }).length;


  //   setCompleted(completedTasks);
  //   setProgress(progressTasks);
  //   setOnHold(onHoldTasks);
  //   setNotStated(notStatedTasks);
  // }


  // useEffect(() => {
  //   const employeeData1 = localStorage.getItem("employeeData");
  //   // Check if there's valid employee data in localStorage
  //   if (employeeData1) {
  //     const parsedEmployeeData = JSON.parse(employeeData1);
  //     if (parsedEmployeeData && parsedEmployeeData.first_name) {
  //       setLoggedEmployeeData(parsedEmployeeData.first_name);
       
  //     }
  //   }

  //   projectDashboardCountData();
  // }, [location]); // Dependency on location (route changes)


//   const getEmployeesNameData = async () => {
//     await axios.get("http://localhost:8787/auth/getEmployeesName")
//       .then(res => {
//         setEmployeesNames(res.data.employeeNames)
//         // console.log(res.data.employeeNames);

//       }).catch(err => {
//         console.log(err);

//       })


//   }
//   const getProjectsNames = async () => {
//     await axios.get("http://localhost:8787/auth/getByProjectName")
//       .then(res => {
//         setProjectsNames(res.data.projectNames)

//       }).catch(err => {
//         console.log(err);

//       })


//   }







//   useEffect(() => {
//     if (loggedEmployeeData) {
//       const getTasksList = async () => {
//         try {
//           const res = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/listTasks/${loggedEmployeeData}`);
//           setTasksList(res.data.result);
//           // console.log(res.data.result); // Debugging log
//         } catch (err) {
//           console.log(err);
//         }
//       };

//       getTasksList();
//     }
//   }, [loggedEmployeeData]); // Dependency on loggedEmployeeData




//   useEffect(() => {
//     getEmployeesNameData();
//     getProjectsNames();
//   }, [])


//   const formki = useFormik({
//     initialValues: {

//       tital: tasksList.map((item)=>{item.tital}),
//       // tital: null,
//       project: null,
//       start_date: null,
//       end_date: null,
//       summary: null,
//       team: null,
//       estimated_hour: null,
//       priority: null,
//       description: null,
//     },
//     onSubmit: (values) => {
//       axios.post("http://localhost:8787/auth/createTasks", values)
//         .then(res => {
//           if (res.data.status === 500) {
//             toast.error("Error while creating task")
//           }

//           // console.log(res.data.msg);
//           toast.success(res.data.msg);

//           setOpenCreateTaskModal(false)
//           setAddedTask(addedTask === false ? true : false)

//         }).catch(err => {
//           console.log(err);

//         })
//     }
//   })






//   const columns = [
//     {
//       name: 'Title',
//       selector: (row) => row.title,
//       sortable: true,
//     },
//     {
//       name: 'Project',
//       selector: (row) => row.project,
//       sortable: true,
//     },
//     {
//       name: 'Team',
//       selector: (row) => row.team,
//       sortable: true,
//     },
//     {
//       name: 'Start Date',
//       selector: (row) => row.start_date,
//       sortable: true,
//     },
//     {
//       name: 'End Date',
//       selector: (row) => row.end_date,
//       sortable: true,
//     },
//     {
//       name: 'Estimated Hour',
//       selector: (row) => row.estimated_hour,
//       sortable: true,
//     },
//     {
//       name: 'Priority',
//       selector: (row) => row.priority,
//       sortable: true,
//     },
//     {
//       name: 'Progress',
//       selector: (row) => row.progress,
//       sortable: true,
//     },
//     {
//       name: 'Action',
//       // selector: (row) => row.progress,
//       cell: row => <IconButton onClick={() => setOpenEditTaskModal(true)} sx={{ p: 0, m: 0 }}><EditNoteIcon row={row} /></IconButton>,
//       sortable: true,
//     },



//     // Add more columns as needed
//   ];
//   return (
//     <Box>
//       <ToastContainer position='bottom-right' />
//       <Box>
//         <Grid container spacing={4}>
//           <Grid item >
//             <Card sx={{}}>
//               <Box display="flex" justifyContent="space-between" alignItems="center">
//                 <Box p={2} bgcolor="success.main">
//                   <FactCheckIcon sx={{
//                     fontSize: "60px"
//                   }} />
//                 </Box>
//                 <Box p={2}>
//                   <Typography variant='h6'>{onHold}</Typography>
//                   <Typography variant='h6'>Total Caomplated</Typography>
//                 </Box>
//               </Box>
//             </Card>
//           </Grid>
//           <Grid item >
//             <Card sx={{}}>
//               <Box display="flex" justifyContent="space-between" alignItems="center">
//                 <Box p={2} bgcolor="lightgoldenrodyellow">
//                   <FactCheckIcon sx={{
//                     fontSize: "60px"
//                   }} />
//                 </Box>
//                 <Box p={2}>
//                   <Typography variant='h6'>2</Typography>
//                   <Typography variant='h6'>Total In Progress</Typography>
//                 </Box>
//               </Box>
//             </Card>
//           </Grid>
//           <Grid item >
//             <Card sx={{}}>
//               <Box display="flex" justifyContent="space-between" alignItems="center">
//                 <Box p={2} bgcolor="lightblue">
//                   <FactCheckIcon sx={{
//                     fontSize: "60px"
//                   }} />
//                 </Box>
//                 <Box p={2}>
//                   <Typography variant='h6'>5</Typography>
//                   <Typography variant='h6'>Total Not Stated</Typography>
//                 </Box>
//               </Box>
//             </Card>
//           </Grid>
//           <Grid item >
//             <Card sx={{}}>
//               <Box display="flex" justifyContent="space-between" alignItems="center">
//                 <Box p={2} bgcolor="orangered">
//                   <FactCheckIcon sx={{
//                     fontSize: "60px"
//                   }} />
//                 </Box>
//                 <Box p={2}>
//                   <Typography variant='h6'>5</Typography>
//                   <Typography variant='h6'>Total On Hold</Typography>
//                 </Box>
//               </Box>
//             </Card>
//           </Grid>

//         </Grid>

//       </Box>
//       <Box mt={4}>

//         <Card sx={{ width: "75vw", padding: 2 }}>
//           <Typography variant="h6" mb={2}>List All Task</Typography>
//           <Divider />

//           <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Typography>Show</Typography>
//               <Select
//                 value={entries}

//                 size="small"
//                 sx={{ ml: 1 }}
//               >
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//                 <MenuItem value={100}>100</MenuItem>
//               </Select>
//               <Typography sx={{ ml: 1 }}>entries</Typography>
//             </Box>

//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Typography>Search</Typography>
//               <TextField
//                 size="small"
//                 sx={{ ml: 1 }}
//                 value={searchTerm}

//                 variant="outlined"
//               />
//             </Box>
//           </Box>

//           <Box sx={{ mt: 2 }}>
//             <DataTable
//               columns={columns}
//               // data={employeesData.filter(item => item.designation.toLowerCase().includes(searchTerm.toLowerCase()))}
//               data={tasksList}
//               pagination
//               paginationPerPage={entries}
//               customStyles={customStyles}
//             />
//           </Box>
//         </Card>

//       </Box>








//       <Modal
//         open={openEditTaskModal}
//         onClose={() => setOpenEditTaskModal(false)}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >

//         <Box sx={style}>
//           <form action="" onSubmit={formki.handleSubmit} >
//             <Typography>Edit Task </Typography>


//             <Grid container spacing={2}  >
//               <Grid item mt={2} lg={4}>
//                 <FormLabel> Title<RequiredStar /> </FormLabel>
//                 <TextField
//                   placeholder="Enter tital"
//                   size="small"
//                   fullWidth
//                   name="tital"
//                   value={formki.values.title}
//                   onChange={formki.handleChange}
//                 />
//               </Grid>

//               <Grid item mt={2} lg={4}>
//                 <FormLabel> Client <RequiredStar /> </FormLabel>
//                 <Select
//                   fullWidth
//                   size="small"
//                   name='client'
//                   displayEmpty
//                   value={formki.values.client}
//                   onChange={formki.handleChange}
//                 >
//                   <MenuItem value="Sharan">Sharan</MenuItem>
//                   <MenuItem value="Raju">Raju</MenuItem>
//                   <MenuItem value="Basavaraj">Basavaraj</MenuItem>
//                 </Select>
//               </Grid>
//               <Grid item mt={2} lg={4}>
//                 <FormLabel> Priority <RequiredStar /> </FormLabel>
//                 <Select
//                   fullWidth
//                   size="small"
//                   name='priority'
//                   displayEmpty
//                   value={formki.values.priority}
//                   onChange={formki.handleChange}
//                 >
//                   <MenuItem value="High">High</MenuItem>
//                   <MenuItem value="noraml">Noraml</MenuItem>
//                   <MenuItem value="Low">Low</MenuItem>
//                 </Select>
//               </Grid>


//               <Grid item mt={2} lg={4}>
//                 <FormLabel> Estimated Hour<RequiredStar /> </FormLabel>
//                 <TextField
//                   placeholder="Enter estimated hour"
//                   size="small"
//                   fullWidth
//                   name="estimated_hour"
//                   value={formki.values.estimated_hour}
//                   onChange={formki.handleChange}
//                 />
//               </Grid>
//             </Grid>

//             <Grid container spacing={2} >
//               <Grid item mt={2} lg={4}>
//                 <FormLabel> Start Date<RequiredStar /> </FormLabel>
//                 <TextField
//                   type='date'
//                   size="small"
//                   fullWidth
//                   name="start_date"
//                   value={formki.values.start_date}
//                   onChange={formki.handleChange}
//                 />
//               </Grid>

//               <Grid item mt={2} lg={4}>
//                 <FormLabel> End Date <RequiredStar /> </FormLabel>
//                 <TextField
//                   type='date'
//                   size="small"
//                   fullWidth
//                   name="end_date"
//                   value={formki.values.end_date}
//                   onChange={formki.handleChange}
//                 />
//               </Grid>


//               <Grid item mt={2} lg={4}>
//                 <FormLabel> Summary<RequiredStar /> </FormLabel>
//                 <TextField
//                   placeholder="Enter summary"
//                   type='text'
//                   size="small"
//                   fullWidth
//                   name="summary"
//                   value={formki.values.summary}
//                   onChange={formki.handleChange}
//                 />
//               </Grid>
//             </Grid>



//             <Grid container spacing={2}  >


//               <Grid item mt={2} lg={4}>
//                 <FormLabel> Team <RequiredStar /> </FormLabel>
//                 <Select
//                   fullWidth
//                   size="small"
//                   name='team'
//                   displayEmpty
//                   value={formki.values.team}
//                   onChange={formki.handleChange}
//                 >
//                   {employeesNames.map((items, index) => (
//                     <MenuItem key={index} value={items}>{items}</MenuItem>
//                   ))}


//                 </Select>
//               </Grid>


//               <Grid item mt={2} lg={4}>
//                 <FormLabel> Description </FormLabel>
//                 <TextField
//                   placeholder="Enter title"
//                   size="small"
//                   fullWidth
//                   name="description"
//                   value={formki.values.description}
//                   onChange={formki.handleChange}
//                 />
//               </Grid>




//             </Grid>

//             <Box mt={2}>
//               <Button variant='contained'>Reset</Button>
//               <Button type='submit' variant='contained' sx={{ ml: 5 }}>Save</Button>
//             </Box>




//           </form>

//         </Box>
//       </Modal>

//     </Box>
//   )
// }

// export default EmployeeTasks



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



const EmployeeTasks = () => {
  const [addedTask, setAddedTask] = useState(false);
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false)
  const [openEditTaskModal, setOpenEditTaskModal] = useState(false)
  const [employeesNames, setEmployeesNames] = useState([])
  const [projectNames, setProjectsNames] = useState([])
  const [tasksList, setTasksList] = useState([])
  const [tasksList1, setTasksList1] = useState([])


  const [onHold, setOnHold] = useState(0)
  const [notStated, setNotStated] = useState(0)
  const [progress, setProgress] = useState(0)
  const [caomplated, setCaomplated] = useState(0)
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [loggedEmployeeData, setLoggedEmployeeData] = useState(null)




  const projectDashboardCountData = () => {
    const tasks = tasksList;
    const completedTasks = tasks?.filter(task => {
      const status = task.status?.toLowerCase();
      return status === 'caomplated' || status === 'caomplated';  // Match both "Completed" and "Caomplated"
    }).length;
    const progressTasks = tasks?.filter(task => {
      const status = task.status?.toLowerCase();
      return status === 'progress' || status === 'progress';  // Match both "Completed" and "Caomplated"
    }).length;
    const notStatedTasks = tasks?.filter(notStated => {
      const status = notStated.status?.toLowerCase();
      return status === 'not stated' || status === 'not stated';  // Match both "Completed" and "Caomplated"
    }).length;
    const onHoldTasks = tasks?.filter(onHold => {
      const status = onHold.status?.toLowerCase();
      return status === 'on hold' || status === 'on hold';  // Match both "Completed" and "Caomplated"
    }).length;


    setCaomplated(completedTasks);
    setProgress(progressTasks);
    setOnHold(onHoldTasks);
    setNotStated(notStatedTasks);
  }



  const getEmployeesNameData = async () => {
    await axios.get("http://localhost:8787/auth/getEmployeesName")
      .then(res => {
        setEmployeesNames(res.data.employeeNames)
        console.log(res.data.employeeNames);

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
    const employeeData1 = localStorage.getItem("employeeData");
    // Check if there's valid employee data in localStorage
    if (employeeData1) {
      const parsedEmployeeData = JSON.parse(employeeData1);
      if (parsedEmployeeData && parsedEmployeeData.first_name) {
        setLoggedEmployeeData(parsedEmployeeData.first_name);
       
      }
    }


  }, [location]); // Dependency on location (route changes)






    useEffect(() => {
    if (loggedEmployeeData) {
      const getTasksList = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/listTasks/${loggedEmployeeData}`);
          setTasksList(res.data.result);
          // console.log(res.data.result); // Debugging log
          const tasks = res.data.result;
          setTasksList(tasks);
  
  
          const completedTasks = tasks.filter(task => {
            const status = task.status?.toLowerCase();
            return status === 'completed' || status === 'caomplated';  // Match both "Completed" and "Caomplated"
          }).length;
          const progressTasks = tasks.filter(task => {
            const status = task.status?.toLowerCase();
            return status === 'progress' || status === 'progress';  // Match both "Completed" and "Caomplated"
          }).length;
          const notStatedTasks = tasks.filter(notStated => {
            const status = notStated.status?.toLowerCase();
            return status === 'not stated' || status === 'not stated';  // Match both "Completed" and "Caomplated"
          }).length;
          const onHoldTasks = tasks.filter(onHold => {
            const status = onHold.status?.toLowerCase();
            return status === 'on hold' || status === 'on hold';  // Match both "Completed" and "Caomplated"
          }).length;
  
  
          setCaomplated(completedTasks);
          setProgress(progressTasks);
          setOnHold(onHoldTasks);
          setNotStated(notStatedTasks);
        } catch (err) {
          console.log(err);
        }
      };

      getTasksList();
    }


    projectDashboardCountData();
  }, [loggedEmployeeData , addedTask]); // Dependency on loggedEmployeeData



  useEffect(() => {
    getEmployeesNameData();
    // getTasksList();
    getProjectsNames();
  }, [addedTask])


  const formki = useFormik({
    initialValues: {
      title: null,
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

          console.log(res.data.msg);
          toast.success(res.data.msg);

          setOpenCreateTaskModal(false)
          setAddedTask(addedTask === false ? true : false)

        }).catch(err => {
          console.log(err);

        })
    }
  })
 

  const formKiForEditProject = useFormik({
    initialValues: {
      title: '',
      project: '',
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
      axios.put(`http://localhost:8787/auth/updateTask/${selectedTaskId}`, values)
        .then(res => {
          console.log(res.data.msg);
          toast.success(res.data.msg);
          setOpenEditTaskModal(false);
          setAddedTask(addedTask === false ? true : false)
        }).catch(err => {
          console.log(err);
        });
    }
  });





  // Fetch the task data when the edit modal is opened
  useEffect(() => {
    if (selectedTaskId) {
      // Fetch task details from the backend when a task ID is selected
      axios.get(`http://localhost:8787/auth/listTasksById/${selectedTaskId}`)
        .then(res => {
          const task = res.data; // Assuming the API returns the task data
          setTasksList1(task); // Set the task data to local state
          // console.log("task",task.title); // Set the task data to local state
          // console.log("tasksList1",task.map(emp => emp.title)); // Set the task data to local state
          console.log("tasksList1", task); // Set the task data to local state



          // Populate Formik form with fetched data
          formKiForEditProject.setValues({
            title: task.title,
            project: task.project,
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
  }, [selectedTaskId]); // Re-run this effect whenever selectedTaskId changes




  const columns = [
    {
      name: 'title',
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
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => row.id,
      // selector: (row) => row.progress,
      cell: row => <IconButton onClick={() => {
        setOpenEditTaskModal(true)
        setSelectedTaskId(row.id)

      }} sx={{ p: 0, m: 0 }}><EditNoteIcon row={row} /></IconButton>,
      sortable: true,
    },



    // Add more columns as needed
  ];



  const handleDeleteAllTasks = () => {
    axios.delete("http://localhost:8787/auth/deleteAllTasks")
      .then(res => {
        toast.success(res.data.msg)
        setAddedTask(addedTask === false ? true : false)

      }).catch(err => {
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
                  <Typography variant='h6'>{caomplated}</Typography>
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
                  <FactCheckIcon sx={{
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
                  <FactCheckIcon sx={{
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
            <Button variant='outlined' onClick={handleDeleteAllTasks}> Delete All Tasls </Button>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>Search</Typography>
              <TextField
                size="small"
                sx={{ ml: 1 }}
                value={searchTerm}

                variant="outlined"
              />
            </Box>

            <Button variant='outlined' onClick={() => setOpenCreateTaskModal(true)}> Add  </Button>
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
        open={openCreateTaskModal}
        onClose={() => setOpenCreateTaskModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <form action="" onSubmit={formki.handleSubmit} >
            <Typography>Add New Task</Typography>


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
                <FormLabel> Project <RequiredStar /> </FormLabel>
                <Select
                  fullWidth
                  size="small"
                  name='project'
                  displayEmpty
                  value={formki.values.project}
                  onChange={formki.handleChange}
                >
                  {projectNames.map((items, index) => (
                    <MenuItem key={index} value={items}>{items}</MenuItem>
                  ))}


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






      <Modal
        open={openEditTaskModal}
        onClose={() => setOpenEditTaskModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <form action="" onSubmit={formKiForEditProject.handleSubmit} >
            <Typography>Edit Task </Typography>


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

              {/* <Grid item mt={2} lg={4}>
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
              </Grid> */}
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
                  <MenuItem value="Caomplated">Caomplated</MenuItem>
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

    </Box>
  )
}

export default EmployeeTasks



