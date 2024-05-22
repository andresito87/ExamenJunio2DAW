// Cuando el documento esté cargado
$(document).ready(function () {
  // Inicializar la página
  $.inicializar();

  // ------------------------------------------//
  // Cambiar imagen de cabecera
  // ------------------------------------------//
  // Cambio de imagen de cabecera cuando hago click en ella
  $('.logo_cabecera').click(function () {
    // Compruebo si la imagen actual es la del logo o la de la chica
    if ($(this).attr('src') == '../images/pel_ani_01.png')
      // Usar animación para desaparecer la imagen
      $(this).fadeOut(1000, function () {
        // Cambiar la imagen
        $(this).attr('src', '../images/logo_ies_aguadulce.png');
        // Cambiar el atributo alt
        $(this).attr('alt', 'Logo del IES Aguadulce');
        // Cambiar el tamaño de la imagen
        $(this).css({
          width: '120px',
          height: '70px',
        });
        // Usar animación para aparecer la imagen
        $(this).fadeIn(1000);
      });
    // Usar animación para desaparecer la imagen
    else
      $(this).fadeOut(1000, function () {
        // Cambiar la imagen
        $(this).attr('src', '../images/pel_ani_01.png');
        // Cambiar el atributo alt
        $(this).attr('alt', 'Imagen de la cabeza de una chica');
        // Cambiar el tamaño de la imagen
        $(this).css({
          width: '70px',
          height: '70px',
        });
        // Usar animación para aparecer la imagen
        $(this).fadeIn(1000);
      });
  });

  // -------------------------------------------------------------------//
  // Mostrar y ocultar el menú de navegación Zona de imagen, Zona de texto
  // -------------------------------------------------------------------//
  // Cuando se haga clic en el checkbox de imagen
  $('#imagen').on('change', function () {
    if ($(this).is(':checked')) {
      $('.contenedor_imagen').slideDown();
    } else {
      $('.contenedor_imagen').slideUp();
    }
  });

  // Cuando se haga clic en el checkbox de texto
  $('#texto').on('change', function () {
    if ($(this).is(':checked')) {
      $('.contenedor_texto').fadeIn();
    } else {
      $('.contenedor_texto').fadeOut();
    }
  });

  // Cunado pulsamos en el botón inicializar
  $('#inicializar').click(function () {
    $.inicializar();
  });

  // ------------------------------------------//
  // Zonas de miniaturas: Selección de miniatura
  // ------------------------------------------//
  // Cuando se haga click en una miniatura, cambiar a clase imagen_seleccionada
  $('.miniaturas img').click(function () {
    // Cambiar la clase de la imagen seleccionada a traves de su id
    $.cambiarASeleccionada($(this).attr('id'));
  });

  // ------------------------------------------//
  // Zonas de imagenes: Cambiar posicionamiento
  // ------------------------------------------//
  //lo hago porque sino los radio button se mueven al hacer click en ellos, pequeños saltos, muy incomodos
  let altura = $('.visual_img').height();
  $('.visual_img').css('height', altura);
  // Cuando se haga click en el checkbox de horizonta
  $('#horizontal').on('change', function () {
    if ($(this).is(':checked')) {
      $.cambiarPosicionamientoZonaImagenes('horizontal');
    }
  });

  // Cuando se haga click en el checkbox de vertical
  $('#vertical').on('change', function () {
    if ($(this).is(':checked')) {
      $.cambiarPosicionamientoZonaImagenes('vertical');
    }
  });

  // ------------------------------------------//
  // Zonas de imagenes: Cambiar color de fondo
  // ------------------------------------------//
  // Cuando se haga click en el selector de colores, cambiar el color de fondo
  $('#seleccion_color').change(function () {
    let colorSeleccionado = $(this).val();
    $('.visual_img').css('background-color', colorSeleccionado);
  });

  // ------------------------------------------------//
  // Zonas de imagenes: Cambiar filtro de imagen grande
  // ------------------------------------------------//
  // Cuando se haga click en el selector de filtros, cambiar el filtro
  let filtroSeleccionado = 'sin_filtro';
  $('#filtro').change(function () {
    filtroSeleccionado = $(this).val();
    switch (filtroSeleccionado) {
      case '1':
        filtroSeleccionado = 'filtro_escala_gris';
        break;
      case '2':
        filtroSeleccionado = 'filtro_inversion';
        break;
      case '3':
        filtroSeleccionado = 'filtro_sepia';
        break;
      case '4':
        filtroSeleccionado = 'filtro_saturacion';
        break;
      default:
        filtroSeleccionado = 'sin_filtro';
        break;
    }
  });

  // -----------------------------------------------//
  // Zonas de imagenes: Cambiar borde de imagen grande
  // ------------------------------------------------//
  // Cuando se haga click en una imagen grande, cambiar el borde de la imagen clicada
  $('#borde').change(function () {
    grosorBorde = $(this).val();
  });

  // ------------------------------------------//
  // Zonas de imagenes: Cambiar imagen grande
  // ------------------------------------------//
  // Cuando se haga click en una imagen grande, esta cambiará a la seleccionada, con los estilos correspondientes, su atributo alt correspondiente y el efecto slide
  $('.div_img_grande img').click(function () {
    // Cambiar el color del borde del div de la imagen grande
    $('.div_img_grande').click(function () {
      $(this).css('border-color', $('#seleccion_color_borde').val());
    });

    // Cambiar el grosor borde del div de la imagen grande
    $('.div_img_grande').click(function () {
      $(this).css('border-width', $('#borde').val() + 'px');
    });

    $(this).slideUp('slow', function () {
      $(this).attr('src', $('.imagen_seleccionada').attr('src'));
      $(this).attr('alt', $('.imagen_seleccionada').attr('alt'));
      $(this).slideDown('slow');
      // Cambiar el filtro de la imagen seleccionada
      $.cambiarFiltro($(this).attr('id'), filtroSeleccionado);
    });
    // Vaciar la zona donde se ve el origen de las imagenes seleccionadas
    $('#mostrar_origen_imagenes').empty();
    // Ocultar la zona donde se ve el origen de las imagenes seleccionadas
    $('#mostrar_origen_imagenes').hide();
  });

  // --------------------------------------------------//
  // Zonas de imagenes: Ver origen imagenes seleccionadas
  // --------------------------------------------------//
  // Cuando se haga click en el boton de ver origen, mostrará el origen de las imagenes seleccionadas
  $('.bot_origen').click(function () {
    // Eliminar todo sus hijos
    $('#mostrar_origen_imagenes').empty();
    // Muestra el div
    $('#mostrar_origen_imagenes').show();
    let parrafoImagenesSeleccionadas = $.obtenerParrafoImagenesSeleccionadas();
    $('#mostrar_origen_imagenes').append(parrafoImagenesSeleccionadas);
  });

  // --------------------------------------------------//
  // Zonas de texto: Mostrar/ocultar texto
  // --------------------------------------------------//
  // Cuando se haga click en el boton de mostrar/ocultar texto, mostrará u ocultará el texto, cambiará el color de fondo, el color de la fuente y a una velocidad determinada
  $('#mostrar_slide').click(function () {
    // si el titulo 1 está visible, oculatarlo y mostrar el titulo 2
    if ($('#titulo_1').is(':visible')) {
      // transformar a entero la velocidad
      $('#titulo_1').slideUp(parseInt($('#velocidad').val()), function () {
        $('.visual_txt').css('background-color', '#000000');
        $('#titulo_2').css('color', '#ffffff');
        $('#titulo_2').slideDown(parseInt($('#velocidad').val()));
      });
    } else {
      // si el titulo 2 está visible, oculatarlo y mostrar el titulo 1
      // transformar a entero la velocidad
      $('#titulo_2').slideUp(parseInt($('#velocidad').val()), function () {
        $('.visual_txt').css('background-color', '#ffffff');
        $('#titulo_1').slideDown(parseInt($('#velocidad').val()));
      });
    }
    // ocultar el boton de mostrar/ocultar texto
    $('#mostrar_slide').hide();
    // ocultar el input de velocidad
    $('#div_velocidad').hide();
  });

  // Separación entre caracteres de la zona de texto
  $('#separacion').click(function () {
    $('#titulo_1').css('letter-spacing', $('#separacion').val() + 'px');
    $('#titulo_2').css('letter-spacing', $('#separacion').val() + 'px');
  });

  // Tipo de fuente de la zona de texto
  let tipoFuente = 'fuente_1';
  $('#fuente').change(function () {
    tipoFuente = $(this).val();
    switch (tipoFuente) {
      case '1':
        tipoFuente = 'fuente_1';
        break;
      case '2':
        tipoFuente = 'fuente_2';
        break;
      case '3':
        tipoFuente = 'fuente_3';
        break;
      case '4':
        tipoFuente = 'fuente_4';
        break;
      default:
        tipoFuente = 'fuente_1';
        break;
    }
    // Eliminar todas las clases de fuente
    $('#titulo_1').removeClass('fuente_1');
    $('#titulo_1').removeClass('fuente_2');
    $('#titulo_1').removeClass('fuente_3');
    $('#titulo_1').removeClass('fuente_4');
    $('#titulo_2').removeClass('fuente_1');
    $('#titulo_2').removeClass('fuente_2');
    $('#titulo_2').removeClass('fuente_3');
    $('#titulo_2').removeClass('fuente_4');
    // Añadir la clase de fuente seleccionada
    $('#titulo_1').addClass(tipoFuente);
    $('#titulo_2').addClass(tipoFuente);
  });

  // --------------------------------------------------//
  // Zona Historial: Guardar historial
  // --------------------------------------------------//
  // Guardo acciones realizadas en el historial
  // Crear el historial de acciones realizadas
  let arrayHistorial = [];
  // Hago llamadas a la función guardarAccionEnHistorial cuando cambien los valores o hagan clic en el boton de mostrar/ocultar texto
  //guardarAccionEnHistorial a su vez llamará a la función actualizarHistorial para mostrar el historial actualizado

  $('#mostrar_slide').click(function () {
    // llamar a la función de guardar en el historial
    $.guardarAccionEnHistorial('Mostrar/Ocultar con efecto', arrayHistorial);
  });

  $('#velocidad').change(function () {
    $.guardarAccionEnHistorial('Cambio de velocidad', arrayHistorial);
  });

  $('#separacion').change(function () {
    $.guardarAccionEnHistorial('Cambio de separación letras', arrayHistorial);
  });

  $('#fuente').change(function () {
    $.guardarAccionEnHistorial('Cambio de tipo de fuente', arrayHistorial);
  });
});

