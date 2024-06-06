// Selección de Elementos

// Selecciona un elemento por su ID
const elementoPorId = document.getElementById("mi-id");

// Selecciona todos los elementos que tienen una clase específica
const elementosPorClase = document.getElementsByClassName("mi-clase");

// Selecciona todos los elementos de un tipo de etiqueta específico
const elementosPorEtiqueta = document.getElementsByTagName("div");

// Selecciona el primer elemento que coincide con un selector CSS
const primerElemento = document.querySelector(".mi-clase");

// Selecciona todos los elementos que coinciden con un selector CSS
const todosLosElementos = document.querySelectorAll(".mi-clase");

// Crear Elementos

// Crea un nuevo elemento HTML
const nuevoElemento = document.createElement("div");
nuevoElemento.textContent = "Hola Mundo";

// Añade un elemento como hijo del elemento seleccionado
const contenedor = document.getElementById("contenedor");
contenedor.appendChild(nuevoElemento);

// Modificar Elementos

// Modifica el contenido HTML interno de un elemento
const elementoModificarHTML = document.getElementById("mi-id");
elementoModificarHTML.innerHTML = "<p>Nuevo Contenido</p>";

// Modifica el contenido de texto de un elemento
const elementoModificarTexto = document.getElementById("mi-id");
elementoModificarTexto.textContent = "Nuevo Texto";

// Añade o modifica un atributo de un elemento
const elementoModificarAtributo = document.querySelector("img");
elementoModificarAtributo.setAttribute("src", "imagen.png");

// Añadir, quitar o comprobar clases en un elemento
const elementoClase = document.querySelector(".mi-clase");
elementoClase.classList.add("nueva-clase"); // Añade una clase
elementoClase.classList.remove("mi-clase"); // Quita una clase
elementoClase.classList.toggle("otra-clase"); // Añade si no está, quita si está
const tieneClase = elementoClase.classList.contains("otra-clase"); // Comprueba si tiene la clase

// Recorrer Elementos

// Recorrer elementos seleccionados
const elementosRecorrer = document.querySelectorAll(".mi-clase");
elementosRecorrer.forEach((elemento) => {
  elemento.style.color = "blue"; // Modifica el estilo de cada elemento
});

// Eliminar Elementos

// Elimina un hijo de un elemento
const padre = document.getElementById("padre");
const hijo = document.getElementById("hijo");
padre.removeChild(hijo);

// Elimina el propio elemento
const elementoEliminar = document.getElementById("mi-id");
elementoEliminar.remove();

// Eventos

// Añade un manejador de eventos a un elemento
const boton = document.getElementById("mi-boton");
boton.addEventListener("click", () => {
  alert("Botón clickeado");
});

// Elimina un manejador de eventos de un elemento
const manejador = () => {
  alert("Botón clickeado");
};
boton.addEventListener("click", manejador);
boton.removeEventListener("click", manejador);

// Más Tipos de Eventos

// Evento de mouseover (cuando el mouse pasa por encima del elemento)
const elementoMouseOver = document.getElementById("mi-elemento");
elementoMouseOver.addEventListener("mouseover", () => {
  console.log("Mouse sobre el elemento");
});

// Evento de mouseout (cuando el mouse sale del elemento)
elementoMouseOver.addEventListener("mouseout", () => {
  console.log("Mouse fuera del elemento");
});

// Evento de dblclick (doble clic en el elemento)
const elementoDobleClic = document.getElementById("mi-doble-clic");
elementoDobleClic.addEventListener("dblclick", () => {
  alert("Elemento doble clickeado");
});

// Evento de keydown (cuando se presiona una tecla)
const inputTeclaPresionada = document.getElementById("mi-input");
inputTeclaPresionada.addEventListener("keydown", (evento) => {
  console.log("Tecla presionada: " + evento.key);
});

// Evento de keyup (cuando se suelta una tecla)
inputTeclaPresionada.addEventListener("keyup", (evento) => {
  console.log("Tecla soltada: " + evento.key);
});

// Evento de change (cuando cambia el valor de un input)
const inputCambio = document.getElementById("mi-input-cambio");
inputCambio.addEventListener("change", () => {
  console.log("Valor del input cambiado a: " + inputCambio.value);
});

// Evento de submit (cuando se envía un formulario)
const formulario = document.getElementById("mi-formulario");
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault(); // Evita que se envíe el formulario
  console.log("Formulario enviado");
});

// Comprobación de DOMContentLoaded

// Ejecutar código cuando el DOM esté completamente cargado y parseado
document.addEventListener("DOMContentLoaded", () => {
  console.log("El DOM ha sido completamente cargado");
  // Aquí puedes colocar el código que necesita ejecutarse después de que el DOM esté listo
});
