// Función para descifrar el token de la cookie
function obtenerIdUsuarioDeCookie() {
    const cookieJWT = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    if (cookieJWT) {
        const token = cookieJWT.split('=')[1];
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar payload del token
        return payload.userId;
    }
    return null;
}

// Función para obtener el rol del usuario desde el backend
async function obtenerRolUsuario() {
    try {
        const userId = obtenerIdUsuarioDeCookie();
        if (!userId) throw new Error("No se encontró el ID del usuario en la cookie.");

        const response = await fetch(`/api/auth/${userId}`); // Endpoint para obtener datos del usuario
        if (!response.ok) throw new Error('Error al obtener el rol del usuario.');

        const data = await response.json();
        return data.rol; // Retorna el rol del usuario desde el backend
    } catch (error) {
        console.error('Error al obtener el rol del usuario:', error);
        return null;
    }
}

// Función para cargar el navbar dinámicamente
async function cargarNav() {
    try {
        const rolUsuario = await obtenerRolUsuario();

        if (!rolUsuario) throw new Error('No se pudo determinar el rol del usuario.');

        // Opciones de navegación basadas en el rol
        const opcionesNav = {
            Cliente: `
                <li class="nav-item">
                    <a class="nav-link active" href="/admin/comentarioscliente">
                        <i class="fa-solid fa-comments"></i>Comentarios Cliente
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="/admin/usuario">
                        <i class="fa-solid fa-user"></i>Perfil
                    </a>
                </li>
            `,

            Vendedor: `
                <li class="nav-item">
                    <a class="nav-link active" href="/admin/paquetes">
                        <i class="fa-solid fa-suitcase"></i>Paquetes
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="/admin/videosportada">
                        <i class="fa-solid fa-film"></i>Videos
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="/admin/usuario">
                        <i class="fa-solid fa-user"></i>Perfil
                    </a>
                </li>
            `,
            Administrador: `
                <li class="nav-item">
                    <a class="nav-link active" href="/admin/paquetes">
                        <i class="fa-solid fa-suitcase"></i>Paquetes
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="/admin/registeradmin">
                        <i class="fa-solid fa-address-card"></i>Usuarios
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="/admin/videosportada">
                        <i class="fa-solid fa-film"></i>Videos Portada
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="/admin/contacto">
                        <i class="fa-regular fa-address-book"></i>Contacto
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="/admin/comentarios">
                        <i class="fa-solid fa-comments"></i>Comentarios Admin
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="/admin/usuario">
                        <i class="fa-solid fa-user"></i>Perfil
                    </a>
                </li>
            `,
        };

        // Obtener el contenido del navbar base
        const response = await fetch('/pages/admin/navAdmin.html');
        if (!response.ok) throw new Error('Error en la carga del navbar.');

        const navHTML = await response.text();
        document.getElementById('navbar-container').innerHTML = navHTML;

        // Insertar las opciones de navegación específicas del rol
        const cargaRol = document.getElementById('cargaRol');
        if (cargaRol) {
            cargaRol.innerHTML = opcionesNav[rolUsuario] || '';
            // Agregar el botón logout al final
            cargaRol.innerHTML += `
                <li class="nav-item">
                    <button id="logout" type="button" class="btn btn-outline-danger">Logout</button>
                </li>
            `;
        }

        // Asignar evento al botón de logout
        const logoutButton = document.getElementById('logout');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                document.location.href = '/login';
            });
        }
    } catch (error) {
        console.error('Error al cargar el navbar:', error);
    }
}

// Llamar a la función para cargar el navbar
cargarNav();
