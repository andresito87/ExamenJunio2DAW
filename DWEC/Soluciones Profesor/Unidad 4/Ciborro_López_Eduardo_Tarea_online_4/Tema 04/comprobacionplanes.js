//VARIABLES

nombrePlan = document.getElementById('nombrePlan');
codigoPlan = document.getElementById('codigoPlan');
tipoPlan = document.getElementsByName('tipoPlan'); // como son botones radio es el nombre el que los agrupa y excluye que se pueden marcar mas de uno
pais = document.getElementById('pais');
enviar = document.getElementById('enviar');
borrar = document.getElementById('borrar');

patron = /^[a-zA-ZñÑçÇ]{1}\d{3,7}$/; // ^[a-zA-ZñÑçÇ]{1} = la primera es una unica letra; \d{3,7}$ = seguida de entre 3 y 7 numeros

// LISTENERS

window.addEventListener('load', visitas); // al cargar la pagina mostramos el acumulado de veces visitada

nombrePlan.addEventListener('focus', enfocado); // controlamos cuando coge el foco
nombrePlan.addEventListener('blur', enfocado); // cuando sale de foco
nombrePlan.addEventListener('input', aMayuscula); // evento para cuando introducimos el texto

codigoPlan.addEventListener('focus', enfocado);
codigoPlan.addEventListener('blur', enfocado);

pais.addEventListener('focus', enfocado);
pais.addEventListener('blur', enfocado);

enviar.addEventListener('click', validar); // al pulsar el boton de enviar validados los datos del formulario

borrar.addEventListener('click', reiniciar); // al pulsar el boton de borrar llamamos a la funcion reiniciar


// HANDLERS

function enfocado() {
    this.classList.toggle('foco'); // si no esta en la lista de clases del elemento la agrega (.add), si ya esta en la lista la elimina (.remove).
}

function aMayuscula() {
    nombrePlan.value = nombrePlan.value.toUpperCase(); // convierte los valores del input a Mayuscula
}

function reiniciar() { // limpia las clases de correcto o incorrecto aplicadas a los campos de texto

    nombrePlan.className = ""; // aqui usamos className en lugar de classList por comodidad, ya que queremos eliminar todas las clases aplicadas
    codigoPlan.className = "";
}

function validar(objeto) {

    objeto.preventDefault(); // prevenimos el evento por defecto para este elemento

    seleccion = ""; // iniciamos la variable que va almacenar el value del boton de radio seleccionado

    for (var i = 0; i <tipoPlan.length; i++) { // recorremos el grupo de radio buttons
        if (tipoPlan[i].checked){ // comprobamos si esta seleccionado
            seleccion = tipoPlan[i].labels[0].textContent; /* aqui tenia dos opciones cambiar el texto asignado a value en el html para que fuera
                                                            igual al contenido del label y usar tipoPlan[i].value, o bien no cambiar nada y usar una opcion mas rebuscada, 
                                                            a traves de HTMLSelectElement.labels que devuelve un NodeList con los elementos <label> asociados con el elemento seleccionado,
                                                            en mi caso el radio button seleccinado por el usuario, ahora como solo tengo un elemento label asociado a ese radio
                                                            button su indice es 0, y desde aqui puedo acceder al texto que se muestra en pantalla con textContent que
                                                            muestra el texto contenido entre la etiqueta de apertura y cierre de label */
        }
    }

    if (document.planes.checkValidity()) { // aqui se comprueba si el formulario id ="planes" ha pasado todas las validaciones de pattern y required, lo que devuelve true
        // usaremos className por comodidad ya que solo vamos a usar 2 clases que son antagonicas
        codigoPlan.className = 'correcto'; // agregamos la clase correcto al campo de texto del codigo del plan
        nombrePlan.className = 'correcto'; // idem para nombre del plan
        
        // mostramos por pantalla en el div id="resultado" los valores enviados

        resultado.innerHTML ='El nombre del plan es: ' + nombrePlan.value +
                            '<br>El codigo del plan es: ' + codigoPlan.value +
                            '<br>El tipo de Plan sera: ' + seleccion +
                            '<br>Y sera realizado en: ' + (pais.value == ("" | " ") ? "Es un secreto" : pais.value); // operador ternario para cuando no se elige nada o se ponen solo espacios en blanco

    }else { // en la anterior comprobacion todo debe ser valido, esto no permite indicar donde esta el fallo en detalle

        // comprobamos si lo que ha fallado ha sido el codigo
        if (codigoPlan.value == "" || codigoPlan.value == " " || !patron.test(codigoPlan.value)){
            codigoPlan.className = 'incorrecto'; // asignamos la clase para que nos muestre que esta campo es incorrecto
        }
        // comprobamos si lo que ha fallado ha sido el nombre
        if (nombrePlan.value == "" || nombrePlan.value == " "){
            nombrePlan.className = 'incorrecto';
        }

        resultado.innerHTML ='Se han producido errores en la validación de los campos, por favor reviselos <br>';
    }     
}
/* Estaba funcionando perfectamente en Firefox, y de repente empezo a ponern NaN, pero en Chrome, Opera y Edge funciona correctamente... y ahora vuelve a funcionar en Firefox*/

function visitas() {

    let contador = localStorage.getItem('visitasplan'); // guardamos el valor de la key 'visitasplan' en la variable contador

    if (contador === null) { // si es la primera vez que accedemos ese valor sera nulo
        contador = 0; // lo convertimos en 0
    }else {
        contador = parseInt(contador); // si ya hemos accedido otras veces ese valor sera distinto de null, y lo convertivos en un entero
    }

    contador ++; // ahora que esta convertido a entero podemos incrementarlo

    visitada.innerHTML = "La pagina ha sido visitada : "+ contador +" veces.<br>"+"<br>"; // lo mostramos por pantalla

    localStorage.setItem('visitasplan',contador); // guardamos el nuevo valor en la key visitasplan
}
       

  