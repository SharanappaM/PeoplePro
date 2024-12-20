import express from "express"
import con from "../../utils/db.js"

const router = express.Router()



const createProjectTable = `
 CREATE TABLE IF NOT EXISTS projects(
    tital VARCHAR(45) NOT NULL,
    client VARCHAR(45) NOT NULL,
    start_date  VARCHAR(45) NOT NULL,
    end_date  VARCHAR(45) NOT NULL,
    summary  VARCHAR(45) NOT NULL,
    team  VARCHAR(85) NOT NULL,
    estimated_hour VARCHAR(85) NOT NULL,
    priority VARCHAR(85) NOT NULL,
    description VARCHAR(105) NULL,
    progress VARCHAR(65) NULL
    )


`

con.query(createProjectTable, (err, result)=>{
    if (err) {
        console.error("Error creating the 'project' table:", err);
    } else {
        console.log("'project' table is ready or already exists.");
    }
})





router.post("/createProject", (req, res)=>{
    const q = "INSERT INTO projects (`tital`,`client`,`start_date`,`end_date`,`summary`,`team`,`estimated_hour`,`priority`,`description`, `progress`) VALUES (?,?,?,?,?,?,?,?,?,?) "
    const VALUES =[
        req.body.tital,
        req.body.client,
        req.body.start_date,
        req.body.end_date,
        req.body.summary,
        req.body.team,
        req.body.estimated_hour,
        req.body.priority,
        req.body.description,
        req.body.progress,
    ]

    con.query(q, VALUES, (err, result)=>{
        if(err){
            console.log("Error while creating project ", err);
            return res.status(500).json({status:false, msg:"query error"})
        }
        return res.status(200).json({status:true, msg:"Project Created !!"})
        
    })
})

router.get("/listProjects", (req, res)=>{
    const q = "SELECT * FROM projects";
    con.query(q, (err, result)=>{
        if(err){
            console.log("Error while creating project ", err);
            return res.status(500).json({status:false, msg:"query error"})
        }
        return res.status(200).json({result})
    })
})
router.get("/getByProjectName", (req, res)=>{
    const q = "SELECT tital FROM projects";
    con.query(q, (err, result)=>{
        if(err){
            console.log("Error while creating project ", err);
            return res.status(500).json({status:false, msg:"query error"})
        }
        const projectNames = result.map(names => names.tital)
        return res.status(200).json({projectNames})
    })
})

router.delete("/deleteAllProjects", (req,res)=>{
    const q = "DELETE FROM projects";

    con.query(q,(err, result)=>{
        if(err){
            console.error("error while delteing employees", err);
            return res.status(500).json({status:false, msg:"query error "})
            
        }
        return res.status(200).json({status:true, msg:"Projects  Deleted"})
    } )
})



export {router as projectRouter}