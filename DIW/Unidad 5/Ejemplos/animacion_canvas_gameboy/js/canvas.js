function iniciaCanvas(idCanvas) {
    var elemento = document.getElementById(idCanvas);
    if (elemento && elemento.getContext) {
        var contexto = elemento.getContext('2d');
        if (contexto) {
            return contexto;
        }
    }
    return false;
}

window.onload = function() {

    
    flechas = iniciaCanvas("flechas");
    botones = iniciaCanvas("botones");
    select = iniciaCanvas("select");
    start = iniciaCanvas("start");

    //comprobamos el contexto
    if (flechas) {       
  
        flechas.fillStyle="black";
        
        flechas.fillRect(40,15,20,70);

        flechas.fillRect(15,40,70,20);
   
    }

    if (botones) {       
  
        botones.fillStyle="rgb(158, 31, 24)";
        botones.arc(200,35,27,0,2*Math.PI,true); 
        botones.fill(); 

        botones.arc(130,95,27,0,2*Math.PI,true); 
        botones.fill(); 

    }

    if(select){

        select.fillStyle="rgb(55, 55, 53)";
        select.beginPath();
        select.moveTo(128,0);
        select.lineTo(133,10);
        select.lineTo(100,35);
        select.lineTo(95,25);
        select.fill();


    }

    if(start){
        start.fillStyle="rgb(55, 55, 53)";
        start.beginPath();
        start.moveTo(38,0);
        start.lineTo(43,10);
        start.lineTo(10,35);
        start.lineTo(5,25);
        start.fill();        
    }
 
}