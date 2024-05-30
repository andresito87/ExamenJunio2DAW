//En cuanto haya cargado la página (DOM completo)
$(document).ready(function() {
 
  //Interruptor que nos indica si el logo de la cabecera ha sido cambiado
  var logo_cambiado= false;
  //Ruta de la imagen de aguadulce
  var src_img_aguadulce = "./img/logo_ies_aguadulce.png";
  //Variable que guarda el historial
  var historial_inicial=$("<p><span>Historial de acciones realizadas</span></p>");
  var historial="";
  var cont_historial= 0;

  //Variables de configuración del panel de imágenes grandes
  var color_borde_imag ="black";
  var grosor_borde_imag ="2px";
  // Establecer el valor por defecto a 2
  $("#borde").val(2);
  var filtro_img="grayscale";
  //Datos MINIimagen seleccionada
  $('#mini1').css("border", "2px solid red");
  var src_imagen_sel ="./img/img1.jpg";
     
    
  //Ocultamos título 2 en zona de texto
  $("#titulo_2").hide();
    
 //Interruptor que permite Ocultar con efecto el texto
  var flag_textos_cambiados= false;
    
//----------------------------------------
// A. Encabezado
//----------------------------------------
//Si hace clic sobre el logo de cabecera
  $(".logo_cabecera").click(function() {   
    
    //Si el logo no ha sido cambiado se cambia, pero solo una vez
    if (!logo_cambiado) {
        // Al hacer clic en la imagen del avatar
        var $this = $(this);
       
        logo_cambiado = true;
        // Ocultar la imagen actual con un efecto fadeOut
        $this.fadeOut(500, function() {
          // Cambiar la src de la imagen
          $this.attr("src", src_img_aguadulce);
          // Ajustar el tamaño de la imagen
          $this.animate({
            width: "10rem" // Tamaño aumentado
          }, 500); // Duración de la animación

          // Mostrar la imagen con el nuevo tamaño y la nueva src con un efecto fadeIn
          $this.fadeIn(500);
        });
        
        //Insertamos en el historial
       registraCambioHistorial("Cambio de logo");
        
    }
  });
    
//----------------------------------------
// B. Navegación
//----------------------------------------
// ++++++ CHECKBOX ++++++++++
  // Función para mostrar u ocultar las zonas de imágenes o texto
   function visualizaZonas(checkbox, div, zona) {
    if (checkbox.prop("checked")) {
     //Dependiendo la zona indicada haremos un efecto u otro.
      if (zona === "zona_imagen") {
        div.slideDown(500);
        //Guardamos el historial
       registraCambioHistorial("Muestra panel imagen")
      } else if (zona === "zona_texto") {
        div.fadeIn(500);
        //Insertamos en el historial
       registraCambioHistorial("Muestra panel texto");
      }
    } else {
      if (zona === "zona_imagen") {
        div.slideUp(500);
        //Insertamos en el historial
       registraCambioHistorial("Oculta panel texto");
      } else if (zona === "zona_texto") {
        div.fadeOut(500);
       //Insertamos en el historial
       registraCambioHistorial("Oculta panel texto");
      }
    }
  }

  // Evento de cambio para el checkbox de la zona de imagen
  $("#imagen").change(function() {
    visualizaZonas($(this), $("section.contenedor_imagen"), "zona_imagen");
  });

  // Evento de cambio para el checkbox de la zona de texto
  $("#texto").change(function() {
    visualizaZonas($(this), $("section.contenedor_texto"), "zona_texto");
  });

    
    
// ++++++ BOTÓN INICIALIZAR ++++++++++
//Si hace clic sobre él  
  $("#inicializar").click(function() {
      //Cambia la fuente de la imagen a mostrar
      $(".logo_cabecera").attr("src", "./img/AlejandroSept22.jpg");
      
      //Vuelve al tamaño original
      $(".logo_cabecera").animate({
            width: "4rem" // Tamaño aumentado
          }, 200); // Duración de la animación
      
      //La variable que permite cambiar el logo, lo apagamos para que permita hacerse de nuevo
      logo_cambiado= false;
      
      //Marcamos los checkbox.
      $("#imagen").prop("checked", true);
      $("#texto").prop("checked", true);
      //Mostramos paneles de imagen y texto
      $("section.contenedor_imagen").slideDown();
      $("section.contenedor_texto").fadeIn();
      
      //Deselecciona todas imágenes mini 
      deseleccionaImagenesMini();
      //MINI imágenes, la primera seleccionada por defecto
      $('#mini1').css("border", "2px solid red");
      src_imagen_sel ="./img/img1.jpg";
      
      
      //Valores iniciales de configuración para imágenes grandes
      //Cambia divs
      inicializaImagenesGrandes();
      //Cambia variables de configuración por defecto de panel de imágenes
      color_borde_imag ="black";
      grosor_borde_imag ="2px";
       $("#seleccion_color_borde").prop("value","#000000");
      // Establecer el valor por defecto DEL SELECT a 2
      $("#borde").val(2);
      // Establecer el valor por defecto DEL SELECT de filtro a grayscale
      $("#filtro").val("grayscale");
      filtro_img="grayscale";
  
    //Disposición de las imágenes grandes a horizontal
      $("#vertical").prop("checked", false);
      $("#horizontal").prop("checked", true);
      //Cambiamos la disposición a filas
      $(".visual_img").css("flex-direction","row");
    
    //Color de fondo del panel de imágenes
      $(".visual_img").css("background-color","#808080");
      $("#seleccion_color").prop("value","#808080");
    
    //Limpia la zona donde indica el origen de las imágenes
      $(".origen_img").find("div").empty();
     
      //Zona de TEXTO
      
          
      //Cambiar interruptor
        flag_textos_cambiados = false;
      //Ocultamos título 2 y mostramos título 1 en zona de texto
      $("#titulo_1").show();
      $("#titulo_2").hide();
      $(".visual_txt").css("background-color","white");
      $("#titulo_2").css("color","black");
      //Mostramos el botón y el indicador de velocidad
      $("#mostrar_slide").show();
      $("#div_velocidad").show();
      //Valor inicial de velocidad a 200
      $("#velocidad").val(200);
      
      
      
      //Restablecemos le valor por defecto para Tipo de fuente
       $("#fuente").val("Roboto");
       $(".visual_txt").css("font-family","Times");
      //Separación entre letras a 2px
       $("#separacion").val(0);
      $(".visual_txt").css("letter-spacing","0px");
    //Añade al historial
    registraCambioHistorial("Pulsa inicializar");
      
  });
//----------------------------------------
// C. Zona de imágenes
//----------------------------------------
// ++++++ ZONA DE MINIATURAS ++++++++++
//Si hace clic sobre el logo de cabecera
 $(".img_miniaturas").click(function() {   
       
     // Al hacer clic en la imagen MINI
     var $this = $(this);
     //Deselecciona todas
     deseleccionaImagenesMini();
     $this.css("border", "2px solid red");
     src_imagen_sel = $this.attr("src");
         
    //Insertamos en el historial
     var indice = $(this).index() + 1;
     registraCambioHistorial("Selecciona Imagen mini "+indice);
     
    
  });
// ++++++ PANEL CONFIGURACIÓN IMÁGENES ++++++++++
// -- DISPOSICIÓN --
//Si cambia el radio de disposición horizontal
 $("#horizontal").change(function() {
    
   // Verificar si el radio button con id "opcion1" ha sido seleccionado
    if ($(this).is(':checked')) {
     
    //Cambiamos la disposición a filas
      $(".visual_img").css("flex-direction","row");
    }
    //Insertamos en el historial
   registraCambioHistorial("Cambia disposición de imágenes a horizontal");    
  });
     
//Si cambia el radio de disposición vertical
 $("#vertical").change(function() {
     
   // Verificar si el radio button con id "opcion1" ha sido seleccionado
    if ($(this).is(':checked')) {
        //Cambiamos la disposición a columnas
      $(".visual_img").css("flex-direction","column");
    }
    //Insertamos en el historial
   registraCambioHistorial("Cambia disposición de imágenes a vertical");
});

// -- COLOR FONDO --
//Si cambia el COLOR 
 $("#seleccion_color").change(function() {
    
     var colorSeleccionado = $(this).val();
     
     //Cambiamos la disposición a columnas
     $(".visual_img").css("background-color",colorSeleccionado);
     
     //Insertamos en el historial
   registraCambioHistorial("Cambia color fondo panel imagenes a "+colorSeleccionado);
     
});
// -- FILTRO --
$("#filtro").change(function() {
    filtro_img =$(this).val();
     //Insertamos en el historial
   registraCambioHistorial("Cambia filtro a "+filtro_img);
});
// -- BORDE IMG --
$("#borde").change(function() {
    grosor_borde_imag =$(this).val()+"px";
     //Insertamos en el historial
   registraCambioHistorial("Cambia ancho borde img "+grosor_borde_imag);
});
    
// -- COLOR BORDE IMG --
$("#seleccion_color_borde").change(function() {
    color_borde_imag =$(this).val();
    //Insertamos en el historial
   registraCambioHistorial("Cambia color borde img "+color_borde_imag);
});    
    
// ++++++ ZONA DE IMÁGENES GRANDES ++++++++++
//Si hace clic sobre el logo de cabecera
  $(".img_grande").click(function() {  
       var $this = $(this);
       var divContenedorImg = $(this).parent();
      // Ocultar la imagen actual con un efecto fadeOut
        $this.slideUp(500, function() {
          // Cambiar la src de la imagen
          $this.attr("src", src_imagen_sel);
        
          var filtro=filtro_img+"(100%)";
          //Si el filtro es hue rotate tiene parámetros diferentes (grados)
          if (filtro_img ==="hue-rotate") {
              filtro=filtro_img+"(45deg)";
          } 
          //Aplica filtro
          $this.css("filter",filtro );
          var estilo_borde = grosor_borde_imag+" solid "+color_borde_imag;
          divContenedorImg.css("border",estilo_borde);
        
          //Limpia la zona donde indica el origen de las imágenes
          $(".origen_img").find("div").empty();
            
        });
          // Mostrar la imagen la nueva src con un efecto slideDown
          $this.slideDown(500);
      var indice = divContenedorImg.index() + 1;
   //Insertamos en el historial
   registraCambioHistorial("Selecciona imagen grande "+indice);
});     

// ++++++ ORÍGENES DE IMÁGENES GRANDES ++++++++++
  $(".bot_origen").click(function() {  
       var $this = $(this);
       var divContenedorFuentesImg = $(this).find("div");
      
      // Pone borde al contenedor de orígenes
      divContenedorFuentesImg.css("border","2px solid black");
      //Limpia lo que haya en el listado de contenidos
      $(".origen_img").find("div").empty();
             
    $(".div_img_grande").each(function(index, element) {
        
        // Dentro de esta función, "this" hace referencia al elemento actual
        var fuente=$(this).find("img").attr("src");
        var orden=index+1;
        var nuevaEntrada = $("<p><span>Imagen "+index+" - origen:</span>"+fuente+"</p>");
        $(".origen_img > div").append(nuevaEntrada);
        
        
    });
      
   //Insertamos en el historial
   registraCambioHistorial("Pulsa origenes de imágenes");
});  
    
//---------------------------------------------
//   ZONA DE TEXTO
//---------------------------------------------
//Si hace clic para ocultar mostrar con efecto
  $("#mostrar_slide").click(function() { 
      
      //Si no se ha hecho antes
      if (!flag_textos_cambiados) {
        var velocidad = parseInt($("#velocidad").val());
        // Ocultar la imagen actual con un efecto fadeOut
        $("#titulo_1").slideUp(velocidad, function() {
            $("#titulo_2").slideDown(velocidad);
            $("#titulo_2").css("color","white");
            $(".visual_txt").css("background-color","black");
           
        });  
        //Cambiar interruptor
        flag_textos_cambiados = true;
      }
      
      //Ocultamos el botón y el indicador de velocidad
      $("#mostrar_slide").hide();
      $("#div_velocidad").hide();
      //Insertamos en el historial
      registraCambioHistorial("Cambio velocidad");
 });
 
// Si cambia el select de fuentes se cambia la fuente del texto
$("#separacion").change(function() {
    var val_separacion = $(this).val();
    $(".visual_txt").css("letter-spacing",val_separacion+"px");
    
    //Insertamos en el historial
    registraCambioHistorial("Cambio separación letras");
  });
    
// Si cambia el select de fuentes se cambia la fuente del texto
$("#fuente").change(function() {
    var fuente=$("#fuente").val();
    $(".visual_txt").css("font-family",fuente);
    
    //Insertamos en el historial
    registraCambioHistorial("Cambio tipo fuente");
  });
    
//---------------- FUNCIONES GENERALES --------------------
    //Función que incluye en el historial una nueva entrada
    function registraCambioHistorial(texto){
        //Quitamos el título del historial
        $("#historial p:first").remove();
        //Guardamos el historial con el texto de entrada
            cont_historial++;
            var nuevaEntrada = $("<p>"+cont_historial+": "+texto+"</p>");
              // Añadir el nuevo párrafo al principio div con id "miDiv"
              $("#historial").prepend(nuevaEntrada);
              $("#historial").prepend(historial_inicial);

    }
    //Función que incluye en el historial una nueva entrada
    function deseleccionaImagenesMini(){
        //Deseleccionar es poner el borde sombra y escalado a valores iniciales
        // Seleccionar los elementos con la clase "miClase" y recorrerlos
        $(".img_miniaturas").each(function(index, element) {
            // Dentro de esta función, "this" hace referencia al elemento actual
            $(this).css("border", "2px solid black");
        });
    }
    
    //Función que incluye en el historial una nueva entrada
    function inicializaImagenesGrandes(){
        //Deseleccionar es poner el borde sombra y escalado a valores iniciales
        // Seleccionar los elementos con la clase "miClase" y recorrerlos
        $(".div_img_grande").each(function(index, element) {
            // Dentro de esta función, "this" hace referencia al elemento actual
            $(this).css("border", "2px solid black");
            $(this).find("img").attr("src", src_img_aguadulce);
            $(this).find("img").css("filter", "none");
        });
    }
    
});

