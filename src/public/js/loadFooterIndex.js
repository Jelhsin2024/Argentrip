/* // loadNav.js
fetch('/pages/admin/footer.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la carga del footer');
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.error('Error al cargar el navbar:', error));
 */

    // URL del footer y API de contactos
const footerUrl = '/pages/admin/footer.html';
const contactosApi = `${API_URL}/contactos`;

// Función para cargar el footer
const cargarFooter = () => {
    fetch(footerUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la carga del footer');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer').innerHTML = data;
            // Después de cargar el footer, llamar a la función para agregar contactos
            cargarContactosEnFooter();
        })
        .catch(error => console.error('Error al cargar el footer:', error));
};

// Función para cargar los contactos en el footer
const cargarContactosEnFooter = () => {
    fetch(contactosApi)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los contactos');
            }
            return response.json();
        })
        .then(contactos => {
            // Filtrar el contacto activo
            const contactoActivo = contactos.find(contacto => parseInt(contacto.activo) === 1);
            if (contactoActivo) {
                // Actualizar dinámicamente los datos en el footer
                const footerElement = document.getElementById('datosContacto');
                footerElement.innerHTML += `
                        <h6 class="text-uppercase mb-4 font-weight-bold">Contactos</h6>

                        <p><i class="fa fa-whatsapp"></i> WhatsApp: +54 9 ${contactoActivo.whatsapp} </p>
                        
                        <p><i class="fa fa-phone"></i> Teléfono: +54 9 ${contactoActivo.celular}</p>
                        <p><i class="fa fa-phone"></i> Teléfono 2: +54 9 ${contactoActivo.celular2}</p>
                        <p><i class="fas fa-home mr-3"></i> ${contactoActivo.direccion}</p>

                `;
                // Actualizar dinámicamente los datos en el footer
                const direccionMaps = document.getElementById('direccionMaps');
                direccionMaps.innerHTML += `
                        <h6 class="text-uppercase mb-4 font-weight-bold">Maps</h6>
                        <iframe class="col-sm-12 col-md-12 col-lg-12 col-xl-12 mx-auto mt-3" src="${contactoActivo.direccionMaps}" title="Mapa de Restaurante LIO SAN"
 width="340"  height="220"style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
 
                `;

                // Actualizar dinámicamente los datos en el footer
                const acerca = document.getElementById('acerca');
                acerca.innerHTML += `
                        <h6 class="text-uppercase mb-4 font-weight-bold">
                        Argentrip
                        </h6>
                        <p>
                        ${contactoActivo.descripcion}
                        </p>
                `;
            }
        })
        .catch(error => console.error('Error al cargar los contactos en el footer:', error));
};

// Llamar a la función para cargar el footer
cargarFooter();
