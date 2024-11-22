import express from "express"
import con from "../../utils/db.js";

const router = express.Router();

router.put("/updatePaymentStatus/:employee_id", (req, res) => {
    const employee_id = req.params.employee_id;  
    // const { payment_status } = req.body;        
    
    // SQL query to update the payment_status
    const query = "UPDATE employees SET payment_status = ? WHERE employee_id = ?";

    const VALUES = [
        req.body.payment_status
    ]

    con.query(query, [...VALUES, employee_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({status:fasle, msg: "Error updating payment status" });
        }

        if (result.affectedRows > 0) {
            return res.status(200).json({ status:true, msg: "Payment Success" });
        } else {
            return res.status(404).json({ msg: "Employee not found" });
        }
    })
}
)



export {router as payrollRouter}