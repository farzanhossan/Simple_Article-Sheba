const mysql =require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin@123',
    database: 'article_db'
});

db.connect((error)=>{
    if(error){
        throw error;
    }
    else{
        console.log("Database Connected");
        
    }
})

module.exports = db;