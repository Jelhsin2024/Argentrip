
// para uso local:
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



// para uso remoto:

const mysql = require("mysql2");

const connection = mysql.createConnection({
    host     : process.env.MYSQLHOST,
    user     : process.env.MYSQLUSER,
    password : process.env.MYSQLPASSWORD,
    database : process.env.MYSQLDATABASE,
    port     : process.env.MYSQLPORT // <-- ESTA LÍNEA ES CLAVE
});

connection.connect((error) => {
    if(error){
        console.error('Error de conexión:', error);
        return;
    }
    console.log("Estamos conectados a la Base de Datos");
});

module.exports = connection;
