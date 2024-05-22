/**
 * Class representing a citizen.
 * 
 * @class Citizen
 * @property {string} name Name of the citizen.
 * @property {string} country Country of the citizen.
 * @property {number} age Age of the citizen.
 * @throws {Error} If the name is not a string.
 * @throws {Error} If the name length is less than 5 characters.
 * @throws {Error} If the age is not a integer number.
 * @throws {Error} If the age is out of range.
 * @throws {Error} If the country is not valid.
 * @returns {Citizen} Object of type Citizen.
 * @version 1.0
 * @author Andrés Samuel Podadera González
 */

class Citizen {

    //Static Properties
    /**
     * Minimum length of the name.
     * @property {number} _MIN_AGE
     */
    static #_MIN_NAME_LENGTH = 5;

    /**
     * Maximum age allowed.
     * @property {number} _MAX_AGE
     * @static
     * @readonly
     */
    static #_MAX_AGE = 125;

    /**
     * Minimum age allowed.
     * @property {number} _MIN_AGE
     * @static
     * @readonly
     */
    static #_MIN_AGE = 1;

    //Private Properties
    /**
     * Name of the citizen.
     * @property {string} _name
     */
    #_name;

    /**
     * Country of the citizen.
     * @property {string} _country
     */
    #_country;

    /**
     * Age of the citizen.
     * @property {number} _age
     */
    #_age;

    /**
     * Constructor of the class Citizen.
     * @param {string} name Name of the citizen.
     * @param {string} country Country of the citizen.
     * @param {number} age Age of the citizen.
     * @throws {Error} If the name is not a string.
     * @throws {Error} If the name length is less than 5 characters.
     * @throws {Error} If the age is not a integer number.
     * @throws {Error} If the age is out of range.
     * @throws {Error} If the country is not valid.
     */
    constructor(name, country, age) {
        this.name = name;
        this.country = country;
        this.age = age;
    }

    /**
     * GETTER: Gets name of the citizen.
     * @returns {string} Name of the citizen.
     */
    get name() {
        return this.#_name;
    }

    /**
     * SETTER: Sets name of the citizen.
     * @returns {void}
     * @throws {Error} If the name is not a string.
     * @throws {Error} If the name length is less than 5 characters.
     */
    set name(name) {
        if (typeof name.trim() !== "string") {
            throw new Error("Nombre no válido. Debe ser una cadena de caracteres.");
        }
        if (name.trim().length < Citizen.#_MIN_NAME_LENGTH) {
            throw new Error("Longitud de nombre inferior a 5 caracteres.");
        }
        this.#_name = name.trim();
    }

    /**
     * GETTER: Gets country of the citizen.
     * @returns {string} Country of the citizen.
     */
    get country() {
        return this.#_country;
    }

    /**
     * SETTER: Sets country of the citizen.
     * @default "Suiza"
     * @returns {void}
     * @info show a warning message in the console because the country is not valid
     */
    set country(country) {
        let validatedCountry = country.trim().toUpperCase();
        //We can improve it using a enum of valid countries or a array of valid countries
        switch (validatedCountry) {
            case "USA":
                this.#_country = "USA";
                break;
            case "URSS":
                this.#_country = "URSS";
                break;
            case "REINO UNIDO":
                this.#_country = "Reino Unido";
                break;
            case "RDA":
                this.#_country = "RDA";
                break;
            case "RFA":
                this.#_country = "RFA";
                break;
            case "FRANCIA":
                this.#_country = "Francia";
                break;
            case "SUIZA":
                this.#_country = "Suiza";
                break;
            default:
                //Country value not valid, we assign a default value
                console.warn("Nombre del país no aceptado, asignado Suiza como valor por defecto");
                this.#_country = "Suiza";
        }
    }

    /**
     * GETTER: Gets age of the citizen.
     * @returns {number} Age of the citizen.
     */
    get age() {
        return this.#_age;
    }

    /**
     * SETTER: Sets age of the citizen.
     * @returns {void}
     * @throws {Error} If the age is not a integer number.
     * @throws {Error} If the age is out of range.
     */
    set age(age) {
        if (typeof age !== "number" || !Number.isInteger(age)) {
            throw new Error("Edad no válida. Debe ser un número entero.");
        }
        if (age < Citizen.#_MIN_AGE || Citizen.#_MAX_AGE < age) {
            throw new Error("Edad fuera del rango permitido.");
        }
        this.#_age = age;
    }

    /**
     * Method that returns a representation of the object citizen as a string.
     * @returns {string} String with the information of the citizen.
     */
    toString() {
        return `Nombre: ${this.name} | País: ${this.country} | Edad: ${this.age} años`;
    }
}

export default Citizen;