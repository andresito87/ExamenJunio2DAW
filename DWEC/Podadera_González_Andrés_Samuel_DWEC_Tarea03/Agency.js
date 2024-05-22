import Spy from './Spy.js';

/**
 * Class that represents an agency.
 * @property {string} nameAgency Name of the agency.
 * @property {string} country Country of the agency.
 * @property {Array} agents Array of agents.
 * @throws {Error} If the name is not a string.
 * @throws {Error} If the country is not valid.
 * @version 1.0
 * @author Andrés Samuel Podadera González
 */
class Agency {

    //Private properties
    /**
     * Name of the agency.
     * @property {string} _name
     */
    #_name;

    /**
     * Country of the agency.
     * @property {string} _country
     */
    #_country;

    /**
     * Array of objects of type Spy.
     * @property {Array} _agents
     */
    #_agents;

    /**
     * Creates an Agency.
     * @param {string} name Name of the agency.
     * @param {string} country Country of the agency.
     * @throws {Error} If the name is not URSS, USA or Reino Unido.
     */
    constructor(name, country) {
        this.name = name;
        this.country = country;
        this.#_agents = [];
    }

    /**
     * GETTER: Gets name of the agency.
     * @returns {string} Name of the agency.
     */
    get name() {
        return this.#_name;
    }

    /**
     * SETTER: Sets name of the agency.
     * @returns {void}
     * @param {string} name Name of the agency.
     * @throws {Error} If the name is not URSS, USA or Reino Unido.
     */
    set name(name) {
        this.#_name = name;
    }

    /**
     * GETTER: Gets country of the agency.
     * @returns {string} Country of the agency.
     */
    get country() {
        return this.#_country;
    }

    /**
     * SETTER: Sets country of the agency.
     * @param {string} country Country of the agency.
     * @throws {Error} If the country is not URSS, USA or Reino Unido.
     * @returns {void}
     */
    set country(country) {
        switch (country) {
            case "USA":
                this.#_country = country;
                break;
            case "Reino Unido":
                this.#_country = country;
                break;
            case "URSS":
                this.#_country = country;
                break;
            default:
                throw new Error("Nombre de agencia no válido.");
        }
    }

    /**
     * GETTER: Gets array of agents.
     * @returns {Array} Array of agents.
     * @info To protect the array, sending a copy
     */
    get agents() {
        let copyAgents = [...this.#_agents];
        return copyAgents;
    }

    /**
     * Adds a spy to the agency.
     * @param {Spy} wantedAgent Spy to add.
     * @returns {boolean} True if the spy has been added, false if not.
     * @info If the spy is already in the agency, it will not be added.
     */
    toRecruitAgent(wantedAgent) {
        let initialSize = this.#_agents.length;
        let agentFound = false;
        for (let agent of this.#_agents) {
            if (wantedAgent.name === agent.name) {
                agentFound = true;
            }
        }
        let finalSize;
        if (!agentFound) {
            finalSize = this.#_agents.push(wantedAgent);
        }
        return initialSize < finalSize;
    }

    /**
     * Removes a spy from the agency.
     * @param {string} name Name of the spy to remove.
     * @returns {boolean} True if the spy has been removed, false if not.
     * @info If the spy is not in the agency, it will not be removed.
     */
    toFireAgent(name) {
        let initialSize = this.#_agents.length;
        for (let agent of this.#_agents) {
            if (name === agent.name) {
                this.#_agents.splice(this.#_agents.indexOf(agent), 1);
            }
        }
        return initialSize !== this.#_agents.length;
    }

    /**
     * Lists the agents of a type.
     * @param {string} type Type of the agents to list.
     * @returns {string} String with the agents of the type.
     * @info If there are no agents of the type, it will return a message.
     */
    toListAgents(type) {
        let agentsOfWantedType = [];
        for (let agent of this.#_agents) {
            if (agent.type === type) {
                agentsOfWantedType.push(agent);
            }
        }
        let result = "";
        if (agentsOfWantedType.length === 0) {
            result = `No hay agentes de tipo "${type}" en la ${this.name}.`;
        } else {
            for (let agent of agentsOfWantedType) {
                result += agent.toString() + "<br>";
            }
        }
        return result;
    }

    /**
     * Lists the agents ordered by a parameter.
     * @param {string} orderingElement @values "nombre" or "edad". Element to order the agents.
     * @returns {string} String with the agents ordered.
     * @info If the element is not "nombre" or "edad", it will return a message.
     */
    toOrderedAgentList(orderingElement) {
        let orderedList = [...this.#_agents];

        // Ordering
        orderedList.sort((a, b) => {
            // By name
            if (orderingElement === "nombre") {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                } else {
                    return 0;
                }
            }
            // By age
            if (orderingElement === "edad") {
                if (a.age < b.age) {
                    return -1;
                }
                if (a.age > b.age) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });

        if (orderingElement !== "nombre" && orderingElement !== "edad") {
            console.warn(`No se realizado ningún ordenamiento. El elemento "${orderingElement}" no es válido.`);
        }

        let orderedListToString = "";
        for (let agent of orderedList) {
            orderedListToString += agent.toString() + "<br>";
        }

        return orderedListToString;
    }

    /**
     * Gives format to the information of the agents.
     * @returns {string} String with the information of the agents ordered by country.
     */
    #_giveFormatToInfo() {
        // Ordering by country
        let orderedList = [...this.#_agents];
        orderedList.sort((a, b) => {
            if (a.country < b.country) {
                return -1;
            }
            if (a.country > b.country) {
                return 1;
            } else {
                return 0;
            }
        });

        // Adding agents(rows) to the table
        let contentTable = "";
        orderedList.forEach(element => {
            // Splitting the string to get the info of the agent
            contentTable += element.toString().split(" | ")
                .reduce((acc, curr) => acc + "<td>" + curr
                    .replace(/Nombre: |País: |Edad: |Tipo: /g, "") + "</td>", "<tr>") + "</tr>";
        });

        return contentTable;
    }

    /**
     * Method that returns a representation of the object agency as a string in a table.
     * @returns {string} String with the information of the agency.
     * @info Info displayed in a table with standard format HTML5.
     */
    toString() {
        const agencyTitleTable = `<tr><td id="titleTable" colspan="4" style="text-align: center;">Agencia: ${this.name} - País: ${this.country}</td></tr>`;
        const header = "<tr><th>Nombre</th><th>País</th><th>Edad</th><th>Tipo</th></tr>";
        let result = "<table border='1'>";

        //adding the title and the header
        result += agencyTitleTable;
        result += header;

        //adding the content of the table
        result += this.#_giveFormatToInfo();

        result += "</table>";
        return result;
    }

}

export default Agency;