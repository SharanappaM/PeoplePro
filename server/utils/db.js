import mysql from "mysql"

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Sharan@123",
    database:"people_pro"

   
})

con.connect(function(error){
    if(error){
        return console.log("Connection error");
        
    }else{
        return console.log("Coonected");
        
    }
})
export default con;