document.addEventListener('DOMContentLoaded', () => {
  const nombre = document.getElementById('nombre');
  const apellidos = document.getElementById('apellidos');
  const edad = document.getElementById('edad');
  const form = document.getElementById('form');

  function validarInput(input, condicion, mensaje) {
    let hayError = false;
    if (condicion) {
      input.classList.add('error');
      input.nextElementSibling.innerHTML = mensaje;
      input.nextElementSibling.classList.add('invalido');
      hayError = true;
    } else {
      input.classList.remove('error');
      input.nextElementSibling.innerHTML = '';
      input.nextElementSibling.classList.remove('invalido');
    }
    return hayError;
  }

  // Validar formulario al enviar
  form.addEventListener('submit', e => {
    e.preventDefault();
    let errores = [];
    if (
      validarInput(
        nombre,
        nombre.value.length < 5,
        'El nombre debe tener al menos 2 caracteres'
      )
    ) {
      errores.push('Hay errores en el nombre');
    }
    if (
      validarInput(
        apellidos,
        apellidos.value.length < 5,
        'Los apellidos deben tener al menos 2 caracteres'
      )
    ) {
      errores.push('Hay errores en los apellidos');
    }
    if (
      validarInput(
        edad,
        edad.value < 18,
        'Debes ser mayor de edad para enviar el formulario'
      )
    ) {
      errores.push('Hay errores en la edad');
    }

    const mensaje = document.getElementById('mensaje');
    if (errores.length === 0) {
      mensaje.innerHTML = 'Formulario enviado correctamente';
    } else {
      mensaje.innerHTML = errores.join(', ');
    }
  });

  // Validar inputs al salir de ellos
  nombre.addEventListener('blur', () => {
    validarInput(
      nombre,
      nombre.value.length < 5,
      'El nombre debe tener al menos 5 caracteres'
    );
  });

  // Validar apellidos cada vez que se escribe o borra una letra
  apellidos.addEventListener('input', () => {
    const regex = /^[a-zA-Z ]+$/;
    validarInput(
      apellidos,
      !regex.test(apellidos.value) || apellidos.value.length < 5,
      'Los apellidos deben tener al menos 5 caracteres'
    );
  });

  edad.addEventListener('blur', () => {
    validarInput(
      edad,
      edad.value < 18,
      'Debes ser mayor de edad para enviar el formulario'
    );
  });
});
