$(document).ready(function(){

    var encendido=false;

    $("#start").click(function(){
        $('#pantalla').css("background-color","olive");
        $('#pantalla').css("box-shadow","inset 10px 10px 5px 3px rgb(85, 85, 5)");
        encendido=true;
    });

    $("#fondo_flechas").click(function(){
        if(encendido==true){
            $("#pelota").css('display', 'block');
            $("#pelota").css('animation-name', 'desplazamiento_pelota');            
        }

    });



})