// Función para inicializar: Restablece los valores por defecto de toda la página menos el historial
$.inicializar = function inicializar() {
  // Encabezado, logo
  $('.logo_cabecera').attr('src', '../images/pel_ani_01.png');
  $('.logo_cabecera').attr('alt', 'Imagen de la cabeza de una chica');
  $('.logo_cabecera').css({ width: '70px', height: '70px' });

  // Menú de navegación, checkbox
  $('#imagen').prop('checked', true);
  $('#texto').prop('checked', true);

  // Zona de imagen
  $('.contenedor_imagen').show();

  // Zona de texto
  $('.contenedor_texto').show();

  // Zona de miniaturas
  // Quitar la clase imagen_seleccionada a todas las miniaturas
  $('.miniaturas img').removeClass('imagen_seleccionada');
  // Añadir la clase imagen_seleccionada a la primera miniatura
  $('#mini1').addClass('imagen_seleccionada');

  // Zona posicionamiento de las imagenes
  $('#horizontal').prop('checked', true);

  // Zona de imagenes
  $.cambiarPosicionamientoZonaImagenes('horizontal');

  // Color de fondo
  $('#seleccion_color').val('#ff66ff');
  $('.visual_img').css('background-color', '#ff66ff');

  // Zona de filtros(filtro por defecto sin filtro)
  $('#filtro').val('5');
  // Fuerzo a que se ejecute el evento change para que se actualice el filtro seleccionado
  $('#filtro').change();

  // Zona de imagenes grandes
  // Cambiar todas las imagenes grandes por el logo IES Aguadulce
  $('.div_img_grande img').attr('src', '../images/logo_ies_aguadulce.png');
  $('.div_img_grande img').attr('alt', 'Logo del IES Aguadulce');
  $('.div_img_grande img').each(function () {
    $(this).removeClass();
    $(this).addClass('sin_filtro');
  });
  // Cambiar grosor y color del borde al valor por defecto
  $('.div_img_grande').css({
    'border-width': '2px',
    'border-color': '#3366ff',
  });

  // Cambiar el color del borde al valor por defecto
  $('#borde').val('2');

  // Cambiar el color del borde al valor por defecto
  $('#seleccion_color_borde').val('#3366ff');

  // Zona para mostrar el origen de las imagenes seleccionadas
  // Se cambia por el texto por defecto
  $('#mostrar_origen_imagenes').html(
    '<p>Insertar orígenes de las imágenes</p>'
  );
  // Muestro el div de origen de las imagenes seleccionadas
  $('#mostrar_origen_imagenes').show();

  // Zona de texto
  $('.visual_txt').css('background-color', '#ffffff');
  $('#titulo_1').show();
  $('#titulo_2').hide();

  // Velocidad por defecto del efecto slide en zona de texto
  $('#velocidad').val('500');

  // Separación entre caracteres por defecto
  $('#separacion').val('0');
  $('#titulo_1').css('letter-spacing', '0px');
  $('#titulo_2').css('letter-spacing', '0px');
  $('#titulo_1').removeClass();
  $('#titulo_1').addClass('fuente_1');
  $('#titulo_2').removeClass();
  $('#titulo_2').addClass('fuente_1');

  // Tipo de fuente por defecto y fuerzo a que se ejecute el evento change para que se actualice la fuente seleccionada
  $('#fuente').val('1');
  $('#titulo_1').removeClass();
  $('#titulo_1').addClass('fuente_1');
  $('#titulo_2').removeClass();
  $('#titulo_2').addClass('fuente_1');

  // Zona texto: mostrar boton de mostrar/ocultar texto y el input de velocidad
  $('#mostrar_slide').show();
  $('#div_velocidad').show();
};

