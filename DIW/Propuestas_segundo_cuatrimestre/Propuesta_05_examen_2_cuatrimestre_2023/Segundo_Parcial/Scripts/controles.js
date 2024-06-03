document.addEventListener('DOMContentLoaded', function () {
  let repro_video = document.getElementById('video');

  // Iniciamos la reproducción
  function iniciar() {
    repro_video.play();
  }

  // Pausamos la reproducción
  function pausar() {
    repro_video.pause();
  }

  document.getElementById('b_play').addEventListener('click', iniciar);
  document.getElementById('b_pause').addEventListener('click', pausar);

  $('#zona_1').click(function () {
    let color = $('#s_color').val();
    $('#zona_1').css({ 'background-color': color, 'border-color': color });
  });

  $('#zona_2').click(function () {
    let color = $('#s_color').val();
    $('#zona_2').css({ 'background-color': color, 'border-color': color });
  });

  $('#zona_3').click(function () {
    let color = $('#s_color').val();
    $('#zona_3').css({ 'background-color': color, 'border-color': color });
  });

  $('#b_gris').click(function () {
    $('#zona_1').css({ filter: 'grayscale(80%)', 'border-color': 'black' });
    $('#zona_2').css({ filter: 'grayscale(80%)', 'border-color': 'black' });
    $('#zona_3').css({ filter: 'grayscale(80%)', 'border-color': 'black' });
  });

  $('#b_colores_letra').click(function () {
    $('#mensajeColores').text(
      'Los colores de la bandera son: ' +
        $('#zona_1').css('background-color') +
        ', ' +
        $('#zona_2').css('background-color') +
        ', ' +
        $('#zona_3').css('background-color') +
        ''
    );
  });

  /*Cambiar  orientación  vertical:  la  bandera  desaparecerá  con  un  efecto  fadeIn,  las  zonas  que  conforman  la 
bandera se mostrarán en posición vertical y se volverá a mostrar la bandera con un efecto fadeOut.*/

  $('#b_orientacion').click(function () {
    let estaVertical = $('#bandera').css('flex-direction') == 'column';
    $('#bandera').fadeOut(1000, function () {
      if (estaVertical) {
        $('#bandera').css({
          display: 'flex',
          'flex-direction': 'row',
        });
      } else {
        $('#bandera').css({
          display: 'flex',
          'flex-direction': 'column',
        });
      }
      $('#zona_1').css({ width: '100%', height: '100%' });
      $('#zona_2').css({ width: '100%', height: '100%' });
      $('#zona_3').css({ width: '100%', height: '100%' });
      $('#bandera').fadeIn(1000);
    });
  });
});
