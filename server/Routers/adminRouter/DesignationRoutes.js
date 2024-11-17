import express from "express"
import con from "../../utils/db.js";

const router = express.Router();



const createDesignationTable = `
 CREATE TABLE IF NOT EXISTS designations(
  department_name VARCHAR(45) NOT NULL,
    designation_name VARCHAR(45) NOT NULL,
    description VARCHAR(85) NULL
    )


`


con.query(createDesignationTable, (err, result) => {
    if (err) {
        console.error("Error creating the 'designations' table:", err);
    } else {
        console.log("'designations' table is ready or already exists.");
    }
});

router.post("/createDesignation", (req, res) => {
    const q = "INSERT INTO designations (`department_name`,`designation_name`,`description`) VALUES (?,?,?)";

    const VALUES = [
        req.body.department_name,
        req.body.designation_name,
        req.body.description,

    ]

    con.query(q, VALUES, (err, result) => {
        if (err) {
            console.error("Error in create  Query", err);
            return res.status(500).json({ status: false, msg: "Query Error" })

        }
        return res.status(200).json({ status: true, msg: "Designation Created " })
    })

})

router.get("/listDesignations", (req, res)=>{
    const q = "SELECT * from designations";

    con.query(q, (err, result)=>{
        if(err){
            console.error("Quer Error". err);
            return res.status(500).json({status:false,msg:"query error"})
            
        }

        return res.status(200).json({result})
    })
})

router.delete("/deleteAllDesignations", (req,res)=>{
    const q = "DELETE FROM designations"

    con.query(q, (err, result)=>{
        if(err){
            console.error("error while delteing Designations", err);
            return res.status(500).json({status:false, msg:"query error "})
            
        }
        return res.status(200).json({status:true, msg:"Designations Deleted"})

    })
})


router.get("/getBydesignationName", (req,res)=>{
    const q = "SELECT designation_name FROM designations";
    con.query(q, (err, result)=>{
        if(err){
            console.error('Query error:', err);
            return res.status(500).json({status:false, msg:"Query error"})
            
        }

        const designation_name = result.map(emp => emp.designation_name);
        return res.status(200).json({designation_name});
    })
})


export { router as designationRouter }