import express from "express"
import con from "../../utils/db.js"
import jwt from "jsonwebtoken"
const router = express.Router()

// router.post("/employeelogin", (req, res) => {
//     const query = "SELECT * FROM employees WHERE email = ? AND password = ?";
//     const values = [
//         req.body.email,
//         req.body.password,
//     ];

//     con.query(query, values, (err, result) => {
//         if (err) {
//             console.log(err);
//             return res.json({ loginStatus: false, error: "Query error" });
            
            
//         }
//         if (result.length > 0) {
//             const email = result[0].email;
//             const token = jwt.sign({ role: "admin", email: email }, "jwt_secret_key", { expiresIn: "1d" });
//             res.cookie("token", token, { httpOnly: true }); // Added httpOnly for security
//             return res.json({ loginStatus: true , role:"employee", email:email});
//         } else {
//             return res.json({ loginStatus: false, error: "Wrong email or password" });
//         }
//     });
// });

router.post("/employeelogin", (req, res) => {
    // Query to check the employee credentials (email and password)
    const query = "SELECT * FROM employees WHERE email = ? AND password = ?";
    const values = [
        req.body.email,    // Email from the request body
        req.body.password, // Password from the request body
    ];

    // Execute the query
    con.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ loginStatus: false, error: "Query error" });
        }
        
        // If employee is found
        if (result.length > 0) {
            const employeeData = result[0]; // Full employee data

            // Exclude the password from the employee data before sending it to the client
            const { password, ...employeeWithoutPassword } = employeeData;

            // Create a JWT token for the employee
            const email = employeeData.email;
            const token = jwt.sign(
                { role: "employee", email: email },
                "jwt_secret_key", // Replace with your secret key
                { expiresIn: "1d" }
            );

            // Set the token as an HttpOnly cookie for security
            res.cookie("token", token, { httpOnly: true });

            // Return login status and the employee data (excluding password)
            return res.json({
                loginStatus: true,
                role: "employee",
                employeeData: employeeWithoutPassword, // Send full employee data (without password)
            });
        } else {
            // If no employee found with the given credentials
            return res.json({ loginStatus: false, error: "Wrong email or password" });
        }
    });
});




export {router as emplyoeeLoginRouter}