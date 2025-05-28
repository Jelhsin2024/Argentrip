/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

const controller = require("../controllers/pedidos.controller");

//// METODO GET  /////




// Para todos los productos
router.get('/', controller.allPedido);

// Para un producto
router.get('/:id_pedido', controller.showPedido);

//// METODO POST  ////
router.post('/', controller.storePedido);

//// METODO PUT  ////
router.put('/:id_pedido', controller.updatePedido);

//// METODO DELETE ////
router.delete('/:id_pedido', controller.destroyPedido);

// EXPORTAR ROUTERS
module.exports = router;

