import express from "express"
import cors from "cors"
import { employeeRouters } from "./Routers/adminRouter/EmployeeRoutes.js";
import { departmentRouters } from "./Routers/adminRouter/DepartmentRoutes.js";
import { designationRouter } from "./Routers/adminRouter/DesignationRoutes.js";



const app = express();

app.get("/getData", (req, res) => {
    res.json("Hello Get method");
});






app.use(cors({
    origin:["http://localhost:5173"],
    methods:["POST", "GET", "DELETE", "PUT"],
    credentials:true
}))
app.use(express.json())


app.use("/auth", employeeRouters)
app.use("/auth", departmentRouters)
app.use("/auth", designationRouter)








app.listen(8787, () => {
    console.log("Server Connected");
});


