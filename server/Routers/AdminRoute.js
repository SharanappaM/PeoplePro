import express from "express"
import con from "../utils/db.js";


const router = express.Router();

router.get("/listCategorys", (req, res) => {
    const q = "SELECT * FROM employees";
    con.query(q, (err, result) => {
        if (err) return res.json({ status: false, msg: "quey error" })
        return res.json({ result })
    })
})



export { router as adminRouter }