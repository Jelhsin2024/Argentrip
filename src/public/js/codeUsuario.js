//definicion de url
const url = "http://192.168.0.5:3000/api/auth/";




// Agrega un evento para detectar cambios en el input (cuando se selecciona un archivo del modal)




//funcion para mostrar los usuarios

function obtenerIdUsuarioDeCookie() {
    const cookieJWT = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    if (cookieJWT) {
        const token = cookieJWT.split('=')[1];
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar payload del token
        return payload.userId;
    }
    return null;
}

let archivoSeleccionado = null;


const userId = obtenerIdUsuarioDeCookie();
console.log(userId)
const mostrar = (registros) => {
    resultados = ""; // Limpia antes de añadir nuevos resultados
    resultadosEditar= "";
    registros.forEach((registro) => {
        if(registro.id==userId){
        resultados += `


            <li class="mb-3 pl-4" >
                <span class="position-absolute"><i class="fa-regular fa-user"></i></i></span>
                <!-- Aqui va el nombre -->
                 Nombre: ${registro.nombre}
            </li>
            <li class="mb-3 pl-4" >
                <span class="position-absolute" ><i class="fa-solid fa-signature"></i></span>
                <!-- Aqui va el Apeelido -->
                Apellido: ${registro.apellido}
            </li>
            <li class="mb-3 pl-4" >
                <span class="position-absolute" ><i class="fa-solid fa-envelope"></i></span>
                <!-- Aqui va el Apeelido -->
                Correo: ${registro.email}
            </li>
            <li class="mb-3 pl-4">
                <span class="position-absolute"><i class="fa-solid fa-map-location-dot"></i></span>
                Dirección: ${registro.direccion}
            </li>
            <li class="mb-3 pl-4">
                <span class="position-absolute"><i class="fas fa-map-marker-alt"></i></span>
                Localidad: ${registro.localidad}
            </li>
            <li class="mb-3 pl-4">
                <span class="position-absolute"><i class="fa-solid fa-mobile-screen-button"></i></span>
                Celular: ${registro.celular}
            </li>

            <!-- Ingreso de foto y muestra de foto cargada -->
            <div class="mb-3">
                <div class="mb-3">
                <span class="position-absolute"><i class="fa-solid fa-camera-retro"></i></i></span>
                
                </di>
                <img class="img-thumbnail img-fluid" id="imgModalRegister" src="../../public/uploads/img_usuarios/${registro.imagen_usuario || '../../public/default-image.jpg'}" alt=""
                    width="150px">
            </div>
        `;


        resultadosEditar += `
        <div class="col-sm-6 mb-3">
        <div class="form-group">
            <label class="required-field" for="firstName">Nombre</label>
            <input type="text" class="form-control" id="firstName" name="firstName"
                placeholder="Edite su nombre" value="${registro.nombre}">
        </div>
    </div>

    <div class="col-sm-6 mb-3">
        <div class="form-group">
            <label for="lastName">Apellido</label>
            <input type="text" class="form-control" id="lastName" name="lastName"
                placeholder="Edite su Apellido" value="${registro.apellido}">
        </div>
    </div>


    <div class="col-sm-6 mb-3">
        <div class="form-group"></div>
        <label for="direccionRegister" class="required-field">Dirección</label>
        <input type="text" class="form-control" id="address"
            placeholder="Edite su Domicilio" name="direccionRegister" value="${registro.direccion}">
    </div>
    <div class="col-md-4">
        <label for="localidadUsuario" class="required-field">Localidad</label>
        <select class="form-select " id="localidadUsuario" name="localidadUsuario" value="${registro.localidad}">
            <option>Sarandí</option>
            <option>Wilde</option>
            <option>Quilmes</option>
            <option>Avellaneda</option>
        </select>
    </div>

    <div class="col-sm-6 mb-3">
        <div class="form-group"></div>
        <label for="phone" class="required-field">Celular</label>
        <input type="text" class="form-control" id="phone"
            placeholder="Edite su Celular" name="phone" value="${registro.celular}">
    </div>
                <div class="col-sm-8 mb-6">
                    <label for="foto" class="required-field">Foto</label>
                    <input type="file" class="form-control" id="fotoRegister" 
                        aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                </div>
      `;
        datosActuales.innerHTML = resultados;
        datosEditar.innerHTML = resultadosEditar;
        const fotoRegister = document.getElementById("fotoRegister");
        if (fotoRegister) {
            fotoRegister.addEventListener('change', (event) => {
                archivoSeleccionado = event.target.files[0]; // Guardar el archivo seleccionado
                console.log("Archivo seleccionado:", archivoSeleccionado);
            });
        }
        }
    });

    
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

//capturando ul de datos actuales
const datosActuales = document.getElementById("datosActuales");
const datosEditar = document.getElementById("datosEditar");

//Capturamos el form de editar perfil
const editarPerfil = document.getElementById("editarPerfil");
//seleccionando input del formulario modal
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const localidadUsuario = document.getElementById("localidadUsuario");
const phone = document.getElementById("phone");

//Variable paga guardar o editar segun fuera el caso jejeje
let opcion = "";




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




editarPerfil.addEventListener("submit", (e) => {
    e.preventDefault();


    // Captura los inputs dinámicamente después de insertarlos en el DOM
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const address = document.getElementById("address");
    const localidadUsuario = document.getElementById("localidadUsuario");
    const phone = document.getElementById("phone");

    // Verifica si los elementos existen antes de acceder a sus valores
    if (!firstName || !lastName || !address || !localidadUsuario || !phone) {
        console.error("No se encontraron los elementos del formulario.");
        return;
    }

    console.log("Nombre:", firstName.value);
    console.log("Apellido:", lastName.value);

    const formData = new FormData();
    formData.append('nombre', firstName.value);
    formData.append('apellido', lastName.value);
    formData.append('direccion', address.value);
    formData.append('localidad', localidadUsuario.value);
    formData.append('celular', phone.value);

    if (archivoSeleccionado) {
        formData.append('imagen_usuario', archivoSeleccionado);
    }

    fetch(url + userId, {
        method: 'PUT',
        body: formData,
    })
        .then(response => response.json())
        .then(() => {
            alertify.success("Usuario editado con éxito");
            setTimeout(() => location.reload(), 3000);
        })
        .catch(error => console.error("Error al editar el usuario:", error));
});
