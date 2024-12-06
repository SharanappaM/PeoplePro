import express from "express"
import con from "../../utils/db.js"

const router = express.Router();

const createEmployeetable = `
CREATE TABLE IF NOT EXISTS employees (
 employee_id INT AUTO_INCREMENT PRIMARY KEY, -- Auto-incrementing integer
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  contact_number VARCHAR(45) NOT NULL UNIQUE,
  gender VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL UNIQUE,
  username VARCHAR(45) NOT NULL UNIQUE,
  password VARCHAR(45) NOT NULL,
  office_shift VARCHAR(45) NOT NULL,
  role VARCHAR(45) NOT NULL,
  department VARCHAR(45) NOT NULL,
  designation VARCHAR(45) NOT NULL,
  basic_salary VARCHAR(45) NOT NULL,
  hourly_rate VARCHAR(45) NOT NULL,
  payslip_type VARCHAR(45) NOT NULL,
  employee_picture VARCHAR(45) NOT NULL,
  
  dob VARCHAR(45) NULL,
  country VARCHAR(45) NULL,
  status VARCHAR(45) NULL,
  marital_status VARCHAR(45) NULL,
  address_line_1 VARCHAR(85) NULL,
  address_line_2 VARCHAR(85) NULL,
  city VARCHAR(45) NULL,
  state VARCHAR(45) NULL,
  zip_code VARCHAR(45) NULL,
  blood_group VARCHAR(45) NULL,
  nationality VARCHAR(45) NULL,
  payment_status VARCHAR(45) NULL
);

`


con.query(createEmployeetable, (err, result) => {
    if (err) {
        console.log("Error While Creating employees Table", err);
        console.log("Error While Creating employees Table", err);

    }
    else {
        console.log("employees Table Created  or already exists");
    }
})




router.get("/listEmployees", (req, res) => {
    const q = "SELECT * FROM employees";
    con.query(q, (err, result) => {
        if (err) return res.json({ status: false, msg: "quey error" })
        return res.json({ result })
    })
})
router.get("/getEmployeesName", (req, res) => {
    const q = "SELECT firstname FROM employees";
    con.query(q, (err, result) => {
        if (err) {
            console.error("Query error:", err);  // Log the error for debugging
            return res.status(500).json({ status: false, msg: "Query error" });
        }

        const employeeNames = result.map(emp => emp.firstname);

        return res.status(200).json({ employeeNames });
    })
})







const generateEmployeeId = (callback) => {
    // Query the last employee_id inserted
    const q = "SELECT employee_id FROM employees ORDER BY employee_id DESC LIMIT 1";

    con.query(q, (err, result) => {
        if (err) {
            console.error('Error querying last employee_id:', err);
            return callback(err, null);
        }

        // If there are no employees, start from '001001'
        let newEmployeeId = '001001';
        if (result.length > 0) {
            const lastEmployeeId = result[0].employee_id;
            const lastIdNum = parseInt(lastEmployeeId, 10);
            newEmployeeId = ('000000' + (lastIdNum + 1)).slice(-6); // Increment and pad with zeros
        }

        return callback(null, newEmployeeId);
    });
};

router.post("/addEmployees", (req, res) => {
    generateEmployeeId((err, employee_id) => {
        if (err) {
            return res.json({ status: false, error: "Error generating employee_id" });
        }

        const q = "INSERT INTO employees (`first_name`, `last_name`, `employee_id`, `contact_number`, `gender`, `email`, `username`, `password`, `office_shift`, `role`, `department`, `designation`, `basic_salary`, `hourly_rate`, `payslip_type`, `employee_picture`,payment_status) VALUES (?)";
        let payment_status = "Un Paid"
        const VALUES = [
            req.body.first_name,
            req.body.last_name,
            employee_id,  // Use the generated employee_id here
            req.body.contact_number,
            req.body.gender,
            req.body.email,
            req.body.username,
            req.body.password,
            req.body.office_shift,
            req.body.role,
            req.body.department,
            req.body.designation,
            req.body.basic_salary,
            req.body.hourly_rate,
            req.body.payslip_type,
            req.body.employee_picture,
            payment_status
        ];

        con.query(q, [VALUES], (err, result) => {
            if (err) {
                console.error('Query error:', err);
                return res.json({ status: false, error: "Query Error" });
            }

            return res.json({ status: true, msg: "Employee Created", employee_id });
        });
    });
});





export { router as employeeRouters }