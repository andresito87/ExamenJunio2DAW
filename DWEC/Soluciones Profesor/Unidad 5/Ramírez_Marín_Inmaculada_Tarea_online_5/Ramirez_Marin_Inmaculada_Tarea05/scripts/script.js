let sonidosSeleccionados = new Array(); //Almacena los sonidos que son seleccionados
let duracionAudios = new Array(); //Almacena la duración de los audios
let timeouts = new Array(); //Almacena las funciones que están programadas para ejecutar en un momento determinado
let sonandoAhora; //Almacena el número de sonido que se está reproduciendo en ese momento
let reproduciendo = false; //Controla si se está reproduciendo o no la grabación para deshabilitar los controles
let inicial = '#B0DBCC'; //Color inicial de las casillas

/**
 * Función encargada de elaborar la página inicial con el botón inicio 
 * y precargar los sonidos y su duración
 */
function init(){
    //Crea y añade el título de la página
    let elementoTitulo = document.createElement('h1');
    let contenidoTitulo = document.createTextNode('DAW MUSICAL');
    elementoTitulo.appendChild(contenidoTitulo);
    document.body.appendChild(elementoTitulo);

    //Crea y añade el botón inicio
    let botonInicio = document.createElement('button');
    botonInicio.setAttribute('id', 'btnInicio');
    botonInicio.setAttribute('class', 'botonInicio'); //Le añade una clase para personalizarlo en los estilos
    //Añade un evento para que al pulsar el botón inicio, se elimine este y se genere el tablero
    botonInicio.addEventListener('click', generarTablero);

    let textoBoton = document.createTextNode('INICIO');
    botonInicio.appendChild(textoBoton);

    document.body.appendChild(botonInicio);

    //Cargamos los metadatos de los 25 sonidos
    let sonidosCargados = 0;
    let totalSonidos = 25;
    let audios = new Array();

    // Itera sobre cada audio para cargar los metadatos
    for (let i = 1; i <= totalSonidos; i++) {
        audios[i] = document.createElement("audio");
        audios[i].setAttribute('preload', 'metadata');
        audios[i].setAttribute('id', 'audio'+i);
        audios[i].setAttribute('src', '../loops/'+i+'.wav');
        // Escucha el evento 'loadedmetadata' que indica que los metadatos han sido cargados
        audios[i].addEventListener("loadedmetadata", function() {
            sonidosCargados++;
            duracionAudios[i] = audios[i].duration;
    
            // Mostramos un mensaje por consola para saber que todas las duraciones de los sonidos han sido precargados
            if (sonidosCargados === totalSonidos) {
                console.log("Precargados metadatos de los sonidos");
            }
        });
        //Añadimos los elementos audio
        document.body.appendChild(audios[i]);
    }
}

/**
 * Función que genera la página principal formada por el tablero del DAW musical
 * y un texto con imágenes
 */
