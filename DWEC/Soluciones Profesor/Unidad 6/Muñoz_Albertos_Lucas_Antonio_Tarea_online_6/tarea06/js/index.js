//documento js adjunto a la tarea06

$(document).ready(function () {
  // ciudad sobre la que introdice la variable del input
  let ciudad = '';
  // boton tiempo actual en la ciudad buscada
  $('#btnhoy').click(function (evt) {
    evt.preventDefault();
    ciudad = $('#localidad').val();
    if (campoCiudadVacio()) {
      alert('campo vaioc');
    }
    $('#leaflet,#zonaleaflet').hide();
    obtenerTiempoHoy(ciudad);
  });

  // oculta los apartados sobre los que se muestra la informacion
  // $("#mapa").hide();
  $('#informacion').hide();
  $('#leaflet,#zonaleaflet').hide();

  // boton para conocer la previsión de 10 dias
  $('#btn10dias').click(function (evt) {
    evt.preventDefault();
    ciudad = $('#localidad').val();
    $('#leaflet,#zonaleaflet').hide();
    if (campoCiudadVacio()) {
      $('#contenido div:first').html("<h3 id='error'>Campo ciudad vacio</h3>");
      $('#informacion').hide();
    } else {
      tiempo10dias(ciudad);
      $('#error').html('');
    }
  });

  // boton que da la prevision de mi ubicacion
  $('#btnlocalizacion').click(function (evt) {
    evt.preventDefault();
    $('#leaflet,#zonaleaflet').hide();
    obtenerTiempoGPS();
  });

  // boton para la prevision sobre una localizacion pulsada en el mapa
  $('#btnMapa').click(function (evt) {
    evt.preventDefault();
    $('#localidad').val('');
    $('#informacion').hide();
    $('#leaflet,#zonaleaflet').fadeIn();

    obtenerTiempoGPSLeaflets();
  });

  // accion al pulsar sobre mas datos, contenedor de datos que se muestra al usuario
  $('#informacion .pronostico #infoTiempoHoy #otros p:first').on(
    'click',
    function (e) {
      e.preventDefault();
      console.log(
        $('#informacion .pronostico #infoTiempoHoy #otros #datos').is(
          ':visible'
        )
      );
      if (
        $('#informacion .pronostico #infoTiempoHoy #otros #datos').is(
          ':visible'
        )
      ) {
        $('#informacion .pronostico #infoTiempoHoy #otros #datos').slideUp();
        $('#informacion .pronostico #infoTiempoHoy #otros p:first').html(
          'Más Datos &#8595'
        );
      } else {
        $('#informacion .pronostico #infoTiempoHoy #otros #datos').slideDown();
        $('#informacion .pronostico #infoTiempoHoy #otros p:first').html(
          '&#8593'
        );
      }
      // console.log($(this));
    }
  );

  // accion al pulsar sobre la opction de horas de la prevision que se muestra al usuario
  $('#informacion .pronostico #infoTiempoHoy #datosHora p:first').on(
    'click',
    function () {
      if (
        $('#informacion .pronostico #infoTiempoHoy #datosHora #datos').is(
          ':visible'
        )
      ) {
        $(
          '#informacion .pronostico #infoTiempoHoy #datosHora #datos'
        ).slideUp();
      } else {
        $(
          '#informacion .pronostico #infoTiempoHoy #datosHora #datos'
        ).slideDown();
      }
    }
  );

  // function para onbterner la prevision de la ciudad que se encuentra en el input text
  function obtenerTiempoHoy(ciudad) {
    // / Mostrar el GIF de carga al cargar la página
    $('#carga').css({ display: 'block' });
    //se oculta la informacion
    $('#informacion').hide();
    $('#infoTiempo10dias').hide();
    // si se produce una busqueda fallida se muestra el mensaje de errro
    $('#fallobusqueda').remove();

    // Retrasar la visualización del contenido por 5 segundos
    setTimeout(function () {
      // Ocultar el GIF de carga
      $('#carga').css({ display: 'none' });
      // Mostrar el contenido
      $('#informacion').show();

      // console.log("la ciudad buscada:" +ciudad);

      let pais = 'ES';
      // la ciudad no esta en España
      if (ciudad.includes(',')) {
        pais = ciudad.split(',')[1].toUpperCase();
        ciudad = ciudad.split(',')[0];
      }
      // llamada a metodo que consulta la API de geoDB
      obtenerCiudad(ciudad, pais);

      // clave de visualcrossing
      let apiKey = 'DS7BFPFTTE5B6D7XXTVURARVD';
      let url =
        'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' +
        ciudad +
        '%2C' +
        pais +
        '/today?unitGroup=metric&key=' +
        apiKey +
        '&contentType=json&lang=es';

      // peticion de datos a la API
      fetch(url)
        .then(result => {
          /*   console.log(result.status);                    
                    console.log(result);*/
          ///  result.json(); //mal
          // console.log(result.ok);
          // console.log(result.status);
          if (result.status == 200 && result.ok == true) {
            $('#fallobusqueda').remove();
          } else {
            $('#informacion').hide();
            $('body').append(
              "<h2 id='fallobusqueda'>No se encuentra la ciudad</h2>"
            );
          }
          return result.json(); // lo último.
        })
        .then(datos_devueltos => {
          let longitud, latitud;
          console.log(datos_devueltos);

          longitud = datos_devueltos.longitude;
          latitud = datos_devueltos.latitude;
          // console.log(longitud);
          // console.log(latitud);
          // cambiarmapa(longitud,latitud);

          $('#mapa').slideDown();
          // estilos
          $('.pronostico').css({
            display: 'flex',
            'flex-direction': 'row',
            'align-items': 'center',
          });
          $('#infoTiempoHoy').css({
            display: 'flex',
            'flex-direction': 'column',
            'align-items': 'center',
            border: '5px solid black',
            margin: 'auto 30px',
            background: '#f9f946',
            padding: '20px',
          });

          $('#infoTiempoHoy p').css({ margin: '5px auto' });
          $('#informacion #infoTiempoHoy div').css({
            background: '#fffd8f',
            width: '450px',
            'text-align': 'center',
            margin: '5px 10px',
          });
          $('#informacion #infoTiempoHoy p').css({ 'font-weight': 'bolder' });
          //parametros a mostar
          let parametros = $('#informacion .pronostico #infoTiempoHoy');
          // console.log(parametros);

          // añadimos los datos que hemos obtenido
          parametros
            .find('#ciudad')
            .html(
              datos_devueltos.resolvedAddress.split(',')[0] +
                ',' +
                datos_devueltos.resolvedAddress.split(',')[2]
            )
            .css({ color: 'white', 'text-shadow': '0px 0px 5px black' });
          parametros
            .find('#icono')
            .html(
              "<img src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/2nd%20Set%20-%20Color/" +
                datos_devueltos.days[0].icon +
                ".svg' width='100px'/>"
            )
            .css({
              'border-radius': '10%',
              border: '1px solid black',
              background: 'white',
              padding: '5px',
            });
          parametros
            .find('#descripcion')
            .html(datos_devueltos.days[0].description);
          parametros
            .find('#temperaturas')
            .html(
              "<p style='text-align:center;'>Temperatura: <br>" +
                datos_devueltos.days[0].tempmax +
                '&#186 / ' +
                datos_devueltos.days[0].tempmin +
                '&#186'
            )
            .css({ 'font-size': '32px' });
          parametros
            .find('#precipitacion')
            .html(
              "<p style='text-align:center;'>Precipitación:<br>Lluvia: " +
                datos_devueltos.days[0].precipprob +
                '%' +
                '  Nieve: ' +
                datos_devueltos.days[0].snow +
                '%</p>'
            );
          parametros
            .find('#humedad')
            .html('Humedad: ' + datos_devueltos.days[0].humidity);
          parametros
            .find('#IRU')
            .html(
              'Indice Rayos Ultravioleta: ' + datos_devueltos.days[0].uvindex
            );
          parametros
            .find('#viento')
            .find('#vientovelocidad')
            .html(datos_devueltos.days[0].windspeed + 'km/h');
          parametros
            .find('#viento')
            .find('#vientodireccion')
            .html(
              datos_devueltos.days[0].winddir +
                '&#186;Rafagas: ' +
                datos_devueltos.days[0].windgust +
                'km/h'
            );
          parametros
            .find('#estaciones')
            .html(
              'Estaciones de donde de adquieren los datos: ' +
                datos_devueltos.days[0].stations.join('|')
            );
          parametros
            .find('#otros p:first')
            .css({ background: 'black', color: 'white', margin: '0px' });
          parametros
            .find('#otros #datos')
            .html(
              'Presión:' +
                datos_devueltos.days[0].pressure +
                'hPa<br>Rocío:' +
                datos_devueltos.days[0].dew +
                '<br>Hora Amanecer: ' +
                datos_devueltos.days[0].sunrise +
                '<br>Hora atardecer: ' +
                datos_devueltos.days[0].sunset +
                '<br>Visibilidad: ' +
                datos_devueltos.days[0].visibility
            );
          parametros.find('#otros #datos').fadeOut();
          parametros
            .find('#otros #datos')
            .css({
              background: '#eaba62',
              margin: '0px',
              margin: '0px 2px 2px',
            });

          //datos por hora
          parametros
            .find('#datosHora')
            .css({ color: 'yellow', background: 'olive' });
          parametros.find('#datosHora #datos').hide();

          //selector de hora
          datosHora = $('#informacion #infoTiempoHoy #datosHora #datos');
          $('#informacion #infoTiempoHoy #datosHora #datos').html(
            "<label for='hora'>Seleccione hora:</label><select name='hora' id='hora'>"
          );
          for (let hora = 0; hora < 24; hora++) {
            if (hora == 12) {
              $('#informacion #infoTiempoHoy #datosHora #datos #hora').append(
                "<option value='" + hora + "' selected>" + hora + ':00</option>'
              );
            } else {
              $('#informacion #infoTiempoHoy #datosHora #datos #hora').append(
                "<option value='" + hora + "'>" + hora + ':00</option>'
              );
            }
          }

          // datos a las 12 del mediodia
          datosHora.css({
            background: 'rgb(89, 112, 234)',
            margin: '4px auto',
            display: 'flex',
            'flex-direction': 'column',
            'align-items': 'center',
            color: 'white',
            width: '99%',
          });
          datosHora.find('p').css({ margin: '5px auto' });
          datosHora.append(
            "<img src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/2nd%20Set%20-%20Color/" +
              datos_devueltos.days[0].hours[12].icon +
              ".svg' width='100px' height='100px'/>"
          );
          datosHora.append(
            "<p id='descripcion'><small>" +
              datos_devueltos.days[0].hours[12].conditions +
              '&#186</p>'
          );
          datosHora.append(
            "<p id='temperatura'>Temperatura: <small>" +
              datos_devueltos.days[0].hours[12].temp +
              '&#186</p>'
          );
          datosHora.append(
            "<p id='viento'>Viento: <small>Velocidad: " +
              datos_devueltos.days[0].hours[12].windspeed +
              ' | Dirección: ' +
              datos_devueltos.days[0].hours[12].winddir +
              '&#186</small></p>'
          );
          datosHora.append(
            "<p id='precipitacion'>Precipitación: <small> " +
              datos_devueltos.days[0].hours[12].precipprob +
              '%(' +
              datos_devueltos.days[0].hours[12].precip +
              'mm)</small></p>'
          );
          datosHora.append(
            "<p id='humedad'>Humedad: <small> " +
              datos_devueltos.days[0].hours[12].humidity +
              '%</small></p>'
          );
          datosHora.hide();
          // // cambio de datos al cambiar la hora
          $('#informacion #infoTiempoHoy #hora').on('change', function () {
            horaElegida = datosHora.find('select').val();
            // console.log(horaElegida);
            datosHora
              .find('img')
              .attr(
                'src',
                'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/2nd%20Set%20-%20Color/' +
                  datos_devueltos.days[0].hours[horaElegida].icon +
                  '.svg'
              );
            datosHora
              .find('#descripcion small')
              .html(datos_devueltos.days[0].hours[horaElegida].conditions);
            datosHora
              .find('#temperatura small')
              .html(datos_devueltos.days[0].hours[horaElegida].temp + '&#186');
            datosHora
              .find('#viento small')
              .html(
                'Velocidad: ' +
                  datos_devueltos.days[0].hours[horaElegida].windspeed +
                  ' | Dirección: ' +
                  datos_devueltos.days[0].hours[horaElegida].winddir +
                  '&#186'
              );
            datosHora
              .find('#precipitacion small')
              .html(
                datos_devueltos.days[0].hours[horaElegida].precipprob +
                  '%(' +
                  datos_devueltos.days[0].hours[horaElegida].precip +
                  ' mm)'
              );
            datosHora
              .find('#humedad small')
              .html(datos_devueltos.days[0].hours[horaElegida].humidity + '%');
          });

          //mapa

          cambiarmapa(datos_devueltos.longitude, datos_devueltos.latitude);
        })
        .catch(console.warn)
        .finally(console.warn(`La consulta ha finalizado`));
    }, 2500); // 2.5 segundos
  }

  //funcion que ejecuta una consulta a la api de geodb para obtener los datos de la ciudad que buscamos
  function obtenerCiudad(ciudad, pais) {
    let ciudadBuscada;

    console.log(`Ciudad: ${ciudad},Pais: ${pais}`);
    $.ajax({
      url:
        'http://geodb-free-service.wirefreethought.com/v1/geo/places?limit=10&offset=0&types=CITY&namePrefix=' +
        ciudad +
        '&languageCode=es&sort=population',
      //data: { edadacceso: 21}, // El post al servidor
      type: 'GET',
      dataType: 'json',
      async: true,
      // Si se produce correctamente
      success: function (datos_devueltos) {
        // $("#cambia").html("<br />"); // Acabos de quitar el gif animado
        // console.log(datos_devueltos.data);
        // console.log(datos_devueltos);
        for (let i = 0; i < datos_devueltos.data.length; i++) {
          // console.log(datos_devueltos.data[i]);
          // console.log(datos_devueltos.data[i].countryCode);
          // console.log(pais);
          if (datos_devueltos.data[i].countryCode == pais) {
            // console.log("Ciudad Encontrada");
            // console.log("ciudad:"+datos_devueltos.data[i]);
            ciudadBuscada = datos_devueltos.data[i];
          }
        }

        // console.log(ciudadBuscada);
        let poblacion = $('#informacion #infociudad  #poblacion');
        let estado = $('#informacion #infociudad  #pais');
        let region = $('#informacion #infociudad  #region');

        poblacion.html(ciudadBuscada.population);
        estado.html(ciudadBuscada.country);
        region.html(ciudadBuscada.region);

        $('.datos #infociudad').css({
          display: 'flex',
          'flex-direction': 'row',
          'grid-gap': '50px',
          'text-align': 'center',
          margin: '20px auto',
        });
        $('.datos #infociudad div')
          .find('p:first')
          .css({ 'font-weight': 'bolder', margin: '5px auto' });

        // cambiarmapa(ciudadBuscada.longitude,ciudadBuscada.latitude);
      },
      // Si la petición falla
      error: function (xhr, estado, error_producido) {
        console.warn('Error producido: ' + error_producido);
        console.warn('Estado: ' + estado);
        alert('error');
      },
      //Tanto si falla como si funciona
      complete: function (xhr, estado) {
        console.log('Petición completa');
      },
    });
  }

  //    funcion que da la prevision de 10 dias para la ciudad buscada
  function tiempo10dias(ciudad) {
    console.log(ciudad);

    // / Mostrar el GIF de carga al cargar la página
    $('#carga').css({ display: 'block' });
    //se oculta la informacion
    $('#informacion').hide();
    // si se produce una busqueda fallida se muestra el mensaje de errro
    $('#fallobusqueda').remove();

    // Retrasar la visualización del contenido por 5 segundos
    setTimeout(function () {
      // Ocultar el GIF de carga
      $('#carga').css({ display: 'none' });
      // Mostrar el contenido
      $('#informacion').show();
      $('#infoTiempoHoy').hide();

      // console.log("la ciudad buscada:" +ciudad);

      let pais = 'ES';
      // la ciudad no esta en España
      if (ciudad.includes(',')) {
        pais = ciudad.split(',')[1].toUpperCase();
        ciudad = ciudad.split(',')[0];
      }
      // llamada a metodo que consulta la API de geoDB
      obtenerCiudad(ciudad, pais);

      // clave de visualcrossing
      let apiKey = 'DS7BFPFTTE5B6D7XXTVURARVD';
      // let url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+ciudad+'%2C'+pais+'/today?unitGroup=metric&key='+apiKey+'&contentType=json&lang=es';

      let urlVC =
        'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' +
        ciudad +
        '%2C' +
        pais +
        '/next10days?unitGroup=metric&include=days&key=' +
        apiKey +
        '&contentType=json&lang=es';
      axios({
        method: 'get',
        url: urlVC,
      }).then(function (response) {
        console.log(response);
        let datosDias = response.data.days;
        console.log(datosDias);

        $('.pronostico').css({
          'flex-direction': 'column',
          'text-align': 'center',
        });

        let contenedor = $('#infoTiempo10dias');
        contenedor.css({ display: 'flex', 'flex-direction': 'row' });
        let pronosticodiv = '';
        for (let j = 0; j < 10; j++) {
          pronosticodiv =
            pronosticodiv +
            "<div><p class='fecha'></p><img src='./imagenes/load.gif' width='100px' height='100px'/><p>text</p></div>";
        }
        contenedor.html(pronosticodiv);
        // console.log(pronosticodiv);
        console.log(contenedor.children('div'));
        for (let i = 0; i < datosDias.length; i++) {
          // $("#infoTiempo10dias div").eq(i).find("img").attr("src","https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/2nd%20Set%20-%20Color/"+datosDias[i].icon+".svg");
          // console.log( $("#infoTiempo10dias div"));
          let div = contenedor.find('div').eq(i);
          if (i == 0) {
            div.css({
              background: '#bc82f7',
              border: '5px solid rgb(255, 255, 52)',
            });
            div.find('.fecha').html('Hoy').css({ margin: '0px auto' });
          } else {
            if (i == 1) {
              div.find('.fecha').html('Mañana').css({ margin: '0px auto' });
            } else {
              div.find('.fecha').html(datosDias[i].datetime);
            }
            div.css({
              background: 'rgb(255, 236, 136)',
              border: '2px solid #bbbb13',
            });
          }
          div.css({
            padding: '10px',
            'font-weight': 'bolder',
            margin: '20px 2px',
            display: 'flex',
            'flex-direction': 'column',
            'justify-content': 'space-between',
          });

          div
            .find('img')
            .attr(
              'src',
              'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/2nd%20Set%20-%20Color/' +
                datosDias[i].icon +
                '.svg'
            );
          div
            .find('p:last')
            .html(
              datosDias[i].tempmax +
                '&#186/' +
                datosDias[i].tempmin +
                '&#186<br><br>Precipitación:<br><small>' +
                datosDias[i].precipprob +
                '%</small><br><br>Humedad: <br><small>' +
                datosDias[i].humidity +
                '%</small><br><br><small>' +
                datosDias[i].conditions +
                '</small>'
            )
            .css({ margin: '5px auto' });
        }

        // mapa
        cambiarmapa(response.data.longitude, response.data.latitude);
      });
    }, 2500); // 2.5 segundos
  }

  // funcion que obtiene la previson para la ubicacion del usuario
  function obtenerTiempoGPS() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;

      console.log('Tu ubicación actual es:');
      console.log(`Latitud : ${crd.latitude}`);
      console.log(`Longitud: ${crd.longitude}`);
      // console.log(`Más o menos ${crd.accuracy} metros.`);
      // console.log(crd);

      let longitud = crd.longitude;
      let latitud = crd.latitude;

      console.log(longitud, latitud);
      // / Mostrar el GIF de carga al cargar la página
      $('#carga').css({ display: 'block' });
      //se oculta la informacion
      $('#informacion').hide();
      // si se produce una busqueda fallida se muestra el mensaje de errro
      $('#fallobusqueda').remove();

      // Retrasar la visualización del contenido por 5 segundos
      setTimeout(function () {
        // Ocultar el GIF de carga
        $('#carga').css({ display: 'none' });
        // Mostrar el contenido
        $('#informacion').show();
        $('#infoTiempoHoy').hide();
        $('#infociudad').hide();

        // clave de visualcrossing
        let apiKey = 'DS7BFPFTTE5B6D7XXTVURARVD';
        // let url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+ciudad+'%2C'+pais+'/today?unitGroup=metric&key='+apiKey+'&contentType=json&lang=es';

        // let urlVC="https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+ciudad+"%2C"+pais+"/next10days?unitGroup=metric&include=days&key="+apiKey+"&contentType=json&lang=es";
        let urlVC =
          'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' +
          latitud +
          '%2C' +
          longitud +
          '/today?unitGroup=metric&key=' +
          apiKey +
          '&contentType=json&lang=es';
        axios({
          method: 'get',
          url: urlVC,
        }).then(function (response) {
          console.log(response);

          let datosDia = response.data.days[0];

          $('#mapa').slideDown();
          // estilos
          $('.pronostico').css({
            display: 'flex',
            'flex-direction': 'row',
            'align-items': 'center',
          });
          $('#infoTiempoHoy').css({
            display: 'flex',
            'flex-direction': 'column',
            'align-items': 'center',
            border: '5px solid black',
            margin: 'auto 30px',
            background: '#f9f946',
            padding: '20px',
          });

          $('#infoTiempoHoy p').css({ margin: '5px auto' });
          $('#informacion #infoTiempoHoy div').css({
            background: '#fffd8f',
            width: '450px',
            'text-align': 'center',
            margin: '5px 10px',
          });
          $('#informacion #infoTiempoHoy p').css({ 'font-weight': 'bolder' });
          //parametros a mostar
          let parametros = $('#informacion .pronostico #infoTiempoHoy');
          // console.log(parametros);

          // añadimos los datos que hemos obtenido
          parametros
            .find('#ciudad')
            .html('longitud: ' + longitud + ', latitud: ' + latitud)
            .css({ color: 'white', 'text-shadow': '0px 0px 5px black' });
          parametros
            .find('#icono')
            .html(
              "<img src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/2nd%20Set%20-%20Color/" +
                datosDia.icon +
                ".svg' width='100px'/>"
            )
            .css({
              'border-radius': '10%',
              border: '1px solid black',
              background: 'white',
              padding: '5px',
            });
          parametros.find('#descripcion').html(datosDia.description);
          parametros
            .find('#temperaturas')
            .html(
              "<p style='text-align:center;'>Temperatura: <br>" +
                datosDia.tempmax +
                '&#186 / ' +
                datosDia.tempmin +
                '&#186'
            )
            .css({ 'font-size': '32px' });
          parametros
            .find('#precipitacion')
            .html(
              "<p style='text-align:center;'>Precipitación:<br>Lluvia: " +
                datosDia.precipprob +
                '%' +
                '  Nieve: ' +
                datosDia.snow +
                '%</p>'
            );
          parametros
            .find('#humedad')
            .html('Humedad: ' + datosDia.humidity + '%');
          parametros
            .find('#IRU')
            .html('Indice Rayos Ultravioleta: ' + datosDia.uvindex);
          parametros
            .find('#viento')
            .find('#vientovelocidad')
            .html(datosDia.windspeed + 'km/h');
          parametros
            .find('#viento')
            .find('#vientodireccion')
            .html(
              datosDia.winddir + '&#186;Rafagas: ' + datosDia.windgust + 'km/h'
            );
          parametros
            .find('#estaciones')
            .html(
              'Estaciones de donde de adquieren los datos: ' +
                datosDia.stations.join('|')
            );
          parametros
            .find('#otros p:first')
            .css({ background: 'black', color: 'white', margin: '0px' });
          parametros
            .find('#otros #datos')
            .html(
              'Presión:' +
                datosDia.pressure +
                'hPa<br>Rocío:' +
                datosDia.dew +
                '<br>Hora Amanecer: ' +
                datosDia.sunrise +
                '<br>Hora atardecer: ' +
                datosDia.sunset +
                '<br>Visibilidad: ' +
                datosDia.visibility
            );
          parametros.find('#otros #datos').fadeOut();
          parametros
            .find('#otros #datos')
            .css({
              background: '#eaba62',
              margin: '0px',
              margin: '0px 2px 2px',
            });

          //datos por hora
          parametros
            .find('#datosHora')
            .css({ color: 'yellow', background: 'olive' });
          parametros.find('#datosHora #datos').hide();

          //selector de hora
          datosHora = $('#informacion #infoTiempoHoy #datosHora #datos');
          $('#informacion #infoTiempoHoy #datosHora #datos').html(
            "<label for='hora'>Seleccione hora:</label><select name='hora' id='hora'>"
          );
          for (let hora = 0; hora < 24; hora++) {
            if (hora == 12) {
              $('#informacion #infoTiempoHoy #datosHora #datos #hora').append(
                "<option value='" + hora + "' selected>" + hora + ':00</option>'
              );
            } else {
              $('#informacion #infoTiempoHoy #datosHora #datos #hora').append(
                "<option value='" + hora + "'>" + hora + ':00</option>'
              );
            }
          }

          // datos a las 12 del mediodia
          datosHora.css({
            background: 'rgb(89, 112, 234)',
            margin: '4px auto',
            display: 'flex',
            'flex-direction': 'column',
            'align-items': 'center',
            color: 'white',
            width: '99%',
          });
          datosHora.find('p').css({ margin: '5px auto' });
          datosHora.append(
            "<img src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/2nd%20Set%20-%20Color/" +
              datosDia.hours[12].icon +
              ".svg' width='100px' height='100px'/>"
          );
          datosHora.append(
            "<p id='descripcion'><small>" +
              datosDia.hours[12].conditions +
              '&#186</p>'
          );
          datosHora.append(
            "<p id='temperatura'>Temperatura: <small>" +
              datosDia.hours[12].temp +
              '&#186</p>'
          );
          datosHora.append(
            "<p id='viento'>Viento: <small>Velocidad: " +
              datosDia.hours[12].windspeed +
              ' | Dirección: ' +
              datosDia.hours[12].winddir +
              '&#186</small></p>'
          );
          datosHora.append(
            "<p id='precipitacion'>Precipitación: <small> " +
              datosDia.hours[12].precipprob +
              '%(' +
              datosDia.hours[12].precip +
              'mm)</small></p>'
          );
          datosHora.append(
            "<p id='humedad'>Humedad: <small> " +
              datosDia.hours[12].humidity +
              '%</small></p>'
          );
          datosHora.hide();
          // // cambio de datos al cambiar la hora
          $('#informacion #infoTiempoHoy #hora').on('change', function () {
            horaElegida = datosHora.find('select').val();
            // console.log(horaElegida);
            datosHora
              .find('img')
              .attr(
                'src',
                'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/2nd%20Set%20-%20Color/' +
                  datosDia.hours[horaElegida].icon +
                  '.svg'
              );
            datosHora
              .find('#descripcion small')
              .html(datosDia.hours[horaElegida].conditions);
            datosHora
              .find('#temperatura small')
              .html(datosDia.hours[horaElegida].temp + '&#186');
            datosHora
              .find('#viento small')
              .html(
                'Velocidad: ' +
                  datosDia.hours[horaElegida].windspeed +
                  ' | Dirección: ' +
                  datosDia.hours[horaElegida].winddir +
                  '&#186'
              );
            datosHora
              .find('#precipitacion small')
              .html(
                datosDia.hours[horaElegida].precipprob +
                  '%(' +
                  datosDia.hours[horaElegida].precip +
                  ' mm)'
              );
            datosHora
              .find('#humedad small')
              .html(datosDia.hours[horaElegida].humidity + '%');
          });

          // mapa
          cambiarmapa(longitud, latitud);
        });
      }, 2500); // 2.5 segundos
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }
  // funcion que muestra la prevision en la localizacion en la cual se hace click en el mapa
  async function obtenerTiempoGPSLeaflets(longitud, latitud) {
    //si no se ha pulsado el mapa ocultamos el pronostico
    if ((longitud == null) | (latitud == null)) {
      $('#leaflet #infoTiempoHoy').hide();
    } else {
      $('#leaflet #infoTiempoHoy').show();
    }

    // clave de visualcrossing
    let apiKey = 'DS7BFPFTTE5B6D7XXTVURARVD';
    let urlVC =
      'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' +
      latitud +
      '%2C' +
      longitud +
      '/today?unitGroup=metric&key=' +
      apiKey +
      '&contentType=json&lang=es';
    axios({
      method: 'get',
      url: urlVC,
    }).then(function (response) {
      let datosDia = response.data.days[0];
      console.log(datosDia);
      //contenedor de informacion y mapa
      let divFlets = $('#leaflet #infoTiempoHoy');

      // añadimos la informacion obtenida de la API

      divFlets
        .find('#ciudad')
        .html('longitud: ' + longitud + '&#186, latitud: ' + latitud + '&#186')
        .css({ color: 'white', 'text-shadow': '0px 0px 5px black' });
      divFlets
        .find('#icono')
        .html(
          "<img src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/2nd%20Set%20-%20Color/" +
            datosDia.icon +
            ".svg' width='100px'/>"
        );
      divFlets.find('#descripcion').html(datosDia.description);
      divFlets
        .find('#temperaturas')
        .html(
          "<p style='text-align:center;'>Temperatura: <br>" +
            datosDia.tempmax +
            '&#186 / ' +
            datosDia.tempmin +
            '&#186'
        )
        .css({ 'font-size': '32px' });
      divFlets
        .find('#precipitacion')
        .html(
          "<p style='text-align:center;'>Precipitación:<br>Lluvia: " +
            datosDia.precipprob +
            '%' +
            '  Nieve: ' +
            datosDia.snow +
            '%</p>'
        );
      divFlets.find('#humedad').html('Humedad: ' + datosDia.humidity + '%');
      divFlets
        .find('#IRU')
        .html('Indice Rayos Ultravioleta: ' + datosDia.uvindex);
      divFlets
        .find('#viento')
        .find('#vientovelocidad')
        .html(datosDia.windspeed + 'km/h');
      divFlets
        .find('#viento')
        .find('#vientodireccion')
        .html(
          datosDia.winddir + '&#186;Rafagas: ' + datosDia.windgust + 'km/h'
        );
      divFlets
        .find('#viento')
        .find('#vientodireccion')
        .html(
          datosDia.winddir + '&#186;Rafagas: ' + datosDia.windgust + 'km/h'
        );
      divFlets
        .find('#estaciones')
        .html(
          'Estaciones de donde de adquieren los datos: ' +
            datosDia.stations.join('|')
        );

      divFlets
        .find('#otros p:first')
        .css({ background: 'black', color: 'white', margin: '0px' });
      divFlets
        .find('#otros #datos')
        .html(
          'Presión:' +
            datosDia.pressure +
            'hPa<br>Rocío:' +
            datosDia.dew +
            '<br>Hora Amanecer: ' +
            datosDia.sunrise +
            '<br>Hora atardecer: ' +
            datosDia.sunset +
            '<br>Visibilidad: ' +
            datosDia.visibility
        );
      divFlets
        .find('#otros #datos')
        .css({ background: '#eaba62', margin: '0px', margin: '0px 2px 2px' });

      //selector de hora
      datosHora = $('#leaflet #infoTiempoHoy #datosHora #datos');
      $('#leaflet #infoTiempoHoy #datosHora #datos').html(
        "<label for='hora'>Seleccione hora:</label><select name='hora' id='hora'>"
      );
      for (let hora = 0; hora < 24; hora++) {
        if (hora == 12) {
          $('#leaflet #infoTiempoHoy #datosHora #datos #hora').append(
            "<option value='" + hora + "' selected>" + hora + ':00</option>'
          );
        } else {
          $('#leaflet #infoTiempoHoy #datosHora #datos #hora').append(
            "<option value='" + hora + "'>" + hora + ':00</option>'
          );
        }
      }

      // datos a las 12 del mediodia
      datosHora.css({
        background: 'rgb(89, 112, 234)',
        margin: '4px auto',
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        color: 'white',
        width: '99%',
      });
      datosHora.find('p').css({ margin: '5px auto' });
      datosHora.append(
        "<img src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/2nd%20Set%20-%20Color/" +
          datosDia.hours[12].icon +
          ".svg' width='100px' height='100px'/>"
      );
      datosHora.append(
        "<p id='descripcion'><small>" +
          datosDia.hours[12].conditions +
          '&#186</p>'
      );
      datosHora.append(
        "<p id='temperatura'>Temperatura: <small>" +
          datosDia.hours[12].temp +
          '&#186</p>'
      );
      datosHora.append(
        "<p id='viento'>Viento: <small>Velocidad: " +
          datosDia.hours[12].windspeed +
          ' | Dirección: ' +
          datosDia.hours[12].winddir +
          '&#186</small></p>'
      );
      datosHora.append(
        "<p id='precipitacion'>Precipitación: <small> " +
          datosDia.hours[12].precipprob +
          '%(' +
          datosDia.hours[12].precip +
          'mm)</small></p>'
      );
      datosHora.append(
        "<p id='humedad'>Humedad: <small> " +
          datosDia.hours[12].humidity +
          '%</small></p>'
      );
      // datosHora.hide();
      // // cambio de datos al cambiar la hora
      $('#leaflet #infoTiempoHoy #hora').on('change', function () {
        horaElegida = datosHora.find('select').val();
        // console.log(horaElegida);
        datosHora
          .find('img')
          .attr(
            'src',
            'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/2nd%20Set%20-%20Color/' +
              datosDia.hours[horaElegida].icon +
              '.svg'
          );
        datosHora
          .find('#descripcion small')
          .html(datosDia.hours[horaElegida].conditions);
        datosHora
          .find('#temperatura small')
          .html(datosDia.hours[horaElegida].temp + '&#186');
        datosHora
          .find('#viento small')
          .html(
            'Velocidad: ' +
              datosDia.hours[horaElegida].windspeed +
              ' | Dirección: ' +
              datosDia.hours[horaElegida].winddir +
              '&#186'
          );
        datosHora
          .find('#precipitacion small')
          .html(
            datosDia.hours[horaElegida].precipprob +
              '%(' +
              datosDia.hours[horaElegida].precip +
              ' mm)'
          );
        datosHora
          .find('#humedad small')
          .html(datosDia.hours[horaElegida].humidity + '%');
      });
    });
  }
  // modifica el mapa que se muestra con la ciudad buscada
  async function cambiarmapa(latitud, longitud) {
    // alert("mapa");
    $('#mapa')
      .find('iframe')
      .attr(
        'src',
        'https://www.openstreetmap.org/export/embed.html?bbox=' +
          (latitud - 0.025) +
          '%2C' +
          (longitud - 0.025) +
          '%2C' +
          (latitud + 0.025) +
          '%2C' +
          (longitud + 0.025) +
          '&amp;layer=mapnik&amp;'
      );

    href =
      'https://www.openstreetmap.org/?mlat=' +
      longitud +
      '&amp;mlon=' +
      latitud +
      '#map=12/' +
      longitud +
      '/' +
      latitud;
    $('#mapa small a').attr('src', href);
  }
  // MAPA LEAFLET que se muestra para interactuar con el usuairo
  var map = L.map('map').setView([37.188, -3.66], 18);

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 13,
  }).addTo(map);
  var popup = L.popup();
  // funcion al pulsar sobre el mapa
  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent('Has hecho click en las coordenadas: ' + e.latlng.toString())
      .openOn(map);
    // console.log(e.latlng);
    // muestra el pronostico del lugar pulsado según sus coordenadas
    obtenerTiempoGPSLeaflets(e.latlng.lng, e.latlng.lat);
  }

  map.on('click', onMapClick);
});

function campoCiudadVacio() {
  let r = false;
  if (!$('#localidad').val()) {
    r = true;
  }
  return r;
}
