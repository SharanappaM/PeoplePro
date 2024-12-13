
// import { Box, Button, Card, Divider, FormLabel, MenuItem, Select, TextField, Typography, InputLabel } from '@mui/material';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';
// import { customStyles } from '../../ReactDataTableStyle';
// import { useFormik } from "formik"
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ManualAttendance = () => {
//   const [attendanceList, setAttendanceList] = useState([]);
//   const [entries, setEntries] = useState(7);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [employeesNameData, setEmployeesNameData] = useState([])
//   const [employeesName , setEmployeesName] = useState(false)


//   const getDepartmentData = async () => {
//     await axios.get("http://localhost:8787/auth/listDepartments")
//       .then(res => {
//         setAttendanceList(res.data.result)
//         console.log(res.data.result);

//       }).catch(err => {
//         console.log(err);

//       })


//   }
//   const getEmployeesNameData = async () => {
//     await axios.get("http://localhost:8787/auth/getEmployeesName")
//       .then(res => {
//         setEmployeesNameData(res.data.employeeNames)
//         console.log(res.data.employeeNames);

//       }).catch(err => {
//         console.log(err);

//       })


//   }


//   const formik = useFormik({
//     initialValues: {
//       department_name: '',
//       department_head: '',
//     },

//     onSubmit: (values) => {
//       // Handle form submission
//       console.log('Form submitted with values:', values);
//       axios
//         .post('http://localhost:8787/auth/department', values)
//         .then((response) => {
//           // console.log('Employee added successfully', response);
//           toast.success(response.data.msg)
//           setEmployeesName(employeesName=== false ? true :false)
//         })
//         .catch((error) => {
//           console.error('Error adding employee', error);
//         });
//     },
//   });





//   useEffect(() => {
//     getDepartmentData();
//     getEmployeesNameData();
//   }, [employeesName])

//   const columns = [
//     {
//       name: 'Employee ',
//       selector: (row) => row.department_head,
//       sortable: true,
//     },
//     {
//       name: 'Date',
//       selector: (row) => row.department_name,
//       sortable: true,
//     },
//     {
//       name: 'In Time',
//       selector: (row) => row.created_date,
//       sortable: true,
//     },
//     {
//       name: 'Out Time',
//       selector: (row) => row.created_date,
//       sortable: true,
//     },
//     {
//       name: 'Total time',
//       sortable: true,
//     },
//     // Add more columns as needed
//   ];




//   return (
//     <>

//       <ToastContainer position='bottom-right' />
//       <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
//         <Card sx={{ p: 4, width: "35%", height:"50%" }}>
//           <Typography variant="h6" mb={2}>Filter Attendance</Typography>
//           <Divider />
//           <form action="" onSubmit={formik.handleSubmit}>
//             <Box sx={{ mt: 2 }}>
//               <FormLabel> Date</FormLabel>
//               <TextField
//                 placeholder="Enter  name"
//                 size="small"
//                 fullWidth
//                 name='department_name'
//                type='date'

//               />
//             </Box>

//             <Box sx={{ mt: 2 }}>
//               <FormLabel>Employee</FormLabel>
//               <Select
//                 labelId="department-select-label"
//                 id="department-select"
//                 fullWidth
//                 size="small"
//                 name='department_head'
//                 onChange={formik.handleChange}
//                 value={formik.values.department_head}

//               >

//                 {employeesNameData.map((items, index) => (
//                   <MenuItem key={index} value={items}>{items}</MenuItem>
//                 ))}

//               </Select>
//             </Box>

//             <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
//               <Button type='submit' variant="contained" >
//                 Save
//               </Button>
//             </Box>

//           </form>



//         </Card>

//         <Card sx={{ width: "60%", padding: 2 }}>
//           <Typography variant="h6" mb={2}>View Attendance</Typography>
//           <Divider />

//           <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           

            

//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Typography>Search</Typography>
//               <TextField
//                 size="small"
//                 placeholder='search departments'
//                 sx={{ ml: 1 }}
//                 value={searchTerm}

//                 variant="outlined"
//               />
//             </Box>

            
//           </Box>

//           <Box sx={{ mt: 2 }}>
//             <DataTable
//               columns={columns}
//               // data={epartmentData.filter(item => item.designation.toLowerCase().includes(searchTerm.toLowerCase()))}
//               data={attendanceList}
//               pagination
//               paginationPerPage={entries}
//               customStyles={customStyles}
//             />
//           </Box>
//         </Card>
//       </Box>
//     </>
//   );
// };

// export default ManualAttendance;

 import React from 'react'
import EmplyoeeAttendance from '../../employeepages/EmplyoeeAttendance'
 
 const ManualAttendance = () => {
   return (
     <div>
      <EmplyoeeAttendance/>
     </div>
   )
 }
 
 export default ManualAttendance