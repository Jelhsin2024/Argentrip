// Definición de URL
const url = 'http://192.168.0.5:3000/api/contactos/';

// Capturando tbody
const contenedor = document.getElementById('tbodyId');
let resultados = '';

// Seleccionando el modal
const formContacto = document.querySelector('form');

// Seleccionando input del formulario modal
const numeroPrincipal = document.getElementById('numeroPrincipal');
const numeroSecundario = document.getElementById('numeroSecundario');
const whatsapp = document.getElementById('whatsapp');
const direccion = document.getElementById('direccion');
const direccionMaps = document.getElementById('direccionMaps');
const acercaDe = document.getElementById('acercaDe');
const visibilidad = document.getElementById('visibilidad');

let opcion = '';

// Inicialización del modal con opciones personalizadas (si es necesario)
const modalContacto = new bootstrap.Modal(document.getElementById('modalContacto'), {});

// Función para abrir modal
btnCrear.addEventListener('click', () => {
    // Limpiamos valores del modal
    numeroPrincipal.value = '';
    numeroSecundario.value = '';
    whatsapp.value = '';    
    direccion.value = ''; 
    direccionMaps.value = ''; 
    acercaDe.value = '';
    visibilidad.value = '';
    // Mostramos el modal
    modalContacto.show();
    // Opción para crear en el mismo modal
    opcion = 'crear';
});

// Función para mostrar los contactos
const mostrar = (contactos) => {
    contactos.forEach(contacto => {
        let trasformBooleano="" 
        if(contacto.activo==1){

            trasformBooleano="Habilitado"
        }
        else{
            trasformBooleano="Deshabilitado"
        }

    resultados += `
        <tr>
            <td>${contacto.id}</td>
            <td>
            <iframe src="${contacto.direccionMaps}" width="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                  

            </td>
            <td>${contacto.celular}</td>
            <td>${contacto.celular2}</td>
            <td>${contacto.whatsapp}</td>
            <td>${contacto.direccion}</td>
            <td>${trasformBooleano}</td>            
            <td>${contacto.descripcion}</td> 
            <td class="text-center">
                <a class="btnEditar btn btn-warning">Editar</a>
                <a class="btnBorrar btn btn-danger">Borrar</a>
            </td>
        </tr>
        `;
    });
    // Mostrar el contenido en el contenedor
    contenedor.innerHTML = resultados;
};

// Procedimiento para mostrar
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error));

// Función para crear en el DOM
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};

// Eliminar contacto con el botón borrar y usando alertify
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode;
    const id = fila.firstElementChild.innerHTML;
    
    alertify.confirm("¿Estás seguro de que deseas borrar este contacto?",
        function() {
            fetch(url + id, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(() => location.reload())
            .catch(error => console.log(error));
        },
        function() {
            alertify.error('Cancelado');
        });
});

// Procedimiento para abrir el modal y cargar datos para editar
let idForm = 0;
on(document, 'click', '.btnEditar', async (e) => {
    const fila = e.target.parentNode.parentNode;
    idForm = fila.children[0].innerHTML;
    direccionMaps.value = fila.children[1].innerHTML;
    try {
        const response = await fetch(url + idForm, { method: 'GET' });
        if (!response.ok) {
            throw new Error("Error al obtener el contacto");
        }

        const contacto = await response.json();
        numeroPrincipal.value = contacto.celular;
        numeroSecundario.value = contacto.celular2;
        whatsapp.value = contacto.whatsapp;
        direccion.value = contacto.direccion;
        
        acercaDe.value = contacto.descripcion;
        visibilidad.value = contacto.activo;
        opcion = 'editar';
        modalContacto.show();
    } catch (error) {
        console.error("Error:", error);
    }
});

// Guardar o editar el contacto en el backend
formContacto.addEventListener('submit', (e) => {
    e.preventDefault();


// Expresión regular para extraer el valor del src
let srcMatch = direccionMaps.value.match(/src="([^"]*)"/);

// Verificar si encontró un resultado y guardar el src
let src = srcMatch ? srcMatch[1] : null;

// Mostrar el resultado
console.log(src);

    // Crear objeto de datos para enviar en JSON
    const data = {
        celular: numeroPrincipal.value,
        celular2: numeroSecundario.value,
        whatsapp: whatsapp.value,
        direccion: direccion.value,
        direccionMaps: src,
        descripcion: acercaDe.value,
        activo: visibilidad.value
    };

    const metodo = opcion === 'crear' ? 'POST' : 'PUT';
    const endpoint = opcion === 'crear' ? url : url + idForm;

    fetch(endpoint, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        mostrar([data]);
        modalContacto.hide();
        location.reload(); // Recargar la página después de crear o editar
    })
    .catch(error => console.log(error));
});