function generarTablero(){
    //Al generar el tablero comienza eliminando el anterior botón inicio
    document.body.removeChild(document.getElementById('btnInicio'));

    //Crea un div que contendrá los botones del DAW musical
    let casillero = document.createElement('div');
    casillero.setAttribute('id', 'casillero');
    casillero.setAttribute('class', 'casillero');

    //Creamos los 25 botones que van a ser las casillas del tablero
    let casilla = new Array();
    
    for(let i=1;i<=25;i++){
        casilla[i] = document.createElement('button');
        casilla[i].setAttribute('id', 'casilla'+i);
        casilla[i].setAttribute('class', 'casilla casilla'+i);
        //Al hacer click sobre cada casilla va a cambiar a un color
        casilla[i].addEventListener('click', cambiarColor);
        //Al hacer click sobre cada casilla se va a seleccionar el sonido que tiene asociado
        casilla[i].addEventListener('click', seleccionarSonido);
        //Añadimos las casillas al casillero
        casillero.appendChild(casilla[i]);
    }
    
    //Creamos los tres botones: REINICIAR, REPRODUCIR y PARAR

    //El botón REINICIAR se encargará de eliminar los audios que están seleccionados
    //reiniciando el casillero
    let botonBorrar = document.createElement('button');
    botonBorrar.appendChild(document.createTextNode('REINICIAR'));
    botonBorrar.setAttribute('id', 'btnReiniciar');
    botonBorrar.setAttribute('class', 'botonera btnReiniciar');
    botonBorrar.addEventListener('click', reiniciarSonidos);

    //El botón REPRODUCIR se encargará de reproducir los sonidos que están seleccionados
    let botonReproducir = document.createElement('button');
    botonReproducir.appendChild(document.createTextNode('REPRODUCIR'));
    botonReproducir.setAttribute('id', 'btnReproducir');
    botonReproducir.setAttribute('class', 'botonera btnReproducir');
    botonReproducir.addEventListener('click', reproducirGrabacion);

    //El botón PARAR se encargará de parar la reproducción
    let botonParar = document.createElement('button');
    botonParar.appendChild(document.createTextNode('PARAR'));
    botonParar.setAttribute('id', 'btnParar');
    botonParar.setAttribute('class', 'botonera btnParar');
    botonParar.addEventListener('click', pararGrabacion);

    //Se crea un div para contener los tres botones y se añade a la página
    let botoneraInferior = document.createElement('div');
    botoneraInferior.setAttribute('id', 'divBotoneraInferior');
    botoneraInferior.setAttribute('class', 'botoneraInferior');

    botoneraInferior.appendChild(botonBorrar);
    botoneraInferior.appendChild(botonReproducir);
    botoneraInferior.appendChild(botonParar);

    document.body.appendChild(botoneraInferior);

    /*let sonido = document.createElement('audio');
    sonido.setAttribute('id', 'sonido');
    sonido.setAttribute('scr', '');*/

    let contenidoIzquierda = document.createElement('div');
    contenidoIzquierda.setAttribute('class', 'contenidoIzquierda');
    contenidoIzquierda.appendChild(casillero);
    //contenidoIzquierda.appendChild(sonido);
    contenidoIzquierda.appendChild(botoneraInferior);
    
    document.body.appendChild(contenidoIzquierda);

    //CREACIÓN DEL TEXTO E IMÁGENES
    //Se crea un contenedor para almacenar el texto y las imágenes
    let contenidoDerecha = document.createElement('div');
    contenidoDerecha.setAttribute('id', 'contenidoDerecha');
    contenidoDerecha.setAttribute('class', 'contenidoDerecha');

    //Primer párrafo
    let parrafo1 = document.createElement('p');
    parrafo1.appendChild(document.createTextNode('La música ha sido esencial en todas las sociedades a lo largo de la historia. Los ritmos, fundamentales en el desarrollo musical, van desde los tambores tribales hasta los patrones de percusión actuales. Estos ritmos ancestrales, arraigados en la cultura, han sido la base de una variedad de géneros.'))
    parrafo1.setAttribute('class', 'parrafo');
    contenidoDerecha.appendChild(parrafo1);

    //Primera imagen
    let imagen1 = document.createElement('img');
    imagen1.setAttribute('class', 'imagen');
    imagen1.setAttribute('id', 'imagen1');
    imagen1.setAttribute('alt', 'imagen guitarras');
    imagen1.setAttribute('src', './img/guitar.jpg');
    contenidoDerecha.appendChild(imagen1);

    //Segundo párrafo
    //Este párrafo lleva una abreviatura
    let parrafo2 = document.createElement('p');
    let text1Parrafo2 = document.createTextNode('Los ritmos son un lenguaje universal que trasciende fronteras y barreras lingüísticas. Desde el jazz en ');
    let text2Parrafo2 = document.createTextNode(' hasta la salsa en América Latina, cada región aporta su propio sabor musical. Esta diversidad enriquece el panorama musical global.');
    let abreviaturaParrafo2 = document.createElement('abbr');
    abreviaturaParrafo2.textContent = 'EE.UU.';
    abreviaturaParrafo2.setAttribute('title', 'Estados Unidos');
    parrafo2.appendChild(text1Parrafo2);
    parrafo2.appendChild(abreviaturaParrafo2);
    parrafo2.appendChild(text2Parrafo2);
    parrafo2.setAttribute('class', 'parrafo');
    contenidoDerecha.appendChild(parrafo2);

    //Segunda imagen
    let imagen2 = document.createElement('img');
    imagen2.setAttribute('class', 'imagen');
    imagen2.setAttribute('id', 'imagen2');
    imagen2.setAttribute('alt', 'imagen piano y partitura');
    imagen2.setAttribute('src', './img/piano.jpg');
    contenidoDerecha.appendChild(imagen2);

    //Tercer párrafo
    let parrafo3 = document.createElement('p');
    parrafo3.appendChild(document.createTextNode('Hoy, los ritmos continúan siendo poderosos en la música contemporánea. Sirven como puente entre generaciones y catalizadores de la creatividad. Desafían convenciones, abriendo nuevas posibilidades artísticas y uniendo personas más allá de las diferencias culturales.'));
    parrafo3.setAttribute('class', 'parrafo');
    contenidoDerecha.appendChild(parrafo3);

    //Añadimos el bloque del texto e imágenes a la página
    document.body.appendChild(contenidoDerecha);

}

