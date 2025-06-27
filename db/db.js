
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
