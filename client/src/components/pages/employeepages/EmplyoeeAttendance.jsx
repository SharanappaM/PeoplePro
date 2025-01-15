// // components/ClockInOut.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const EmplyoeeAttendance = () => {
//   const [status, setStatus] = useState('');
//   const [employeeId, setEmployeeId] = useState('12345'); // Example employee ID

//   const [attendanceData, setAttendanceData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);



//   useEffect(() => {
//     // Fetch data from the backend API
//     const fetchAttendanceData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8787/auth/attendanceList');
//         setAttendanceData(response.data.result); // Store the data in state
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching dataw');
//         setLoading(false);
//       }
//     };

//     fetchAttendanceData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;


//   const handleClockIn = async () => {
//     try {
//       // Replace `employeeId` with the actual employee ID value
//       const response = await axios.post('http://localhost:8787/auth/clockin', {
//         employeeId: 12345,  // This should be the employee's ID
//       });
//       console.log(response.data);
//       // setStatus(`Clocked In at: ${new Date(response.data.attendance.clock_in_time).toLocaleString()}`);
//       setStatus('Clocked in');
//       // setStatus(response.data);
//     } catch (error) {
//       // setStatus(`Error clocking in: ${error.response ? error.response.data.message : error.message}`);
//       // setStatus(response.data.message);
//       setStatus('Clocked in');
//       console.error('Error clocking in:', error);  // Log the detailed error in the frontend
//     }
//   };


//   const handleClockOut = async () => {
//     try {
//       const response = await axios.post('http://localhost:8787/auth/clockout', {
//         employeeId: 12345,  // Replace this with the actual employee ID
//       });
//       console.log(response.data);  // Log the response
//       setStatus('Clocked Out');
//     } catch (error) {
//       setStatus('Clocked Out');
//       console.error('Error clocking out:', error.response ? error.response.data.message : error.message);
//     }
//   };



//   return (
//     <div>
//       <h2>Employee Clock In/Out</h2>
//       <p>Status: {status}</p>
//       <button onClick={handleClockIn}>Clock In</button>
//       <button onClick={handleClockOut}>Clock Out</button>



//       <div>
//       <h2>Attendance Records</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Employee ID</th>
//             <th>Date</th>
//             <th>Clock-In Time</th>
//             <th>Clock-Out Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendanceData.map((record) => (
//             <tr key={record.id}>
//               <td>{record.id}</td>
//               <td>{record.employee_id}</td>
//               <td>{record.date}</td>
//               <td>{record.clock_in_time}</td>
//               <td>{record.clock_out_time ? record.clock_out_time : 'N/A'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </div>
//   );
// };

// export default EmplyoeeAttendance;












// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const EmplyoeeAttendance = () => {
// //   const [status, setStatus] = useState('');
// //   const [employeeId, setEmployeeId] = useState('12345'); // Example employee ID
// //   const [attendanceData, setAttendanceData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // For tracking the time after clocking in
// //   const [clockInTime, setClockInTime] = useState(null);  // Save the clock-in time
// //   const [elapsedTime, setElapsedTime] = useState(0);      // Time in seconds
// //   const [timer, setTimer] = useState(null);               // Timer to be cleared on clock-out

// //   useEffect(() => {
// //     // Fetch attendance data when the component mounts
// //     const fetchAttendanceData = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:8787/auth/attendance');
// //         setAttendanceData(response.data.result); // Store the data in state
// //         setLoading(false);
// //       } catch (err) {
// //         setError('Error fetching data');
// //         setLoading(false);
// //       }
// //     };

// //     fetchAttendanceData();
// //   }, []);

// //   useEffect(() => {
// //     // Set up the timer when the employee clocks in
// //     if (clockInTime) {
// //       // Set the interval to update elapsedTime every second (1000ms)
// //       const interval = setInterval(() => {
// //         setElapsedTime(prevElapsedTime => prevElapsedTime + 1); // Increment elapsed time by 1 every second
// //       }, 1000); // Update every second

// //       // Save the interval ID so we can clear it later
// //       setTimer(interval);

// //       // Cleanup the interval when clocking out or component unmounts
// //       return () => clearInterval(interval); // Cleanup when the component unmounts or clock-out
// //     }
// //   }, [clockInTime]);  // Only run this effect when clockInTime changes

