import Player from 'model/Player';

class GeneralInformation {
    player:Player;
    chronic:string;
    name:string;
}

class Archetype {
    nature:string;
    attitude:string;
    concept:string;
}

class VampireInformation {
    clan:string;
    generation:int;
    sire:string;
}

/**
 *
 */
export default class CharacterSheet {
    // General information.
    id:string;
    general:GeneralInformation = new GeneralInformation();
    archetype:Archetype = new Archetype();
    vampire:VampireInformation = new VampireInformation();
}