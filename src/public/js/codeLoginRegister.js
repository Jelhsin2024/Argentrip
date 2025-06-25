// Captura el botón y el campo de la contraseña
const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("passwordLogin");
const toggleIcon = document.getElementById("toggleIcon");

// Agrega un evento de clic al botón
togglePassword.addEventListener("click", () => {
    // Cambia el tipo del campo de contraseña
    const type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;

    // Cambia el ícono del botón
    toggleIcon.classList.toggle("fa-eye");
    toggleIcon.classList.toggle("fa-eye-slash");
});


let resultados =''

// Capturamos el modal para abrir y cerrar
var modalRegistro = new bootstrap.Modal(document.getElementById('modalRegistro'));


//Capturamos el form del modal Registro para abrirlo
const formRegister = document.getElementById('formModalId')
//Capturamos el form login
const formLoginId = document.getElementById('formLoginId')

//Capturamos input del formulario del modal detalle por detalle
const emailRegister = document.getElementById('emailRegister')
const passwordRegister = document.getElementById('passwordRegister')
const nombreRegister = document.getElementById('nombreRegister')
const apellidoRegister = document.getElementById('apellidoRegister')
const direccionRegister = document.getElementById('direccionRegister')
const localidadRegister = document.getElementById('localidadRegister')
const rolRegister = document.getElementById('rolRegister')
const celularRegister = document.getElementById('celularRegister')
const fotoRegister = document.getElementById('fotoRegister')

// Agrega un evento para detectar cambios en el input (cuando se selecciona un archivo del modal)
let archivoSeleccionado = null;
fotoRegister.addEventListener('change', (event) => {
    archivoSeleccionado = event.target.files[0]; // Accede al archivo y lo guarda en la variable archivoSeleccionado
    console.log("Archivo seleccionado:", archivoSeleccionado); // Imprime la información del archivo
/*     if (archivoSeleccionado) {
        console.log("Nombre del archivo:", archivoSeleccionado.name);
        console.log("Tipo de archivo:", archivoSeleccionado.type);
        console.log("Tamaño del archivo:", archivoSeleccionado.size);
    } */
});

//Variable paga guardar o editar segun fuera el caso jejeje
let opcion = ''
//seleccionando input del formulario de inicio de sesin
const emailLogin = document.getElementById('emailLogin')
const passwordLogin = document.getElementById('passwordLogin')


//funcion para abrir modal

document.addEventListener('DOMContentLoaded', () => {
    const btnRegister = document.getElementById('btnRegister');
    btnRegister.addEventListener('click', () => {
        // Código de tu función para abrir el modal
        emailRegister.value = ''
        passwordRegister.value = ''
        nombreRegister.value = ''
        apellidoRegister.value = ''
        direccionRegister.value = ''
        localidadRegister.value = ''
        /* rolRegister.value = '' */
        celularRegister.value = ''
        archivoSeleccionado = null;
        fotoRegister.src=''
        modalRegistro.show()
        opcion = 'crear'
    });
});




//Procedimiento para Iniciar sesion redirigiendo a la pagina de platillos
formLoginId.addEventListener("submit", (e) => {
    e.preventDefault();
    loginUsuario(); // Llama a la función que ya maneja la creación
});

async function loginUsuario() {
    const data = {
        email: emailLogin.value,
        password: passwordLogin.value,
    };

    try {
        console.log(emailLogin.value,passwordLogin.value);
        const response = await fetch("http://192.168.0.5:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),

        });

        if (response.ok) {
            const result = await response.json();
            alertify.success("¡Usuario logueado correctamente!");
            alertify.success("¡Bienvenid@!");
            localStorage.setItem("token", result.token);
            setTimeout(() => {
                window.location.href = "/admin/usuario";
            }, 3500);
        } else {
            const error = await response.json();
            alertify.error(`Error: ${error.message || "No se pudo loguear :( lpm!!!"}`);
        }
    } catch (error) {
        alertify.error("Error en la conexión");
        console.error("Error en la solicitud", error);
    }
}

//FIIIIN Procedimiento para registrar un nuevo usuario desde el login y alertify para confirmacion









//Procedimiento para registrar un nuevo usuario desde el login y alertify para confirmacion
formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    if (opcion === "crear") {
        registrarUsuario(); // Llama a la función que ya maneja la creación
    } 
});

async function registrarUsuario() {
    const formData = new FormData();

    // Añade los datos del formulario al objeto FormData
    formData.append("nombre", nombreRegister.value);
    formData.append("apellido", apellidoRegister.value);
    formData.append("email", emailRegister.value);
    formData.append("password", passwordRegister.value);
    formData.append("direccion", direccionRegister.value);
    formData.append("localidad", localidadRegister.value);
    formData.append("celular", celularRegister.value);
    if (archivoSeleccionado) {
        formData.append("imagen_usuario", archivoSeleccionado); // Añade el archivo al FormData
    }

    try {
        const response = await fetch("http://192.168.0.5:3000/api/auth/register", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            alertify.success("Usuario Registrado con éxito");
            setTimeout(() => location.reload(), 3500);
        } else if (response.status === 409) {
            // Manejar error de correo duplicado
            const error = await response.json();
            alertify.error(error.error || "El correo ya está registrado");
        } else {
            const error = await response.json();
            alertify.error(error.error || "No se pudo registrar el usuario");
        }
    } catch (error) {
        alertify.error("Error en la conexión");
        console.error("Error en la solicitud", error);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    // Detectar si la URL contiene el parámetro `session=expired`
    const urlParams = new URLSearchParams(window.location.search);
    const sessionExpired = urlParams.get("session");

    if (sessionExpired === "expired") {
        alertify.alert("Sesión vencida", "Su sesión ha expirado. Por favor, inicie sesión nuevamente.");
    }
});
