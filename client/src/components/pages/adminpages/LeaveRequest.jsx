import { Box, Button, Card, Divider, FormLabel, MenuItem, Select, TextField, Typography, InputLabel, Modal, Grid, Stack, IconButton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useFormik } from "formik"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { customStyles } from '../ReactDataTableStyle';
import RequiredStar from '../../RequiredStar';
import { useSelector } from 'react-redux';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const LeaveRequest = () => {

  const [openCreateProjectModal, setOpenCreateProjectModal] = useState(false)
  const { loading, data, error } = useSelector((state) => state.post);
  console.log(data, " daat from atted");
  const [loggedEmpData, setLoggedEmpData] = useState(null)
  console.log(loggedEmpData?.first_name, "loggedEmpData");
  const [leaveList, setLeaveList] = useState([])
  const [employeesNameData, setEmployeesNameData] = useState([])
  const [leaveStatuses, setLeaveStatuses] = useState({});
  const [reloadTheTableWhenChanged, setreLoadTheTableWhenChanged] = useState(false)

  const getLeaveList = () => {
    axios.get(`http://localhost:8787/auth/listLeaveRequests`)
      .then(res => {
        console.log(res.data);
        setLeaveList(res.data.result);

      }).catch(err => {
        console.log(err);

      })
  }

  const handleApproveLeave = async (leaveId, status) => {
    try {
      const response = await axios.put(`http://localhost:8787/auth/updateLeaveStatus/${leaveId}`, {
        leave_status: status // "Approved" or "Rejected"
      });

      if (response.data.status) {
        // alert(`Leave ${status} Successfully`);
        toast.success(`Leave ${status} Successfully`)
        setreLoadTheTableWhenChanged(reloadTheTableWhenChanged === false ? true : false)

        // Update the leave status in state to disable buttons
        setLeaveStatuses((prevStatuses) => ({
          ...prevStatuses,
          [leaveId]: status,
        }));
      }
    } catch (error) {
      console.error(`Error ${status.toLowerCase()} leave:`, error);
      alert(`Failed to ${status.toLowerCase()} leave`);
    }
  };
  const columns = [
    {
      name: 'Name',
      selector: (row) => row.employee_name,
      sortable: true,
    },


    {
      name: 'From',
      selector: (row) => row.from_date,
      sortable: true,
      width: "100px"
    },
    {
      name: 'To',
      selector: (row) => row.to_date,
      sortable: true,
      width: "100px"
    },
    {
      name: 'Reason For Leave',
      selector: (row) => row.reason_for_leave,
      sortable: true,
    },
    {
      name: 'Leave Type',
      selector: (row) => row.leave_type,
      sortable: true,
    },
    {
      name: 'Leave Status',
      selector: (row) => row.leave_status,
      sortable: true,
      width: "130px"
    },
    {
      cell: (row) => {
        const currentStatus = leaveStatuses[row.leave_id] || row.leave_status; // Use updated state if available

        return (
          <div>
            <Button
              variant="outlined"
              disabled={currentStatus === "Approved" || currentStatus === "Rejected"}
              onClick={() => handleApproveLeave(row.leave_id, "Approved")}
            >
              Approve
            </Button>

            <Button
              variant="outlined"
              color="error"
              sx={{ marginLeft: "6px" }}
              disabled={currentStatus === "Approved" || currentStatus === "Rejected"}
              onClick={() => handleApproveLeave(row.leave_id, "Rejected")}
            >
              Reject
            </Button>
          </div>
        );
      },
      sortable: true,
    },




    // Add more columns as needed
  ];

  const formik = useFormik({
    initialValues: {
      employee_name: "",
      team_email_id: '',
      from_date: '',
      to_date: '',
      reason_for_leave: '',
      leave_type: '',
      leave_status: '',
    },


    onSubmit: (values) => {
      // Handle form submission
      console.log('Form submitted with values:', values);
      const formadat = {
        ...values,
        // employee_name: loggedEmpData,
        leave_status: "Pending",

      }
      axios
        .post(`http://localhost:8787/auth/createLeave`, formadat)
        .then((response) => {
          // console.log('Employee added successfully', response);
          toast.success(response.data.msg)
          setOpenCreateProjectModal(false)

          setreLoadTheTableWhenChanged(reloadTheTableWhenChanged === false ? true : false)
        })
        .catch((error) => {
          console.error('Error adding employee', error);
        });
    },
  });


  const getEmployeesNameData = async () => {
    await axios.get("http://localhost:8787/auth/getEmployeesName")
      .then(res => {
        setEmployeesNameData(res.data.employeeNames)
        console.log(res.data.employeeNames);

      }).catch(err => {
        console.log(err);

      })


  }


  useEffect(() => {



    const empData = localStorage.getItem("employeeData");
    if (empData) {
      const parsedData = JSON.parse(empData);
      setLoggedEmpData(parsedData.first_name);
      console.log(parsedData.first_name, "parsedData.first_name");
    }



  }, [])





  useEffect(() => {
    getLeaveList();
    getEmployeesNameData();
  }, [reloadTheTableWhenChanged])


  return (
    <>

      <ToastContainer position='bottom-right' />

      <Box m={2}>

        <Card sx={{ width: { xs: '90vw', sm: '70vw', md: '50vw', lg: '70vw', xl: '75vw' }, padding: 2 }}>
          <Typography variant="h6" mb={2}>Total Applied Leaves</Typography>
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
                // value={entries}

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
            <Box sx={{
              display: {
                xs: "none",
                lg: "block"
              }
            }}>
                 <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>Search</Typography>
              <TextField
                size="small"
                sx={{ ml: 1 }}
                // value={searchTerm}

                variant="outlined"
              />
            </Box>
            </Box>
           

         

            <Button variant='outlined' onClick={() => setOpenCreateProjectModal(true)}>Apply Leave </Button>
          </Box>


          <Box sx={{ mt: 2 }}>
            <DataTable
              columns={columns}
              // data={employeesData.filter(item => item.designation.toLowerCase().includes(searchTerm.toLowerCase()))}
              data={leaveList}
              pagination
              // paginationPerPage={entries}
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

        <Card sx={style}>
          <Typography variant="h6" mb={2}>Apply Leave </Typography>
          <Divider />

          <form action="" onSubmit={formik.handleSubmit} >



            <Grid container spacing={2}  >
              <Grid item mt={2} lg={6}>
                <FormLabel>Employee Name or Id<RequiredStar /> </FormLabel>
                <Select
                  labelId="department-select-label"
                  id="department-select"
                  fullWidth
                  size="small"
                  name='employee_name'
                  onChange={formik.handleChange}
                  value={formik.values.employee_name}

                >

                  {employeesNameData.map((items, index) => (
                    <MenuItem key={index} value={items}>{items}</MenuItem>
                  ))}

                </Select>
              </Grid>


              <Grid item mt={2} lg={6}>
                <FormLabel>Leave Type</FormLabel>
                <Select
                  fullWidth
                  size="small"
                  name='leave_type'
                  displayEmpty
                  value={formik.values.leave_type}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="" disabled>Choose..</MenuItem>
                  <MenuItem value="Casual Leave">Casual Leave</MenuItem>
                  <MenuItem value="Compensatory Off">Compensatory Off</MenuItem>
                  <MenuItem value="Sick Leave">Sick Leave</MenuItem>
                  <MenuItem value="Leave Without Pay">Leave Without Pay</MenuItem>
                </Select>
              </Grid>




            </Grid>
            <Grid container spacing={2}  >
              <Grid item mt={2} lg={6}>
                <FormLabel> From<RequiredStar /> </FormLabel>
                <TextField
                  // placeholder="Enter firstname"
                  size="small"
                  fullWidth
                  name="from_date"
                  type='date'
                  value={formik.values.from_date}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item mt={2} lg={6}>
                <FormLabel> To<RequiredStar /> </FormLabel>
                <TextField
                  // placeholder="Enter firstname"
                  size="small"
                  fullWidth
                  name="to_date"
                  type='date'
                  value={formik.values.to_date}
                  onChange={formik.handleChange}
                />
              </Grid>

            </Grid>



            <Grid container spacing={2}  >
              <Grid item mt={2} lg={6}>
                <FormLabel>Reason for leave</FormLabel>
                <TextField

                  size="small"
                  placeholder='Enter here...'
                  fullWidth
                  name="reason_for_leave"
                  type='text'
                  value={formik.values.reason_for_leave}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item mt={2} lg={6}>
                <FormLabel>Team Email Id</FormLabel>
                <TextField

                  size="small"
                  placeholder='Enter here...'
                  fullWidth
                  name="team_email_id"
                  type='text'
                  value={formik.values.team_email_id}
                  onChange={formik.handleChange}
                />
              </Grid>



            </Grid>




            <Box mt={2}>
              <Button variant='contained'>Reset</Button>
              <Button type='submit' variant='contained' sx={{ ml: 5 }}>Save</Button>
            </Box>

          </form>


        </Card>
      </Modal>



    </>
  );
};

export default LeaveRequest;