/** 
 * Función que modifica el color de las casillas a un color aleatorio entre los 5 definidos
*/
function cambiarColor(evt){
    
    let amarillo = '#FFEC80';
    let rosa = '#F8BDEC';
    let azul = 'rgb(136, 221, 249)';
    let naranja = 'rgb(245, 199, 131)';
    let morado = 'rgb(222, 174, 252)';
    let colores = [amarillo, rosa, azul, naranja, morado];

    
    let colorAleatorio = Math.floor(Math.random() * colores.length);
    document.getElementById(evt.target.id).style.backgroundColor = colores[colorAleatorio];
}

/**
 * Función que emite el sonido asociado a la casilla cada vez que esta se pulsa
 * Además es la encargada de seleccionar la casilla para después reproducirla durante la reproducción
 * @param {*} evt 
 */
function seleccionarSonido(evt){
    //Comenzamos deteniendo los posibles sonidos que pudieran estar sonando para que no se acoplen varios a la vez
    detenerSonidos(); 

    //Extraemos el número de casilla que ha siod seleccionada
    let idCasilla = evt.target.id;
    let numCasilla = idCasilla.replace('casilla', '');

    //Usamos el número de casilla para reproducir el sonido asociado a esa casilla
    let elementoAudio = document.getElementById('audio'+numCasilla);
    elementoAudio.play();

    //Añadimos el sonido a la lista de reproducción
    sonidosSeleccionados.push(numCasilla);

    //Mostramos por consola el contenido de los sonidos que están actualmente seleccionados
    console.log('Sonidos en el array: ');
    for(let sonido of sonidosSeleccionados){
        console.log(sonido);
    }
    //Emitimos un mensaje por consola para saber qué sonido se está emitiendo
    console.log('Emitiendo sonido: ' + numCasilla+'.wav');
    
}

/**
 * Función que se encarga de borrar los sonidos seleccionados y devolver el casillero a su estado inicial
 * @param {} evt 
 */
function reiniciarSonidos(evt){
    sonidosSeleccionados = []; //Borramos el contenido del array que almacena los sonidos seleccionados
    reiniciarCasillas(); //Método que devuelve las casillas a su color de fondo y borde inicial
}

/**
 * Función asociada al click del botón reproducir
 * Se encarga de reproducir los sonidos que están actualmente seleccionados en el vector sonidosSeleccionados
 * @param {*} evt 
 */
function reproducirGrabacion(evt){
    let duracion = 0;
    reproduciendo = true;

    //Se deshabilitarán los botones para que no funcionen mientras se está reproduciendo
    //El único botón que no se dehabilita es el botón parar para poder parar la reproducción cuando queramos
    deshabilitarBotones();

    //Detenemos los posibles sonidos que se estuviesen reproduciendo
    detenerSonidos();

    //Recorremos todos los sonidos que están seleccionados
    for (let sonido of sonidosSeleccionados){

        //Extraemos la duración del sonido
        let duracionPista = duracionAudios[sonido];

        //Programamos la reproducción del sonido de modo que el primero comenzará
        //en duración 0, el segundo en duracion del sonido1, el tercero en duracion del sonido 1+2
        //y así sucesivamente. Con esto conseguimos que no comience a reproducirse el sonido hasta que los
        //anteriores no se hayan reproducido primero        
        let timeout = setTimeout(function(){
            reproducirSonido(sonido, duracionPista);
        }, duracion * 1000);

        //Introducimos la función programada en el array de funciones programadas
        timeouts.push(timeout);

        //Aumentamos la duración inicial añadiendole la de la nueva pista
        duracion += duracionPista;
    }

    //Programamos una nueva función que será la encargada de cuando se termine la reproducción, se vuelvan a habilitar todos los botones
    let timeout = setTimeout(function(){
        reproduciendo = false;
        habilitarBotones();
        sonandoAhora = null;
    }, duracion * 1000);
    timeouts.push(timeout);
}

