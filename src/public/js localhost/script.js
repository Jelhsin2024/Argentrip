// tomar el evento cuando presiono el boton crear

// const form = document.querySelector(".form_task");

// form.addEventListener("submit", async (event) => {
//     console.log(event);
// })

// Navegador: El evento se ejecuta de forma natural, pero se va.
// De esta manera no lo podemos tomar

// ----------------------------------------------

// Tomo el control del elemento submit

// const form = document.querySelector(".form_task");

// form.addEventListener("submit", async (event) => {
//     event.preventDefault();
    
//     console.log(event);
// })

//--------------------------------------------------------
// Validar el contenido input
// Verificar los espacios en blanco adelante y al final del texto

// const form = document.querySelector(".form_task");
// const taskInput = document.querySelector("#taskInput");
// // const taskInput = document.getElementById("taskInput"); 

// form.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     //console.log(event);
//     console.log(taskInput.value);
//     console.log(taskInput.value.trim());
    
// })

// -----------------------------------------------------

// Verificar los espacios en blanco adelante y al final del texto
// Vamos a validar que tenga la menos 5 caracteres el texto

// const form = document.querySelector(".form_task");
// const taskInput = document.querySelector("#taskInput");

// form.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const txt_tarea = (taskInput.value.trim());
    
//     if(txt_tarea.length >= 5){
//         console.log(txt_tarea);
//     } else {
//         // alert("El texto de la tarea debe contener al menos 5 caractres");

//         const error = document.querySelector(".error")
//         error.textContent = "El texto de la tarea debe contener al menos 5 caractres";
//         console.log(txt_tarea);

//         // setTimeout(() => {}, 2000) Funcion Callback tiene dos parametros
//         // () => {} este es el primer parametro y los 2000 milisegundos

//         // Pasado un tiempo de espera blanquea el contenido del div donde 
//         // muestra los mensajes de error

//         // setTimeout(() => {
//         //     error.textContent = "";
//         // }, 4000);

//         // Limpiar el mensaje de error cuando el input reciba el focus
//         taskInput.addEventListener("focus", ()=>{
//             error.textContent = "";
//         })
//     }
// })

// Se pueden agregar mas validaciones sobre el input del formulario.
// Esto es solo un ejemplo de lo que podemos hacer

// -------------------------------------------------------------------------
// Otra forma de validar que el input tenga al menos 5 caracteres

// const form = document.querySelector(".form_task");
// const taskInput = document.querySelector("#taskInput");

// form.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const txt_tarea = (taskInput.value.trim());

//     let erroresValidacion = false;
    
//     // if("nickygmail.com".indexOf("@") == -1){
//     //     erroresValidacion = true;
//     //     console.log("Ingreso");
//     // }

//     if(txt_tarea.length < 5){
//         erroresValidacion = true;
//         const error = document.querySelector(".error")
//         error.textContent = "El texto de la tarea debe contener al menos 5 caractres";
//         console.log(txt_tarea);

//         setTimeout(() => {
//             error.textContent = "";
//         }, 4000); // 4.000 milisegundos
//     } 

//     if(!erroresValidacion){
//         console.log(txt_tarea);
//     }
// })

//-------------------------------------------------------
// Cuando ya NO tenemos errores de validacion podes seguir avanzando
// con el codigo. Vamos a generar una array de tareas o lista de tareas

let tasks = []; // crea un array vacio (listas)

const form = document.querySelector(".form_task");
const taskInput = document.querySelector("#taskInput");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const txt_tarea = (taskInput.value.trim());

    let erroresValidacion = false;
    
    if(txt_tarea.length < 5){
        erroresValidacion = true;
        const error = document.querySelector(".error")
        error.textContent = "El texto de la tarea debe contener al menos 5 caractres";
        //console.log(txt_tarea);

        setTimeout(() => {
            error.textContent = "";
        }, 4000); // 4.000 milisegundos
    } 

    if(!erroresValidacion){
       // console.log(txt_tarea);
       const task = {
            id: Date.now(), // nos da la cantidad de milisegundos desde 01/01/1970. Genero un numero unico
            txt_tarea: txt_tarea,
            completa: false,
       };
       
       //console.log(task);

       tasks.push(task); // Agrego la tarea a la lista de tareas
       console.log(tasks);

       taskInput.value = ""; // limpiar el campo de la tarea (input)
       // form.reset(); // limpia el formulario completo
    }

})


