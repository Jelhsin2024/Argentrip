/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

const controller = require("../controllers/platillos.controller");

/* MULTER INICIO */
const multer = require ('multer');
const path = require ('path');

// guardamos el archivo y lo reubicamos con otro nombre
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,'src/public/uploads');//esta carpeta debe existir en el proyecto
    },
    filename: (req, file, cb)=> {
        cb(null, Date.now()+path.extname(file.originalname));
    }
})

// ahora lo enviamos al body
const uploads = multer({
    storage,
    fileFilter:(req,file,cb)=>{
        console.log(file)
        const filetypes = /jpg|jpeg|png|webp/;// indicamos el tipo de archivo que vamos a trabajar
        const mimetype = filetypes.test(file.mimetype);//
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        if (mimetype && path.extname){//comprobamos si es el archivo que deseamos
            return cb (null,true);
        };
        cb("El timpo de archivo es soportado, pone bien!!!") 
    },
    limits: {fileSize: 1024*1024*1000}
});

/* MULTER FIN */
// Para todos los productos
router.get('/', controller.allPlatillo);

// Para un producto
router.get('/:id_platillo', controller.showPlatillo);

//// METODO POST  ////
router.post('/',uploads.single('foto'), controller.storePlatillo);

//// METODO PUT  ////
router.put('/:id_platillo', uploads.single('foto'), controller.updatePlatillo);

//// METODO DELETE ////
router.delete('/:id_platillo', controller.destroyPlatillo);

// EXPORTAR ROUTERS
module.exports = router;

