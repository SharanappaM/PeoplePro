import express from "express"
import con from "../../utils/db.js"

const router = express.Router()



const createProjectTable = `
 CREATE TABLE IF NOT EXISTS projects(
 id INT AUTO_INCREMENT PRIMARY KEY,  -- AUTO_INCREMENT and set as PRIMARY KEY
    title VARCHAR(45) NOT NULL,
    client VARCHAR(45) NOT NULL,
    start_date  VARCHAR(45) NOT NULL,
    end_date  VARCHAR(45) NOT NULL,
    summary  VARCHAR(45) NOT NULL,
    team  VARCHAR(85) NOT NULL,
    estimated_hour VARCHAR(85) NOT NULL,
    priority VARCHAR(85) NOT NULL,
    description VARCHAR(105) NULL,
    progress VARCHAR(65) NULL,
    status VARCHAR(225) NULL
    )


`

con.query(createProjectTable, (err, result) => {
    if (err) {
        console.error("Error creating the 'project' table:", err);
    } else {
        console.log("'project' table is ready or already exists.");
    }
})





router.post("/createProject", (req, res) => {
    const q = "INSERT INTO projects (`title`,`client`,`start_date`,`end_date`,`summary`,`team`,`estimated_hour`,`priority`,`description`, `progress`) VALUES (?,?,?,?,?,?,?,?,?,?) "
    const VALUES = [
        req.body.title,
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

    con.query(q, VALUES, (err, result) => {
        if (err) {
            console.log("Error while creating project ", err);
            return res.status(500).json({ status: false, msg: "query error" })
        }
        return res.status(200).json({ status: true, msg: "Project Created !!" })

    })
})

router.get("/listProjectsById/:id", (req, res) => {
    // Get team name from the route parameter
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ status: false, msg: "id is required" });
    }

    // Modify the query to filter tasks by team name
    const q = "SELECT * FROM projects WHERE id = ?";

    con.query(q, [id], (err, result) => {
        if (err) {
            console.log("Error while fetching projects:", err);
            return res.status(500).json({ status: false, msg: "Query error" });
        }

        // If no tasks found for the given team name
        if (result.length === 0) {
            return res.status(404).json({ status: false, msg: `No projects found for team ${id}` });
        }

        // Return the task directly
        return res.status(200).json(result[0]); // This returns the first task object, not in an array.
    });
});



router.put("/updateProject/:id", (req, res) => {
    const id = req.params.id;
    const { title, client, start_date, end_date, summary, team, estimated_hour, priority, description, status } = req.body;

    // Ensure the project ID is provided
    if (!id) {
        return res.status(400).json({ status: false, msg: "id is required" });
    }

    // Ensure required fields are provided
    if (!title || !client || !start_date || !end_date || !summary || !team || !estimated_hour || !priority || !status) {
        return res.status(400).json({ status: false, msg: "All fields except description are required" });
    }

    // Ensure 'estimated_hour' is a valid number
    const estimatedHourValue = parseInt(estimated_hour);
    if (isNaN(estimatedHourValue)) {
        return res.status(400).json({ status: false, msg: "estimated_hour must be a valid number" });
    }

    // Handle 'description' being null or empty
    const descriptionValue = description === null ? null : description;

    // Validate 'status' (optional: add a valid list of statuses if needed)
    const validStatuses = ['Not Stated', 'In Progress', 'Completed', 'On Hold', 'Progress'];  // Updated status list
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ status: false, msg: "Invalid status value" });
    }

    // SQL query to update the project
    const q = `
        UPDATE projects
        SET title = ?, client = ?, start_date = ?, end_date = ?, summary = ?, team = ?, estimated_hour = ?, priority = ?, description = ?, status = ?
        WHERE id = ?
    `;

    // Execute the query
    con.query(q, [title, client, start_date, end_date, summary, team, estimatedHourValue, priority, descriptionValue, status, id], (err, result) => {
        if (err) {
            console.log("Error while updating project:", err);
            return res.status(500).json({ status: false, msg: "Query error" });
        }

        // If no rows were affected, the project was not found
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, msg: `No project found with id ${id}` });
        }

        // Return a success response
        return res.status(200).json({ status: true, msg: "Project updated successfully" });
    });
});


router.get("/listProjects", (req, res) => {
    const q = "SELECT * FROM projects";
    con.query(q, (err, result) => {
        if (err) {
            console.log("Error while creating project ", err);
            return res.status(500).json({ status: false, msg: "query error" })
        }
        return res.status(200).json({ result })
    })
})
router.get("/getByProjectName", (req, res) => {
    const q = "SELECT title FROM projects";
    con.query(q, (err, result) => {
        if (err) {
            console.log("Error while creating project ", err);
            return res.status(500).json({ status: false, msg: "query error" })
        }
        const projectNames = result.map(names => names.title)
        return res.status(200).json({ projectNames })
    })
})

router.delete("/deleteAllProjects", (req, res) => {
    const q = "DELETE FROM projects";

    con.query(q, (err, result) => {
        if (err) {
            console.error("error while delteing employees", err);
            return res.status(500).json({ status: false, msg: "query error " })

        }
        return res.status(200).json({ status: true, msg: "Projects  Deleted" })
    })
})



export { router as projectRouter }