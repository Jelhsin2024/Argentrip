//definicion de url
const urlContacto = "http://localhost:3000/api/contactos";

document.addEventListener("DOMContentLoaded", () => {
    const whatsappContenerdor = document.getElementById("whatsapp");
    const telefonoContenerdor = document.getElementById("telefono");

    // El resto de tu código aquí
    let whatsappIndex = "";
    let telefonoIndex = "";

    const contactoWhatsapp = (contactos) => {
        contactos.forEach((contacto) => {
            if (parseInt(contacto.activo) === 1) {
                whatsappIndex += `
                    <a href="https://api.whatsapp.com/send?phone=+549${contacto.whatsapp}&text=🔥¡Vi%20un%20paquete%20!🔥%20%20Quiero%20hacerte%20una%20reserva 🛫%20%20%20📌"
                    class="float" target="_blank">
                        <i class="fa fa-whatsapp my-float"></i>
                    </a>
                `;
                telefonoIndex += `
                    <a href="tel:+549${contacto.celular}" class="float-tel" target="_blank">
                        <i class="fa fa-solid fa-phone"></i>
                    </a>
                `;
            }
        });

        // Mostramos con la variable resultado
        if (whatsappContenerdor && telefonoContenerdor) {
            whatsappContenerdor.innerHTML = whatsappIndex;
            telefonoContenerdor.innerHTML = telefonoIndex;
        }
    };

    fetch(urlContacto)
        .then((response) => response.json())
        .then((dataIndex) => contactoWhatsapp(dataIndex))
        .catch((error) => console.log(error));
});
