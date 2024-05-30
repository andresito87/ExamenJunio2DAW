//Definimos las constantes que se van a utilizar
const NACIONALIDADES_PERMITIDAS = ["España", "México", "Argentina", "Colombia", "Chile"];

//Cuando carge el html llamemos a la función iniciar
window.addEventListener('load',iniciar,false);

//Función iniciar
function iniciar() {
	//Si se clica en "Enviar" vamos a la función validar
	enviar.addEventListener('click',validar);
}

//Función para validar el formulario
function validar(eventopordefecto){			
	let devolver=true; 
    //Vaciamos la salida de otros envios
    salida.innerHTML='';
	//Validamos cada uno de los campos utilizando solo un & para recoger los errores, excepto confirmar
	if (validarNombre() & validarNacionalidad() & validarContrasena() & validarContrasenaRepetida() && confirm("¿Deseas enviar el formulario?")) {
		//Quitamos el envio por defecto
		eventopordefecto.preventDefault(); 
		devolver=true;
        //Mostramos los resultados
        salida.innerHTML = `    <p><strong>Nombre:</strong> ${document.getElementById("nombre").value}</p>
                                <p><strong>Nacionalidad:</strong> ${document.getElementById("nacionalidad").value}</p>
                                <p><strong>Contraseña:</strong> ${document.getElementById("contrasena").value} </p> 
                                <p><strong>Contraseña repetida:</strong> ${document.getElementById("repetirContrasena").value}</p> `;         
    } else {
		//Quitamos el envio por defecto
		eventopordefecto.preventDefault();		
		devolver=false;	
	}
	return devolver;
}

//Función para validar nombre
function validarNombre(){
    //Patrón que acepta caracteres incluyendo la ñ y tildes en las vocales de 10 a 25 caracteres
    let patronNombre = /^[a-zA-ZñÑáéíóúÁÉÍÓÚçÇ\s]{10,25}$/;
    let devolver=true;
    //Quitamos los espacios en blanco del nombre en los extremos
    let nombreRecibido=document.getElementById("nombre").value.trim();
    //Verificamos que cumple el patrón
    if (!patronNombre.test(nombreRecibido)) {
        //Mostramos el error
        salida.innerHTML +='<p class="mensajeError"><strong>Nombre:</strong> El nombre no es correcto, debe contener entre 10 y 25 caracteres.</p>';
        //Le damos la clase error para mostrar en rojo
        document.getElementById("nombre").className="error";	
        devolver=false;
    } else {
        //Cambiamos el color de fondo del campo a verde
        document.getElementById("nombre").className="check";
    }
    return devolver;
}

// Función para validar la nacionalidad
function validarNacionalidad() {
    let devolver = true;
    //Primero verificamos que se ha realizado una selección
    if (!document.getElementById("nacionalidad").selectedIndex==0)	{
        //Si se ha realizado una selección obtenemos el valor
        let seleccionNacionalidad = document.getElementById("nacionalidad").value;
        //Verificamos si la nacionalidad seleccionada está dentro del array de nacionalidades permitidas
        if (!NACIONALIDADES_PERMITIDAS.includes(seleccionNacionalidad)) {
            //Mostramos el error
            salida.innerHTML += '<p class="mensajeError"><strong>Nacionalidad:</strong> La nacionalidad seleccionada no es válida.</p>';
            //Le damos la clase error para mostrar en rojo
            document.getElementById("nacionalidad").className = "error";
            devolver = false;
        }else{
            //Cambiamos el color de fondo del campo a verde
            document.getElementById("nacionalidad").className="check";
        }
    } else {
        //No se ha seleccionado una nacionalidad
        document.getElementById("nacionalidad").className="";
    }   
    return devolver;
}

//Función para validar contraseña
function validarContrasena(){
    let devolver = true;
    //Patrón que debe seguir la contraseña
    let patronContrasena = /^(?!^[ç,$])(?=(?:[^0-9]*[0-9]){1,3}[^0-9]*$)(?!.*select)(?!.*where)(?!.*;)(?=.*\d\.$)(^.{8,21})$/;
    //Comprobamos si sigue el patrón
    if (!patronContrasena.test(document.getElementById("contrasena").value)){
        //No es una contraseña válida
        salida.innerHTML += '<p class="mensajeError"><strong>Contraseña:</strong> La contraseña no es válida.</p>';
        //Cambiamos la clase a error
        document.getElementById("contrasena").className = "error";
        devolver = false;
    } else {
        //Cambiamos el color de fondo del campo a verde
         document.getElementById("contrasena").className="check";
    }
    return devolver;
}

//Función para validar contraseña repetida
function validarContrasenaRepetida(){
    let devolver = true;
    if(document.getElementById("contrasena").value !== document.getElementById("repetirContrasena").value){
        //No está repetida
        salida.innerHTML += '<p class="mensajeError"><strong>Contraseña repetida:</strong> La contraseña repetida no es válida.</p>';
        //Cambiamos la clase a error
        document.getElementById("repetirContrasena").className = "error";
        devolver = false;       
    } else {
        //Cambiamos el color de fondo del campo a verde
        document.getElementById("repetirContrasena").className="check";
    }
    return devolver;
}

//Función para mostrar contraseñas
function mostrarContrasena() {
    let contrasena = document.getElementById('contrasena');
    let contrasenaRepetida = document.getElementById('repetirContrasena');
    let icono = document.getElementById("iconoContrasena");
    //Los input de la contraseña y la repetición de contraseña son de tipo password, los pasamos a tipo text
    contrasena.type = "text";
    contrasenaRepetida.type = "text";
    //Cambiamos el src del icono para que sea el ojo abierto
    icono.src = "imagenes/abrir-ojo.png";
}

//Función para ocultar contraseña
function ocultarContrasena(){
    let contrasena = document.getElementById('contrasena');
    let contrasenaRepetida = document.getElementById('repetirContrasena');
    let icono = document.getElementById("iconoContrasena");
    //Volvemos a establecer los input a tipo password
    contrasena.type = "password";
    contrasenaRepetida.type = "password";
    //Volvemos a poner el icono del ojo cerrado
    icono.src = "imagenes/cerrar-ojo.png";
}

//Función para cambiar el color cuando se le da el foco
function darFoco(input){
    document.getElementById(input).className = "foco";
}

//Función para cambiar el color cuando se quita el foco
function quitarFoco(input){
    document.getElementById(input).className = "";
}

