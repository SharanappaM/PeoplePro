import React, { useEffect } from 'react';
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

  const dispatch = useDispatch()

  const {employees , loading , error} = useSelector((state)=>state.employee)


  useEffect(()=>{
    dispatch(fetchEmployeesData())
    console.log(employees.result.length, "from reducx");
    

  },[dispatch])

    // Bar chart data and options

    
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Sales' },
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
    labels: ['Electronics', 'Furniture', 'Grocery'],
    datasets: [
      {
        label: 'Category Distribution',
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: 'Sales by Category' },
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
                  <Typography variant='h6'>{employees.result.length}</Typography>
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
                  <Typography variant='h6'>4</Typography>
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
                  <Typography variant='h6'>5</Typography>
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
                  <Typography variant='h6'>1</Typography>
                  <Typography variant='h6'>Total Clients</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

        </Grid>

      </Box>
      <div>
        <h2 style={{ textAlign: 'center' }}>Charts with Chart.js</h2>
        <div style={{ width: '70%', margin: '20px auto', height: '300px' }}>
          <h3>Bar Chart</h3>
          <Bar data={barData} options={barOptions} />
        </div>
        <div style={{ width: '70%', margin: '20px auto', height: '300px' }}>
          <h3>Line Chart</h3>
          <Line data={lineData} options={lineOptions} />
        </div>
        <div style={{ width: '70%', margin: '20px auto', height: '300px' }}>
          <h3>Pie Chart</h3>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </>

  );
};

export default MainPage;


 
