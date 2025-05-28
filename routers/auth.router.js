/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();
//// AUTH ////
const controller = require("../controllers/auth.controller");

/* MULTER INICIO */
const multer = require ('multer');
const path = require ('path');

// guardamos el archivo y lo reubicamos con otro nombre
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,'src/public/uploads/img_usuarios');//esta carpeta debe existir en el proyecto
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
    limits: {fileSize: 1024*1024*1}
});

/* MULTER FIN */

const authMiddleware = require("../middleware/auth.middleware")
//// METODO POST  ////
router.post('/register', uploads.single('imagen_usuario'), controller.register);

router.post('/login', controller.login);
router.get("/protected", authMiddleware, (req, res) => {
    res.status(200).send(`Hola Usuario ${req.userId}`);
});

// Para todos los productos
router.get('/', controller.allUsuario);

// Para un producto
router.get('/:id_usuario', controller.showUsuario);

//// METODO POST  ////
/* router.post('/', controller.storeUsuario); */

//// METODO PUT  ////
router.put('/:id_usuario', uploads.single('imagen_usuario'), controller.updateUsuario);

//// METODO DELETE ////
router.delete('/:id_usuario', controller.destroyUsuario);


// EXPORTAR ROUTERS
module.exports = router;
