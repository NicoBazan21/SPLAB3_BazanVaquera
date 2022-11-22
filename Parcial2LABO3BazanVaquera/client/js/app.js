import {crearTabla} from "./tabla.js";
import {validarPrecio,validarTexto} from "./validaciones.js";
import {ObtenerUltimoID, Anuncio_Mascota} from "./anuncios.js";
import {getAnuncios, createAnuncios, updateAnuncios, deleteAnuncios} from "./fetch.js";

const url = "http://localhost:3000/anuncios";

const spinner = document.createElement("i");
spinner.classList = `fa fa-spinner spinner`;

const divTabla = document.getElementById("divTabla");

const $formAnuncios = document.querySelector("form");

const $contenedorChkBox = document.getElementById('contenedorChkBox');

const $btnEliminar = $formAnuncios.lastElementChild;

const $btnCancelar = $btnEliminar.previousElementSibling;

const $filtros = document.getElementById('filtros');

let anuncios;
actualizarTabla();


$filtros.addEventListener('change', (e)=>
{
    const emisor = e.target;

    let lista;

    switch(emisor.value)
    {
        case "Gato":
            lista = anuncios.filter(v=>v.animal === "Gato");
            break;
        case "Perro":
            lista = anuncios.filter(v=>v.animal === "Perro");
            break;
        case "Vacunados":
            lista = anuncios.filter(v=>v.vacuna === "Si");
            break;
        case "Sin vacunar":
            lista = anuncios.filter(v=>v.vacuna === "No");
            break;
        default:
            lista = anuncios;
            break;
    }

    limpiarTabla(divTabla, crearTabla(lista));
});


$contenedorChkBox.addEventListener("click", (event) => cambiarColumnas(event), false);

const cambiarColumnas = (event) => {

    const emisor = event.target;

    if(emisor.matches('input'))
    {
        if(emisor.checked == false)
        {
            switch(emisor.id)
            {
                case 'cbTitulo':
                    ocultar(0);
                    break;
                case 'cbAnimal':
                    ocultar(1);
                    break;
                case 'cbDescripcion':
                    ocultar(2);
                    break;
                case 'cbPrecio':
                    ocultar(3);
                    break;
                case 'cbRaza':
                    ocultar(4);
                    break;
                case 'cbNacimiento':
                    ocultar(5);
                    break;
                case 'cbVacuna':
                    ocultar(6);
                    break;
            }
        }
        else
        {
            switch(emisor.id)
            {
                case 'cbTitulo':
                    mostarar(0);
                    break;
                case 'cbAnimal':
                    mostarar(1);
                    break;
                case 'cbDescripcion':
                    mostarar(2);
                    break;
                case 'cbPrecio':
                    mostarar(3);
                    break;
                case 'cbRaza':
                    mostarar(4);
                    break;
                case 'cbNacimiento':
                    mostarar(5);
                    break;
                case 'cbVacuna':
                    mostarar(6);
                    break;
            }
        }
    }

}

function ocultar(fila)
{
    try
    {
        
        for(let i = 0; i <= ObtenerUltimoID(anuncios); i++)
        {
            let ocultarFila = divTabla.firstChild.rows[i].cells;
            ocultarFila[fila].style.display = 'none';
        }
    }
    catch(err)
    {
        console.log("No hay mas columnas");
    }
}


let bot = false;

añadirValidaciones($formAnuncios.children[0].children);

function limpiarTabla(div, tabla)
{
    while(divTabla.hasChildNodes())
    {
        divTabla.removeChild(divTabla.firstChild);
    }
    div.appendChild(tabla);
}

async function actualizarTabla()
{
    try
    {
        $formAnuncios.appendChild(spinner);

        let data = await getAnuncios();
        limpiarTabla(divTabla, crearTabla(data));
        anuncios = data;
    }
    catch(error)
    {
        console.error(error);
    }
    finally
    {
        $formAnuncios.removeChild(spinner);
    }
}

let envio;

function mostarar(fila)
{
    try
    {
        for(let i = 0; i <= ObtenerUltimoID(anuncios); i++)
        {
            let mostrarFila = divTabla.firstChild.rows[i].cells;
            mostrarFila[fila].style.removeProperty("display");
        }
    }
    catch(err)
    {
        console.log("No hay mas columnas");
    }
}

