import Citizen from './Citizen.js';

/**
 * Class representing a spy.
 * @extends Citizen
 * @property {string} type Type of spy.
 * @throws {Error} If the type is not valid.
 * @returns {Spy} Object of type Spy.
 * @version 1.0
 * @author  Andrés Samuel Podadera González
 */
class Spy extends Citizen {

    //Static Properties
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
    static #_MIN_AGE = 16;

    //Private Properties
    /**
     * Type of spy.
     * @property {string} _type
     */
    #_type;

    /**
     * Creates an Spy.
     * @param {string} name Name of the spy.
     * @param {string} country Country of the spy.
     * @param {number} age Age of the spy.
     * @param {string} type Type of spy.
     * @throws {Error} If the type is not valid.
     */
    constructor(name, country, age, type) {
        super(name, country, age);
        this.type = type;
    }

    //Note: if you redefine a setter, you have to redefine its getter too

    /**
     * GETTER: Gets name of the spy.
     * @returns {string} Name of the spy.
     */
    get country() {
        return super.country;
    }

    /**
     * SETTER: Sets country of the spy.
     * @param {string} country Name of the spy.
     * @throws {Error} If the country is not valid.
     * @returns {void}
     */
    set country(country) {
        let cleanedCountry = country.trim().toUpperCase();
        //We can improve it using a enum of valid countries or a array of valid countries
        switch (cleanedCountry) {
            case "USA":
                super.country = "USA";
                break;
            case "URSS":
                super.country = "URSS";
                break;
            case "REINO UNIDO":
                super.country = "Reino Unido";
                break;
            case "RDA":
                super.country = "RDA";
                break;
            case "RFA":
                super.country = "RFA";
                break;
            case "FRANCIA":
                super.country = "Francia";
                break;
            default:
                super.country = "Suiza";
                break;
        }
    }

    /**
     * GETTER: Gets age of the spy.
     * @returns {number} Age of the spy.
     */
    get age() {
        return super.age;
    }

    /**
     * SETTER: Sets age of the spy.
     * @param {number} age Age of the spy.
     * @throws {Error} If the age is not valid. Must be a number and an integer.
     * @throws {Error} If the age is out of range.
     * @returns {void}
     */
    set age(age) {
        if (typeof age !== "number" || !Number.isInteger(age)) {
            throw new Error("Edad no válida. Debe ser un número entero.");
        }
        if (age < Spy.#_MIN_AGE || Spy.#_MAX_AGE < age) {
            throw new Error("Edad fuera del rango permitido.");
        }
        super.age = age;
    }

    /**
     * GETTER: Gets type of the spy.
     * @returns {string} Type of the spy.
     */
    get type() {
        return this.#_type;
    }

    /**
     * SETTER: Sets type of the spy.
     * @param {string} type Type of the spy.
     * @throws {Error} If the type is not valid.
     * @returns {void}
     */
    set type(type) {
        switch (type) {
            case "desestabilizador":
                this.#_type = type;
                break;
            case "diplomático":
                this.#_type = type;
                break;
            case "infiltrado":
                this.#_type = type;
                break;
            case "ilegal":
                this.#_type = type;
                break;
            case "operativo":
                this.#_type = type;
                break;
            case "provocador":
                this.#_type = type;
                break;
            case "durmiente":
                this.#_type = type;
                break;
            default:
                throw new Error("Tipo de espía no válido");
        }
    }

    /**
     * Method that returns a representation of the object spy as a string.
     * @returns {string} String with the information of the spy.
     */
    toString() {
        return super.toString() + " | Tipo: " + this.#_type;
    }
}

export default Spy;