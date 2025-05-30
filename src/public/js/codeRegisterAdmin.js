//definicion de url
const url = "http://192.168.0.186:3000/api/auth/";


//capturando tbody para mostrar los usuarios
const contenedor = document.getElementById("tbodyRegisterAdmin");

let resultados = "";

// Capturamos el modal
var modalRegistro = new bootstrap.Modal(
    document.getElementById("modalRegistro")
);

//Capturamos el form modal
const formRegister = document.getElementById("formModalId");
//seleccionando input del formulario modal
const emailRegister = document.getElementById("emailRegister");
const passwordRegister = document.getElementById("passwordRegister");
const nombreRegister = document.getElementById("nombreRegister");
const apellidoRegister = document.getElementById("apellidoRegister");
const direccionRegister = document.getElementById("direccionRegister");
const localidadRegister = document.getElementById("localidadRegister");
const rolRegister = document.getElementById("rolRegister");
const celularRegister = document.getElementById("celularRegister");
const fotoRegister = document.getElementById('fotoRegister')
const imgModalRegister = document.getElementById('imgModalRegister')
//Variable paga guardar o editar segun fuera el caso jejeje
let opcion = "";

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


//funcion para abrir modal

document.addEventListener("DOMContentLoaded", () => {
    const btnRegister = document.getElementById("btnRegister");
    btnRegister.addEventListener("click", () => {
        // Código de tu función para abrir el modal y limpia lo que tiene el modal
        emailRegister.value = "";
        passwordRegister.value = "";
        nombreRegister.value = "";
        apellidoRegister.value = "";
        direccionRegister.value = "";
        localidadRegister.value = "";
        rolRegister.value = "";
        celularRegister.value = "";
        imgModalRegister.src="";
        archivoSeleccionado = null;
        modalRegistro.show();
        opcion = "crear";
    });
});


//funcion para mostrar los usuarios

const mostrar = (registros) => {
    resultados = ""; // Limpia antes de añadir nuevos resultados
    registros.forEach((registro) => {
        resultados += `
        <tr>
            <td>${registro.id}</td>
            <td>
                <img class="img-thumbnail img-fluid" src="../../public/uploads/img_usuarios/${registro.imagen_usuario || '../../public/default-image.jpg'}" alt="" width="120px">
            </td>
            <td>${registro.nombre}</td>
            <td>${registro.apellido}</td>
            <td>${registro.email}</td>
            <td>${registro.direccion}</td>
            <td>${registro.localidad}</td> 
            <td>${registro.celular}</td>                 
            <td>${registro.rol}</td>
            <td class="text-center">
                <a class="btnEditar btn btn-warning">Editar</a>
                <a class="btnBorrar btn btn-danger">Borrar</a>
            </td>
        </tr>
        `;
    });
    contenedor.innerHTML = resultados;
};


//Procedimiento para mostrar
fetch(url)
    .then((response) => response.json())
    .then((data) => mostrar(data))
    .catch((error) => console.log(error));


