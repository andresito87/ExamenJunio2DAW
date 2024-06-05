// Funcionalidad del boton reiniciar
// Uso el atributo defer que cargará el script antes de que se complete la carga de la página
// sino habría que comprobrarlo con javascript y el evento DOMLoaded
document.getElementById("botonReiniciarVideo").addEventListener("click", () => {
    let video = document.getElementById("video")
    video.pause();
    video.currentTime = 0;
    video.play();
})

//Apartado de JQuery
//Opcion1
document.getElementById("color_h2").value = "#f01414";
document.getElementById("color_fondo").value = "#f01414";
$("#b_oscuro").on('click', function (event) {
    let colorH2 = document.getElementById("color_h2").value;
    let colorFondo = document.getElementById("color_fondo").value;
    $("h2").css("color", colorH2);
    $(".zona").css("background-color", colorFondo);
});

//Opcion 2
$("#b_inverso").on('click', function (event) {
    let imagen1 = document.getElementById("imagen1").src;
    let imagen2 = document.getElementById("imagen2").src;
    let imagen3 = document.getElementById("imagen3").src;
    let imagen4 = document.getElementById("imagen4").src;

    $("#imagen1").fadeOut(1000);
    $("#imagen2").fadeOut(1000);
    $("#imagen3").fadeOut(1000);
    $("#imagen4").fadeOut(1000);

    document.getElementById("imagen1").src = imagen4;
    document.getElementById("imagen2").src = imagen3;
    document.getElementById("imagen3").src = imagen2;
    document.getElementById("imagen4").src = imagen1;

    $("#imagen1").fadeIn(500);
    $("#imagen2").fadeIn(500);
    $("#imagen3").fadeIn(500);
    $("#imagen4").fadeIn(500);
});

//Opcion 3
$("#b_mostrar").on('click', function (event) {
    $("#imagen1").slideUp(1000);
    $("#imagen2").slideUp(1000);
    $("#imagen3").slideUp(1000);
    $("#imagen4").slideUp(1000);
    $("#primerDiv").slideUp(1000);
    $("#segundoDiv").slideUp(1000);
    $("#tercerDiv").slideUp(1000);
    $("#cuartoDiv").slideUp(1000);

    let srcImagen1=document.getElementById("imagen1").alt;
    let srcImagen2=document.getElementById("imagen2").alt;
    let srcImagen3=document.getElementById("imagen3").alt;
    let srcImagen4=document.getElementById("imagen4").alt;

    $("#primerDiv").text(srcImagen1)
    $("#segundoDiv").text(srcImagen2)
    $("#tercerDiv").text(srcImagen3)
    $("#cuartoDiv").text(srcImagen4)

    $("#primerDiv").slideDown(1000);
    $("#segundoDiv").slideDown(1000);
    $("#tercerDiv").slideDown(1000);
    $("#cuartoDiv").slideDown(1000);
});