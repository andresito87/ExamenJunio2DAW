//Definimos las constantes que se van a utilizar
const fotos = ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg', '6.jpeg'];

//Cuando cargue el html llamamos a la función iniciar
window.addEventListener('load', iniciar, false);

//Función iniciar
function iniciar() {
  //si se cliquea en "Enviar" vamos a la función validar
  enviar.addEventListener('click', validar);
}

//Función para validar el formulario
function validar(eventopordefecto) {
  let devolver = true;
  //vaciamos la salida de otros envíos
  resultado.innerHTML = '';
  //validamos cada uno de los campos utilizando solo un & para recoger los errores, excepto confirmar
  if (
    validarNombre() & validarCodigo() & validarDonacion() &&
    confirm('¿Deseas enviar el formulario?')
  ) {
    //Quitamos el envío por defecto
    eventopordefecto.preventDefault();
    devolver = true;
    //Mostramos los resultados
    resultado.innerHTML = `  <p><strong>Nombre:</strong> ${
      document.getElementById('nombre').value
    }</p>
                            <p><strong>Codigo Adoptador:</strong> ${
                              document.getElementById('codigo').value
                            }</p>
                            <p><strong>Donación:</strong> ${
                              document.getElementById('donacion').value
                            } </p> `;
    let fotoAleatoria = fotos[Math.floor(Math.random() * fotos.length)];
    let img = document.createElement('img');
    img.src = 'imagenes/fotoAleatoria';
    resultado.appenChild(img);
  } else {
    //quitamos el envío por defecto
    eventopordefecto.preventDefault();
    devolver = false;
  }
  return devolver;
}

//Función para validar nombre
function validarNombre() {
  let patronNombre = /[A-Za-z]\s{1,3}[A-Z][A-Za-z]*$/;
  let devolver = true;
  //Quitamos los espacios en blanco del nombre en los extremos
  let nombreRecibido = document.getElementById('nombre').value.trim();
  //Verificamos que cumple el patrón
  if (!patronNombre.test(nombreRecibido)) {
    //Mostramos el error
    resultado.innerHTML +=
      '<p class="mensajeError"><strong>Nombre:</strong> El nombre no es correcto.</p>';
    //Le damos la clase error para mostrar en amarillo
    document.getElementById('nombre').className = 'error';
    devolver = false;
  } else {
    //Cambiamos el color de fondo del campo a verde
    document.getElementById('nombre').className = 'check';
  }
  return devolver;
}

//Función para validar codigo
function validarCodigo() {
  let devolver = true;
  //Patrón que debe seguir el código
  /*- La última letra debe estar en minúscula.

- Debe aparecer “,” obligatoriamente. Mínimo 2 y máximo 3 veces.

- No puede contener la palabra "extinción" (sin acento).

- Debe comenzar por * y la longitud máxima es de 20.

- No pueden aparecer dígitos. El resto de los caracteres está permitido.*/
  let patronCodigo =
    /^(?=^[*])(?=(.*[,]){2,3})(?!.*extincion)(?!.*[0-9])(?=.*[a-z]$)(^.{1,20}$)$/;
  //Comprobamos si sigue el patrón
  if (!patronCodigo.test(document.getElementById('codigo').value)) {
    //No es un código válido
    resultado.innerHTML +=
      '<p class="mensajeError"><strong>Humano Adoptador:</strong> La contraseña no es válida.</p>';
    //Cambiamos la clase a error
    document.getElementById('codigo').className = 'error';
    devolver = false;
  } else {
    //Cambiamos el color de fondo del campo a verde
    document.getElementById('codigo').className = 'check';
  }
  return devolver;
}

//Función para validar donación

function validarDonacion(donacion) {
  let patronDonacion = /^[0-9]+([,][0-9]+)?$/;
  if (!patronDonacion.test(document.getElementById('donacion').value)) {
    //No es una donacion válida
    resultado.innerHTML +=
      '<p class="mensajeError"><strong>Donacion:</strong> La donación tiene que ser entre 0 y 1000 y utilizar la coma como separador.</p>';
    //Cambiamos la clase a error
    document.getElementById('donacion').className = 'error';
    devolver = false;
  } else {
    //Cambiamos el color de fondo del campo a verde
    document.getElementById('donacion').className = 'check';
  }
  return devolver;
}
