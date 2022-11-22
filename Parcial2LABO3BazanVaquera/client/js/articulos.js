import {getAnuncios} from "./fetch.js";
const url = "http://localhost:3000/anuncios";


getAnuncios().then((data) => 
{
    cargarArticulo(data);
})
.catch((error)=>
{
    console.error(error);
});


function cargarArticulo(data)
{
    const articulo = document.getElementById("mostrarAnuncios");
    const row = document.createElement("div");
    row.className = "row pt-3";

    data.forEach(anuncio => 
        {
            row.appendChild(crearArticuloBoots(anuncio));
        });
    articulo.appendChild(row);
}

function crearArticuloBoots(anuncio)
{

    const col = document.createElement("div");
    col.className = "col ";

    const card = document.createElement("div");
    card.className = "card text-center rounded-pill";

    const cabecera = document.createElement("div");
    cabecera.className = "card-header  rounded-pill";

    const spanCabecera = document.createElement("span");
    spanCabecera.textContent = anuncio.titulo;
    cabecera.appendChild(spanCabecera);

    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body align-items-center ";

    const footer = document.createElement("div");
    const raza = document.createElement("p");
    const animal = document.createElement("p");
    const vacunado = document.createElement("p");
    const razaIm = document.createElement("img");
    const nacimiento = document.createElement("img");
    const vacunadoIm = document.createElement("img");
    raza.className = ("caracteristicas");
    animal.className = ("caracteristicas");
    vacunado.className = ("caracteristicas");
    razaIm.setAttribute("src", "./imagenes/raza.png");
    nacimiento.setAttribute("src", "./imagenes/nacimiento.png");
    vacunadoIm.setAttribute("src", "./imagenes/vacuna.png");
    raza.textContent =" " + anuncio.raza + " ";
    animal.textContent = " "+ anuncio.animal + " ";
    vacunado.textContent = " " + anuncio.vacuna;

    const array = [razaIm,raza,nacimiento,animal,vacunadoIm,vacunado];

    const hijoCuerpoDos = document.createElement("div");
    hijoCuerpoDos.className = "card-text";
    
    const desc =  document.createElement("p");
    desc.classList.add("subtitulo");
    desc.textContent = anuncio.descripcion;
    const salto = document.createElement('br');

    const p = document.createElement("p");
    p.classList.add("precio");
    p.textContent = "$" + anuncio.precio;

    hijoCuerpoDos.appendChild(desc);
    hijoCuerpoDos.appendChild(salto);
    hijoCuerpoDos.appendChild(salto);
    hijoCuerpoDos.appendChild(p);

    //cuerpo.appendChild(hijoCuerpoUno);
    cuerpo.appendChild(hijoCuerpoDos);
    for (const iterator of array) 
    {
        cuerpo.appendChild(iterator);
    }

    cabecera.appendChild(cuerpo);

    card.appendChild(cabecera);
    card.appendChild(footer);

    col.appendChild(card);

    return col;
}   
