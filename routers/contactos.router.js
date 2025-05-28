/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

const controller = require("../controllers/contactos.controller");

//// METODO GET  /////

// Para todos los productos
router.get('/', controller.allContacto);

// Para un producto
router.get('/:id_contacto', controller.showContacto);

//// METODO POST  ////
router.post('/', controller.storeContacto);

//// METODO PUT  ////
router.put('/:id_contacto', controller.updateContacto);

//// METODO DELETE ////
router.delete('/:id_contacto', controller.destroyContacto);


// EXPORTAR ROUTERS
module.exports = router;

