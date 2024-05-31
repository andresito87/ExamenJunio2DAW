// Importar la libreria jQuery
/*<!--JQuery-->
    <!--CDN-->
    <!--<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>-->
    <!--Local-->
    <script src="./scripts/jquery/jquery-3.7.1.js"></script>*/

// Acceder a un elemento del DOM
// $(document).on( "ready", handler ) y $(document).ready( handler ) son equivalentes y están obsoletos. Se debe usar $( handler ) en su lugar.
$(function () {
  $('#cargarTexto').on('click', function (event) {
    // append() es para añadir un elemento al final del elemento seleccionado
    $('#mensaje').append('<p>Texto creado</p>');
    $('#mensaje').css('color', 'red');
    $('#mensaje').css('font-size', '20px');
    // text() es para cambiar el texto del elemento seleccionado
    $('#mensaje').text('Texto creado');
    console.log(event.currentTarget);
  });
});

$(function () {
  $('#mostrar').on('click', function (event) {
    $('#mensaje').show();
    console.log(event.currentTarget);
  });
});

// Oculta un elemento del DOM
$(function () {
  $('#ocultar').on('click', function (event) {
    $('#mensaje').hide();
    console.log(event.currentTarget);
  });
});

// Obtener el valor de un input
$(function () {
  $('#enviar').on('click', function (event) {
    // cancelamos el envio del formulario
    event.preventDefault();
    // obtenemos el valor de los inputs
    let nombre = $('#nombre').val();
    let apellido = $('#apellidos').val();
    // mostramos los datos dentro del div con un parrafo
    $('#datosFormulario').append('<p>Hola ' + nombre + ' ' + apellido + '</p>');
  });
});

// Cambiar el tamaño de la fuente de un texto en funcion de un input tipo range
$(function () {
  $('#cambiarFuente').on('change', function (event) {
    let tamaño = $('#cambiarFuente').val();
    $('#cambiarTamanyoFuente').css('font-size', tamaño + 'px');
  });
});

// Dar estilo a un texto en funcion de un input tipo checkbox
$(function () {
  $('#negrita').on('change', function (event) {
    if ($('#negrita').is(':checked')) {
      $('#cambiarNegrita').css('font-weight', 'bold');
    } else {
      $('#cambiarNegrita').css('font-weight', 'normal');
    }
  });
});

// Cambiar el color de un texto en funcion de un input tipo select
$(function () {
  $('#color').on('input', function (event) {
    let color = $('#color').val();
    $('#cambiarColor').css('color', color);
  });
});

// Dar estilos de un mensaje, propiedades css o mediante clases
$(function () {
  $('#cambiarEstilos').on('click', function (event) {
    $('#modificarEstilos').css('color', 'blue');
    $('#modificarEstilos').addClass('mensaje');
  });
});

// Ordenar y mostrar una lista de paises y capitales
$(function () {
  let paises = {
    India: 'New Delhi',
    'United States': 'Washington D.C.',
    England: 'London',
    Australia: 'Canberra',
  };
  $('h3#paises').text('Lista de paises y sus capitales:');
  $('div.paises').append('<table></table>');
  $('div.paises table').append(
    '<thead><tr><th>Pais</th><th>Capital</th></tr></thead><tbody></tbody>'
  );
  $.each(paises, function (key, value) {
    $('div.paises tbody').append(
      '<tr><td>' + key + ' </td><td>' + value + '</td></tr>'
    );
  });
  $('div.paises table thead tr th').css('border', '1px solid black');
  $('div.paises table thead').css('background-color', 'lightgreen');
  $('div.paises table tbody tr td').css('border', '1px solid black');
  $('div.paises table tbody').css('background-color', 'lightblue');
});

// Obtener el alumno con la mejor nota
$(function () {
  let alumnos = {
    Juan: 5,
    Maria: 7,
    Pedro: 6,
    Ana: 8,
  };
  let mejorNota = 0;
  let mejorAlumno = '';
  $.each(alumnos, function (key, value) {
    if (value > mejorNota) {
      mejorNota = value;
      mejorAlumno = key;
    }
  });
  $('p#mejorAlumno').text('El alumno con mejor nota es: ' + mejorAlumno);
});

// Cambiar imagen en funcion de un input tipo select
$(function () {
  $('#selectorImagen').on('change', function (event) {
    let imagen = $('#selectorImagen').val();
    let descripcion = $('#selectorImagen option:selected').text();
    $('#imagen').attr('src', imagen);
    $('#imagen').css('width', '200px');
    $('#imagen').css('alt', descripcion);
    $('#imagen').css('display', 'block');
  });
});
