import express from "express"
import cors from "cors"
import { adminRouter } from "./Routers/AdminRoute.js";



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
app.use("/auth", adminRouter)








app.listen(8787, () => {
    console.log("Server Connected");
});


