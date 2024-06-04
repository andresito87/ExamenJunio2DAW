$('#opcion1').click(function () {
  $('.imagen_ejercicio').css({
    border: '10px solid blue',
  });
  $('#cambios_aplicados').append(' Opcion 1 Ejecutada');
});

$('#opcion2').click(function () {
  $('.imagen_ejercicio').css({
    filter: 'grayscale(100%)',
  });
  $('#cambios_aplicados').append(' Opcion 2 Ejecutada');
});

$('#opcion3').click(function () {
  $('.imagen_ejercicio').css({
    width: '150px',
    height: '80px',
  });
  $('#cambios_aplicados').append(' Opcion 3 Ejecutada');
});

//retrasar la aplicacion del filtro
$('#opcion4').click(function () {
  $('.imagen_ejercicio').fadeOut(1000, function () {
    $('.imagen_ejercicio')
      .css({
        //invertir colores
        filter: 'invert(100%)',
      })
      .fadeIn(1000);
  });
  $('#cambios_aplicados').append(' Opcion 4 Ejecutada');
});
