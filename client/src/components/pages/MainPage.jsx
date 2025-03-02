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

  const dispatch = useDispatch()

  const { employees, loading, error } = useSelector((state) => state.employee)
  const { projects } = useSelector((state) => state.project)
  const { departmentList } = useSelector((state) => state.department)
  const { clientList } = useSelector((state) => state.clints)





  const projectDashboardCountData = () => {
    const tasks = projects.result;
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
        data: [employees.result?.length,projects.result?.length, departmentList.result?.length,clientList.result?.length],
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

  // Line chart data and options
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Revenue',
        data: [50, 60, 70, 80, 90],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Revenue Growth' },
    },
  };

  // Pie chart data and options
  const pieData = {
    labels: ['Completed', 'Progress', 'Not Stated', 'On Hold'],
    datasets: [
      {
        // label: 'Projects',
        data: [completed, progress, notStated,onHold],
        backgroundColor: ['#1d8348 ', '#36A2EB', '#FFCE56', "red"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      // legend: { position: 'right' },
      // title: { display: true, text: '' },
    },
  };

  return (
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
        <div style={{ width: '50%', margin: '20px auto',   }}>
          <h3>Dashboard Overview</h3>
          <Bar data={barData} options={barOptions} />
        </div>
        {/* <div style={{ width: '70%', margin: '20px auto', height: '300px' }}>
          <h3>Line Chart</h3>
          <Line data={lineData} options={lineOptions} />
        </div> */}
        <div style={{ width: '45%', margin: '20px auto', height: '380px' }}>
          <h3>Project Overview</h3>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </Box>
    </>

  );
};

export default MainPage;



