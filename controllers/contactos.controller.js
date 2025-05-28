/// CONTROLADORES DEL MODULO ///

// Campos de la tabla platillos
// celular
// celular 2
// whatsapp
// direccion
// descripcion del establecimiento


const db = require("../db/db");

//// METODO GET  /////

// Para obtener todos los contactos
const allContacto = (req, res) => {
    const sql = "SELECT * FROM contactos";
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor, no se pueden mostrar los contactos."});
        }
        res.json(rows);
    });
};

// Para obtener un contacto específico
const showContacto = (req, res) => {
    const {id_contacto} = req.params;
    const sql = "SELECT * FROM contactos WHERE id = ?";
    db.query(sql, [id_contacto], (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor."});
        }
        if (rows.length === 0) {
            return res.status(404).send({error: "ERROR: No existe el contacto buscado."});
        }
        res.json(rows[0]); // muestra el contacto en la posición cero si existe
    });
};



const storeContacto = (req, res) => {
    const {celular, celular2, whatsapp, direccion, direccionMaps, descripcion, activo} = req.body;
    const sql = "INSERT INTO contactos (celular, celular2, whatsapp, direccion, direccionMaps, descripcion, activo) VALUES (?,?,?,?,?,?,?)";
    db.query(sql,[celular, celular2, whatsapp, direccion, direccionMaps, descripcion, activo], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const pedido = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(pedido); // muestra creado con exito el elemento
    });     

};


//// METODO PUT  /////

// Para actualizar un contacto
const updateContacto = (req, res) => {
    const {id_contacto} = req.params;
    const {celular, celular2, whatsapp, direccion, direccionMaps, descripcion, activo} = req.body;
    
    const sql = "UPDATE contactos SET celular = ?, celular2 = ?, whatsapp = ?, direccion = ?, direccionMaps = ?, descripcion = ?, activo = ? WHERE id = ?";
    db.query(sql, [celular, celular2, whatsapp, direccion, direccionMaps, descripcion, activo, id_contacto], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor."});
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({error: "ERROR: El contacto a modificar no existe."});
        }

        const contacto = {...req.body, id_contacto}; // reconstruir el objeto con los datos actualizados
        res.json(contacto); // mostrar el contacto actualizado
    });
};

//// METODO DELETE ////
const destroyContacto = (req, res) => {
    const {id_contacto} = req.params;
    const sql = "DELETE FROM contactos WHERE id = ?";
    db.query(sql,[id_contacto], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El Contacto a borrar no existe"});
        };
        res.json({mesaje : "Platillo Eliminado"});
    }); 
};



// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allContacto,
    showContacto,
    storeContacto,
    updateContacto,
    destroyContacto,
};
