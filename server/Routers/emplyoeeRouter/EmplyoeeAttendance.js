import express from "express"
import con from "../../utils/db.js";

const router = express.Router();


const createEmplyoeeAttendancetable = `
CREATE TABLE IF NOT EXISTS emplyoee_attendance(
    id INT AUTO_INCREMENT PRIMARY KEY,
  emplyoee_name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  in_time VARCHAR(255),
  out_time VARCHAR(255),
  total_hours VARCHAR(255)
 


)

`

con.query(createEmplyoeeAttendancetable, (err, result) => {
    if (err) {
        console.log("Error While Creating emplyoee_attendance table", err);

    } else {
        console.log("emplyoee_attendance Table Created or alreasy exsist");

    }

})



router.post("/addemplyoeeattendance", (req, res) => {
    const q = "INSERT INTO emplyoee_attendance (`emplyoee_name`,`date`,`in_time`,`out_time`) VALUES (?,?,?,?)"

    const VALUES = [
        req.body.emplyoee_name,
        req.body.date,
        req.body.in_time,
        req.body.out_time,
        // req.body.total_hours,    

    ]

    con.query(q, VALUES, (err, result) => {
        if (err) {
            console.log("Error while create emplyoee_attendance ", err);
            return res.status(500).json({ status: false, msg: "Query error" })
        }

        return res.json({ status: true, msg: "Attendance Added" });
    })
})
router.post("/addemployeeattendance/:name", (req, res) => {
    const q = "INSERT INTO emplyoee_attendance (`emplyoee_name`,`date`,`in_time`,`out_time`) VALUES (?,?,?,?)"

    const VALUES = [
        req.body.emplyoee_name,
        req.body.date,
        req.body.in_time,
        req.body.out_time,
        // req.body.total_hours,    

    ]

    con.query(q, VALUES, (err, result) => {
        if (err) {
            console.log("Error while create emplyoee_attendance ", err);
            return res.status(500).json({ status: false, msg: "Query error" })
        }

        return res.json({ status: true, msg: "Attendance Added" });
    })
})



router.get("/attendanceList", (req, res) => {
    const q = "SELECT * FROM emplyoee_attendance"

    con.query(q, (err, result) => {
        if (err) {
            console.log("Error while create emplyoee_attendance ", err);
            return res.status(500).json({ status: false, msg: "Query error" })

        }
        return res.status(200).json({ result })

    })
})



router.get("/attendanceList/:emplyoee_name", (req, res) => {
    // Get team name from the route parameter
    const emplyoee_name = req.params.emplyoee_name;

    if (!emplyoee_name) {
        return res.status(400).json({ status: false, msg: "emplyoee_name  is required" });
    }

    // Modify the query to filter tasks by team name
    const q = "SELECT * FROM emplyoee_attendance WHERE emplyoee_name = ?";

    con.query(q, [emplyoee_name], (err, result) => {
        if (err) {
            console.log("Error while fetching tasks:", err);
            return res.status(500).json({ status: false, msg: "Query error" });
        }

        // If no tasks found for the given team name
        if (result.length === 0) {
            return res.status(404).json({ status: false, msg: `No tasks found for team ${emplyoee_name}` });
        }

        return res.status(200).json({ result });
    });
});


export { router as employeeAttendanceRouter }