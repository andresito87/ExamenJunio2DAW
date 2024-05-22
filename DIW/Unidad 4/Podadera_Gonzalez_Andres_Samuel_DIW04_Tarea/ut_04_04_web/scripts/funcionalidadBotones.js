// Script para la funcionalidad de los botones del reproducir, pausar, parar, subir volumen,
// bajar volumen, mostrar duración, mostrar volumen y mostrar controles del video.

let repro_video = document.getElementById('videoPlugin');
// Iniciamos la reproducción
function iniciar() {
  repro_video.play();
}

// Pausamos la reproducción
function pausar() {
  repro_video.pause();
}

// Paramos y volvemos al inicio.
function parar() {
  repro_video.pause();
  repro_video.currentTime = 0;
}

//Subir volumen.
function SubirVolumen() {
  if (repro_video.volume < 1) {
    repro_video.volume = Math.min(1, repro_video.volume + 0.1);
  }
}

// Bajar volumen.
function BajarVolumen() {
  if (repro_video.volume > 0) {
    repro_video.volume = Math.max(0, repro_video.volume - 0.1);
  }
}

// Mostrar duración del video en segundos
function MostrarDuracion() {
  alert('La duración del video es de: ' + repro_video.duration + ' segundos');
}

// Mostrar el nivel del audio
function MostrarVolumen() {
  alert(
    'El volumen tiene el siguiente valor: ' + repro_video.volume + ' sobre 1'
  );
}

// Indica si el reproductor tiene los controles visibles
function ControlesActivos() {
  if (repro_video.controls) {
    alert('Los controles están activos');
    repro_video.controls = false;
    alert('Pero ya no');
  } else {
    alert('Los controles no están activos');
    repro_video.controls = true;
    alert('Ahora han vuelto');
  }
}
