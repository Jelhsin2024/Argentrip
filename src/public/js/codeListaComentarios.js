



const url = `${API_URL}/comentarios/`



const contenedor = document.getElementById('tbodyId')
//funcion para mostrar los usuarios









const mostrar = (platillos)=>{
    let resultados ='';
    let estrellas = ""; 
    platillos.forEach(platillo => {
                        // Crear el objeto de fecha y formatearlo antes de usarlo en la plantilla
                        const fecha = new Date(platillo.fecha_creacion);
                        const opciones = {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        };
                        const fechaLegible = fecha.toLocaleDateString('es-AR', opciones);
                        console.log(platillo.puntuacion)
        if (parseInt(platillo.puntuacion) === 1) {

            estrellas=`
                                <i class="bi star1 filled bi-star-fill" data-value="1"></i>
                                <i class="bi bi-star star1" data-value="2"></i>
                                <i class="bi bi-star star1" data-value="3"></i>
                                <i class="bi bi-star star1" data-value="4"></i>
                                <i class="bi bi-star star1" data-value="5"></i>

            `;
        }
        else if (parseInt(platillo.puntuacion) === 2) {

            estrellas=`
                                <i class="bi star1 filled bi-star-fill" data-value="1"></i>
                                <i class="bi star1 filled bi-star-fill" data-value="2"></i>
                                <i class="bi bi-star star1" data-value="3"></i>
                                <i class="bi bi-star star1" data-value="4"></i>
                                <i class="bi bi-star star1" data-value="5"></i>

            `;
        }

        else if (parseInt(platillo.puntuacion) === 3) {

            estrellas=`
                                <i class="bi star1 filled bi-star-fill" data-value="1"></i>
                                <i class="bi star1 filled bi-star-fill" data-value="2"></i>
                                <i class="bi star1 filled bi-star-fill" data-value="3"></i>
                                <i class="bi bi-star star1" data-value="4"></i>
                                <i class="bi bi-star star1" data-value="5"></i>

            `;
        }
        else if (parseInt(platillo.puntuacion) === 4) {

            estrellas=`
                                <i class="bi star1 filled bi-star-fill" data-value="1"></i>
                                <i class="bi star1 filled bi-star-fill" data-value="2"></i>
                                <i class="bi star1 filled bi-star-fill" data-value="3"></i>
                                <i class="bi star1 filled bi-star-fill" data-value="4"></i>
                                <i class="bi bi-star star1" data-value="5"></i>

            `;
        }
        else if (parseInt(platillo.puntuacion) === 5) {

            estrellas=`
                                <i class="bi star1 filled bi-star-fill" data-value="1"></i>
                                <i class="bi star1 filled bi-star-fill" data-value="2"></i>
                                <i class="bi star1 filled bi-star-fill" data-value="3"></i>
                                <i class="bi star1 filled bi-star-fill" data-value="4"></i>
                                <i class="bi star1 filled bi-star-fill" data-value="5"></i>

            `;
        }
        resultados+=`

        
        <tr>
                    <td>${platillo.id}</td>

            
            <td>${platillo.nombre}</td>
            <td>
                            <div class="star1-container" id="starContainer">
                                <!-- 5 estrellas iniciales -->
                                ${estrellas}
                            </div>
            </td>
            <td>${platillo.comentario}</td>
            <td>${platillo.respuesta}</td>
            <td>${fechaLegible}</td>
            

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


// Evento para el botón "Calificar Platillo"
btnCrear.addEventListener('click', () => {
    window.location.href = "/login";
});