divTabla.addEventListener("click", (e)=>
{
    const emisor = e.target;

    if(emisor.matches("tbody tr td"))
    {
        let id = emisor.parentElement.dataset.id;
        envio = id;

        const anuncio = anuncios[id-1];
                
        const fieldset = $formAnuncios.children[0].children;

        for (const iterator of fieldset) 
        {
            iterator.setAttribute("data-ok","ok");
            switch(iterator.getAttribute("name"))
            {
                case "titulo":
                    iterator.value = anuncio.titulo;
                    break;
                case "animal":
                    if(anuncio.animal == "Perro" && iterator.getAttribute("id") == "radioAnimalP")
                    {
                        iterator.nextElementSibling.removeAttribute("checked");
                        iterator.setAttribute("checked", true);
                    }
                    else if(anuncio.animal == "Gato" && iterator.getAttribute("id") == "radioAnimalG")
                    {
                        iterator.previousElementSibling.removeAttribute("checked");
                        iterator.setAttribute("checked", true);
                    }
                    break;
                case "descripcion":
                    iterator.value = anuncio.descripcion;
                    break;
                case "precio":
                    iterator.value = anuncio.precio;
                    break;
                case "raza":
                    iterator.value = anuncio.raza;
                    break;
                case "nacimiento":
                    iterator.value = anuncio.nacimiento;
                    break;
                case "vacuna":
                    iterator.value = anuncio.vacuna;
                    break;
            }
        }
        bot = true;
        cambiarBotones(bot);
        console.log(anuncio);
    }
});

function cambiarBotones(bool)
{
    const botonG = $formAnuncios.children[2];
    const botonC = $formAnuncios.children[3];
    const botonE = $formAnuncios.children[4];

    if(bool)
    {
        botonG.textContent = "";
        botonG.insertAdjacentHTML("afterbegin",`<i class="fa-brands fa-modx"></i> Modificar`);
        botonE.classList.remove("invisible");
        botonC.classList.remove("invisible");

    }
    else
    {
        botonG.textContent = "";
        botonG.insertAdjacentHTML("afterbegin", `<i class="fa-solid fa-floppy-disk"></i>
        Guardar`);
        botonE.classList.add("invisible");
        botonC.classList.add("invisible");
    }
}

$formAnuncios.addEventListener("submit", async (e) =>
{
    e.preventDefault();
    const {titulo,animal,descripcion,precio,raza,nacimiento,vacuna} = e.target;

    console.log(camposOk($formAnuncios.children[0].children));
    if(camposOk($formAnuncios.children[0].children))
    {
        try
        {
            $formAnuncios.appendChild(spinner);
            if(bot)
            {
                const anuncio = new Anuncio_Mascota(envio,
                titulo.value,
                animal.value,
                descripcion.value,
                precio.value,
                raza.value,
                nacimiento.value,
                vacuna.value);

                updateAnuncios(anuncio);
            }
            else
            {
                const anuncio = new Anuncio_Mascota(ObtenerUltimoID(anuncios) + 1,
                titulo.value,
                animal.value,
                descripcion.value,
                precio.value,
                raza.value,
                nacimiento.value,
                vacuna.value);

                anuncios.push(anuncio);

                createAnuncios(anuncio);
            }
        }
        catch(error)
        {
            console.error("Error al crear o modificar");
        }
        finally
        {
            $formAnuncios.appendChild(spinner);
        }
    }
    bot = false;
    cambiarBotones(bot);
});

function camposOk(padre)
{
    for (const iterator of padre) 
    {
        if(iterator.matches("input") && iterator.matches("[type=text]"))
        {
            if(!iterator.hasAttribute("data-ok"))
            {
                return false;
            }
        }
    }
    return true;
}

function camposNoOk(padre)
{
    for (const iterator of padre) 
    {
        if(iterator.matches("input") && iterator.matches("[type=text]"))
        {
            iterator.removeAttribute("data-ok");
        }
    }
}

function añadirValidaciones(padre)
{
    for (const iterator of padre) 
    {
        switch(iterator.getAttribute("name"))
        {
            case "precio":
                iterator.addEventListener("blur", validarPrecio);
                break;
            case "raza":
                iterator.addEventListener("blur", validarTexto);
                break;
            case "titulo":
                iterator.addEventListener("blur", validarTexto);
                break;
            case "descripcion":
                iterator.addEventListener("blur", validarTexto);
                break;
        }
    }
}


$btnEliminar.addEventListener("click", (e) => 
{
    e.preventDefault();
    
    deleteAnuncios(envio);
});

$btnCancelar.addEventListener("click", (e) => 
{
    camposNoOk($formAnuncios.children[0].children);
    bot = false;
    cambiarBotones(bot);
});
