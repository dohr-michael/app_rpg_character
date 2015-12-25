import Immutable from 'immutable';
import Player    from 'model/Player';

export class CharacterSheetItem {
    type:string;
    name:string;
    value:any;
    subItems:Immutable.List<CharacterSheetItem> = Immutable.List();

    withType( type:string ) {
        this.type = type;
        return this;
    }

    withName( name:string ) {
        this.name = name;
        return this;
    }

    withValue( value:any ) {
        this.value = value;
        return this;
    }

    withSubItems( items:Array<CharacterSheetItem> ) {
        this.subItems = Immutable.List( items || [] );
        return this;
    }

    toJSON() {
        return {
            type:     this.type,
            name:     this.name,
            value:    this.value,
            subItems: this.subItems
        };
    }
}

export default class CharacterSheet {
    id:string;
    player:Player;
    items:Immutable.List<CharacterSheetItem> = Immutable.List();

    withPlayer( player:Player ) {
        this.player = player;
        return this;
    }

    withItems( items:Array<CharacterSheetItem> ) {
        this.items = Immutable.List( items || [] );
        return this;
    }

    toJSON() {
        return {
            id:     this.id,
            player: this.player,
            items:  this.items.toArray()
        };
    }
}