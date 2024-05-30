/**
 * Crea el botón de arranque inicial y llama a la creación de la interfaz DAW al pulsar sobre este.
 */
export function interfazPrincipal()
{
    // Creación de elementos
    let parrafo = document.createElement('P');
    let botonIniciar = document.createElement('BUTTON');
    let botonIniciarTexto = document.createTextNode("Iniciar DAW!");
    
    // Añade los elementos en el árbol DOM
    botonIniciar.appendChild(botonIniciarTexto);
    parrafo.appendChild(botonIniciar);
    document.body.appendChild(parrafo);

    // En el click se lanza la interfaz DAW
    botonIniciar.addEventListener('click', (evt) => 
    {
        document.body.removeChild(parrafo);
        interfazDAW();
    }, false);
}

/**
 * Crea la interfaz DAW asociando botones y sonidos.
 */
function interfazDAW()
{
    let orden = [];
    let tabla = document.createElement('TABLE');
    let tr = tabla.appendChild(document.createElement('TR'));
    let td1 = tr.appendChild(document.createElement('TD'));
    let div1 = td1.appendChild(document.createElement('DIV'));
    
    // Crear el panel de botones y asociar el objeto de audio según el valor numérico
    for (let i=1; i<=25; i++)
    {
        let botonLoop = crearBoton(div1, `Loop ${i}`, 'casilla'); 
        let audio = document.createElement('AUDIO');
        audio.preload = "auto";
        audio.src = `./loops/${i}.wav`;
        botonLoop.appendChild(audio);
        botonLoop.addEventListener('click', (evt) => {
            audio.play(); 
            evt.target.className = 'casilla-seleccionada';
            orden.push(audio);
        });

        // Nueva línea cada 5
        if (i%5 == 0)
        {
            crearSeparador(div1);
        }
    }

    // Añadir las imágenes y los textos a la derecha
    crearImagenes(tr.appendChild(document.createElement('TD')));

    // Añadir la tabla (contenedor principal de las casillas e imágenes) al body
    document.body.appendChild(tabla);

    // Botones de control
    crearSeparador(document.body);

    // Después de un separador situamos los botones de control
    let div2 = document.body.appendChild(document.createElement('DIV'));

    // Añadir el botón borrar y su comportamiento
    let borrar = crearBoton(div2, 'Borrar', 'control');
    borrar.addEventListener('click', (evt) => {
        let casillas = div1.getElementsByClassName('casilla-seleccionada');
        // Esta es una collección viva en la que los elementos desparacen en cuando dejan de cumplir la condición
        // Por ese movito una buena forma de recorrerla es con un bucle while o un for descendente
        while (casillas.length>0) { //for (let j=casillas.length-1; j>=0; j--) {
            casillas[0].className = 'casilla';
        }
        orden = []; // Vaciamos el orden
    });

    // Se incia el proceso de reproducción encadenada
    let reproducir = crearBoton(div2, 'Reproducir', 'control');
    reproducir.addEventListener('click', (evt) => {
        playAudio(orden);
    });

    // En el botón parar cancelamos el timeout, pero lo demás sigue igual
    let parar = crearBoton(div2, 'Parar', 'control');
    parar.addEventListener('click', (evt) => {
        clearTimeout(timeout);

        let casillas = div1.getElementsByClassName('casilla-sonando');
        // Esta es una collección viva en la que los elementos desparacen en cuando dejan de cumplir la condición
        // Por ese movito una buena forma de recorrerla es con un bucle while o un for descendente
        while (casillas.length>0) { //for (let j=casillas.length-1; j>=0; j--) {
            casillas[0].className = 'casilla';
        }
    });

    // copyright wikipedia
    var it = document.createElement('I');
    var t = document.createTextNode("Imágenes y textos obtenidos de la wikipedia");
    it.appendChild(t);
    document.body.appendChild(it);
}

// Guardamos el identificador de timeout para poder pararlo
let timeout;

/**
 * Ejecuta de forma recursiva los sonidos mediante tiempos de espera.
 * @param orden Orden de ejecución de los sonidos.
 */
function playAudio(orden)
{
    if (orden.length > 0)
    {
        // Quitamos el primer sonido en el orden
        var audio = orden.shift();

        // Marcamos la casilla como sonando (no solicitado explícitamente)
        audio.parentElement.className = 'casilla-sonando'
        
        // Ejecutamos el sonido
        audio.play();

        if (orden.length > 0)
        {
            // Al finalizar un sonido se encadena con el siguiente
            timeout = setTimeout(() => { audio.parentElement.className = 'casilla';  playAudio(orden); }, audio.duration * 1000);
        }
        else 
        {
            // Al finalizar el último sonido simplemente se marca la casilla
            setTimeout(() => { audio.parentElement.className = 'casilla';  }, audio.duration * 1000);
        }
    }
}

/**
 * Encapsula la creación de un botón.
 * @param padre Elemento raiz para el botón.
 * @param texto Texto para visualizar en el botón.
 * @param className La clase del botón.
 * @returns El botón creado.
 */
function crearBoton(padre, texto, className)
{
    var boton = padre.appendChild(document.createElement('BUTTON'));
    boton.appendChild(document.createTextNode(texto));
    boton.className = className;
    return boton;
}

/**
 * Encapsula la creación de un separador de línea.
 * @param padre Elemento raiz para el botón.
 */
function crearSeparador(padre)
{
    padre.appendChild(document.createElement('BR'));
}

// Separa la creación de las imágenes para mantener el código limpio
function crearImagenes(parent)
{
    var tabla = parent.appendChild(document.createElement('TABLE'));
    tabla.width = 300;

    var tr1 = tabla.appendChild(document.createElement('TR'));
    var td1 = tr1.appendChild(document.createElement('TD'));

    crearFigura(td1, 
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Traditional_indonesian_instruments02.jpg/300px-Traditional_indonesian_instruments02.jpg",
        "Los instrumentos de percusión han definido la dinámica que favorece la creación y percepción de ritmos complejos.",
        300, 200);

    var tr2 = tabla.appendChild(document.createElement('TR'));
    var td2 = tr2.appendChild(document.createElement('TD'));

    crearFigura(td2,
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Phenakistoscope_3g07690b.gif/250px-Phenakistoscope_3g07690b.gif",
        "Ritmo, una secuencia repetida en el tiempo: una primigenia imagen en movimiento haciendo una demostración del vals.",
        300, 200);
}

/**
 * Crea un figura con imagen y texto.
 * @param {*} parent    Elemento padre para la figura.
 * @param {*} src       Url de la imagen.
 * @param {*} caption   Texto para el caption de la figura.
 * @param {*} width     Ancho de la imagen.
 * @param {*} height    Alto de la imagen.
 * @returns Elemento figura creado.
 */
function crearFigura(parent, src, caption, width, height)
{
    var fig1 = parent.appendChild(document.createElement('FIGURE'));
    var img1 = fig1.appendChild(document.createElement('IMG'));
    img1.src = src;
    img1.width = width;
    img1.height = height;
    var figcap1 = fig1.appendChild(document.createElement('FIGCAPTION'));
    figcap1.appendChild(document.createTextNode(caption));
    return fig1;
}