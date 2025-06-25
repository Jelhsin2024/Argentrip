/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

const controller = require("../controllers/videoPortadas.controller");

/* MULTER INICIO */
const multer = require ('multer');
const path = require ('path');

// guardamos el archivo y lo reubicamos con otro nombre
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,'src/public/video');//esta carpeta debe existir en el proyecto
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
        const filetypes = /mp4|mkv|mov|avi/;// indicamos el tipo de archivo que vamos a trabajar
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
router.get('/', controller.allVideoPortada);

// Para un producto
router.get('/:id_videoportada', controller.showVideoPortada);

//// METODO POST  ////
router.post('/',uploads.single('file_videoPortada'), controller.storeVideoPortada);

//// METODO PUT  ////
router.put('/:id_videoportada',uploads.single('file_videoPortada'), controller.updateVideoPortada);

//// METODO DELETE ////
router.delete('/:id_videoportada', controller.destroyVideoPortada);

// EXPORTAR ROUTERS
module.exports = router;

