import express from "express"
import con from "../../utils/db.js";

const router = express.Router();


const createLeaveRequestTable = `
CREATE TABLE IF NOT EXISTS leaveRequests(
employee_name VARCHAR(45) NOT NULL, 
team_email_id VARCHAR(45) NOT NULL, 
from_date VARCHAR(45) NOT NULL, 
to_date VARCHAR(45) NOT NULL, 
reason_for_leave  VARCHAR(85)  NOT NULL,
leave_type VARCHAR(85)  NOT NULL,
leave_status VARCHAR(85) NULL
)
`
con.query(createLeaveRequestTable, (err, result) => {
    if (err) {
        console.log("Error While Creating LeaveRequestTable", err);
    }
    else {
        console.log("createLeaveRequestTable Table Created  or already exists");
    }
})


router.post("/createLeave", (req, res) => {
    const q = "INSERT INTO leaveRequests (`employee_name`,`team_email_id`,`from_date`,`to_date`,`reason_for_leave`, `leave_type`,`leave_status`) VALUES (?,?,?,?,?,?,?)"
    const VALIUES = [
        req.body.employee_name,
        req.body.team_email_id,
        req.body.from_date,
        req.body.to_date,
        req.body.reason_for_leave,
        req.body.leave_type,
        req.body.leave_status,
    ]

    con.query(q, VALIUES, (err, result) => {
        if (err) {
            console.log("Error While Creating createLeave", err);
            return res.status(500).json({ status: false, msg: "Query Error" })
        }

        return res.status(200).json({ status: true, msg: "Leave Applied Successfully" })
    })
})



router.get("/listLeaveRequests", (req, res) => {
    const q = "SELECT * FROM leaveRequests"

    con.query(q, (err, result) => {
        if (err) {
            console.log("Error While Listing listLeaveRequests", err);
            return res.status(500).json({ status: false, msg: "Query Error" })

        }

        return res.status(200).json({ result })
    })
})
router.get("/listLeaveRequests/:employee_name", (req, res) => {
    // Get team name from the route parameter
    const employee_name = req.params.employee_name;

    if (!employee_name) {
        return res.status(400).json({ status: false, msg: "employee_name is required" });
    }

    // Modify the query to filter tasks by team name
    const q = "SELECT * FROM leaveRequests WHERE employee_name = ?";

    con.query(q, [employee_name], (err, result) => {
        if (err) {
            console.log("Error while fetching tasks:", err);
            return res.status(500).json({ status: false, msg: "Query error" });
        }

        // If no tasks found for the given team name
        if (result.length === 0) {
            return res.status(404).json({ status: false, msg: `No tasks found for team ${employee_name}` });
        }

        // Return the task directly
        return res.status(200).json(result); // This returns the first task object, not in an array.
    });
});



export { router as leaveRequestsRouter }