// //   useEffect(() => {
// //     if (elapsedTime > 0) {
// //       const formattedTime = formatElapsedTime(elapsedTime);
// //       setStatus(`Clocked In: ${formattedTime}`);
// //     }
// //   }, [elapsedTime]);  // Run every time elapsedTime changes

// //   // Format elapsed time as hh:mm:ss
// //   const formatElapsedTime = (time) => {
// //     const hours = String(Math.floor(time / 3600)).padStart(2, '0');
// //     const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
// //     const seconds = String(time % 60).padStart(2, '0');
// //     return `${hours}:${minutes}:${seconds}`;
// //   };

// //   const handleClockIn = async () => {
// //     try {
// //       const response = await axios.post('http://localhost:8787/auth/clockin', {
// //         employeeId: 12345,  // This should be the employee's ID
// //       });
// //       console.log(response.data);
// //       const clockInTime = new Date(response.data.attendance.clock_in_time);
// //       setClockInTime(clockInTime); // Set clock-in time when the employee clocks in
// //       setElapsedTime(0); // Reset elapsed time to 0 when clocking in
// //       // setStatus(`Clocked In at: ${clockInTime.toLocaleString()}`);
// //       setStatus('Clocked in');
// //     } catch (error) {
// //       // setStatus(`Error clocking in: ${error.response ? error.response.data.message : error.message}`);
// //       setStatus('Clocked in');
// //       console.error('Error clocking in:', error); // Log the error
// //     }
// //   };

// //   const handleClockOut = async () => {
// //     try {
// //       const response = await axios.post('http://localhost:8787/auth/clockout', {
// //         employeeId: 12345,  // Replace this with the actual employee ID
// //       });
// //       console.log(response.data);
// //       setClockInTime(null);  // Reset clock-in time after clocking out
// //       setElapsedTime(0);     // Reset elapsed time to 0 after clock-out
// //       setStatus('Clocked Out');
// //       clearInterval(timer); // Stop the timer when clocking out
// //     } catch (error) {
// //       // console.error('Error clocking out:', error.response ? error.response.data.message : error.message);
// //       setStatus('Clocked Out');
// //     }
// //   };

// //   if (loading) return <div>Loading...</div>;
// //   if (error) return <div>{error}</div>;

// //   return (
// //     <div>
// //       <h2>Employee Clock In/Out</h2>
// //       <p>Status: {status}</p>
// //       <p>clockInTime: {clockInTime}</p>
// //       <p>elapsedTime: {elapsedTime}</p>
// //       <p>timer: {timer}</p>

// //       <button onClick={handleClockIn}>Clock In</button>
// //       <button onClick={handleClockOut}>Clock Out</button>

// //       <div>
// //         <h2>Attendance Records</h2>
// //         <table>
// //           <thead>
// //             <tr>
// //               <th>ID</th>
// //               <th>Employee ID</th>
// //               <th>Date</th>
// //               <th>Clock-In Time</th>
// //               <th>Clock-Out Time</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {attendanceData.map((record) => (
// //               <tr key={record.id}>
// //                 <td>{record.id}</td>
// //                 <td>{record.employee_id}</td>
// //                 <td>{record.date}</td>
// //                 <td>{record.clock_in_time}</td>
// //                 <td>{record.clock_out_time ? record.clock_out_time : 'N/A'}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EmplyoeeAttendance;


