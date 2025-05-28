/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

const controller = require("../controllers/comentarios.controller");


// Para todos los productos
router.get('/', controller.allComentario);

// Para un producto
router.get('/:id_comentario', controller.showComentario);

//// METODO POST  ////
router.post('/', controller.storeComentario);

//// METODO PUT  ////
router.put('/:id_comentario', controller.updateComentario);

//// METODO DELETE ////
router.delete('/:id_comentario', controller.destroyComentario);

// EXPORTAR ROUTERS
module.exports = router;

