export function crearTabla(datos)
{
    if(!Array.isArray(datos))
    {
        return null;
    }

    const tabla = document.createElement("table");
    tabla.appendChild(crearCabecera(datos[0]));
    tabla.appendChild(crearCuerpo(datos));
    tabla.setAttribute('id','tablaCambiar');
    tabla.className = "table table-md table-bordered table-striped table-hover table-warning";
    return tabla;
}

function crearCabecera(indiceCero)
{
    const cabecera = document.createElement("thead");
    const tr = document.createElement("tr");

    cabecera.appendChild(tr);

    for (const key in indiceCero) 
    {
        if(key === "id") continue;
        {
            const th = document.createElement("th");
            
            th.textContent = key;
            tr.appendChild(th);
        }
    }
    cabecera.className = "table-light table-borderless text-center";
    return cabecera;
}


function crearCuerpo(datos)
{
    const cuerpo = document.createElement("tbody");

    datos.forEach(anuncio => 
    {   
        const fila = document.createElement("tr");

        for (const key in anuncio) 
        {
            if(key === "id")    
            {
                fila.setAttribute("data-id", anuncio[key]);
            }
            else
            {
                const celda = document.createElement("td");
                celda.textContent = anuncio[key];
                celda.className = "text-center";
                fila.classList.add("puntero");
                fila.appendChild(celda);
            }
        }

        const filas = cuerpo.children;

        cuerpo.appendChild(fila);
    });

    return cuerpo;
}
