$(function()
{
    $("#btn").click(() => {
        $("#pong1").css('animation-name', 'animPong1');
        $("#pong2").css('animation-name', 'animPong2');
        $("#pelota").css('animation-name', 'movPelota');
        $("#campeon").css('animation-name', 'animCampeon');
        $("#ganador").css('animation-name', 'animCaja');
    })
})