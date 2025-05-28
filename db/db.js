const mysql = require("mysql2");

//// CONEXION A LA BBDD ////
const connection = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
    
});

connection.connect((error) => {
    if(error){
        return console.error(error);
    }
    console.log("Estamos conectados a la Base de Datos");
});

// EXPORTAR DEL MODULO LA FUNCION CONNECTION
module.exports = connection;
