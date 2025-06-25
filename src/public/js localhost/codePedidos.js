// Definición de la URL
const url = 'http://localhost:3000/api/pedidos/';

// Capturando tbody
const contenedor = document.getElementById('tbodyId');
let resultados = '';

// Seleccionando el modal
const formPedido = document.querySelector('form');

// Seleccionando inputs del formulario modal
const mesaPedido = document.getElementById('mesaPedido');
const platilloTotal = document.getElementById('platilloTotal');
const platilloPedido = document.getElementById('platilloPedido');
const horadePedido = document.getElementById('horadePedido');
const medioPago = document.getElementById('medioPago');

let opcion = '';

// Función para abrir modal
btnCrear.addEventListener('click', () => {
    // Limpiar valores del modal
    mesaPedido.value = '';
    platilloPedido.value = '';
    horadePedido.value = '';
    platilloTotal.value="";
    medioPago.value = '';

    modalPedido.show();
    // Opción para crear en el mismo modal
    opcion = 'crear';
});

// Inicialización del modal con opciones personalizadas (si es necesario)
const modalPedido = new bootstrap.Modal(document.getElementById('modalPedido'), {});

// Función para mostrar pedidos
const mostrar = (pedidos) => {
    let resultados = ''; // Asegurate de inicializar 'resultados' fuera del loop
    pedidos.forEach(pedido => {
        // Crear el objeto de fecha y formatearlo antes de usarlo en la plantilla
        const fecha = new Date(pedido.fecha_hora);
        const opciones = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        const fechaLegible = fecha.toLocaleDateString('es-AR', opciones);

        // Ahora incluimos 'fechaLegible' en la plantilla
        resultados += `
        <tr>
            <td>${pedido.id}</td>
            <td>${pedido.n_mesa}</td>
            <td>${pedido.n_platillo}</td>
            <td>$${pedido.totalPago}</td>
            <td>${fechaLegible}</td>
            <td>${pedido.medio_pago}</td>
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

// Procedimiento para mostrar todos los pedidos
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

// Eliminar con el botón borrar y usar alertify para confirmación
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode;
    const id = fila.firstElementChild.innerHTML;

    alertify.confirm("¿Estás seguro de que deseas borrar este pedido?",
        function () {
            fetch(url + id, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(() => location.reload())
                .catch(error => console.log(error));
        },
        function () {
            alertify.error('Cancelado');
        });
});

// Función para obtener un pedido por ID y cargar los datos en el formulario
on(document, 'click', '.btnEditar', async (e) => {
    const fila = e.target.parentNode.parentNode;
    idForm = fila.children[0].innerHTML;

    try {
        // Obtener el pedido específico
        const response = await fetch(url + idForm, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error("Error al obtener el pedido");
        }

        const pedido = await response.json();

        // Asignar los valores al formulario
        mesaPedido.value = pedido.n_mesa;
        platilloTotal.value = pedido.totalPago;
        platilloPedido.value = pedido.n_platillo;
        horadePedido.value = pedido.fecha_hora.slice(0, 16); // Formatear para datetime-local (YYYY-MM-DDTHH:MM)
        medioPago.value = pedido.medio_pago;

        // Cambiar la opción a editar
        opcion = 'editar';

        // Mostrar el modal para editar
        modalPedido.show();

    } catch (error) {
        console.error("Error:", error);
    }
});

// Enviar los datos del formulario al backend (Crear o Editar)
formPedido.addEventListener('submit', (e) => {
    e.preventDefault();

    // Convertir la fecha y hora seleccionada al formato "YYYY-MM-DD HH:MM:SS"
    const fechaHora = new Date(horadePedido.value);
    const fechaHoraFormateada = `${fechaHora.getFullYear()}-${String(fechaHora.getMonth() + 1).padStart(2, '0')}-${String(fechaHora.getDate()).padStart(2, '0')} ${String(fechaHora.getHours()).padStart(2, '0')}:${String(fechaHora.getMinutes()).padStart(2, '0')}:${String(fechaHora.getSeconds()).padStart(2, '0')}`;

    // Crear el objeto de datos a enviar
    const data = {
        n_mesa: mesaPedido.value,
        totalPago: platilloTotal.value,
        n_platillo: platilloPedido.value,
        fecha_hora: fechaHoraFormateada, // Fecha en el formato adecuado
        medio_pago: medioPago.value
    };

    // Definir el método y la URL según la opción (crear o editar)
    const metodo = opcion === 'crear' ? 'POST' : 'PUT';
    const endpoint = opcion === 'crear' ? url : url + idForm;

    // Enviar la solicitud al backend
    fetch(endpoint, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json' // Indicar que es JSON
        },
        body: JSON.stringify(data) // Convertir el objeto a JSON
    })
        .then(response => response.json())
        .then(data => {
            mostrar([data]);
            modalPedido.hide();
            location.reload(); // Recargar la página después de crear o editar
        })
        .catch(error => console.log(error));
});
