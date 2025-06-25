//-------------------------------------------------------
// Agregar las tareas

let tasks = []; // crea un array vacio (listas)

const form = document.querySelector(".form_task"); // Formulario
const taskInput = document.querySelector("#taskInput"); // Input
const taskList = document.querySelector("#taskList"); // Lista de li

// Muestrar las tareas en el HTML

// tasks.forEach(() => []); // callback funcion flecha

const renderTasks = () => {
    taskList.innerHTML = ""; // Borrar toda la informacion del ul
    tasks.forEach((task) => {
        // Dinamico con el texto escrito por codigo
        // const html = ` 
        //     <li class="tasks__item">
        //         <p class="">Tarea 1</p>
        //         <div>
        //         <i class="bx bx-check"></i>
        //         <i class="bx bx-trash"></i>
        //         </div>
        //     </li>
        // `;

        // Dinamico con el texto ingresado en el input
        const html = ` 
            <li class="tasks__item">
                <p class="">${task.txt_tarea}</p>
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

// Recupero lo almacenado en localStorage
document.addEventListener("DOMContentLoaded", () => {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    // JSON.parse()
    // transforma un objeto JSON del tipo string en un objeto
    // JS del tipo array

    renderTasks();
});
