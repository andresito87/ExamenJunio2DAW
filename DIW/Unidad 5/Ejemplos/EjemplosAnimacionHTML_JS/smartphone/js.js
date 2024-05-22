window.onload = start;
$on = false;
$pageOpen = false;
function start() {
    $('#shoutDown').toggle(turnOn, turnOff);
    hora();
    $('#icons div').click(cargaPagina);
    $('#b2').click(mainPage);
}
function mainPage() {
    pageOpen = false;
    showIcons();
    $("#web").remove();
}
function cargaPagina() {
    pageOpen = true;
    hideIcons();
    $("#icons").before("<div id='web'></div>");
    if ($(this).attr("id") == "da") {
        $("#web").html('<object data="http://deviantart.com"/>');
    }
    if ($(this).attr("id") == "ws") {
        $("#web").html('<object data="http://www.w3schools.com/"/>');
    }

}
function showIcons() {
    $(".leftIcons").animate({
        left: "0px",
    }, 2000);
    $(".rightIcons").animate({
        right: "0px",
    }, 2000);
    $(".centerIcons").animate({
        top: "0px",
    }, 2000);
}
function hideIcons() {
    $(".leftIcons").animate({
        left: "500px",
    }, 2000);
    $(".rightIcons").animate({
        right: "500px",
    }, 2000);
    $(".centerIcons").animate({
        top: "500px",
    }, 2000);
}
function turnOn() {
    $("#content").fadeIn("slow", function() {
        $('#content').css({'background-image': 'none', 'background-image': 'url(img/bg.png)'});
    });
    $('#navegacion').animate({opacity: 1, visibility: "visible"}, 500);
    showIcons();
    $on = true;
    $('#b2').removeAttr("disabled");
}
function turnOff() {
    if (pageOpen == true) {
        mainPage();
    } else {
        hideIcons();
        efectos();
        function efectos() {
            $('#navegacion').animate({opacity: 0, visibility: "inherit"}, 2000);
            $("#content").fadeOut(2000, function() {
                $('#content').css({'background-image': 'url(img/bg.png)', 'background-image':'none'});
            });
            $on = false;
            $('#b2').attr("disabled", "disabled");
        }
    }
}
function hora() {
    var date = new Date();
    var hora = date.getHours();
    var min = date.getMinutes();
    document.getElementById("hora").innerHTML = hora + ":" + min;
}
setInterval(function() {
    hora()
}, 1000);