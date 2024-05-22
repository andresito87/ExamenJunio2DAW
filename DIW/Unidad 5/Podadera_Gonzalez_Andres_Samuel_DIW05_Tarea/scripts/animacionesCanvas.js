// Creación de botones y canvas
const botonIniciarAnimacion = document.getElementById('iniciarCanvas');
const miCanvas = document.getElementById('canvas');
const dibujo = miCanvas.getContext('2d');
const arrayColores = ['red', 'orange', 'yellow', 'green'];
const width = miCanvas.width;
const height = miCanvas.height;
let intervalo; //intervalo de tiempo para la animación de carga de la pila

// Función que dibuja la pila
function dibujarPila() {
  dibujo.rect(120, 30, 50, 80);
  dibujo.fillStyle = 'white';
  dibujo.fill();
  dibujo.lineWidth = 8;
  dibujo.strokeStyle = 'blue';
  dibujo.stroke();
  dibujo.rect(140, 20, 10, 10);
  dibujo.lineWidth = 2;
  dibujo.strokeStyle = 'red';
  dibujo.stroke();
  dibujo.clearRect(119, 29, 52, 82);
}

// Función que dibuja el proceso de carga de la pila
function dibujarProcesoCarga() {
  // Vaciamos el cuerpo y el polo de la pila, si es que se habia cargado previamente
  dibujo.clearRect(119, 29, 52, 82);
  dibujo.clearRect(140, 20, 10, 60);
  dibujo.clearRect(110, 120, 100, 100);
  let y = 100;

  // Función que dibuja la carga de la pila
  function dibujarCargaCuerpo(y, color) {
    dibujo.fillStyle = color;
    dibujo.beginPath();
    dibujo.rect(119, y, 52, height - y - 39);
    dibujo.fill();
  }

  // Función que dibuja la carga del polo de la pila
  function dibujarCargaPolo(y) {
    dibujo.fillStyle = 'blue';
    dibujo.beginPath();
    dibujo.rect(141, y, 8, 1);
    dibujo.fill();
  }

  // Función que actualiza la posición de la carga en el eje y
  function update() {
    if (y > 21) {
      y -= 1;
    }
  }

  // Función que dibuja la carga del cuerpo y del polo de la pila
  // Dependiendo de la posición coloreará de un color u otro, cuerpo y polo
  function draw() {
    if (y > 80) dibujarCargaCuerpo(y, arrayColores[0]);
    else if (y > 60) dibujarCargaCuerpo(y, arrayColores[1]);
    else if (y > 40) dibujarCargaCuerpo(y, arrayColores[2]);
    else if (y >= 29) dibujarCargaCuerpo(y, arrayColores[3]);
    else dibujarCargaPolo(y);
  }

  // Intervalo de tiempo para la animación
  intervalo = setInterval(() => {
    // Actualizo la posición de la carga
    update();
    // Dibujo la carga
    draw();
    // Si la carga llega a la parte superior de la pila, relleno el polo y muestro un mensaje
    if (y <= 21) {
      //limpio la zona donde voy a mostrar el mensaje, sino lo hago, el texto sale borroso
      dibujo.clearRect(110, 120, 100, 100);
      dibujo.textBaseline = 'ideographic';
      dibujo.textAlign = 'center';
      dibujo.font = '1em Serif';
      dibujo.fillStyle = 'red';
      dibujo.fillText('¡Cargada!', 140, 135);
      //detengo que se sigan generando intervalos
      clearInterval(intervalo);
    }
  }, 50);
}

// Escucha que llama a la función dibujarRectangulo cuando se cargue la página
document.addEventListener('DOMContentLoaded', dibujarPila);
// Escucha que llama a la función dibujarProcesoCarga cuando se haga click en el botón
botonIniciarAnimacion.addEventListener('click', dibujarProcesoCarga);
