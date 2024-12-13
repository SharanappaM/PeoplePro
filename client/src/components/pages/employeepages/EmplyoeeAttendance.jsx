// components/ClockInOut.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmplyoeeAttendance = () => {
  const [status, setStatus] = useState('');
  const [employeeId, setEmployeeId] = useState('12345'); // Example employee ID

  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    // Fetch data from the backend API
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('http://localhost:8787/auth/attendance');
        setAttendanceData(response.data.result); // Store the data in state
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


  const handleClockIn = async () => {
    try {
      // Replace `employeeId` with the actual employee ID value
      const response = await axios.post('http://localhost:8787/auth/clockin', {
        employeeId: 12345,  // This should be the employee's ID
      });
      console.log(response.data);
      // setStatus(`Clocked In at: ${new Date(response.data.attendance.clock_in_time).toLocaleString()}`);
      setStatus('Clocked in');
      // setStatus(response.data);
    } catch (error) {
      // setStatus(`Error clocking in: ${error.response ? error.response.data.message : error.message}`);
      // setStatus(response.data.message);
      setStatus('Clocked in');
      console.error('Error clocking in:', error);  // Log the detailed error in the frontend
    }
  };


  const handleClockOut = async () => {
    try {
      const response = await axios.post('http://localhost:8787/auth/clockout', {
        employeeId: 12345,  // Replace this with the actual employee ID
      });
      console.log(response.data);  // Log the response
      setStatus('Clocked Out');
    } catch (error) {
      setStatus('Clocked Out');
      console.error('Error clocking out:', error.response ? error.response.data.message : error.message);
    }
  };



  return (
    <div>
      <h2>Employee Clock In/Out</h2>
      <p>Status: {status}</p>
      <button onClick={handleClockIn}>Clock In</button>
      <button onClick={handleClockOut}>Clock Out</button>



      <div>
      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Clock-In Time</th>
            <th>Clock-Out Time</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.employee_id}</td>
              <td>{record.date}</td>
              <td>{record.clock_in_time}</td>
              <td>{record.clock_out_time ? record.clock_out_time : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default EmplyoeeAttendance;
 











// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const EmplyoeeAttendance = () => {
//   const [status, setStatus] = useState('');
//   const [employeeId, setEmployeeId] = useState('12345'); // Example employee ID
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // For tracking the time after clocking in
//   const [clockInTime, setClockInTime] = useState(null);  // Save the clock-in time
//   const [elapsedTime, setElapsedTime] = useState(0);      // Time in seconds
//   const [timer, setTimer] = useState(null);               // Timer to be cleared on clock-out

//   useEffect(() => {
//     // Fetch attendance data when the component mounts
//     const fetchAttendanceData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8787/auth/attendance');
//         setAttendanceData(response.data.result); // Store the data in state
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching data');
//         setLoading(false);
//       }
//     };

//     fetchAttendanceData();
//   }, []);

//   useEffect(() => {
//     // Set up the timer when the employee clocks in
//     if (clockInTime) {
//       // Set the interval to update elapsedTime every second (1000ms)
//       const interval = setInterval(() => {
//         setElapsedTime(prevElapsedTime => prevElapsedTime + 1); // Increment elapsed time by 1 every second
//       }, 1000); // Update every second

//       // Save the interval ID so we can clear it later
//       setTimer(interval);

//       // Cleanup the interval when clocking out or component unmounts
//       return () => clearInterval(interval); // Cleanup when the component unmounts or clock-out
//     }
//   }, [clockInTime]);  // Only run this effect when clockInTime changes

//   useEffect(() => {
//     if (elapsedTime > 0) {
//       const formattedTime = formatElapsedTime(elapsedTime);
//       setStatus(`Clocked In: ${formattedTime}`);
//     }
//   }, [elapsedTime]);  // Run every time elapsedTime changes

//   // Format elapsed time as hh:mm:ss
//   const formatElapsedTime = (time) => {
//     const hours = String(Math.floor(time / 3600)).padStart(2, '0');
//     const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
//     const seconds = String(time % 60).padStart(2, '0');
//     return `${hours}:${minutes}:${seconds}`;
//   };

//   const handleClockIn = async () => {
//     try {
//       const response = await axios.post('http://localhost:8787/auth/clockin', {
//         employeeId: 12345,  // This should be the employee's ID
//       });
//       console.log(response.data);
//       const clockInTime = new Date(response.data.attendance.clock_in_time);
//       setClockInTime(clockInTime); // Set clock-in time when the employee clocks in
//       setElapsedTime(0); // Reset elapsed time to 0 when clocking in
//       // setStatus(`Clocked In at: ${clockInTime.toLocaleString()}`);
//       setStatus('Clocked in');
//     } catch (error) {
//       // setStatus(`Error clocking in: ${error.response ? error.response.data.message : error.message}`);
//       setStatus('Clocked in');
//       console.error('Error clocking in:', error); // Log the error
//     }
//   };

//   const handleClockOut = async () => {
//     try {
//       const response = await axios.post('http://localhost:8787/auth/clockout', {
//         employeeId: 12345,  // Replace this with the actual employee ID
//       });
//       console.log(response.data);
//       setClockInTime(null);  // Reset clock-in time after clocking out
//       setElapsedTime(0);     // Reset elapsed time to 0 after clock-out
//       setStatus('Clocked Out');
//       clearInterval(timer); // Stop the timer when clocking out
//     } catch (error) {
//       // console.error('Error clocking out:', error.response ? error.response.data.message : error.message);
//       setStatus('Clocked Out');
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h2>Employee Clock In/Out</h2>
//       <p>Status: {status}</p>
//       <p>clockInTime: {clockInTime}</p>
//       <p>elapsedTime: {elapsedTime}</p>
//       <p>timer: {timer}</p>
  
//       <button onClick={handleClockIn}>Clock In</button>
//       <button onClick={handleClockOut}>Clock Out</button>

//       <div>
//         <h2>Attendance Records</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Employee ID</th>
//               <th>Date</th>
//               <th>Clock-In Time</th>
//               <th>Clock-Out Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attendanceData.map((record) => (
//               <tr key={record.id}>
//                 <td>{record.id}</td>
//                 <td>{record.employee_id}</td>
//                 <td>{record.date}</td>
//                 <td>{record.clock_in_time}</td>
//                 <td>{record.clock_out_time ? record.clock_out_time : 'N/A'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EmplyoeeAttendance;
