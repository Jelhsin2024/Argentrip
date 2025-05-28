/// CONTROLADORES DEL MODULO ///

// Campos de la tabla videoportadas
// id
// nombre_videoPortada
// tipo_videoPortada
// descripcion_videoPortada
// file_videoPortada


const db = require("../db/db");

//// METODO GET  /////

// Para todos los videoportadas
const allVideoPortada = (req, res) => {
    const sql = "SELECT * FROM videoportadas";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor, no se pueden mostrar los videos de portada"});
        }
        res.json(rows);
    }); 
};

// Para un Pedido
const showVideoPortada = (req, res) => {
    const {id_videoportada} = req.params;
    const sql = "SELECT * FROM videoportadas WHERE id = ?";
    db.query(sql,[id_videoportada], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el video de portada buscado"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

//// METODO POST  ////
/* const storeVideoPortada = (req, res) => {
    const {nombre_videoPortada, tipo_videoPortada, descripcion_videoPortada, file_videoPortada} = req.body;
    const sql = "INSERT INTO videoportadas (nombre_videoPortada, tipo_videoPortada, descripcion_videoPortada, file_videoPortada) VALUES (?,?,?,?)";
    db.query(sql,[nombre_videoPortada, tipo_videoPortada, descripcion_videoPortada, file_videoPortada], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor no se puede registrar el video portada"});
        }
        const videoPortada = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(videoPortada); // muestra creado con exito el elemento
    });     

}; */
//// METODO POST  ////
const storeVideoPortada = (req, res) => {
    let videoAsubir ="";
    if(req.file){videoAsubir=req.file.filename;}
    console.log(videoAsubir) 
    const {nombre_videoPortada, tipo_videoPortada, descripcion_videoPortada} = req.body;
    const sql = "INSERT INTO videoportadas (nombre_videoPortada, tipo_videoPortada, descripcion_videoPortada, file_videoPortada) VALUES (?,?,?,?)";
    db.query(sql,[nombre_videoPortada, tipo_videoPortada, descripcion_videoPortada, videoAsubir], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor no se puede registrar el video portada"});
        }
        const videoPortada = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(videoPortada); // muestra creado con exito el elemento
    });     

};

/* const storePlatillo = (req, res) => {
    let imagenAsubir ="";
    if(req.file){imagenAsubir=req.file.filename;}
    let rutaimagenAsubir="uploads/"+imagenAsubir;
        

    const {nombre, descripcion, precio, tipo} = req.body;
    const sql = "INSERT INTO platillos (nombre, descripcion, precio, foto, tipo) VALUES (?,?,?,?,?)";
    db.query(sql,[nombre, descripcion, precio, rutaimagenAsubir, tipo], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const platillo = {...req.body,rutaimagenAsubir, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(platillo); // muestra creado con exito el elemento
    });     

}; */

//// METODO PUT  ////
const updateVideoPortada = (req, res) => {
    //Asignamos el body filename a la variable videoAsuvir
    let videoAsubir ="";
    if(req.file){videoAsubir=req.file.filename;}

    const {id_videoportada} = req.params;
    const {nombre_videoPortada, tipo_videoPortada, descripcion_videoPortada} = req.body;
    
    if(videoAsubir){
        const sql ="UPDATE videoportadas SET nombre_videoPortada = ?, tipo_videoPortada = ?, descripcion_videoPortada = ?, file_videoPortada = ? WHERE id = ?";
        db.query(sql,[nombre_videoPortada, tipo_videoPortada, descripcion_videoPortada, videoAsubir, id_videoportada], (error, result) => {
            console.log(result);
            if(error){
                return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
            }
            if(result.affectedRows == 0){
                return res.status(404).send({error : "ERROR: El video portada a modificar no existeeeeeeeeeeee"});
            };
            
            const videoportada = {...req.body, ...req.params}; // ... reconstruir el objeto del body

            res.json(videoportada); // mostrar el elmento que existe
        });
    }
    else if(videoAsubir==""){
        const sql ="UPDATE videoportadas SET nombre_videoPortada = ?, tipo_videoPortada = ?, descripcion_videoPortada = ? WHERE id = ?";
        db.query(sql,[nombre_videoPortada, tipo_videoPortada, descripcion_videoPortada, id_videoportada], (error, result) => {
            console.log(result);
            if(error){
                return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
            }
            if(result.affectedRows == 0){
                return res.status(404).send({error : "ERROR: El video portada a modificar no existeeeeeeeeeeee"});
            };
            
            const videoportada = {...req.body, ...req.params}; // ... reconstruir el objeto del body

            res.json(videoportada); // mostrar el elmento que existe
        });
    }      
};

const updatePlatillo = (req, res) => {
    let imagenAsubir ="";
    if(req.file){imagenAsubir=req.file.filename;}
        
    const {id_platillo} = req.params;
    const {nombre, descripcion, precio, tipo} = req.body;
    
    if(imagenAsubir){
        const sql ="UPDATE platillos SET nombre = ?, descripcion = ?, precio = ?, foto = ?, tipo = ? WHERE id = ?";
        db.query(sql,[nombre, descripcion, precio, rutaimagenAsubir, tipo, id_platillo], (error, result) => {
            console.log(result);
            if(error){
                return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
            }
            if(result.affectedRows == 0){
                return res.status(404).send({error : "ERROR: El platillo a modificar no existe"});
            };
            
            const pedido = {...req.body, ...req.params}; // ... reconstruir el objeto del body

            res.json(pedido); // mostrar el elmento que existe
        });
    }
    else if(imagenAsubir==""){
        const sql ="UPDATE platillos SET nombre = ?, descripcion = ?, precio = ?, tipo = ? WHERE id = ?";
        db.query(sql,[nombre, descripcion, precio, tipo, id_platillo], (error, result) => {
            console.log(result);
            if(error){
                return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
            }
            if(result.affectedRows == 0){
                return res.status(404).send({error : "ERROR: El platillo a modificar no existe"});
            };
            
            const pedido = {...req.body, ...req.params}; // ... reconstruir el objeto del body

            res.json(pedido); // mostrar el elmento que existe
        });
    }   
};


//// METODO DELETE ////
const destroyVideoPortada = (req, res) => {
    const {id_videoportada} = req.params;
    const sql = "DELETE FROM videoportadas WHERE id = ?";
    db.query(sql,[id_videoportada], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El video portada a borrar no existe"});
        };
        res.json({mesaje : "El video de la portada fue Eliminado"});
    }); 
};


// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allVideoPortada,
    showVideoPortada,
    storeVideoPortada,
    updateVideoPortada,
    destroyVideoPortada
};