//funcion para crear en en el dom
const on = (element, event, selector, handler) => {
    element.addEventListener(event, (e) => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};

// Procedimiento para eliminar los usuarios y usamos alertify para mas boneto
on(document, "click", ".btnBorrar", (e) => {
    //guardamos en una variable la fila completa en la que se hizo clic con el boton borrar
    const fila = e.target.parentNode.parentNode;

    // guardamos en una variable el id de la fila que capturamos
    const id = fila.firstElementChild.innerHTML;

    alertify.confirm(
        "¿Estás seguro de que deseas borrar este Usuario?",
        function () {
            fetch(url + id, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then(() => location.reload());
            //alertify.success('Borrado')
        },
        function () {
            alertify.error("Borrado Cancelado");
        }
    );
});

//Procedimiento para editar
//capturamos cada valor de la fila del usuario que queremos editar y la asignamos a una variable esto cuando se presiona el boton editar.
let idForm = 0;
let precioForm = 0;
on(document, "click", ".btnEditar", (e) => {
    const fila = e.target.parentNode.parentNode;

    //capturamos los datos de la lista
    idForm = fila.children[0].innerHTML;

    // Captura el `src` de la imagen del usuario
    const fotoForm = fila.querySelector('img').src; // Usar fila.querySelector para capturar la imagen correcta
    imgModalRegister.src = fotoForm; // Muestra la imagen en el modal

    const nombreForm = fila.children[2].innerHTML;
    const apellidoForm = fila.children[3].innerHTML;
    const emailForm = fila.children[4].innerHTML;
    const direccionForm = fila.children[5].innerHTML;
    const localidadForm = fila.children[6].innerHTML;
    const celularForm = fila.children[7].innerHTML;
    const rolForm = fila.children[8].innerHTML;


    //asignamos los valores captados en una variable en especifico para luego mostrarlo en el form
    nombreRegister.value = nombreForm;
    apellidoRegister.value = apellidoForm;
    emailRegister.value = emailForm;
    direccionRegister.value = direccionForm;
    localidadRegister.value = localidadForm;
    celularRegister.value = celularForm;
    rolRegister.value = rolForm;

    // Limpia la selección de archivo
    /* archivoSeleccionado = null */; // Asegúrate de que no haya un archivo seleccionado antes de editar
    /* fotoRegister.value = '' */; // Limpia el input de archivo

    opcion = "editar";
    modalRegistro.show();
});


formRegister.addEventListener("submit", (e) => {
    e.preventDefault();

        // Crea un nuevo objeto FormData
        const formData = new FormData();
    
        // Añade los datos del formulario al objeto FormData
        formData.append('nombre', nombreRegister.value);
        formData.append('apellido', apellidoRegister.value);
        formData.append('email', emailRegister.value);
        /* formData.append('password', passwordRegister.value); */
        formData.append('direccion', direccionRegister.value);
        formData.append('localidad', localidadRegister.value);
        formData.append('celular', celularRegister.value);
        formData.append('rol', rolRegister.value);

        // Solo añadimos 'imagen_usuario' al FormData si se seleccionó una nueva imagen
        if (archivoSeleccionado) {
            formData.append('imagen_usuario', archivoSeleccionado); // Añade el archivo al FormData
        } else if (opcion === 'editar' && imgModalRegister.src) {
            // No añadimos el campo 'foto' al FormData si el img.src tiene un valor si tiene un valor si se lo agregamos.
            console.log("Conservando la imagen actual, no se envía ninguna imagen nueva.");
        }

        // Solo añadimos 'password' al FormData si se ingreso una nueva contraseña, si no queda vacia. 
        if (passwordRegister.value) {
            formData.append('password', passwordRegister.value); // Añade el archivo al FormData
        } else if (opcion === 'editar' && passwordRegister.value) {
            // No añadimos el campo 'password' al FormData si el campo se encuentra vacio
            console.log("Conservando la imagen actual, no se envía ninguna imagen nueva.");
        }
    
        if (opcion === 'crear') {
            // Procedimiento para crear
            fetch("http://192.168.0.186:3000/api/auth/register", {
                method: 'POST',
                body: formData // Envía el FormData
            })
            .then((response) => response.json())
            .then(() => {
                alertify.success("Usuario Registrado con éxito");
                setTimeout(() => location.reload(), 3000); // Refresca la página después de 2 segundos
            })
            .catch((error) => console.log(error));
        }
        if (opcion === 'editar') {
            // Procedimiento para editar
            console.log("Muestro que hay en el form data")
            // Itera sobre los valores de formData para mostrarlos en la consola
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }
            fetch(url + idForm, {
                method: 'PUT',
                body: formData // Envía el FormData
            })
            .then(response => response.json())
            .then(() => {
                alertify.success("Usuario editado con éxito");
                setTimeout(() => location.reload(), 3000); // Refresca la página después de 2 segundos
            })         
            /* .then(response => location.reload());  */// Recargamos la página después de editar
        }
    });/* 
        registrarUsuario(); // Llama a la función que ya maneja la creación
    } else if (opcion === "editar") {
        // Coloca aquí tu lógica para edición, si es diferente.
        fetch(url + idForm, {
            method: "PUT",
            body:formData
            })
            .then((response) => response.json())
            .then(() => {
                alertify.success("Usuario editado con éxito");
                setTimeout(() => location.reload(), 2000); // Refresca la página después de 2 segundos
            })
            .catch((error) => console.log(error));
    }

});

async function registrarUsuario() {
    const data = {
        nombre: nombreRegister.value,
        apellido: apellidoRegister.value,
        email: emailRegister.value,
        password: passwordRegister.value,
        direccion: direccionRegister.value,
        localidad: localidadRegister.value,
        celular: celularRegister.value,
        rol: rolRegister.value,
        imagen_usuario:archivoSeleccionado.name
    };

    try {
        const response = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result.hashPassword);
            alertify.success("Usuario registrado con éxito");
            setTimeout(() => location.reload(), 2000);
/*             setTimeout(() => {
                window.location.href = "/platillos.html";
            }, 2000); */
        /* } else {
            const error = await response.json();
            alertify.error(`Error: ${error.message || "No se pudo registrar"}`);
        }
    } catch (error) {
        alertify.error("Error en la conexión");
        console.error("Error en la solicitud", error);
    } */
/* } */
/*  */ 