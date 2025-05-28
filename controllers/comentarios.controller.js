/// CONTROLADORES DEL MODULO Comentario///

// Campos de la tabla platillos
// id
// nombre 
// puntuacion
// comentario


const db = require("../db/db");

//// METODO GET  /////

// Meotodo para  mostrar todos los comentarios
const allComentario = (req, res) => {
    const sql = "SELECT * FROM comentarios";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor, no se pueden mostrar los comentarios"});
        }
        res.json(rows);
    }); 
};

// Meotodo para  mostrar un comentario
const showComentario = (req, res) => {
    const {id_comentario} = req.params;
    const sql = "SELECT * FROM comentarios WHERE id = ?";
    db.query(sql,[id_comentario], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el pedido buscado"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

//// METODO POST  ////
const storeComentario = (req, res) => {


/*     const {nombreID, puntuacion, comentario, respuesta, nombre} = req.body;
    const sql = "INSERT INTO comentarios (nombreID, puntuacion, comentario, respuesta, nombre) VALUES (?,?,?,?,?)";
    console.log('Datos Recibidos:');
    console.log('Nombre ID:', nombreID);
    console.log('Nombre:', nombre);
    console.log('Puntuación:', puntuacion);
    console.log('Comentario:', comentario);
    console.log('Respuesta:', respuesta);
    if(respuesta==""){
        respuesta="";
    } */

        const { nombreID, puntuacion, comentario, respuesta, nombre } = req.body;
    
        // Preparar los datos para la consulta
        let sql = "INSERT INTO comentarios (nombreID, puntuacion, comentario, ";

        let params = [nombreID, puntuacion,comentario];
        

        // Agregar `password` si está presente
        if (respuesta) {
            sql += "respuesta, ";

            params.push(respuesta);
        }

    
        // Continuar con el resto de los campos
        sql += "nombre)";
        params.push(nombre);
        if(respuesta){
            sql += " VALUES (?, ?, ?, ?, ?)";
        }
        else {
            sql += " VALUES (?, ?, ?, ?)";
        }


         
    db.query(sql,params, (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor no se puede cargar el comentario :("});
        }
        const comentario = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(comentario); // muestra creado con exito el elemento
    });     

};

//// METODO PUT  ////
const updateComentario = (req, res) => {
    const { id_comentario } = req.params;
    const { nombreID, puntuacion, comentario, respuesta, nombre } = req.body;

    // Base de la consulta
    let sql = "UPDATE comentarios SET ";
    let params = [];

    // Agregar dinámicamente campos presentes en el cuerpo de la solicitud
    if (nombreID) {
        sql += "nombreID = ?, ";
        params.push(nombreID);
    }
    if (puntuacion) {
        sql += "puntuacion = ?, ";
        params.push(puntuacion);
    }
    if (comentario) {
        sql += "comentario = ?, ";
        params.push(comentario);
    }
    if (respuesta) {
        sql += "respuesta = ?, ";
        params.push(respuesta);
    }
    if (nombre) {
        sql += "nombre = ?, ";
        params.push(nombre);
    }

    // Eliminar la coma final y agregar WHERE
    sql = sql.slice(0, -2); // Elimina la última coma y espacio
    sql += " WHERE id = ?";
    params.push(id_comentario);

    // Ejecutar la consulta
    db.query(sql, params, (error, result) => {
        if (error) {
            console.error("Error al actualizar el comentario:", error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "ERROR: El comentario a modificar no existe" });
        }

        const comentario = { ...req.body, id: id_comentario }; // Reconstruir el objeto de respuesta
        res.json(comentario); // Devolver el comentario actualizado
    });
};


//// METODO DELETE ////
const destroyComentario = (req, res) => {
    const {id_comentario} = req.params;
    const sql = "DELETE FROM comentarios WHERE id = ?";
    db.query(sql,[id_comentario], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El comentario a borrar no existe"});
        };
        res.json({mesaje : "Comentario Eliminado bien piola"});
    }); 
};


// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allComentario,
    showComentario,
    storeComentario,
    updateComentario,
    destroyComentario
};
