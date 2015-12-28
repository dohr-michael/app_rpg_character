import Immutable from 'immutable';
import Player    from 'model/Player';

export default class CharacterSheet {
    id:string;
    player:Player;
    fields:Map = new Map();

    withPlayer( player:Player ):CharacterSheet {
        this.player = player;
        return this;
    }
}