import { Box, Button, ButtonGroup, Card, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import authImg from "../../../assets/img-auth-big.jpg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import styled from '@emotion/styled';
import { useNavigate } from "react-router-dom"
import axios from 'axios';

const ButtonsLoginAs = styled(Button)({
  textTransform: "capitalize"

});
const LoginPage = () => {
  const [user, setUser] = useState({
    username: null,
    password: null
  })

  const navigate = useNavigate();


  const handelAsAdmin = () => {
    setUser({
      username: "admin",
      password: "admin@123"
    })
    navigate("/dashboard")

  }
  const handelAsEmployee = () => {
    setUser({
      username: "sharan",
      password: "admin@123"
    })

  }
  const handelAsClient = () => {
    setUser({
      username: "tcs001",
      password: "admin@123"
    })

  }

  const [values, setValues] = useState({
    email: "",
    password: ""
})
const [error, setError] = useState(null)
// const navigate = useNavigate()
axios.defaults.withCredentials = true; // store cookies in 

const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8787/auth/adminlogin", values)
        .then(res => {
            if (res.data.loginStatus) {
                navigate("/dashboard")
                localStorage.setItem("role",res.data.role)
            } else {
                setError(res.data.error)
                console.log(res.data.error)
            }
        })
        .catch(error => console.log(error))



}
  return (
    <div>
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
            width: "35%",
            padding: 3,
            display: 'flex', // Make the box a flex container
            flexDirection: 'column', // Aligns children vertically
            justifyContent: 'center', // Center children vertically
            // alignItems: 'center', // Center children horizontally

          }}
        >
          <Typography variant='h5' fontWeight="bold" color='secondary'> People Pro</Typography>
          <Typography variant='h6'> Welcome to People Pro</Typography>
          <Typography> Welcome back, Please login into an account</Typography>
          <Box p={1}>
            <form onSubmit={handleSubmit}>
              <Stack
                component="form"
                spacing={2}
                noValidate
                autoComplete="off"
                sx={{ width: '100%' }} // Ensures the stack stretches to fill its parent
              >
                {/* <TextField
                id="filled-hidden-label-normal"
                label="username"
                variant="standard"
                type='text'
                fullWidth
              /> */}

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id="input-with-sx" label="" placeholder='username' fullWidth variant="standard" onChange={(e) => setValues({ ...values, email: e.target.value })} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
                  <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id="input-with-sx" type='password' label="" placeholder='password' fullWidth variant="standard" onChange={(e) => setValues({ ...values, password: e.target.value })} />
                </Box>
              </Stack>
              <Button fullWidth type='submit' sx={{ mt: 2 }} color='primary' variant='contained'>
                Submit
              </Button>



              <br />
              <br />
              <ButtonGroup
                disableElevation
                variant="outlined"
                aria-label="Disabled button group"
                sx={{ ml: 12 }}
              >

                <ButtonsLoginAs onClick={handelAsAdmin} fullWidth>Admin</ButtonsLoginAs>
                <ButtonsLoginAs onClick={handelAsEmployee} fullWidth>Employee</ButtonsLoginAs>
                <ButtonsLoginAs onClick={handelAsClient} fullWidth>Client</ButtonsLoginAs>
              </ButtonGroup>
            </form>
          </Box>


        </Box>

      </Box>
    </div>
  );
};

export default LoginPage;