// Función para cambiar a la imagen seleccionada
$.cambiarASeleccionada = function cambiarASeleccionada(
  idImagenActualSeleccionada
) {
  let idImagenAnteriorSeleccionada = '';
  let numeroMiniaturas = 7;
  for (let i = 1; i <= numeroMiniaturas; i++) {
    if (
      $('#mini' + i).hasClass('imagen_seleccionada') &&
      idImagenActualSeleccionada != 'mini' + i
    ) {
      idImagenAnteriorSeleccionada = 'mini' + i;
    }
  }
  if (idImagenAnteriorSeleccionada != '') {
    $('#' + idImagenAnteriorSeleccionada).removeClass('imagen_seleccionada');
    $('#' + idImagenActualSeleccionada).addClass('imagen_seleccionada');
  }
};

// Función para cambiar la posicionamiento de las imagenes
$.cambiarPosicionamientoZonaImagenes =
  function cambiarPosicionamientoZonaImagenes(direccion) {
    if (direccion == 'horizontal') {
      $('.visual_img').removeClass('posicionamiento_vertical');
      $('.visual_img').addClass('posicionamiento_horizontal');
    } else {
      $('.visual_img').removeClass('posicionamiento_horizontal');
      $('.visual_img').addClass('posicionamiento_vertical');
    }
  };

