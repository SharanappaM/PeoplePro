import express from "express"
import con from "../../utils/db.js"
const router = express.Router()

const createTasksTable = `
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- AUTO_INCREMENT and set as PRIMARY KEY
    title VARCHAR(45) NOT NULL,         -- Corrected typo 'tital' to 'title'
    project VARCHAR(45) NOT NULL,
    start_date VARCHAR(45) NOT NULL,
    end_date VARCHAR(45) NOT NULL,
    summary VARCHAR(45) NOT NULL,
    team VARCHAR(85) NOT NULL,
    estimated_hour VARCHAR(85) NOT NULL,
    priority VARCHAR(85) NOT NULL,
    description VARCHAR(105) NULL,
    progress VARCHAR(65) NULL,
    status VARCHAR(225) NULL
);


`

con.query(createTasksTable, (err, result) => {
    if (err) {
        console.log("Error While Creating tasks table", err);

    } else {
        console.log("Tasks Table Created or alreasy exsist");

    }

})

router.get("/listTasks/:team", (req, res) => {
    // Get team name from the route parameter
    const team = req.params.team;

    if (!team) {
        return res.status(400).json({ status: false, msg: "Team name is required" });
    }

    // Modify the query to filter tasks by team name
    const q = "SELECT * FROM tasks WHERE team = ?";

    con.query(q, [team], (err, result) => {
        if (err) {
            console.log("Error while fetching tasks:", err);
            return res.status(500).json({ status: false, msg: "Query error" });
        }

        // If no tasks found for the given team name
        if (result.length === 0) {
            return res.status(404).json({ status: false, msg: `No tasks found for team ${team}` });
        }

        return res.status(200).json({ result });
    });
});




con.query(createTasksTable, (err, result) => {
    if (err) {
        console.log("Error While Creating tasks table", err);

    } else {
        console.log("Tasks Table Created or alreasy exsist");

    }

})



router.get("/listTasksById/:id", (req, res) => {
    // Get team name from the route parameter
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ status: false, msg: "id is required" });
    }

    // Modify the query to filter tasks by team name
    const q = "SELECT * FROM tasks WHERE id = ?";

    con.query(q, [id], (err, result) => {
        if (err) {
            console.log("Error while fetching tasks:", err);
            return res.status(500).json({ status: false, msg: "Query error" });
        }

        // If no tasks found for the given team name
        if (result.length === 0) {
            return res.status(404).json({ status: false, msg: `No tasks found for team ${id}` });
        }

        // Return the task directly
        return res.status(200).json(result[0]); // This returns the first task object, not in an array.
    });
});



router.put("/updateTask/:id", (req, res) => {
    const id = req.params.id;
    const { title, project, start_date, end_date, summary, team, estimated_hour, priority, description, progress, status } = req.body;

    // Ensure that the task ID and fields to update are provided
    if (!id) {
        return res.status(400).json({ status: false, msg: "id is required" });
    }

    if (!title || !project || !start_date || !end_date || !summary || !team || !estimated_hour || !priority || !description) {
        return res.status(400).json({ status: false, msg: "All fields are required" });
    }

    // SQL query to update the task
    const q = `
        UPDATE tasks
        SET title = ?, project = ?, start_date = ?, end_date = ?, summary = ?, team = ?, estimated_hour = ?, priority = ?, description = ?, progress = ?, status = ?
        WHERE id = ?
    `;

    con.query(q, [title, project, start_date, end_date, summary, team, estimated_hour, priority, description, progress, status, id], (err, result) => {
        if (err) {
            console.log("Error while updating task:", err);
            return res.status(500).json({ status: false, msg: "Query error" });
        }

        // If no rows were affected, the task was not found
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, msg: `No task found with id ${id}` });
        }

        // Return a success response
        return res.status(200).json({ status: true, msg: "Task updated successfully" });
    });
});





router.post("/createTasks", (req, res) => {



    const q = "INSERT INTO tasks (`title`,`project`,`start_date`,`end_date`,`summary`,`team`,`estimated_hour`,`priority`,`description`,`progress`,`status`) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
    const VALUES = [
        req.body.title,
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





router.delete("/deleteAlltasks", (req,res)=>{
    const q = "DELETE FROM tasks";

    con.query(q,(err, result)=>{
        if(err){
            console.error("error while delteing employees", err);
            return res.status(500).json({status:false, msg:"query error "})
            
        }
        return res.status(200).json({status:true, msg:"Tasks Deleted"})
    } )
})




export { router as tasksRouter }