import { Box, Button, Card, Divider, FormLabel, MenuItem, Select, TextField, Typography, InputLabel, Modal, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
// import { customStyles } from '../../ReactDataTableStyle';
import { useFormik } from "formik"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import RequiredStar from '../../../RequiredStar';
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



const EmplyoeeAttendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [entries, setEntries] = useState(7);
  const [searchTerm, setSearchTerm] = useState('');
  const [employeesNameData, setEmployeesNameData] = useState([])
  const [employeesName, setEmployeesName] = useState(false)
  const { loading, data, error } = useSelector((state) => state.post);
  console.log(data ," daat from atted");
  



  const getDepartmentData = async () => {
    await axios.get("http://localhost:8787/auth/attendanceList")
      .then(res => {
        setAttendanceList(res.data.result)
        console.log(res.data.result);

      }).catch(err => {
        console.log(err);

      })


  }
  




  const formikFOrattendece = useFormik({
    initialValues: {
      emplyoee_name: data.employeeData.username,
      date: '',
      in_time: '',
      out_time: '',
    },


    onSubmit: (values) => {
      // Handle form submission
      console.log('Form submitted with values:', values);
      axios
        .post(`http://localhost:8787/auth/addemployeeattendance/${data.employeeData.username}`, values)
        .then((response) => {
          // console.log('Employee added successfully', response);
          toast.success(response.data.msg)
          setEmployeesName(employeesName === false ? true : false)
        })
        .catch((error) => {
          console.error('Error adding employee', error);
        });
    },
  });





  useEffect(() => {
    getDepartmentData();
  }, [employeesName])

  const columns = [
    {
      name: 'Employee ',
      selector: (row) => row.emplyoee_name,
      sortable: true,
    },
    {
      name: 'Date',
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: 'In Time',
      selector: (row) => row.in_time,
      sortable: true,
    },
    {
      name: 'Out Time',
      selector: (row) => row.out_time,
      sortable: true,
    },
    {
      name: 'Total time',
      sortable: true,
    },
    // Add more columns as needed
  ];




  return (
    <>

      <ToastContainer position='bottom-right' />
      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
        <Card sx={{ p: 4, width: "35%", height: "50%" }}>
          <Typography variant="h6" mb={2}>Add Attendance</Typography>
          <Divider />

          <form action="" onSubmit={formikFOrattendece.handleSubmit} >



            <Grid container spacing={2}  >
              <Grid item mt={2} lg={6}>
                <FormLabel> Attendance Date<RequiredStar /> </FormLabel>
                <TextField

                  size="small"
                  fullWidth
                  name="date"
                  type='date'
                  value={formikFOrattendece.values.date}
                  onChange={formikFOrattendece.handleChange}
                />
              </Grid>
              <Grid item mt={2} lg={6}>
                <FormLabel>Employee</FormLabel>
                <Select
                  labelId="department-select-label"
                  id="department-select"
                  fullWidth
                  size="small"
                  name='emplyoee_name'
                  value={formikFOrattendece.values.emplyoee_name}
                  onChange={formikFOrattendece.handleChange}

                >

                  {employeesNameData.map((items, index) => (
                    <MenuItem key={index} value={items}>{items}</MenuItem>
                  ))}

                </Select>
              </Grid>


            </Grid>
            <Grid container spacing={2}  >
              <Grid item mt={2} lg={6}>
                <FormLabel> In Time<RequiredStar /> </FormLabel>
                <TextField
                  // placeholder="Enter firstname"
                  size="small"
                  fullWidth
                  name="in_time"
                  type='time'
                  value={formikFOrattendece.values.in_time}
                  onChange={formikFOrattendece.handleChange}
                />
              </Grid>
              <Grid item mt={2} lg={6}>
                <FormLabel> Out Time<RequiredStar /> </FormLabel>
                <TextField
                  // placeholder="Enter firstname"
                  size="small"
                  fullWidth
                  name="out_time"
                  type='time'
                  value={formikFOrattendece.values.out_time}
                  onChange={formikFOrattendece.handleChange}
                />
              </Grid>

            </Grid>




            <Box mt={2}>
              <Button variant='contained'>Reset</Button>
              <Button type='submit' variant='contained' sx={{ ml: 5 }}>Save</Button>
            </Box>

          </form>


        </Card>

        <Card sx={{ width: "60%", padding: 2 }}>
          <Typography variant="h6" mb={2}>View Attendance</Typography>
          <Divider />

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>




            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>Search</Typography>
              <TextField
                size="small"
                placeholder='search departments'
                sx={{ ml: 1 }}
                value={searchTerm}

                variant="outlined"
              />
            </Box>



          </Box>

          <Box sx={{ mt: 2 }}>
            <DataTable
              columns={columns}
              // data={epartmentData.filter(item => item.designation.toLowerCase().includes(searchTerm.toLowerCase()))}
              data={attendanceList}
              pagination
              paginationPerPage={entries}
              customStyles={customStyles}
            />
          </Box>
        </Card>
      </Box>


     
    </>
  );
};

export default EmplyoeeAttendance;

