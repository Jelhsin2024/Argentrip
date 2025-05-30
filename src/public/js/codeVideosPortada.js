//definicion de url
const url = 'http://192.168.0.186:3000/api/videoportadas/'


//capturando tbody
const contenedor = document.getElementById('tbodyId')
let resultados =''


//seleccionamos el modal
const formVideoPortada = document.querySelector('form')


//seleccionando input del formulario modal
const nombreVideo = document.getElementById('nombreVideo')
const descripcionVideo = document.getElementById('descripcionVideo')
const video = document.getElementById('video')//video que se busca desde el servidor.
const videoModal = document.getElementById('videoModal')//Video que se le insertara al modal cuando presione editar, pero cuando guardo no se mostrara
const tipoVideo = document.getElementById('tipoVideo')
let opcion = ''

// Agrega un evento para detectar cambios en el input (cuando se selecciona un archivo)
let archivoSeleccionado = null;
video.addEventListener('change', (event) => {
    archivoSeleccionado = event.target.files[0]; // Accede al archivo
/*     console.log("Archivo seleccionado:", archivoSeleccionado); // Imprime la información del archivo
    if (archivoSeleccionado) {
        console.log("Nombre del archivo:", archivoSeleccionado.name);
        console.log("Tipo de archivo:", archivoSeleccionado.type);
        console.log("Tamaño del archivo:", archivoSeleccionado.size);
    } */
});


// Inicialización del modal con opciones personalizadas (si es necesario)
var modalVideoPortada = new bootstrap.Modal(document.getElementById('modalVideoPortada'), {

});

//funcion para abrir modal
btnCrear.addEventListener('click',()=>{
    //limpiamos valores del modal
    nombreVideo.value = ''
    descripcionVideo.value = ''
    videoModal.src = ''
    video.src = ''
    archivoSeleccionado = null;
    tipoVideo.value = 'Seleciona la portada'
    //mostramos el modal
    modalVideoPortada.show()
    //opcion para editar en el mismo modal
    opcion = 'crear'
})

//funcion para mostrar los platillos

const mostrar = (videoportadas)=>{
    videoportadas.forEach(videoportada => {
        resultados+=`
        <tr>
            <td>${videoportada.id}</td>
            <td>
                <video class="img-thumbnail img-fluid" src="../../public/video/${videoportada.file_videoPortada}" id="videoModal" width="150px" autoplay muted loop></video>
            </td>
            
            <td>${videoportada.nombre_videoPortada}</td>
            <td>${videoportada.descripcion_videoPortada}</td>
            <td>${videoportada.tipo_videoPortada}</td>

            
            
            <td class="text-center">
                
                    <a class="btnEditar btn btn-warning">Editar</a>
                    <a class="btnBorrar btn btn-danger">Borrar</a>
                    
                
            </td>
        </tr>
        `
    })
    //mostramos con la variable resultado
    contenedor.innerHTML = resultados;
}


//Procedimiento para mostrar
fetch(url)
    .then( response => response.json())
    .then( data => mostrar(data))
    .catch( error => console.log(error))


//funcion para crear en en el dom
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//eliminamos con el boton borrar y usamos alertify para mas boneto
on(document, 'click', '.btnBorrar', e => {

    //guardamos en una variable la fila completa en la que se hizo clic con el boton borrar
    const fila = e.target.parentNode.parentNode;
    // guardamos en una variable el id de la fila que capturamos
    const id = fila.firstElementChild.innerHTML;

    
    alertify.confirm("¿Estás seguro de que deseas borrar este video de portada?",
        function(){
            fetch(url+id, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(()=> location.reload())
          //alertify.success('Borrado')
        },
        function(){
        alertify.error('Cancelado')
        })
});

//asignamos los valores de cada platillo a un variable para mostrarlos en el modal al hacer clic en el boton editar
let idForm = 0
let precioForm = 0
    
// Procedimiento para abrir el modal y cargar datos para editar
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode;
    idForm = fila.children[0].innerHTML;

    // Obtén el src de la imagen en la fila actual
    const videoForm = fila.querySelector('video').src; // Captura correctamente el video
    videoModal.src = videoForm;// muestra la imagen en el modal

    // Asigna los valores al formulario
    nombreVideo.value = fila.children[2].innerHTML;
    descripcionVideo.value = fila.children[3].innerHTML;
    tipoVideo.value = fila.children[4].innerHTML;


    // Limpia la selección de archivo
    archivoSeleccionado = null;
    video.value = ''; // Limpia el input de archivo
/*     console.log(imgModal.src+"Muestro tambien el valor de foto value: "+foto.value) */
    opcion = 'editar';
    modalVideoPortada.show();
    
});
    

formVideoPortada.addEventListener('submit', (e) => {
    e.preventDefault();

    // Crea un nuevo objeto FormData
    const formData = new FormData();

    // Añade los datos del formulario al objeto FormData
    formData.append('nombre_videoPortada', nombreVideo.value);
    formData.append('descripcion_videoPortada', descripcionVideo.value);
    formData.append('tipo_videoPortada', tipoVideo.value);


    // Solo añadimos 'foto' al FormData si se seleccionó una nueva imagen
    if (archivoSeleccionado) {
        formData.append('file_videoPortada', archivoSeleccionado); // Añade el archivo al FormData
    } else if (opcion === 'editar' && videoModal.src) {
        // No añadimos el campo 'foto' al FormData si ya hay una imagen y no se seleccionó una nueva
        console.log("Conservando la imagen actual, no se envía ninguna imagen nueva.");
    }

    // En este punto, el `formData` tiene todos los datos excepto `foto` si no se seleccionó una nueva imagen.

    if (opcion === 'crear') {
        // Procedimiento para crear
        fetch(url, {
            method: 'POST',
            body: formData // Envía el FormData
        })
        .then(response => response.json())
        .then(data => {
            mostrar([data]);
            location.reload(); // Recargamos la página después de crear
        })
        .catch(error => console.log(error)); // Manejo de errores
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
        .then(response => location.reload())
            
        /* .then(response => location.reload());  */// Recargamos la página después de editar
    }
});
