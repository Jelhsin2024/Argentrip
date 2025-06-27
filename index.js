// index.js

// Cargar dotenv sólo en desarrollo
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');
const path = require("path");

// Middlewares
const { soloAdmin, soloPublico, verificarRol } = require("./middleware/admin.middleware");

const allowedOrigins = [
  'http://localhost:3000',
  'https://caring-love-production.up.railway.app'
];
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Rutas API
app.use('/api/pedidos', require('./routers/pedidos.router'));
app.use('/api/platillos', require('./routers/platillos.router'));
app.use('/api/contactos', require('./routers/contactos.router'));
app.use('/api/videoportadas', require('./routers/videoPortadas.router'));
app.use('/api/comentarios', require('./routers/comentarios.router'));
app.use("/api/auth", require("./routers/auth.router"));

// Rutas estáticas
app.use('/', express.static(path.join(__dirname, 'src/')));
app.use('/pages', express.static(path.join(__dirname, 'src/pages')));
app.use('/plato', express.static(path.join(__dirname, 'src/pages/plato')));
app.use('/images', express.static(path.join(__dirname, 'src/public/images')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/src/pages/vistas/indexPaquetes.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/src/pages/admin/login.html"));
});

// Rutas con verificación de rol
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
app.get("/admin/usuario", verificarRol(["Cliente","Recepcionista", "Vendedor", "Administrador"]), (req, res) => {
  res.sendFile(path.join(__dirname, "src/pages/admin/usuarioAdmin.html"));
});

// Rutas de vistas generales
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

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));