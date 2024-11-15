import express from "express"
import con from "../utils/db.js";


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
        if (err) return res.json({ status: false, error: "Query Error" })
        return res.json({ status: true, msg: "Emplyoee Created" })
    })

})



router.post("/department", (req, res) => {
    const createdDate = new Date().toISOString().slice(0, 19).replace('T', ' ');


    // const q = "INSERT INFO department (`department_name`,`department_head`,`created_date`) VALUES (?)"
    const q = "INSERT INTO department (`department_name`, `department_head`, `created_date`) VALUES (?, ?, ?)";
    const VALUES = [
        req.body.department_name,
        req.body.department_head,
        createdDate,
    ]

    con.query(q, VALUES, (err, result) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ status: false, error: "Query Error" });
        }

        return res.status(200).json({ status: true, msg: "Department Created" });
    })
})


router.get("/listDepartments", (err, res) => {
    const q = "SELECT * FROM department";
    con.query(q, (err, result) => {
        if (err) {
            console.error("Query error:", err); 
            return res.status(500).json({ status: false, msg: "Query error" });
        }
        return res.status(200).json({result });

        
    })

})


router.delete("/deleteAlltDepartments", (req,res)=>{
    // const q = "DELETE "
    const q = "DELETE FROM department";  // Correct SQL syntax
    con.query(q,(err,result)=>{
        if (err){
            console.log("Query error:", err)
            return res.status(500).json({ status: false, msg: "Query error" });
        }
        return res.status(200).json({ status: true, msg: "All departments deleted!" });

    })

})




export { router as adminRouter }