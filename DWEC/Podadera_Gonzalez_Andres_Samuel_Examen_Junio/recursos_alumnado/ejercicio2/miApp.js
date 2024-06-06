// Nombre: Andrés Samuel Podadera González

document.addEventListener("DOMContentLoaded", () => {
  // Ejercicio 2.
  let formulario = document.getElementById("SuperAgenteForm");
  //inputcodigo
  let inputCodigo = document.getElementById("codigoAgente");
  //salida de imagen
  let salidaSecreta = document.getElementById("salidaSecreta");
  // salida de mensaje
  let resultado = document.getElementById("resultado");
  // campo checkbox
  let mostrarSecreto = document.getElementById("mostrarSecreto");
  // expresion regular
  let patronCodigo =
    /^(?=[0-9]{1,2})(?=.*[a-zA-ZñÑ])(?!.*where)(?=.*S)(^.{8,16})\.$/;
  inputCodigo.addEventListener("blur", () => {
    if (!patronCodigo.test(inputCodigo.value)) {
      inputCodigo.classList.add("error");
    } else {
      inputCodigo.className = "";
      formulario.addEventListener("submit", (event) => {
        // no permitimos que se envie el formulario  hasta que se valide
        event.preventDefault();
        salidaSecreta.innerHTML = "";
        if (mostrarSecreto.checked) {
          let imagen = document.createElement("img");
          imagen.src = "./logo.jpg";
          salidaSecreta.innerHTML = "";
          salidaSecreta.appendChild(imagen);
        }
        resultado.innerHTML = `"${inputCodigo.value}" ha sido identificado correctamente`;
      });
    }
  });

  inputCodigo.addEventListener("focusin", () => {
    $("#mostrarSecreto").prop("checked", false);
  });
});
