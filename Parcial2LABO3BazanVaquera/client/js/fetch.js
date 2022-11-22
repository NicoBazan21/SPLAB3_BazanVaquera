const url = "http://localhost:3000/anuncios";

export const getAnuncios = async () =>
{
    return new Promise((resolve,rejected)=>
    {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", ()=>
        {
            if(xhr.readyState == 4)
            {
                if(xhr.status >= 200 && xhr.status < 300)
                {
                    const data = JSON.parse(xhr.responseText);
                    console.log(data);
                    resolve(data);
                }
                else
                {
                    console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
                    rejected("Error al leer las personas");
                }
            }
        });

        xhr.open("GET", url);

        xhr.send();
    });
};

export const createAnuncios = async (persona) =>
{
    console.log("hola afuera del try");
    try
    {
        const res = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(persona),
            });
        if(!res.ok)
        {
            throw new Error(`${res.status}-${res.statusText}`);
        }
        console.log("Hola dentro del try");
    }
    catch(error)
    {
        console.error(error.message);
        console.log("hola falso");
    }
}


export const updateAnuncios = async (persona) =>
{
    try
    {
        await axios(url + "/" + persona.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify(persona),
        });
    }
    catch(error)
    {
        console.error(error.message);
    }
};


export const deleteAnuncios = async (id) => {
  
    try
    {
        const res = await fetch(url + `/${id}`, 
        {
            method: "DELETE",
        });
        if(!res.ok)
        {
            throw new Error(`${res.status}-${res.statusText}`);
        }
    }
    catch(err)
    {
        console.error(err);
    }
};