// Función para localizar el filtro aplicado y cambiarlo por el seleccionado
$.cambiarFiltro = function cambiarFiltro(idImagen, filtroSeleccionado) {
  // Quitar el filtro actual
  $('#' + idImagen).removeClass('filtro_escala_gris');
  $('#' + idImagen).removeClass('filtro_inversion');
  $('#' + idImagen).removeClass('filtro_sepia');
  $('#' + idImagen).removeClass('filtro_saturacion');
  $('#' + idImagen).removeClass('sin_filtro');
  // Aplicar el filtro seleccionado
  $('#' + idImagen).addClass(filtroSeleccionado);
};

// Función obtener parrafo de imagenes seleccionadas
$.obtenerParrafoImagenesSeleccionadas =
  function obtenerParrafoImagenesSeleccionadas() {
    let parrafoImagenesSeleccionadas = document.createElement('p');
    $('.div_img_grande img').each(function (index) {
      let span_numero_imagen = document.createElement('span');
      $(span_numero_imagen).addClass('numero_imagen');
      let textoNumeroImagen = document.createTextNode(`Imagen ${index + 1}:`);
      span_numero_imagen.appendChild(textoNumeroImagen);
      let textoParrafo = document.createTextNode(
        ` Tiene como origen ${$(this).attr('src')}`
      );
      parrafoImagenesSeleccionadas.appendChild(span_numero_imagen);
      parrafoImagenesSeleccionadas.appendChild(textoParrafo);
      // añadir un salto de línea
      parrafoImagenesSeleccionadas.appendChild(document.createElement('br'));
    });
    return parrafoImagenesSeleccionadas;
  };

// Función para guardar accion en el historial
$.guardarAccionEnHistorial = function guardarAccionEnHistorial(
  accion,
  arrayHistorial
) {
  // Añadir el string 'accion' al historial
  arrayHistorial[arrayHistorial.length] = accion;
  // Actualizar el historial
  $.actualizarHistorial(arrayHistorial);
};

// Función para actualizar el historial
$.actualizarHistorial = function actualizarHistorial(arrayHistorial) {
  // Crear un nuevo párrafo con el historial
  let parrafoHistorial = document.createElement('p');
  let textoAccion = document.createTextNode(
    `${arrayHistorial.length} : ${arrayHistorial[arrayHistorial.length - 1]}`
  );
  parrafoHistorial.appendChild(textoAccion);

  // Insertar el nuevo párrafo en el historial, en la segunda posición, después del primer párrafo
  $('#historial').children().eq(0).after(parrafoHistorial);
};
