$(document).ready(function(){
 
    let escalaGrises = 0;

    $("#distribucion").click(function(){
        if($("section").css('flex-direction') == 'column')
            $("section").css('flex-direction', 'row');
        else
            $("section").css('flex-direction', 'column');
    });
    
    $("main input:nth-child(2)").click(function(){
        escalaGrises+=10;
        $("section").css('filter', 'grayscale('+escalaGrises+'%)');
		$("#boton_gris").val("Poner imágenes de los artículos a blanco y negro (Cada click cambia el color) Porcentaje: "+escalaGrises+"%");
        if(escalaGrises == 100)
            $("main input:nth-child(2)").prop('disabled', true);
    });

    $("main input:nth-child(1)").change(function() {
        $('section article').css('font-size', $(this).val()+'px');
        $("main label").text('Tamaño de la fuente: '+$(this).val() + 'px');
    });

    function establecerValorFuente(){
        let fuente = $('section article').css('font-size');
        document.getElementsByName('fuente')[0].value = fuente.substring(0, 2);
        $("main label").text('Tamaño de la fuente: '+fuente);
    }

    $(".pie").click(function() {
        $(".pie").slideUp(2000, function() {
            $(".pie").slideDown(2000);
        });
    });

    //Ejecución de funciones al inicio
    establecerValorFuente();
});
