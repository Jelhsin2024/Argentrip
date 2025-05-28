/// CONTROLADORES DEL MODULO ///

// Campos de la tabla platillos
// id
// nombre
// descripcion
// precio
// foto
// tipo

const db = require("../db/db");

//// METODO GET  /////

// Para todos los platillos
const allPlatillo = (req, res) => {
    const sql = "SELECT * FROM platillos";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor, no se pueden mostrar los platillos"});
        }
        res.json(rows);
    }); 
};

// Para un Pedido
const showPlatillo = (req, res) => {
    const {id_platillo} = req.params;
    const sql = "SELECT * FROM platillos WHERE id = ?";
    db.query(sql,[id_platillo], (error, rows) => {
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
const storePlatillo = (req, res) => {
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

};

//// METODO PUT  ////
const updatePlatillo = (req, res) => {
    let imagenAsubir ="";
    if(req.file){imagenAsubir=req.file.filename;}
    
    let rutaimagenAsubir="uploads/"+imagenAsubir;
        
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
const destroyPlatillo = (req, res) => {
    const {id_platillo} = req.params;
    const sql = "DELETE FROM platillos WHERE id = ?";
    db.query(sql,[id_platillo], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El Platillo a borrar no existe"});
        };
        res.json({mesaje : "Platillo Eliminado"});
    }); 
};


// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allPlatillo,
    showPlatillo,
    storePlatillo,
    updatePlatillo,
    destroyPlatillo
};
