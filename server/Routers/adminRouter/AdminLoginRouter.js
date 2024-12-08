import express from "express"
import con from "../../utils/db.js"
import jwt from "jsonwebtoken"
const router = express.Router()

router.post("/adminlogin", (req, res) => {
    const query = "SELECT * FROM admins WHERE email = ? AND password = ?";
    const values = [
        req.body.email,
        req.body.password,
    ];

    con.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ loginStatus: false, error: "Query error" });
            
            
        }
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email }, "jwt_secret_key", { expiresIn: "1d" });
            res.cookie("token", token, { httpOnly: true }); // Added httpOnly for security
            return res.json({ loginStatus: true , role:"admin"});
        } else {
            return res.json({ loginStatus: false, error: "Wrong email or password" });
        }
    });
});


export {router as adminLoginRouter}