import { Box, Button, ButtonGroup, Card, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import authImg from "../../../assets/img-auth-big.jpg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import styled from '@emotion/styled';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import logo from "../../../assets/PeoplePro.png"
import { toast, ToastContainer } from 'react-toastify';

const ButtonsLoginAs = styled(Button)({
  textTransform: "capitalize"

});

const LoginPage = () => {


  const [loginTab, setLoginTab] = useState("Admin")

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);




  const [values, setValues] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState(null)
  // const navigate = useNavigate()
  axios.defaults.withCredentials = true; // store cookies in 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/verify`)
      .then(result => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate('/dashboard')
          } else {
            navigate('/dashboard')
          }
        } else {
          navigate('/')

        }
      }).catch(err => console.log(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();


    setLoading(true); 

    if (loginTab === "Admin") {
  
      axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/auth/adminlogin`, values, {
        withCredentials: true
      })
        .then(res => {
          if (res.data.loginStatus) {
      
            navigate("/dashboard")
            localStorage.setItem("valid", true)
            localStorage.setItem("role", res.data.role)
            const employeeParsedData = JSON.stringify(res.data.employeeData)
            localStorage.setItem("adminData", employeeParsedData)
          } else {
            setError(res.data.Error)
            console.log(res.data.Error)
            toast.error(res.data.Error)
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          setLoading(false); // Stop loading whether success or fail
        });


    }
    if (loginTab === "Employee") {
      axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/auth/employeelogin`, values, {
        withCredentials: true
      })
        .then(res => {
          if (res.data.loginStatus) {
            navigate("/dashboard")
            localStorage.setItem("valid", true)
            localStorage.setItem("role", res.data.role)
            const employeeParsedData = JSON.stringify(res.data.employeeData)
            localStorage.setItem("employeeData", employeeParsedData)
          } else {
            setError(res.data.error)
            console.log(res.data.Error)
            toast.error(res.data.Error)
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          setLoading(false); // Stop loading whether success or fail
        });

    }



  }



  return (
    <div>
      <ToastContainer position='bottom-right' />
      <Box display="flex" height="100vh" >
        {/* position="relative" */}

        <Box
          sx={{
            backgroundImage: `url(${authImg})`,
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            width: { xs: "100%", md: "70%" },
            position: "relative",
            display: { xs: "none", md: "block" }
          }}


        >
          <Box sx={{
            color: "white",
            position: "absolute",
            bottom: 50,
            padding: 10
          }}>
            <Typography fontSize="1.2rem">
              <b>People Pro </b>provides you with a powerful and cost-effective HR platform to ensure you get the best from your employees and managers. People Pro is a timely solution to upgrade and modernize your HR team to make it more efficient and consolidate your employee information into one intuitive HR system.

            </Typography>

          </Box>
        </Box>

        {/* Login Form Container */}
        <Box
          sx={{
            width: {
              lg: "35%",
              xs: "100%",
              sm: "80%",
              md: "60%"

            },
            padding: 3,
            display: 'flex', // Make the box a flex container
            flexDirection: 'column', // Aligns children vertically
            justifyContent: 'center', // Center children vertically
            // alignItems: 'center', // Center children horizontally

          }}
        >
          {/* <Typography variant='h5' fontWeight="bold" color='secondary'> People Pro</Typography> */}
          <img width={200} src={logo} alt="" />
          {/* <Typography variant='h6'> Welcome to People Pro</Typography> */}
          <Typography> Welcome back, Please login into an account</Typography>
          <Box p={1}>
            <Typography fontWeight="bold" variant='h6' m={2}>{loginTab}</Typography>

            <form onSubmit={handleSubmit}>
              <Stack
                component="form"
                spacing={2}
                noValidate
                autoComplete="off"
                sx={{ width: '100%' }} // Ensures the stack stretches to fill its parent
              >


                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id="input-with-sx" label="" placeholder='email' fullWidth variant="standard" name='email' value={values.email} onChange={handleChange} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
                  <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id="input-with-sx" type='password' label="" placeholder='password' fullWidth variant="standard" name='password' value={values.password} onChange={handleChange} />
                </Box>
              </Stack>
              <Button fullWidth type='submit' sx={{ mt: 2 }} color='primary' variant='contained'>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
              </Button>
              



              <br />
              <br />
              <ButtonGroup
                disableElevation
                variant="outlined"
                aria-label="Disabled button group"
                sx={{
                  display: "flex",
                  alignSelf: "center",
                }}
              >

                <ButtonsLoginAs onClick={() => {
                  setLoginTab("Admin")
                  setValues({
                    email: "sharan@gmail.com",
                    password: "sharan@123"
                  })

                }} fullWidth>Default Admin</ButtonsLoginAs>
                <ButtonsLoginAs onClick={() => {
                  setLoginTab("Employee")
                  setValues({
                    email: "basava@gmail.com",
                    password: "basava@123"
                  })
                }} fullWidth>Default Employee</ButtonsLoginAs>
                {/* <ButtonsLoginAs onClick={() => setLoginTab("Client")} fullWidth>Client</ButtonsLoginAs> */}
              </ButtonGroup>
            </form>
          </Box>


        </Box>

      </Box>
    </div>
  );
};

export default LoginPage;
