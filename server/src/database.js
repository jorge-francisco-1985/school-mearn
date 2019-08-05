const mysql = require("mysql");
const mysqlConnection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"admin-school"
});

mysqlConnection.connect(function(err){
    if(err){
        console.log(err);
        return
    }else{
        console.log("Conectado a la base de datos")
    }
});

module.exports=mysqlConnection;