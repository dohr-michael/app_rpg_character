import Immutable from 'immutable';
import Player    from 'model/Player';

export class CharacterSheetSelect {
    name:string;
    description:string;
    icon:string;

    withName( name:string ):CharacterSheetSelect {
        this.name = name;
        return this;
    }

    withDescription( description:string ):CharacterSheetSelect {
        this.description = description;
        return this;
    }

    withIcon( icon:string ):CharacterSheetSelect {
        this.icon = icon;
        return this;
    }

    toJSON() {
        return {
            name:        this.name,
            description: this.description,
            icon:        this.icon
        }
    }
}

export class CharacterSheetItem {
    type:string;
    name:string;
    value;
    meta:Immutable.Map = Immutable.Map();
    values:Immutable.List<CharacterSheetSelect> = Immutable.List();
    subItems:Immutable.List<CharacterSheetItem> = Immutable.List();

    withType( type:string ):CharacterSheetItem {
        this.type = type;
        return this;
    }

    withName( name:string ):CharacterSheetItem {
        this.name = name;
        return this;
    }

    withValue( value ):CharacterSheetItem {
        this.value = value;
        return this;
    }

    withMeta( meta:object ):CharacterSheetItem {
        this.meta = Immutable.Map( meta );
        return this;
    }

    withSubItems( items:Array<CharacterSheetItem> ):CharacterSheetItem {
        this.subItems = Immutable.List( items || [] );
        return this;
    }

    withValues( values:Array<CharacterSheetSelect> ):CharacterSheetItem {
        this.values = Immutable.List( values || [] );
        return this;
    }

    toJSON() {
        return {
            type:     this.type,
            name:     this.name,
            value:    this.value,
            subItems: this.subItems.toArray()
        };
    }
}

export default class CharacterSheet {
    id:string;
    player:Player;
    name:string;
    chronic:string;
    items:Immutable.List<CharacterSheetItem> = Immutable.List();

    withPlayer( player:Player ):CharacterSheet {
        this.player = player;
        return this;
    }

    withItems( items:Array<CharacterSheetItem> ):CharacterSheet {
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