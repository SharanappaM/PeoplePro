

import express from "express"
import con from "../../utils/db.js"
import jwt from "jsonwebtoken"
const router = express.Router()


import bcrypt, { hash } from "bcrypt"
// const router = express.Router();






const createAdmintable = `
CREATE TABLE IF NOT EXISTS admins (
 admin_id INT AUTO_INCREMENT PRIMARY KEY, -- Auto-incrementing integer
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  contact_number VARCHAR(45) NOT NULL UNIQUE,
  gender VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL UNIQUE,
  username VARCHAR(45) NOT NULL UNIQUE,
  password VARCHAR(105) NOT NULL,
  role VARCHAR(45) NOT NULL,
  admin_picture VARCHAR(45) NOT NULL,
  country VARCHAR(45) NULL

);

`


con.query(createAdmintable, (err, result) => {
    if (err) {
        console.log("Error While Creating admins Table", err);
        console.log("Error While Creating admins Table", err);

    }
    else {
        console.log("admins Table Created  or already exists");
    }
})



const generateEmployeeId = (callback) => {
    // Query the last employee_id inserted
    const q = "SELECT admin_id FROM admins ORDER BY admin_id DESC LIMIT 1";

    con.query(q, (err, result) => {
        if (err) {
            console.error('Error querying last admin_id:', err);
            return callback(err, null);
        }

        // If there are no employees, start from '001001'
        let newEmployeeId = '001001';
        if (result.length > 0) {
            const lastEmployeeId = result[0].admin_id;
            const lastIdNum = parseInt(lastEmployeeId, 10);
            newEmployeeId = ('000000' + (lastIdNum + 1)).slice(-6); // Increment and pad with zeros
        }

        return callback(null, newEmployeeId);
    });
};



router.post("/addAdmin", (req, res) => {
    generateEmployeeId((err, admin_id) => {
        if (err) {
            return res.json({ status: false, error: "Error generating admin_id" });
        }

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.json({ status: false, error: "Error hashing password" });
            }

            const q = "INSERT INTO admins (`first_name`, `last_name`, `admin_id`, `contact_number`, `gender`, `email`, `username`, `password`, `role`,  `admin_picture`) VALUES (?)";
            
    
            const VALUES = [
                req.body.first_name,
                req.body.last_name,
                admin_id,
                req.body.contact_number,
                req.body.gender,
                req.body.email,
                req.body.username,
                hash, // Hashed password
                req.body.role,
                req.body.admin_picture,
             
            ];

            con.query(q, [VALUES], (err, result) => {
                if (err) {
                    console.error('Query error:', err);
                    return res.json({ status: false, error: "Query Error" });
                }

                return res.json({ status: true, msg: "admins Created", admin_id });
            });
        });
    });
});




router.post("/adminlogin", (req, res) => {
    const sql = "SELECT * FROM admins WHERE email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if (err) {
            return res.json({ loginStatus: false, Error: "Query error" });
        }

        if (result.length === 0) {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }

        bcrypt.compare(req.body.password, result[0].password, (err, response) => {
            if (err) {
                return res.json({ loginStatus: false, Error: "An error occurred while verifying the password" });
            }
            
            if (!response) {
                return res.json({ loginStatus: false, Error: "Wrong email or password" });
            }

            const employeeData = result[0];
            const { password, ...employeeWithoutPassword } = employeeData;

            const token = jwt.sign(
                { role: "admin", email: employeeData.email },
                "jwt_secret_key",
                { expiresIn: "1d" }
            );

            res.cookie('token', token, { httpOnly: true });
            return res.json({
                loginStatus: true,
                role: "admin",
                employeeData: employeeWithoutPassword,
            });
        });
    });
});


router.get("/logout", (req, res)=>{
    res.clearCookie("token")
    return res.json({Status:true})
})




export {router as adminLoginRouter}