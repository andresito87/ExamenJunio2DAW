// Apartado A. Clase Participante.

class Participante {
  //atributos
  #apeNom;
  #email;
  #rol;
  constructor(apeNom, email, rol) {
    this.#apeNom = apeNom;
    this.email = email;
    this.#rol = rol;
  }

  get apeNom() {
    return this.#apeNom;
  }

  set apeNom(apeNom) {
    if (typeof apeNom == "string" && apeNom.length > 0) {
      apeNom = apeNom.toLowerCase();
      apeNom[0] = apeNom.toUpperCase();
    } else {
      throw new Error("Error en el Apellido y Nombre");
    }
    this.#apeNom = apeNom;
  }

  get email() {
    return this.#email;
  }

  set email(email) {
    this.#email = email;
  }

  get rol() {
    return this.#rol;
  }

  set rol(rol) {}

  toString() {
    return `Apellido Nombre: ${this.#apeNom} | Email: ${this.#email} | Rol ${
      this.#rol
    }`;
  }
}

//PAra aqui el ejercicio porque no quiero arriesgar la entrega
