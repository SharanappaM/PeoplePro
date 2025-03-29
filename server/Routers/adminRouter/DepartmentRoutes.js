import express from "express"
import con from "../../utils/db.js"

const router = express.Router();


const createDepartmentTable = `
CREATE TABLE IF NOT EXISTS department (
  department_id INT AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL,
  department_head VARCHAR(100) NOT NULL,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

con.query(createDepartmentTable, (err, result) => {
  if (err) {
    console.error("Error creating the 'department' table:", err);
  } else {
    console.log("'department' table is ready or already exists.");
  }
});


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

router.get("/getByDepartmentName", (req,res)=>{
    const q = "SELECT department_name FROM department";
    con.query(q, (err, result)=>{
        if(err){
            console.error('Query error:', err);
            return res.status(500).json({status:false, msg:"Query error"})
            
        }

        const getDepartment_name = result.map(emp => emp.department_name);
        return res.status(200).json({getDepartment_name});
    })
})

export {router as departmentRouters}