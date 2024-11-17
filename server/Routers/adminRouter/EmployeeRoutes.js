import express from "express"
import con from "../../utils/db.js"

const router = express.Router();

router.get("/listEmployees", (req, res) => {
    const q = "SELECT * FROM employees";
    con.query(q, (err, result) => {
        if (err) return res.json({ status: false, msg: "quey error" })
        return res.json({ result })
    })
})
router.get("/getEmployeesName", (req, res) => {
    const q = "SELECT firstname FROM employees";
    con.query(q,(err, result) => {
        if (err) {
            console.error("Query error:", err);  // Log the error for debugging
            return res.status(500).json({ status: false, msg: "Query error" });
        }

        const employeeNames = result.map(emp => emp.firstname);

        return res.status(200).json({employeeNames });
    })
})

router.post("/addEmployees", (req, res) => {
    const q = "INSERT INTO employees (`firstname`, `lastname`,`employeeid`, `contactnumber`,`gender`,`email`,`username`,`password`,`officeshift`,`role`,`department`,`designation`,`basicsalary`,`hourlyrate`, `paysliptype`,`profilepicture`) VALUES (?)"
    const VALUES = [
        req.body.firstname,
        req.body.lastname,
        req.body.employeeid,
        req.body.contactnumber,
        req.body.gender,
        req.body.email,
        req.body.username,
        req.body.officeshift,
        req.body.password,
        req.body.role,
        req.body.department,
        req.body.designation,
        req.body.basicsalary,
        req.body.hourlyrate,
        req.body.paysliptype,
        req.body.profilepicture,
    ]

    con.query(q, [VALUES], (err, result) => {
        if (err){
            console.error('Query error:', err);
        return res.json({ status: false, error: "Query Error" })


        } 
        return res.json({ status: true, msg: "Emplyoee Created" })
    })

})




export {router as employeeRouters}