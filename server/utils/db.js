import mysql from "mysql2"

import dotenv from 'dotenv';
dotenv.config();

const con = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE

})

con.connect(function(error){
    if(error){
        return console.log("Connection error");
        
    }else{
        return console.log("Coonected");
        
    }
})
export default con;











// // this is for railway server
// import mysql from "mysql2";
// import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();

// // Create the MySQL connection using the URL from environment variables
// const con = mysql.createConnection(process.env.MYSQL_PUBLIC_URL);

// // Connect to the MySQL database
// con.connect((error) => {
//     if (error) {
//         return console.log("Connection error:", error);
//     } else {
//         return console.log("Connected to the MySQL database!");
//     }
// });

// // Export the connection object as the default export
// export default con;
