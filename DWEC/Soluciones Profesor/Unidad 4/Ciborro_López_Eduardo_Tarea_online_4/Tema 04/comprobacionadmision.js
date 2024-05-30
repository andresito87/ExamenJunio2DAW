// VARIABLES

let respuesta;
let resultado= document.getElementById("resultado");
let icono1 = document.getElementById("contraicono");
let icono2 = document.getElementById("repcontraicono");

let contrasena = document.getElementById("contrasena"); // asigno a la variable el elemento para eliminar un error que me marca VSCode, aunque funciona sin esto

// almacenamos todos los inputs en una variable
let _input = document.getElementsByTagName('input');
//console.log(_input); // visualizamos las posiciones que ocupan los distintos inputs contenidos en la variable (no es necesario dejarlo)
// de todas las variables las primeras que nos interesan son las del nombre y las contraseñas
// dentro de la variable _input ocupan los valores 0 (nombre), 1 (contraseña) y 2 (repita contraseña)

// LISTENERS

window.addEventListener('load', visitas); // al cargar la pagina mostramos el acumulado de veces visitada

// agregamos un eventListener para el nombre: cuando este en foco le aplicamos la funcion enfoco
_input.item(0).addEventListener('focus', enfocado);
// agregamos un eventListener para el nombre: cuando pierda el foco le aplicamos la funcion sinfoco
_input.item(0).addEventListener('blur', enfocado);

// hacemos lo mismo con el campo contraseña (posicion 1)
_input.item(1).addEventListener('focus', enfocado);
_input.item(1).addEventListener('blur', enfocado);

// hacemos lo mismo con el campo repita contraseña (posicion 2)
_input.item(2).addEventListener('focus', enfocado);
_input.item(2).addEventListener('blur', enfocado);

// agregamos un eventListener para el boton de reiniciar ocupa la posicion 3 dentro de la variable 

_input.item(3).addEventListener('click', reiniciar); // la funcion reiniciar va a dejar los campos sin clases

// agregamos los listeners a los iconos de las contraseñas para que detecten cuando estan pulsados y cuando se sueltan

icono1.addEventListener('mousedown', revelar); // pulsado
icono1.addEventListener('mouseup', ocultar); // soltado

icono2.addEventListener('mousedown', revelar);
icono2.addEventListener('mouseup', ocultar);

// agregamos un eventListener al boton enviar formulario

_input.item(4).addEventListener('click', validarEnvio); // esta es la posicion (4) que ocupa el boton Enviar

// PATRONES

let patronNombre = /^[a-zA-ZñÑçÇ]{10,25}$/; // desde el inicio solo letras incluidas ñ y Ñ, ç y Ç entre 10 y 25 veces hasta el final

let patronContrasena =/^(?!.*;)(?!.*(?:select|where))[^çÇ,$](?!(?:.*\d){4}).{5,18}\d\.$/;
    // ^ = inicio del texto
    // (?!.*;) = negative lookahead que sirve para verificar que no aparezca un punto y coma en todo el texto
    /* (?!.*(?:select|where)) = negative lookahead que sirve para verificar que no aparcen ninguna de las dos palabras, 
    pero para poder hacer la diyuntiva es necesario agruparlos en un non-capturing group, tambien sirve para cuantificar al grupo contenido en ella*/
    // [^çÇ,$] = el primer caracter no puede ser ninguno de los caracteres contenidos en este grupo
    // (?!(?:.*\d){4}) = negative lookahead con un non-capturing group para poder cuantificar que no debe encontrar 4 numeros
    // .{5,18} = cualquir caracter en un numero entre 6 y 19 (porque luego le sumamos un numero y el "." que suman 2 mas a los limites impuestos)
    // \d\.$ = la cadena de texto debe acabar con un digito y un punto

// HANDLERS

function revelar() {
    /* aqui uso la varible creada al principio para evitar el error que me aparece por usar las id directamente dentro de la funcion, podria haberlo
    hecho con las demas de la misma manera pero queria que viera usted el error y me lo explicara*/

    contrasena.type ='text'; // le cambiamos el tipo de password a text para que muestre el contenido
    contrasena.classList.add('revelado'); /* aqui usamos classList (metodo mas correcto) en lugar de className= ya que asi tenemos mas metodos para
                                            manipular las clases de un elemento, de esta manera podemos tener mas de una clase aplicada*/

    /* aqui uso las ids de los elementos directamente, lo he visto funcionar en otros ejemplos y a mi me funciona, pero no entiendo el error, 
    le agradeceria si me lo pudiese explicar en la correccion y como solucionarlo para usarlo asi, no con variable y un getElementById
    como he hecho con contrasena para contrastar. Se que si lo uso asi fuera de la funcion no me aparece el error. Gracias.*/

    repetirContrasena.type ='text';
    repetirContrasena.classList.add('revelado');

}

