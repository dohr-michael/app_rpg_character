import _         from 'lodash';
import Player    from 'model/Player';

export default class CharacterSheet {
    id:string;
    name:string;
    chronicle:string;
    player:string;
    fields:Map = new Map();

    withPlayer( player:string ):CharacterSheet {
        this.player = player;
        return this;
    }

    toJSON() {
        const fields = {};
        this.fields.forEach( ( value, key ) => {
            fields[key] = value;
        } );
        return { player: this.player, fields };
    }
}