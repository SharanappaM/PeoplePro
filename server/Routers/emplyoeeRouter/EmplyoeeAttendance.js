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

export { router as employeeAttendanceRouter }