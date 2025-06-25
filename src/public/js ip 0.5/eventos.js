const url = 'http://192.168.0.5:3000/pedidos'


//-------------------------------------------------------
// Agregadas las tareas
// Agregamos ahora los eventos

let tasks = []; // crea un array vacio (listas)

const form = document.querySelector(".form_task"); // Formulario
const taskInput = document.querySelector("#taskInput"); // Input
const taskList = document.querySelector("#taskList"); // Lista de li

// Muestrar las tareas en el HTML
const renderTasks = () => {
    taskList.innerHTML = ""; // Borrar toda la informacion del ul
    tasks.forEach((task) => {
        // Dinamico con el texto ingresado en el input
        const html = ` 
            <li data-id="${task.id}" class="tasks__item">
                <p class="${task.completa && "done"}" class="pline">${task.txt_tarea}</p>


                <div>
                    <i class="bx bx-check"></i>
                    <i class="bx bx-trash"></i>
                </div>
                
            </li>
        `;
        taskList.innerHTML += html;
    })
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const txt_tarea = (taskInput.value.trim());

    let erroresValidacion = false;
    
    if(txt_tarea.length < 5){
        erroresValidacion = true;
        const error = document.querySelector(".error")
        error.textContent = "El texto de la tarea debe contener al menos 5 caractres";

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
       
       tasks.push(task); // Agrego la tarea a la lista de tareas
       console.log(tasks);

       // Almaceno las tareas en el localStorage
       localStorage.setItem("tasks", JSON.stringify(tasks));
       // JSON.stringify(task) transforma un objeto JS que del tipo array
       // en un objeto JSON del tipo string

       taskInput.value = ""; // limpiar el campo de la tarea (input)
       // form.reset(); // limpia el formulario completo

       renderTasks();
    }
})

// Local Storage = Persiste en tiempo y yo tengo que borrarlo
// A mano o tengo hacer una funcion o algo para borrar el LocalStorage
// Sesion Storage - La info vive y existe mientras tengo la pestaña abierta.

// -------------------------------------------------------------
// Agregar eventos a los iconos

// Sirve para ver donde hago click en todo el documento
// document.addEventListener("click", (event) => {
//     console.log(event.target);
// });

// Vamos a ser mas especificos y vamos escuchar el taskList
// taskList.addEventListener("click", (event) => {
//     console.log(event.target);
// });

// Vamos a ser mucho mas especificos y vamos escuchar el taskList 
// dentro de este la classList
// taskList.addEventListener("click", (event) => {
//     console.log(event.target.classList);
// });

// Seguimos profundizando para ver si contiene el elemento ("bx-check")
// taskList.addEventListener("click", (event) => {
//     console.log(event.target.classList.contains("bx-check"));
// });

// Si estoy haciendo click en check esa tarea debo marcarla como completa
// Como la identifico? Con el data-id que se agrego en la construccion del html

// Aca quiero obtener el li
taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("bx-check")){
        // console.log(event.target.closest("li"));
        // closest va a buscar el primer contenedor que coincida con li
        // y lo va a traer.
        // Una vez identificado lo guardo en una variable
        
        const id = event.target.closest("li").dataset.id;
        // para que hago esto ?
        // lo hago porque tenemos un array con elementos
        // y deseo encontrar el elemento al que le hice click
        
        const task = tasks.find((task) => task.id == id);
        // en cada tarea va a buscar si el id es igual al elemento que se hizo click
        // console.log(task);

        // Vamos a cambiar el estado de la tarea
        task.completa = !task.completa;
        console.log(task);

        renderTasks();

        // El problema de ejecutar el renderTasks() es que me carga 
        // la lista nuevamente

        event.target.closest("li").querySelector("p").classList.toggle("done");
        // de la tarea que hice el click, busca el contenedor que tiene el objeto li con el closest("li")
        // a partir de ahi con el querySelector("p") busca el primer parrafo "p"
        // y de la lista de clases de ese parrafo ("classList") hace un toggle("done")
        // que hace el toggle? va a quitar o agregar la clase done.

        // ESTO ES MAS OPTIMO QUE RENDERIZAR TODA LA LISTA

        // Pero si recargo la pagina las tareas pasan a estar incompletas.
        // Porque el localStorage no se actualizo

        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // -------------------------------------------
    // BORRAR UNA TAREA

    if(event.target.classList.contains("bx-trash")){
        const id = event.target.closest("li").dataset.id;
        const taskIndex = tasks.findIndex((task)=> task.id == id);

        tasks.splice(taskIndex, 1);
        // splice es una funcion que me permite manipular en JS los arrays
        // puedo añadir, eliminar o reemplazar elementos de un array en una 
        // posicion especifica
        // splice(taskIndex, 1). le paso dos parametros a la funcion
        // taskIndex es el que contiene el indice del elemento a manipular
        // 1 indica la cantidad de elementos a eliminar en este caso.

        localStorage.setItem("tasks", JSON.stringify(tasks));
        event.target.closest("li").remove();

    }
});

// Recupero lo almacenado en localStorage
document.addEventListener("DOMContentLoaded", () => {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // uso OR || para agregar una lista vacia sino tengo informacion almacenada
    // en localStorage.

    // JSON.parse()
    // transforma un objeto JSON del tipo string en un objeto
    // JS del tipo array

    renderTasks();
});
