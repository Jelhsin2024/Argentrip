/// CONTROLADORES DEL MODULO ///

// Campos de la tabla platillos
// id
// nombre
// apellido
// email
// password
// direccion
// localidad
// celular
// rol
// imagen_usuario

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.models");
require("dotenv").config();

const express = require("express");

const app = express();
const db = require("../db/db");

///MODULOS EXTRA PARA LOGUIN///
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//Seteamos urlencoded para capturar los datos del formulario

// Register con imagen de usuario(Implementacion prueba)
const register = async (req, res) => {
    let imagenAsubir = "";
    if (req.file) {
        imagenAsubir = req.file.filename;
    }

    const { nombre, apellido, email, password, direccion, localidad, celular, rol } = req.body;
    const rolFinal = rol || "Cliente";

    try {
        // Verificar si el correo ya existe en la base de datos
        const sqlCheckEmail = "SELECT * FROM usuarios WHERE email = ?";
        db.query(sqlCheckEmail, [email], async (error, result) => {
            if (error) {
                return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
            }

            if (result.length > 0) {
                // Si ya existe un usuario con el correo, devolvemos un error
                return res.status(409).json({ error: "ERROR: Ya existe un usuario con este correo" });
            }

            // Si no existe, continuamos con el registro
            const hashPassword = await bcrypt.hash(password, 8);
            const sqlInsert = "INSERT INTO usuarios (nombre, apellido, email, password, direccion, localidad, celular, rol, imagen_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            db.query(sqlInsert, [nombre, apellido, email, hashPassword, direccion, localidad, celular, rolFinal, imagenAsubir], (insertError, insertResult) => {
                if (insertError) {
                    return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
                }

                // Incluye los datos en la respuesta
                const usuario = { ...req.body, id: insertResult.insertId, imagen_usuario: imagenAsubir, rol: rolFinal };
                res.status(201).json(usuario);
            });
        });
    } catch (err) {
        res.status(500).json({ error: "ERROR: Hubo un problema con el servidor" });
    }
};




    const updateUsuario = async (req, res) => {
        let imagenAsubir = req.file ? req.file.filename : ""; // Asigna el nombre de la imagen si existe
        const { id_usuario } = req.params;
        const { nombre, apellido, email, password, direccion, localidad, celular, rol } = req.body;
    
        // Preparar los datos para la consulta
        let sql = "UPDATE usuarios SET nombre = ?, apellido = ?, ";
        let params = [nombre, apellido];
        

        // Agregar `password` si está presente
        if (email) {
            sql += "email = ?, ";
            params.push(email);
        }
        // Agregar `password` si está presente
        if (password) {
            const hashPassword = await bcrypt.hash(password, 8);
            sql += "password = ?, ";
            params.push(hashPassword);
        }
    
        // Agregar `imagen_usuario` solo si hay una nueva imagen
        if (imagenAsubir) {
            sql += "imagen_usuario = ?, ";
            params.push(imagenAsubir);
        }
        // Agregar `rol` solo si hay un rol
        if (rol) {
            sql += "rol = ?, ";
            params.push(rol);
        }
    
        // Continuar con el resto de los campos
        sql += "direccion = ?, localidad = ?, celular = ? WHERE id = ?";
        params.push(direccion, localidad, celular, id_usuario);
    
        // Ejecutar la consulta
        db.query(sql, params, (error, result) => {
            if (error) {
                return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "ERROR: El usuario a modificar no existe" });
            }
    
            // Devolver los datos actualizados
            const usuario = { ...req.body, imagen_usuario: imagenAsubir || undefined, id_usuario };
            res.json(usuario);
        });
    };
    



//ORIGINAL FUNCIONANDO 
const login = async (req, res) => {
    const { email, password } = req.body; // Extraemos email y password del cuerpo de la solicitud
    if (email && password) { // Verificamos que ambos valores estén presentes
        const sql = "SELECT * FROM usuarios WHERE email = ?"; // Consulta SQL para buscar al usuario por email
        db.query(sql, [email], async (error, result) => {
            if (error) {
                console.error("Error en la consulta de la base de datos:", error);
                return res.status(500).json({ message: "Error interno del servidor." });
            }

            if (result.length === 0) {
                console.log("Correo electrónico no registrado.");
                return res.status(401).json({ message: "USUARIO o CONTRASEÑA INCORRECTAS" });
            }

            // Si llegamos aquí, significa que encontramos un usuario
            const usuario = result[0];

            // Comparamos la contraseña
            const contraseñaValida = await bcrypt.compare(password, usuario.password);
            if (!contraseñaValida) {
                console.log("Contraseña incorrecta.");
                return res.status(401).json({ message: "USUARIO o CONTRASEÑA INCORRECTAS" });
            }

            // Si las credenciales son correctas, generamos el token
            const token = jwt.sign({ userId: usuario.id }, process.env.SECRET_KEY, { expiresIn: "10m" });

            console.log("Usuario con ID:" + usuario.id + " se ha logueado correctamente ;)");
            // Agregamos cookie
            const cookieOption = {
/*                 expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000), // Convertimos días en milisegundos */
                expires: new Date(Date.now() + 10 * 60 * 1000), // 1 minuto (60,000 ms)
                path: "/",
                httpOnly: false, // Cambiar a true en producción
                secure: false // Cambiar a true si se usa HTTPS
            };
            res.cookie("jwt", token, cookieOption); // Generamos la cookie
            res.send({ status: "ok", message: "Usuario Logueado", redirect: "/admin/pedidos" });
        });
    } else {
        res.status(400).send("Email y contraseña son obligatorios.");
    }
};


/* const getRolUsuario = (req, res) => {
    try {
        const cookieHeader = req.headers.cookie || ""; // Obtenemos las cookies de la solicitud
        const cookieJWT = cookieHeader.split("; ").find((cookie) => cookie.startsWith("jwt="));

        if (!cookieJWT) {
            return res.status(401).json({ message: "No autorizado: No se encontró el token JWT" });
        }

        const token = cookieJWT.slice(4); // Extraemos el token (eliminando el prefijo "jwt=")
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verificamos el token

        // Consultamos el rol del usuario en la base de datos
        const sql = "SELECT rol FROM usuarios WHERE id = ?";
        db.query(sql, [decoded.userId], (error, result) => {
            if (error || result.length === 0) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            // Devolvemos el rol del usuario
            res.json({ rol: result[0].rol });
        });
    } catch (error) {
        console.error("Error al obtener el rol del usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
 */


const allUsuario = (req, res) => {
    const sql = "SELECT * FROM usuarios";
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor, no se pueden mostrar los usuarios"});
        }
        res.json(rows);
    }); 
};

const showUsuario = (req, res) => {
    const {id_usuario} = req.params;
    const sql = "SELECT * FROM usuarios WHERE id = ?";
    db.query(sql, [id_usuario], (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (rows.length === 0) {
            return res.status(404).send({error: "ERROR: No existe el usuario buscado"});
        }
        res.json(rows[0]); // me muestra el elemento en la posición cero si existe.
    });
};




const destroyUsuario = (req, res) => {
    const {id_usuario} = req.params;
    const sql = "DELETE FROM usuarios WHERE id = ?";
    db.query(sql, [id_usuario], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({error: "ERROR: El usuario a borrar no existe"});
        }
        res.json({mensaje: "Usuario eliminado"});
    });
};

module.exports = {
    register,
    login,
    allUsuario,
    showUsuario,

    updateUsuario,
    destroyUsuario,

};
