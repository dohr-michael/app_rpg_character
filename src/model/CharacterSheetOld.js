import Player from 'model/Player';

export class Attribute {

}

export class General {
    player:Player;
    chronic:string;
    name:string;
}

export class Archetype {
    nature:string;
    attitude:string;
    concept:string;
}

export class Vampire {
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
    general:General = new General();
    archetype:Archetype = new Archetype();
    vampire:Vampire = new Vampire();
    // Attributes

}