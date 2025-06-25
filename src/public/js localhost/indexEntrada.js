//definicion de url
const url = 'http://localhost:3000/api/platillos/'
//capturando tbody

const contenedorIndex = document.getElementById('entradaIndex');

const contenedorH3 = document.getElementById('h3Entrada');

h3=contenedorH3.innerHTML

let resultadosIndex =''


if (h3=="Entradas"){
//funcion para mostrar los platillos en INDEX

const mostrarIndex = (indexplatillos)=>{
    indexplatillos.forEach(indexplatillo => {
        if(indexplatillo.tipo=="Entrada"){
        resultadosIndex+=`
            <div class="cuadricula_items">
                <div class="cuadricula_caja">
                <div class="imga">
                    <img src="../../public/${indexplatillo.foto}" class="card-img-top" alt="..." onclick="openFulImg(this.src)" >
                </div>
                <h4>${indexplatillo.nombre}</h4>
                <p class="showPlatillo" >${indexplatillo.descripcion}</p>
                <b>$${indexplatillo.precio}</b>
                </div>
            </div>
        `}
    })
    //mostramos con la variable resultado
    contenedorIndex.innerHTML = resultadosIndex
}



//Procedimiento para mostrar
fetch(url)
    .then( response => response.json())
    .then( dataIndex => mostrarIndex(dataIndex))
    .catch( error => console.log(error))

}




