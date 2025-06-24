require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');
const path = require("path");
//importamos midilleware
const { soloAdmin, soloPublico } = require("./middleware/admin.middleware");
/* console.log("Tipo de soloAdmin:", typeof soloAdmin); // Debería mostrar "function"
console.log("Tipo de soloPublico:", typeof soloPublico); // Debería mostrar "function" */



// Middleware para manejar cookies
app.use(cookieParser());

// Middleware para habilitar CORS
app.use(cors({
    HEAD,
    origin: '*', // Permite solicitudes desde este origen



    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true // Habilita el envío de cookies
}));


// Middleware para parsear JSON en solicitudes
app.use(express.json());



// Seteamos la carpeta src
// Rutas API
// Ruta para Pedidos
const pedidosRouter = require('./routers/pedidos.router');
app.use('/api/pedidos', pedidosRouter);

// Ruta para Platillos
const platillosRouter = require('./routers/platillos.router');
app.use('/api/platillos', platillosRouter);

// Ruta para Contactos
const contactosRouter = require('./routers/contactos.router');
app.use('/api/contactos', contactosRouter);

// Ruta para edicion de videos de portada
const videosPortadaRouter = require('./routers/videoPortadas.router');
app.use('/api/videoportadas', videosPortadaRouter);

// Ruta para administracion de comentarios
const comentariosRouter = require('./routers/comentarios.router');
app.use('/api/comentarios', comentariosRouter);

// Ruta para inicio de sesion
const usuarioRouter = require("./routers/auth.router")
app.use("/api/auth", usuarioRouter);




/* const __dirname = path.dirname(file) */


//RUTAS ESTATICAS para que los levante el servidor:
// Middleware para servir archivos estáticos en el servidor multi plataforma con el path.join(HTML, CSS, JS, imágenes, etc.)
app.use('/', express.static(path.join(__dirname, 'src/')));

// Ruta estática para servir archivos en la carpeta pages
app.use('/pages', express.static(path.join(__dirname, 'src/pages')));

// Ruta estática para servir archivos en la carpeta admin
/* app.use('/admin', express.static(path.join(__dirname, 'src/pages/admin'))); */

/* app.use('/uploads', express.static(path.join(__dirname, 'src/public/uploads'))); */

// Ruta estática para servir archivos en la carpeta pages
app.use('/plato', express.static(path.join(__dirname, 'src/pages/plato')));

// Ruta estática para servir archivos en la carpeta public
/* app.use('/public', express.static(path.join(__dirname, 'src/public')));
app.use('/css', express.static(path.join(__dirname, 'src/public/css')));
app.use('/images', express.static(path.join(__dirname, 'src/public/images')));
app.use('/js', express.static(path.join(__dirname, 'src/public/js'))); */
app.use('/images', express.static(path.join(__dirname, 'src/public/images')));




// Ruta principal "/" que servirá tu archivo index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/src/pages/vistas/indexPaquetes.html"));
});
//RUTAS ESTATICAS FIN


//Ruta para login general
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "/src/pages/admin/login.html"));
});


//Rutas para el rol de los usuarios:




const { verificarRol } = require("./middleware/admin.middleware");

// Rutas para roles específicos
app.get("/admin/comentarios", verificarRol(["Cliente", "Administrador"]), (req, res) => {
    res.sendFile(path.join(__dirname, "src/pages/admin/comentariosAdmin.html"));
});
app.get("/admin/comentarioscliente", verificarRol(["Cliente"]), (req, res) => {
    res.sendFile(path.join(__dirname, "src/pages/admin/comentariosCliente.html"));
});

app.get("/admin/pedidos", verificarRol(["Mozo", "Recepcionista", "Administrador"]), (req, res) => {
    res.sendFile(path.join(__dirname, "src/pages/admin/pedidosfinal.html"));
});

app.get("/admin/paquetes", verificarRol(["Vendedor", "Administrador"]), (req, res) => {
    res.sendFile(path.join(__dirname, "src/pages/admin/paquetes.html"));
});

app.get("/admin/registeradmin", verificarRol(["Administrador"]), (req, res) => {
    res.sendFile(path.join(__dirname, "src/pages/admin/registerAdmin.html"));
});

app.get("/admin/videosportada", verificarRol(["Vendedor", "Administrador"]), (req, res) => {
    res.sendFile(path.join(__dirname, "src/pages/admin/videosPortada.html"));
});

app.get("/admin/contacto", verificarRol(["Administrador"]), (req, res) => {
    res.sendFile(path.join(__dirname, "src/pages/admin/contactoAdmin.html"));
});

app.get("/admin/usuario", verificarRol(["Cliente","Recepcionista", "Vendedor", "Recepcionista","Administrador"]), (req, res) => {
    res.sendFile(path.join(__dirname, "src/pages/admin/usuarioAdmin.html"));
});


//Rutas de administracion en desarrollo FIIIN

//Rutas estaticas de administracion en desarrollo
app.get("/vistas/vuelos", (req, res) => {
    res.sendFile(path.join(__dirname, "/src/pages/vistas/vuelos.html"));
});


app.get("/vistas/alojamientos", (req, res) => {
    res.sendFile(path.join(__dirname, "/src/pages/vistas/alojamiento.html"));
});
app.get("/vistas/ofertas", (req, res) => {
    res.sendFile(path.join(__dirname, "/src/pages/vistas/ofertas.html"));
});
app.get("/vistas/autos", (req, res) => {
    res.sendFile(path.join(__dirname, "/src/pages/vistas/autos.html"));
});

app.get("/contacto/comentarios", (req, res) => {
    res.sendFile(path.join(__dirname, "/src/pages/vistas/contactoComentarios.html"));
});



//Rutas de administracion en desarrollo FIIIN

// Configura el puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor escuchando en http://192.168.0.186:${PORT}`));

/* console.log((__dirname + '/src/'+"RUTA DIRNAME Y")) */