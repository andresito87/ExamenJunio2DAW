//Definimos las constantes que se van a utilizar
const PAISES_PERMITIDOS = ["Irlanda", "Reino Unido", "Francia", "Alemania", "Polonia"];

//Cuando carge el html llamemos a la función iniciar
window.addEventListener('load',iniciar,false);

//Función iniciar
function iniciar() {
    //Contamos el número de visitas con localStorage
    let visitas = localStorage.getItem('visitas');
    if (visitas) { 
        //Si hay visitas le añadimos 1 visita más
        visitas = parseInt(visitas) + 1;
    } else {
        //Si no hay visitas, es la primera
        visitas = 1;
    }
    //Almacenamos un par clave-valor en el almacenamiento local del navegador
    localStorage.setItem('visitas', visitas);
    //Mostramos el número de visitas en el pie de la página
    visitasUsuario.innerHTML = 'Número de visitas: ' + visitas;
	//Si se clica en "Enviar" vamos a la función validar
	enviar.addEventListener('click',validar);
}

//Función para validar el formulario
function validar(eventopordefecto){			
	let devolver=true; 
    let tipoPlan="";
    //Vaciamos la salida de otros envios
    salida.innerHTML='';
    // Validamos cada uno de los campos utilizando solo un & para recoger los errores, excepto confirmar
    if (validarNombrePlan() & validarCodigoPlan() & validarTipoPlan() & validarPaisPlan() && confirm("¿Deseas enviar el formulario?")) {
        //Quitamos el envío por defecto
		eventopordefecto.preventDefault(); 
		devolver=true;
        //Obtenemos el tipo del plan seleccionado
        for (let i=0; i<document.getElementsByName('tipoPlan').length; i++){
            if (document.getElementsByName('tipoPlan')[i].checked){
                tipoPlan=document.getElementsByName('tipoPlan')[i].value;
            }
        }
        //Mostramos los resultados
        salida.innerHTML = `    <p><strong>Nombre del plan:</strong> ${document.getElementById("nombrePlan").value}</p>
                                <p><strong>Código del plan:</strong> ${document.getElementById("codigoPlan").value}</p>
                                <p><strong>Tipo del plan:</strong> ${tipoPlan}</p>
                                <p><strong>País del plan:</strong> ${document.getElementById("pais").value}</p>`;         
    } else {
		//Quitamos el envio por defecto
		eventopordefecto.preventDefault();		
		devolver=false;	
	}
	return devolver;
}

//Función para validar el nombre del plan
function validarNombrePlan(){
    //Patrón que acepta caracteres en mayúscula sin dígitos o caracteres especiales, incluyendo la ñ y tildes, 
    //como no dice nada de máximo establecemos de 1 a muchos
    let patronNombrePlan = /^[A-ZÑÁÉÍÓÚÇ\s]+$/; 
    let devolver = true;
    //Como corremos el riesgo que solo se envíe espacios en blanco, quitamos los espacios de los extermos
    let nombrePlanRecibido=document.getElementById("nombrePlan").value.trim();
    //Verificamos que cumple el patrón
    if(!patronNombrePlan.test(nombrePlanRecibido))  {
        //Mostramos el error
        salida.innerHTML +='<p class="mensajeError"><strong>Nombre del plan:</strong> No es un nombre válido en mayúsculas.</p>';
        //Le damos la clase error para mostrar en rojo
        document.getElementById("nombrePlan").className="error";	
        devolver=false;
    } else {
        //Cambiamos el color de fondo del campo a verde
        document.getElementById("nombrePlan").className="check";
    }
    return devolver;       
}

//Función para validar el código del plan
function validarCodigoPlan(){
    //Patrón que se ajusta a la primera posición como una letra seguida de 3 a 7 números
    let patronCodigoPlan= /^[A-Za-z]\d{3,7}$/;
    let devolver = true;
    if(!patronCodigoPlan.test(document.getElementById("codigoPlan").value))  {
        //Mostramos el error
        salida.innerHTML +='<p class="mensajeError"><strong>Código del plan:</strong> No corresponde con un código válido.</p>';
        //Le damos la clase error para mostrar en rojo
        document.getElementById("codigoPlan").className="error";	
        devolver=false;
    } else {
        //Cambiamos el color de fondo del campo a verde
        document.getElementById("codigoPlan").className="check";
    }
    return devolver;   
}

//Función para validar el tipo del plan
function validarTipoPlan(){
    //Obtenemos los radios en el formulario en un array
    let radiosTipoPlan = document.getElementsByName('tipoPlan');
    let devolver = false;
    //Recorremos cada uno de ellos para ver si se ha seleccionado
    for (let i=0; i<radiosTipoPlan.length; i++){
        if (radiosTipoPlan[i].checked){
            devolver=true;
        }
    }
    if (!devolver){
        //Mostramos el error
        salida.innerHTML +='<p class="mensajeError"><strong>Tipo del plan:</strong> Ha de seleccionarse un tipo de plan.</p>';
    }
    return devolver;
}

//Función para validar el país del plan
function validarPaisPlan(){
    let devolver = true;
    //Obtenemos que hemos recibido
    let paisRecibido=document.getElementById('pais').value;
    //Verificamos si se ha enviado un valor distinto a "", si está entre las opciones
    if(paisRecibido!=="" && !PAISES_PERMITIDOS.includes(paisRecibido)){
        //Mostramos el error
        salida.innerHTML += '<p class="mensajeError"><strong>País:</strong> El país no es válido.</p>';
        //Le damos la clase error para mostrar en rojo
        document.getElementById("pais").className = "error";
        devolver = false;
    } else {
        //Cambiamos el color de fondo del campo a verde
        document.getElementById("pais").className="check";
    }
    return devolver;
}

//Función para convertir mayúsculas
function convertirMayusculas(){
    nombrePlan.value=nombrePlan.value.toUpperCase();
}

//Función para cambiar el color cuando se le da el foco
function darFoco(input){
    document.getElementById(input).className = "foco";
}

//Función para cambiar el color cuando se quita el foco
function quitarFoco(input){
    document.getElementById(input).className = "";
}


