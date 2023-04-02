const fecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter"); //Enter nomas

const check = 'bi-check-circle';
const uncheck = 'bi-circle';
const lineThrough = 'cancelado';
let id;

let LIST;



//Funcion fecha:

const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-ES',{weekday: "long", year: "numeric", month: "long", day: "numeric"})



//Funcion agregar tarea:

function tarea () {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre:tarea,
            id:id,
            realizado:false,
            eliminado:false
        })
        console.log(LIST)
    }
    localStorage.setItem("ANOTADOR", JSON.stringify(LIST))
    input.value = '';
    id++
}

function agregarTarea (tarea,id,realizado,eliminado) {
    
    if(eliminado){return}
    
    const REALIZADO = realizado ?check :uncheck;
    const LINE = realizado ?lineThrough :'';

    const elemento = `
    <li id="elemento">                
        <i data="realizado" id=${id} class="bi ${REALIZADO}"></i>
        <p class="text ${LINE}">${tarea}</p>
        <i data="eliminado" id=${id} class="bi bi-trash-fill"></i>
    </li>
    `

    lista.insertAdjacentHTML('beforeend',elemento)
}

botonEnter.addEventListener('click', tarea)



//Tecla "ENTER":
document.addEventListener('keyup', function(e) {
    if(e.key === 'Enter') {
        tarea();
    }
})



// Funciones de eliminado y realizado

function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado? false: true
    console.log(LIST)
}

function tareaEliminada (element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
}

lista.addEventListener('click', function(e) {
    const element = e.target
    const elementData = element.attributes.data.value
    // console.log(element)
    // console.log(element.attributes)
    // console.log(element.attributes.data)
    // console.log(element.attributes.data.value)
    // console.log(elementData)

    if(elementData === 'realizado') {
        tareaRealizada(element)
    } else if (elementData === 'eliminado') {
        tareaEliminada(element)
    }
    localStorage.setItem("ANOTADOR", JSON.stringify(LIST))
})

let data = localStorage.getItem('ANOTADOR')
if(data) {
    LIST = JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
} else {
    LIST = []
    id = 0
}

function cargarLista(DATA) {
    DATA.forEach(function(i) {
        agregarTarea(i.nombre, i.id, i.realizado, i.eliminado)
    });
}