/**
 * Función encargada de reproducir uno de los sonidos que están seleccionados
 * Además también cambiará el aspecto de la casilla para saber cual está siendo reproducido
 * @param {*} sonido 
 * @param {*} duracion 
 */
function reproducirSonido(sonido, duracion){
    //Sonido a reproducir
    let elementoAudio = document.getElementById('audio'+sonido);
    //Casilla a modificar
    let casilla = document.getElementById('casilla'+sonido);
    casilla.style.border = '5px solid red'; //Le ponemos un borde rojo de mayor grosor

    //Al terminar la reporducción del sonido programamos que el borde vuelva a su grosor y color inicial
    let timeout = setTimeout(function(){
        casilla.style.border = '2px solid  rgb(79, 158, 131)';
    }, duracion * 1000);

    //Comenzamos a reproducir el sonido
    elementoAudio.play();

    //Establecemos el sonido que está siendo reproducido en este instante
    sonandoAhora = sonido;

    //Mostramos un mensaje por la consola para saber qué pista esa siendo reproducida
    console.log('Sonando pista ' + elementoAudio.id);
}

/**
 * Método que se encarga de parar el sonido que se está reproduciendo y eliminar todas las 
 * reproducciones que se han quedado programadas
 * @param {*} evt 
 */
function pararGrabacion(evt){
    //La acción solo se realiza si hay algún sonido que se esté reproduciendo
    if(sonandoAhora != null){
        //Se obtiene la casilla y sonido que se están reproduciendo
        let sonando = document.getElementById('audio'+sonandoAhora);
        let casilla = document.getElementById('casilla'+sonandoAhora);

        //Se pausa el sonido
        console.log('Pausando sonido: ' + sonandoAhora);
        sonando.pause();

        //Se elimina el borde rojo que indica que se está reproduciendo la casilla
        casilla.style.border = '2px solid  rgb(79, 158, 131)';

        //Se establece que no está sonando ninguna canción
        sonandoAhora = null;
        reproduciendo = false;

        //Se eliminan todas las reproducciones programadas
        for (let timeout of timeouts) {
            clearTimeout(timeout);
        }
        //Se vuelven a habilitar los botones
        habilitarBotones();
    }
}

/**
 * Función que deshabilita los botones para que no puedan ser pulsados mientras se está reproduciendo una canción
 */
function deshabilitarBotones() {
    let botones = document.querySelectorAll('button');
    for(let boton of botones){
        if(boton.id != 'btnParar'){ //El botón parar es el único que no se modifica
            boton.disabled = true;
            if(!sonidosSeleccionados.includes(boton.id.replace('casilla', ''))){
                //Cambiamos el aspecto de las casillas no seleccionadas para que tengan aspecto de deshabilitadas
                boton.style.opacity = '0.5'; 
                boton.style.cursor = 'not-allowed'; 
                boton.style.border = '2px solid rgb(79, 158, 131)';
            }
        }
    }
}

/**
 * Función que habilita los botones cuando no se está reproduciendo los sonidos seleccionados
 */
function habilitarBotones() {
    let botones = document.querySelectorAll('button');
    for(let boton of botones){
        boton.disabled = false;
        //Volvemos a modificar el aspecto para que parezcan de nuevo habilitados
        boton.style.opacity = '1'; 
        boton.style.cursor = 'pointer'; 
        
    }
}

/**
 * Función que detiene los sonidos que se estén reproduciendo
 */
function detenerSonidos(){
    let audiosTablero = document.querySelectorAll('audio');
    for(let audio of audiosTablero){
        if(!audio.paused){
            audio.pause();
        }
    }
}

/**
 * Función que devuelve a las casillas su aspecto inicial
 */
function reiniciarCasillas(){
    let botones = document.querySelectorAll('button');
    for(let boton of botones){
        if(boton.id.includes('casilla')){
            boton.style.backgroundColor = inicial;
            boton.style.border = '2px solid  rgb(79, 158, 131)';
        }
    }
}
