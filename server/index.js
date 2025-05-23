// import express from "express"
// import cors from "cors"
// import { employeeRouters } from "./Routers/adminRouter/EmployeeRoutes.js";
// import { departmentRouters } from "./Routers/adminRouter/DepartmentRoutes.js";
// import { designationRouter } from "./Routers/adminRouter/DesignationRoutes.js";
// import { projectRouter } from "./Routers/adminRouter/ProjectRouter.js";
// import { tasksRouter } from "./Routers/adminRouter/TasksRouters.js";
// import { clinetRouters } from "./Routers/adminRouter/manageClientRouter.js";
// import { payrollRouter } from "./Routers/adminRouter/PayrollRouters.js";
// import { adminLoginRouter } from "./Routers/adminRouter/AdminLoginRouter.js";
// import { employeeAttendanceRouter } from "./Routers/emplyoeeRouter/EmplyoeeAttendance.js";
// import { emplyoeeLoginRouter } from "./Routers/emplyoeeRouter/EmplyoeeLoginRouter.js";
// import { leaveRequestsRouter } from "./Routers/adminRouter/LeaveRequestRouter.js";

// import Jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";

// const app = express();



// app.get("/getData", (req, res) => {
//     res.json("Hello Get method");
// });






// app.use(cors({
//     origin:["http://localhost:5173", "https://people-pro.netlify.app"],
//     methods:["POST", "GET", "DELETE", "PUT","OPTIONS"],
//     credentials:true
// }))
// app.use(express.json())

// app.use(cookieParser())
// app.use("/auth", employeeRouters)
// app.use("/auth", departmentRouters)
// app.use("/auth", designationRouter)
// app.use("/auth", projectRouter)
// app.use("/auth", tasksRouter)
// app.use("/auth", clinetRouters)
// app.use("/auth", payrollRouter)
// app.use("/auth", adminLoginRouter)
// app.use("/auth", employeeAttendanceRouter)

// app.use("/auth", emplyoeeLoginRouter)
// app.use("/auth", leaveRequestsRouter)



// const verifyUser = (req, res, next) => {
//     const token = req.cookies.token;
//     if(token) {
//         Jwt.verify(token, "jwt_secret_key", (err ,decoded) => {
//             if(err) return res.json({Status: false, Error: "Wrong Token"})
//             req.id = decoded.id;
//             req.role = decoded.role;
//             next()
//         })
//     } else {
//         return res.json({Status: false, Error: "Not autheticated"})
//     }
// }

// app.get('/verify',verifyUser, (req, res)=> {
//     return res.json({Status: true, role: req.role, id: req.id})
// } )







// app.listen(8787, () => {
//     console.log("Server Connected");
// });

import express from "express";
import cors from "cors";
import { employeeRouters } from "./Routers/adminRouter/EmployeeRoutes.js";
import { departmentRouters } from "./Routers/adminRouter/DepartmentRoutes.js";
import { designationRouter } from "./Routers/adminRouter/DesignationRoutes.js";
import { projectRouter } from "./Routers/adminRouter/ProjectRouter.js";
import { tasksRouter } from "./Routers/adminRouter/TasksRouters.js";
import { clinetRouters } from "./Routers/adminRouter/manageClientRouter.js";
import { payrollRouter } from "./Routers/adminRouter/PayrollRouters.js";
import { adminLoginRouter } from "./Routers/adminRouter/AdminLoginRouter.js";
import { employeeAttendanceRouter } from "./Routers/emplyoeeRouter/EmplyoeeAttendance.js";
import { emplyoeeLoginRouter } from "./Routers/emplyoeeRouter/EmplyoeeLoginRouter.js";
import { leaveRequestsRouter } from "./Routers/adminRouter/LeaveRequestRouter.js";

import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

// CORS Middleware Setup - Applied before any routes
app.use(cors({
    origin: ["http://localhost:5173", "https://people-pro.netlify.app"], // Allow these origins
    methods: ["POST", "GET", "DELETE", "PUT", "OPTIONS"], // Allow these HTTP methods
    credentials: true,  // Enable cookies
}));

// Handle OPTIONS preflight requests
app.options('*', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);  // Respond with status 200 for OPTIONS request
});

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Define Routes
app.use("/auth", employeeRouters);
app.use("/auth", departmentRouters);
app.use("/auth", designationRouter);
app.use("/auth", projectRouter);
app.use("/auth", tasksRouter);
app.use("/auth", clinetRouters);
app.use("/auth", payrollRouter);
app.use("/auth", adminLoginRouter);
app.use("/auth", employeeAttendanceRouter);
app.use("/auth", emplyoeeLoginRouter);
app.use("/auth", leaveRequestsRouter);

// Verify User Token Middleware
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;  // Retrieve token from cookies
    if (token) {
        Jwt.verify(token, "jwt_secret_key", (err, decoded) => {
            if (err) return res.json({ Status: false, Error: "Wrong Token" });
            req.id = decoded.id;
            req.role = decoded.role;
            next();
        });
    } else {
        return res.json({ Status: false, Error: "Not authenticated" });
    }
};

// Protected Route: /verify
app.get('/verify', verifyUser, (req, res) => {
    return res.json({ Status: true, role: req.role, id: req.id });
});


app.get("/testingserver", (req, res) => {
    res.json({ message: "Server is up and running!" });
});

// Start Server
app.listen(8787, () => {
    console.log("Server Connected on port 8787");
});
