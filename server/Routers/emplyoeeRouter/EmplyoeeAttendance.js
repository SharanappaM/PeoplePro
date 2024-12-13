import express from "express"
import con from "../../utils/db.js";

const router = express.Router();


const createEmplyoeeAttendancetable = `
CREATE TABLE IF NOT EXISTS emplyoee_attendance(
    id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  clock_in_time DATETIME,
  clock_out_time DATETIME,
  total_hours DECIMAL(5, 2),
  break_time DECIMAL(5, 2) DEFAULT 0,
  status ENUM('Present', 'Absent') DEFAULT 'Present',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP


)

`

con.query(createEmplyoeeAttendancetable, (err, result) => {
    if (err) {
        console.log("Error While Creating emplyoee_attendance table", err);

    } else {
        console.log("emplyoee_attendance Table Created or alreasy exsist");

    }

})

// Clock In Route
router.post('/clockin', (req, res) => {
    const { employeeId } = req.body;
    const currentDate = new Date().toISOString().split('T')[0]; // Get today's date (YYYY-MM-DD)

    // Check if the employee has already clocked in today
    con.query(
        'SELECT * FROM emplyoee_attendance WHERE employee_id = ? AND date = ? AND clock_out_time IS NULL',
        [employeeId, currentDate],
        (err, results) => {
            if (err) {
                console.error("Error checking attendance: ", err);
                return res.status(500).json({ message: 'Error checking attendance' });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: 'Already clocked in today' });
            }

            // Insert clock-in record
            con.query(
                'INSERT INTO emplyoee_attendance (employee_id, date, clock_in_time) VALUES (?, ?, ?)',
                [employeeId, currentDate, new Date()],
                (err, result) => {
                    if (err) {
                        console.error("Error clocking in: ", err);
                        return res.status(500).json({ message: 'Error clocking in' });
                    }
                    res.status(200).json({ message: 'Clocked in successfully', attendanceId: result.insertId });
                }
            );
        }
    );
});




// Clock-out Route
router.post('/clockout', (req, res) => {
    const { employeeId } = req.body;
    const currentDate = new Date().toISOString().split('T')[0]; // Get today's date (YYYY-MM-DD)

    if (!employeeId) {
        return res.status(400).json({ message: 'Employee ID is required' });
    }

    // Check if the employee has clocked in today and not clocked out yet
    con.query(
        'SELECT * FROM emplyoee_attendance WHERE employee_id = ? AND date = ? AND clock_out_time IS NULL',
        [employeeId, currentDate],
        (err, results) => {
            if (err) {
                console.error("Error checking attendance: ", err);
                return res.status(500).json({ message: 'Error checking attendance' });
            }

            if (results.length === 0) {
                return res.status(400).json({ message: 'No clock-in record found for today' });
            }

            // Update the clock-out time
            con.query(
                'UPDATE emplyoee_attendance SET clock_out_time = ? WHERE id = ?',
                [new Date(), results[0].id],
                (err, result) => {
                    if (err) {
                        console.error("Error clocking out: ", err);
                        return res.status(500).json({ message: 'Error clocking out' });
                    }
                    res.status(200).json({ message: 'Clocked out successfully' });
                }
            );
        }
    );
});

//   const getAttendanceData = async (req, res) => {
//     try {
//       // Query the database
//       const [rows] = await con.promise().execute('SELECT * FROM emplyoee_attendance');
//       res.status(200).json({ data: rows });
//     } catch (error) {
//       console.error('Error fetching attendance data: ', error);
//       res.status(500).json({ message: 'Error fetching attendance data' });
//     }
//   };


// router.get('/attendance', async (req, res) => {
//     try {
//         // Fetch all attendance data from the database
//         const [rows] = await con.promise().query('SELECT * FROM emplyoee_attendance');
//         res.status(200).json({ data: rows });  // Return the fetched data in the response
//     } catch (err) {
//         console.error('Error fetching attendance data:', err);
//         res.status(500).json({ message: 'Error fetching attendance data' });
//     }

// })

router.get("/attendance", (req, res) => {
    const q = "SELECT * FROM emplyoee_attendance"
   
    con.query(q, (err, result) => {
        if (err) {
            console.log("Error while create emplyoee_attendance ", err);
            return res.status(500).json({ status: false, msg: "Query error" })

        }
        return res.status(200).json({ result })

    })
})

export { router as employeeAttendanceRouter }