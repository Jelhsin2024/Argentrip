/// CONTROLADORES DEL MODULO ///

// Campos de la tabla pedidos
// id_pedido
// n_mesa
// n_platillo
// fecha_hora
// medio_pago

const db = require("../db/db");

//// METODO GET  /////

// Para todos las pedidos
const allPedido = (req, res) => {
    const sql = "SELECT * FROM pedidos";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor, no se pueden mostrar los pedidos"});
        }
        res.json(rows);
    }); 
};

// Para un Pedido
const showPedido = (req, res) => {
    const {id_pedido} = req.params;
    const sql = "SELECT * FROM pedidos WHERE id = ?";
    db.query(sql,[id_pedido], (error, rows) => {
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
const storePedido = (req, res) => {
    const {n_mesa, n_platillo, fecha_hora, medio_pago, totalPago} = req.body;
    console.log("Fecha y hora recibida:", fecha_hora);
    const sql = "INSERT INTO pedidos (n_mesa, n_platillo, fecha_hora, medio_pago, totalPago) VALUES (?,?,?,?,?)";
    db.query(sql,[n_mesa, n_platillo, fecha_hora, medio_pago, totalPago], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const pedido = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(pedido); // muestra creado con exito el elemento
    });     

};

//// METODO PUT  ////
const updatePedido = (req, res) => {
    const {id_pedido} = req.params;
    const {n_mesa, n_platillo, fecha_hora, medio_pago, totalPago} = req.body;
    const sql ="UPDATE pedidos SET n_mesa = ?, n_platillo = ?, fecha_hora = ?, medio_pago = ? , totalPago = ? WHERE id = ?";
    db.query(sql,[n_mesa, n_platillo, fecha_hora, medio_pago, totalPago, id_pedido], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El pedido a modificar no existe"});
        };
        
        const pedido = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(pedido); // mostrar el elmento que existe
    });     
};


//// METODO DELETE ////
const destroyPedido = (req, res) => {
    const {id_pedido} = req.params;
    const sql = "DELETE FROM pedidos WHERE id = ?";
    db.query(sql,[id_pedido], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El Pedido a borrar no existe"});
        };
        res.json({mesaje : "Pedido Eliminado"});
    }); 
};


// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allPedido,
    showPedido,
    storePedido,
    updatePedido,
    destroyPedido
};
