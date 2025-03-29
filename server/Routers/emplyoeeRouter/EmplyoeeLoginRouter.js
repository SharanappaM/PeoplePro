import express from "express"
import con from "../../utils/db.js"
import jwt from "jsonwebtoken"
import bcrypt, { hash } from "bcrypt"
const router = express.Router()




router.post("/employeelogin", (req, res) => {
    const sql = "SELECT * FROM employees WHERE email = ?";
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
                { role: "employee", email: employeeData.email },
                "jwt_secret_key",
                { expiresIn: "1d" }
            );

            res.cookie('token', token, { httpOnly: true });
            return res.json({
                loginStatus: true,
                role: "employee",
                employeeData: employeeWithoutPassword,
            });
        });
    });
});



router.get("/logout", (req, res)=>{
    res.clearCookie("token")
    return res.json({Status:true})
})


export { router as emplyoeeLoginRouter }