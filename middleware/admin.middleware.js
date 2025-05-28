const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../db/db");

dotenv.config();

// Middleware para verificar el rol del usuario
function verificarRol(rolesPermitidos) {
    return async (req, res, next) => {
        try {
            const cookieHeader = req.headers.cookie || "";
            const cookieJWT = cookieHeader.split("; ").find((cookie) => cookie.startsWith("jwt="));

            if (!cookieJWT) {
                console.log("No se encontró la cookie JWT");
                return res.redirect("/login?session=expired");
            }

            const token = cookieJWT.slice(4);

            jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
                if (error) {
                    if (error.name === "TokenExpiredError") {
                        console.error("Token expirado:", error);
                        return res.redirect("/login?session=expired");
                    }
                    console.error("Error al verificar el token:", error);
                    return res.status(403).json({ message: "Acceso denegado: Token inválido" });
                }

                const sql = "SELECT * FROM usuarios WHERE id = ?";
                db.query(sql, [decoded.userId], (dbError, result) => {
                    if (dbError) {
                        console.error("Error en la consulta de usuario:", dbError);
                        return res.status(500).json({ message: "Error interno del servidor" });
                    }
                    if (result.length === 0) {
                        console.log("Usuario no encontrado");
                        return res.redirect("/login?session=expired");
                    }

                    const usuario = result[0];
                    if (!rolesPermitidos.includes(usuario.rol)) {
                        console.log(`Rol no permitido: ${usuario.rol}`);
                        return res.status(403).json({ message: "Acceso denegado: Rol no autorizado" });
                    }

                    req.usuario = usuario;
                    next();
                });
            });
        } catch (err) {
            console.error("Error inesperado en verificarRol:", err);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    };
}


module.exports = {
    verificarRol,

};
