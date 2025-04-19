import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Box, Card, Grid, Typography } from '@mui/material';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesData } from '../redux/features/employee/employeeSlice';
import { featchProjectData } from '../redux/features/employee/projectSlice';
import { fetchDepartmentData } from '../redux/features/employee/departmentSlice';
import { fetchClientData } from '../redux/features/employee/clientSlice';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const MainPage = () => {


  const [onHold, setOnHold] = useState(0)
  const [notStated, setNotStated] = useState(0)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(0)


  const [onHoldProjects, setOnHoldProjects] = useState(0)
  const [notStatedProjects, setNotStatedProjects] = useState(0)
  const [progressProjects, setProgressProjects] = useState(0)
  const [completedProjects, setCompletedProjects] = useState(0)

  const [onHoldTasks, setOnHoldTasks] = useState(0)
  const [notStatedTasks, setNotStatedTasks] = useState(0)
  const [progressTasks, setProgressTasks] = useState(0)
  const [completedTasks, setCompletedTasks] = useState(0)


  const [lengthOfProject, setLengthOfProject] = useState(0)
  const [lengthOfTasks, setLengthOfTasks] = useState(0)
  const [role1, setRole1] = React.useState(null)
  const dispatch = useDispatch()

  const { employees, loading, error } = useSelector((state) => state.employee)
  const { projects } = useSelector((state) => state.project)
  const { departmentList } = useSelector((state) => state.department)
  const { clientList } = useSelector((state) => state.clints)




  useEffect(() => {
    const role11 = localStorage.getItem("role")
    setRole1(role11)
    const employeeData = localStorage.getItem("employeeData")
    const parsedEmployeeData = JSON.parse(employeeData)
    const first_name = (parsedEmployeeData?.first_name);
    axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/listTasks/${first_name}`)
      .then(res => {
        const tasks = res.data.result;
        setLengthOfTasks(res.data.result?.length);


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


        setCompletedTasks(completedTasks);
        setProgressTasks(progressTasks);
        setOnHoldTasks(onHoldTasks);
        setNotStatedTasks(notStatedTasks);

      }).catch(err => {
        console.log(err);

      })
    axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/listProjects/${first_name}`)
      .then(res => {
        const projects = res.data.result;
        setLengthOfProject(res.data.result?.length);


        const completedProjects = projects?.filter(task => {
          const status = task.status?.toLowerCase();
          return status === 'completed' || status === 'completed';  
        }).length;
        const progressProjects = projects?.filter(task => {
          const status = task.status?.toLowerCase();
          return status === 'progress' || status === 'progress';  
        }).length;
        const notStatedProjects = projects?.filter(notStated => {
          const status = notStated.status?.toLowerCase();
          return status === 'not stated' || status === 'not stated';  
        }).length;
        const onHoldProjects = projects?.filter(onHold => {
          const status = onHold.status?.toLowerCase();
          return status === 'on hold' || status === 'on hold';  
        }).length;


        setCompletedProjects(completedProjects);
        setProgressProjects(progressProjects);
        setOnHoldProjects(onHoldProjects);
        setNotStatedProjects(notStatedProjects);


      }).catch(err => {
        console.log(err);

      })


  }, [])


  const projectDashboardCountData = () => {
    const tasks = projects.result;
    const completedTasks = tasks?.filter(task => {
      const status = task.status?.toLowerCase();
      return status === 'completed' || status === 'completed';  
    }).length;
    const progressTasks = tasks?.filter(task => {
      const status = task.status?.toLowerCase();
      return status === 'progress' || status === 'progress';  
    }).length;
    const notStatedTasks = tasks?.filter(notStated => {
      const status = notStated.status?.toLowerCase();
      return status === 'not stated' || status === 'not stated';  
    }).length;
    const onHoldTasks = tasks?.filter(onHold => {
      const status = onHold.status?.toLowerCase();
      return status === 'on hold' || status === 'on hold';  
    }).length;


    setCompleted(completedTasks);
    setProgress(progressTasks);
    setOnHold(onHoldTasks);
    setNotStated(notStatedTasks);
  }



  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployeesData());
    }

    if (projects.length === 0) {
      dispatch(featchProjectData())
    }
    if (departmentList.length === 0) {
      dispatch(fetchDepartmentData())
    }
    if (clientList.length === 0) {
      dispatch(fetchClientData())
    }

    projectDashboardCountData();


  }, [dispatch])

  // Bar chart data and options


  const barData = {
    labels: ['Employees', 'Projects', 'Department', 'Clients'],
    datasets: [
      {
        label: 'Employees',
        data: [employees.result?.length, projects.result?.length, departmentList.result?.length, clientList.result?.length],
        backgroundColor: ['#7d3c98', '#EB5406', '#F67280', "#15317E"],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      // title: { display: true, text: 'Monthly Sales' },
    },
  };





  // Pie chart data and options
  const pieData = {
    labels: ['Completed', 'Progress', 'Not Stated', 'On Hold'],
    datasets: [
      {
        // label: 'Projects',
        data: [completed, progress, notStated, onHold],
        backgroundColor: ['#1d8348 ', '#36A2EB', '#FFCE56', "red"],
      },
    ],
  };
  const pieDataProjects = {
    labels: ['Completed', 'Progress', 'Not Stated', 'On Hold'],
    datasets: [
      {
        // label: 'Projects',
        data: [completedProjects, progressProjects, notStatedProjects, onHoldProjects],
        backgroundColor: ['#1d8348 ', '#36A2EB', '#FFCE56', "red"],
      },
    ],
  };
  const pieDataTasks = {
    labels: ['Completed', 'Progress', 'Not Stated', 'On Hold'],
    datasets: [
      {
        // label: 'Projects',
        data: [completedTasks, progressTasks, notStatedTasks, onHoldTasks],
        backgroundColor: ['#1d8348 ', '#36A2EB', '#FFCE56', "red"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
    
    },
  };
  const pieOptionsProjects = {
    responsive: true,
    plugins: {
     
    },
  };
  const pieOptionsTasks = {
    responsive: true,
    plugins: {
      
    },
  };

  return (
    <>

      {
        role1 === "admin" ? (
          <>
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
                        <Typography variant='h6'>{employees.result?.length}</Typography>
                        <Typography variant='h6'>Total Employees</Typography>
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
                        <Typography variant='h6'>{projects.result?.length}</Typography>
                        <Typography variant='h6'>Total Projects</Typography>
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
                        <Typography variant='h6'>{departmentList.result?.length}</Typography>
                        <Typography variant='h6'>Total Department</Typography>
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
                        <Typography variant='h6'>{clientList.result?.length}</Typography>
                        <Typography variant='h6'>Total Clients</Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>

              </Grid>

            </Box>
            <Box display="flex" flexDirection="row" justifyContent="space-between" mt={3}>
              <div style={{ width: '50%', margin: '20px auto', }}>
                <h3>Dashboard Overview</h3>
                <Bar data={barData} options={barOptions} />
              </div>

              <div style={{ width: '45%', margin: '20px auto', height: '380px' }}>
                <h3>Project Overview</h3>
                <Pie data={pieData} options={pieOptions} />
              </div>
            </Box>
          </>
        ) : (
          <>

<>
  {/* Cards Section */}
  <Box>
    <Grid container spacing={4} justifyContent="center">
      {/* First Card */}
      <Grid item xs={12} sm={6} md={5}>
        <Box>
          <Box display="flex" justifyContent="center" alignItems="center" height="150px">
            <Box p={2} bgcolor="success.main">
              <FactCheckIcon sx={{ fontSize: "60px" }} />
            </Box>
            <Box p={2} textAlign="center">
              <Typography variant="h6">{lengthOfTasks}</Typography>
              <Typography variant="h6">Total Tasks</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>

      {/* Second Card */}
      <Grid item xs={12} sm={6} md={5}>
        <Box>
          <Box display="flex" justifyContent="center" alignItems="center" height="150px">
            <Box p={2} bgcolor="lightgoldenrodyellow">
              <FactCheckIcon sx={{ fontSize: "60px" }} />
            </Box>
            <Box p={2} textAlign="center">
              <Typography variant="h6">{lengthOfProject}</Typography>
              <Typography variant="h6">Total Projects</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Box>

  {/* Pie Charts Section */}
  <Box mt={4}>
    <Grid container spacing={4} justifyContent="center">
      {/* First Pie Chart */}
      <Grid item xs={12} md={5}>
        <Box height={380} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" mb={2}>Tasks Overview</Typography>
          <Pie data={pieDataTasks} options={pieOptionsTasks} />
        </Box>
      </Grid>

      {/* Second Pie Chart */}
      <Grid item xs={12} md={5}>
        <Box height={380} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" mb={2}>Project Overview</Typography>
          <Pie data={pieDataProjects} options={pieOptionsProjects} />
        </Box>
      </Grid>
    </Grid>
  </Box>
</>

          </>
        )
      }

    </>

  );
};

export default MainPage;



