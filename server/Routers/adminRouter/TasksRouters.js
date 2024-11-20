import express from "express"
import con from "../../utils/db.js"
const router = express.Router()

const createTasksTable = `
CREATE TABLE IF NOT EXISTS tasks(
    tital VARCHAR(45) NOT NULL,
    project VARCHAR(45) NOT NULL,
    start_date  VARCHAR(45) NOT NULL,
    end_date  VARCHAR(45) NOT NULL,
    summary  VARCHAR(45) NOT NULL,
    team  VARCHAR(85) NOT NULL,
    estimated_hour VARCHAR(85) NOT NULL,
    priority VARCHAR(85) NOT NULL,
    description VARCHAR(105) NULL,
    progress VARCHAR(65) NULL,
    status VARCHAR (65) NULL 


)

`

con.query(createTasksTable, (err, result) => {
    if (err) {
        console.log("Error While Creating tasks table", err);

    } else {
        console.log("Tasks Table Created or alreasy exsist");

    }

})


router.post("/createTasks", (req, res) => {



    const q = "INSERT INTO tasks (`tital`,`project`,`start_date`,`end_date`,`summary`,`team`,`estimated_hour`,`priority`,`description`,`progress`,`status`) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
    const VALUES = [
        req.body.tital,
        req.body.project,
        req.body.start_date,
        req.body.end_date,
        req.body.summary,
        req.body.team,
        req.body.estimated_hour,
        req.body.priority,
        req.body.description,
        req.body.progress,
        req.body.status,
    ]
    con.query(q, VALUES, (err, result) => {
        if (err) {
            console.log("Error while create tasks ", err);
            return res.status(500).json({ status: false, msg: "Query error" })

        }
        return res.status(200).json({ status: true, msg: "Task Created" })

    })
})

router.get("/listTasks", (req, res) => {
    const q = "SELECT * FROM tasks"
   
    con.query(q, (err, result) => {
        if (err) {
            console.log("Error while create tasks ", err);
            return res.status(500).json({ status: false, msg: "Query error" })

        }
        return res.status(200).json({ result })

    })
})


export { router as tasksRouter }