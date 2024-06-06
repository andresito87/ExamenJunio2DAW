// Nombre: Andrés Samuel Podadera González
document.addEventListener("DOMContentLoaded", () => {
  // 1. Obtención de datos.
  let divInfo = document.getElementById("info");
  function obtenerDatosJS(rutaArchivoJson) {
    let imagen = document.createElement("img");
    imagen.src = "./imagenes/ajax-loader.gif";
    divInfo.appendChild(imagen);
    fetch(rutaArchivoJson)
      .then((response) => response.json())
      .then((data) => {
        // quito la imagen de carga
        divInfo.innerHTML = "";
        //Obtengo la informacion y la muestro
        console.log(data);
        document.getElementById("tema").innerHTML = data.tema;
        document.getElementById(
          "cantidad-sistemas"
        ).innerHTML = `El sistema cuenta con ${data.sistemas.length} sistemas de inteligencia artificial para programadores`;
        // obtener el sistema con mas funcionalidades
        let cantidadMayorFuncionalidades =
          data.sistemas[0].funcionalidades.length;
        let sistemaMayorCantidadFuncionalidades = data.sistemas[0];
        for (let sistema of data.sistemas) {
          if (cantidadMayorFuncionalidades < sistema.funcionalidades.length) {
            sistemaMayorCantidadFuncionalidades = sistema;
          }
        }
        document.getElementById(
          "mas-funcionalidades"
        ).innerHTML = `El sistema con más funcionalidades es ${sistemaMayorCantidadFuncionalidades.nombre}.`;
        //lista de sistemas y funcionalidades
        let listaSistemasFuncionalidades = document.getElementById(
          "sistemas-funcionalidades"
        );
        listaSistemasFuncionalidades.append(
          "Los sistemas y sus funcionalidades son:"
        );
        //lista, creo lista, creo elementos li y los añado al DOM
        let lista = document.createElement("ul");
        lista.id = "listaSistemas";
        data.sistemas.forEach((sistema) => {
          let sistemaActual = document.createElement("li");
          sistemaActual.innerHTML = `<li>${sistema.nombre}: ${sistema.funcionalidades}</li>`;
          lista.append(sistemaActual);
        });
        listaSistemasFuncionalidades.append(lista);
      })
      .catch((error) => console.log(error.message));
  }

  function obtenerDatosJQ(rutaArchivoJson) {
    $.ajax(rutaArchivoJson, {
      success: function (data) {
        // quito la imagen de carga
        divInfo.innerHTML = "";
        //Obtengo la informacion y la muestro
        console.log(data);
        document.getElementById("tema").innerHTML = data.tema;
        document.getElementById(
          "cantidad-sistemas"
        ).innerHTML = `El sistema cuenta con ${data.sistemas.length} sistemas de inteligencia artificial para programadores`;
        // obtener el sistema con mas funcionalidades
        let cantidadMayorFuncionalidades =
          data.sistemas[0].funcionalidades.length;
        let sistemaMayorCantidadFuncionalidades = data.sistemas[0];
        for (let sistema of data.sistemas) {
          if (cantidadMayorFuncionalidades < sistema.funcionalidades.length) {
            sistemaMayorCantidadFuncionalidades = sistema;
          }
        }
        document.getElementById(
          "mas-funcionalidades"
        ).innerHTML = `El sistema con más funcionalidades es ${sistemaMayorCantidadFuncionalidades.nombre}.`;
        //lista de sistemas y funcionalidades
        let listaSistemasFuncionalidades = document.getElementById(
          "sistemas-funcionalidades"
        );
        listaSistemasFuncionalidades.append(
          "Los sistemas y sus funcionalidades son:"
        );
        //lista, creo lista, creo elementos li y los añado al DOM
        let lista = document.createElement("ul");
        lista.id = "listaSistemas";
        data.sistemas.forEach((sistema) => {
          let sistemaActual = document.createElement("li");
          sistemaActual.innerHTML = `<li>${sistema.nombre}: ${sistema.funcionalidades}</li>`;
          lista.append(sistemaActual);
        });
        listaSistemasFuncionalidades.append(lista);
      },
      error: function (error) {
        console.log("Error al obtener los datos", error);
      },
    });
  }

  // 2. Extracción y presentación de información.

  let rutaArchivo = "./datos/ia.json";
  obtenerDatosJQ(rutaArchivo);
  //obtenerDatosJS(rutaArchivo);
});

// No pierdo mas tiempo quiero realizar, se podria mejorar creando una funcion que muestre los datos
// en lugar de repetir código en ambas funciones