function ocultar() {

    contrasena.type ='password'; // volvemos a cambiar el tipo a password para que oculte el contenido
    contrasena.classList.remove('revelado'); // eliminamos la clase revelado para que vuelva a recuperar el color de fuente
    // error por usar la id de manera directa dentro de una funcion
    repetirContrasena.type ='password';
    repetirContrasena.classList.remove('revelado'); // de este modo no eliminamos otras clases que pudieran estar aplicadas como correcto o incorrecto.
}

function enfocado() {
    this.classList.toggle('foco'); // si no esta en la lista de clases del elemento la agrega (.add), si ya esta en la lista la elimina (.remove).
}

function reiniciar() { // eliminamos todas las clases aplicadas a los campos de texto del formulario usando className por comodidad

    _input.item(0).className = ""; // nombre
    _input.item(1).className = ""; // contraseña
    _input.item(2).className = ""; // repetir contraseña
}

function validarEnvio(objeto){ // validamos el objeto pasado como parametro
    
    objeto.preventDefault(); // evitamos el comportamiento por defecto del formulario

    if (validarNombre() & validarContrasena() & repContrasena()) { // si todo esta correcto mostramos los datos por pantalla

        resultado.innerHTML ='El nombre es: ' + _input.item(0).value +
                            '<br>La contraseña es: ' +_input.item(1).value +
                            '<br>y su repeticion: ' + _input.item(2).value;    

    }else{ // si hay algun fallo indicamos que el formulario tiene fallos

        resultado.innerHTML ='Se han producido errores en la validación de los campos, por favor reviselos <br>';
    }
}

function validarNombre() { // validamos el nombre usando el patron especificado
    // usaremos className por comodidad ya que solo vamos a usar 2 clases que son antagonicas
    if (patronNombre.test(_input.item(0).value)) { // si esta correcto el fondo se vuelve verde
        respuesta = true; 
        _input.item(0).className = 'correcto';

    }else{ // si no es correcto el fondo se pone rojo
        respuesta = false;
        //_input.item(0).focus(); // hace que este elemento capture el foco, asi es mas comodo para el usuario, pero interfiere con el classList.toggle('foco')
        _input.item(0).className = 'incorrecto'; 
    }

    return respuesta; // devolvemos true o false para que pueda ser evaluado en el condicional de la funcion validarEnvio()
}

function validarContrasena() { // validamos la contraseña usando el patron especificado
    // usaremos className por comodidad ya que solo vamos a usar 2 clases que son antagonicas
    if (patronContrasena.test(_input.item(1).value)) {
        respuesta = true;
        _input.item(1).className = 'correcto';
    }else{
        respuesta = false;
        //_input.item(1).focus(); comentado para que no interfiera con el toggle
        _input.item(1).className = 'incorrecto';
    }

    return respuesta;
}

function repContrasena() {
    // usaremos className por comodidad ya que solo vamos a usar 2 clases que son antagonicas
    if (_input.item(1).value === _input.item(2).value && patronContrasena.test(_input.item(2).value)) {
        respuesta = true; 
        _input.item(2).className = 'correcto';
    }else{
        respuesta = false; 
        //_input.item(2).focus(); comentado para que no interfiera con el toggle, al final siempre tomaba el foco el elemento con error ultimo y perdia utilidad
        _input.item(2).className = 'incorrecto';
    }

    return respuesta;
}

function visitas(){

    let contador = localStorage.getItem('visitasadmision'); // guardamos el valor de la key visitasadmision en la variable

    if (contador === null) { // si es la primera vez que accedemos ese valor sera nulo
        contador = 0; // lo convertimos en 0
    }else {
        contador = parseInt(contador); // si ya hemos accedido otras veces ese valor sera distinto de null, y lo convertivos en un entero
    }

    contador ++; // ahora que esta convertido a entero podemos incrementarlo

    visitada.innerHTML = "La pagina ha sido visitada : "+ contador +" veces.<br>"+"<br>"; // lo mostramos por pantalla, aqui tengo el error por usar la id directamente

    localStorage.setItem('visitasadmision',contador); // guardamos el nuevo valor en la key visitasadmision 

}