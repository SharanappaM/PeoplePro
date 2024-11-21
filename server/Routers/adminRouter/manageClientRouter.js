import express from "express"
import con from "../../utils/db.js";

const router = express.Router();


const createClientTable = `
CREATE TABLE IF NOT EXISTS clients(
first_name VARCHAR(45) NOT NULL, 
last_name VARCHAR(45) NOT NULL, 
email VARCHAR(45) NOT NULL, 
username VARCHAR(45) NOT NULL, 

password VARCHAR(45) NOT NULL, 
contact_number  VARCHAR(45) NOT NULL, 
gender  VARCHAR(45) NOT NULL, 
client_picture  VARCHAR(45)  NOT NULL, 
country  VARCHAR(45)  NULL, 
address  VARCHAR(85)  NULL, 
city  VARCHAR(45)  NULL, 
state  VARCHAR(45)  NULL, 
zip_code  VARCHAR(45)  NULL,
status VARCHAR(45)  NULL


)

`
con.query(createClientTable, (err, result)=>{
    if(err){
        console.log("Error While Creating Client Table", err); 
    }
    else{
        console.log("Cleint Table Created  or already exists");
    }
})


router.post("/createClient", (req, res)=>{
    const q = "INSERT INTO clients (`first_name`,`last_name`,`password`,`contact_number`,`gender`,`email`,`username`,`client_picture`) VALUES (?,?,?,?,?,?,?,?)"
    const VALIUES = [
        req.body.first_name,
        req.body.last_name,
        req.body.password,
        req.body.contact_number,
        req.body.gender,
        req.body.email,
        req.body.username,
        req.body.client_picture,
    ]

    con.query(q, VALIUES, (err, result)=>{
        if(err){
            console.log("Error While Creating clinet" , err);
            return res.status(500).json({status:false, msg:"Query Error"})
        }

        return res.status(200).json({status:true, msg:"Cleint Created"})
    })
})



router.get("/listClients", (req, res)=>{
    const q = "SELECT * FROM clients"

    con.query(q, (err, result)=>{
        if(err){
            console.log("Error While Listing clients", err);
            return res.status(500).json({status:false, msg:"Query Error"})
            
        }

        return res.status(200).json({result})
    })
})



export {router as clinetRouters}