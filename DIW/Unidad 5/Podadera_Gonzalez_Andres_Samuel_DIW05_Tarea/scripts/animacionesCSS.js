// Creación de elementos divs y variables
const divCarga = document.getElementById('carga');
const divPolo = document.getElementById('polo');
const divTextoPilaCargada = document.getElementById('pilaCargada');
let animacionCuerpoFinalizada = false;
let animacionPoloFinalizada = false;

// Añadir escuchador de evento de finalizacion de animacion css
divCarga.addEventListener('animationend', function () {
  divPolo.style.animation = 'colorearRojo 1s linear forwards';
  divPolo.innerHTML = '+';
  animacionCuerpoFinalizada = true;
});

// Añadir escuchador de evento de finalizacion de animacion css
divPolo.addEventListener('animationend', function () {
  animacionPoloFinalizada = true;
});

// Añadir escuchador de evento al cargar la pagina para que no se autoejecute la animacion
document.addEventListener('DOMContentLoaded', function () {
  divCarga.style.animationPlayState = 'paused';
  divPolo.style.animationPlayState = 'paused';
  divTextoPilaCargada.style.animationPlayState = 'paused';
});

// Añadir escuchador de evento al hacer clic en el boton de iniciar
let botonParar = document.getElementById('parar');
botonParar.addEventListener('click', function () {
  // Pausamos las animaciones
  divCarga.style.animationPlayState = 'paused';
  divPolo.style.animationPlayState = 'paused';
  divTextoPilaCargada.style.animationPlayState = 'paused';
});

// Añadir escuchador de evento al hacer clic en el boton de reanudar
let botonReanudar = document.getElementById('reanudar');
botonReanudar.addEventListener('click', function () {
  // Comprobamos si las animaciones han finalizado, si es así, las reiniciamos
  if (animacionPoloFinalizada && animacionCuerpoFinalizada) {
    divCarga.style.animation = 'none'; // Detenemos la animación
    void divCarga.offsetWidth; // Forzamos el repaint
    divCarga.style.animation = null; // Restablecemos la animación
    divCarga.style.animationPlayState = 'paused';
    divPolo.style.animation = 'none'; // Detenemos la animación
    void divPolo.offsetWidth; // Forzamos el repaint
    divPolo.style.animation = null; // Restablecemos la animación
    divPolo.style.animationPlayState = 'paused';
    divPolo.innerHTML = '';
    animacionCuerpoFinalizada = false;
    animacionPoloFinalizada = false;
    divTextoPilaCargada.style.animation = 'none'; // Detenemos la animación
    void divTextoPilaCargada.offsetWidth; // Forzamos el repaint
    divTextoPilaCargada.style.animation = null; // Restablecemos la animación
    divTextoPilaCargada.style.animationPlayState = 'paused';
    // Si no han finalizado, comprobamos si están en pausa o en ejecución
  } else if (divCarga.style.animationPlayState == 'running') {
    divCarga.style.animation = 'none'; // Detenemos la animación
    void divCarga.offsetWidth; // Forzamos el repaint
    divCarga.style.animation = null; // Restablecemos la animación
    divCarga.style.animationPlayState = 'paused';
    divPolo.style.animation = 'none'; // Detenemos la animación
    void divPolo.offsetWidth; // Forzamos el repaint
    divPolo.style.animation = null; // Restablecemos la animación
    divPolo.style.animationPlayState = 'paused';
    divPolo.innerHTML = '';
    animacionCuerpoFinalizada = false;
    animacionPoloFinalizada = false;
    divTextoPilaCargada.style.animation = 'none'; // Detenemos la animación
    void divTextoPilaCargada.offsetWidth; // Forzamos el repaint
    divTextoPilaCargada.style.animation = null; // Restablecemos la animación
    divTextoPilaCargada.style.animationPlayState = 'paused';
    // Si están en pausa, las reanudamos
  } else if (
    divCarga.style.animationPlayState == 'paused' &&
    !animacionCuerpoFinalizada
  ) {
    divCarga.style.animationPlayState = 'running';
    divTextoPilaCargada.style.animationPlayState = 'running';
  } else if (
    divPolo.style.animationPlayState == 'paused' &&
    !animacionPoloFinalizada
  ) {
    divPolo.style.animationPlayState = 'running';
    divTextoPilaCargada.style.animationPlayState = 'running';
    divTextoPilaCargada.style.animationPlayState = 'running';
  } else if (divCarga.style.animationPlayState == 'paused') {
    divCarga.style.animationPlayState = 'running';
    divTextoPilaCargada.style.animationPlayState = 'running';
  } else if (divCarga.style.animationPlayState == 'running') {
    divCarga.style.animationPlayState = 'paused';
    divTextoPilaCargada.style.animationPlayState = 'paused';
  } else if (divPolo.style.animationPlayState == 'running') {
    divPolo.style.animationPlayState = 'paused';
    divTextoPilaCargada.style.animationPlayState = 'paused';
  }
});
