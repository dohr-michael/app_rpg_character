import Immutable      from 'immutable';
import CharacterSheet from 'model/CharacterSheet';


export class Option {
    name:string;
    icon:string;

    withName( name:string ):Option {
        this.name = name;
        return this;
    }

    withIcon( icon:string ):Option {
        this.icon = icon;
        return this;
    }
}

export class Rule {
    type:string;
    name:string;
    meta:Immutable.Map = Immutable.Map();
    options:Immutable.List<Option> = Immutable.List();
    rules:Immutable.List<Rule> = Immutable.List();

    withType( type:string ):Rule {
        this.type = type;
        return this;
    }

    withName( name:string ):Rule {
        this.name = name;
        return this;
    }

    withMeta( meta:object ):Rule {
        this.meta = Immutable.Map( meta );
        return this;
    }

    withOptions( options:Array<Option> ):Rule {
        this.options = Immutable.List( options || [] );
        return this;
    }

    withRules( rules:Array<Rule> ):Rule {
        this.rules = Immutable.List( rules || [] );
        return this;
    }
}

export default class CharacterSheetRules {
    system:string;
    rules:Immutable.List< Rule >;
    i18n:object;
    characterSheetFactory:Function = () => new CharacterSheet();

    withSystem( system:string ):CharacterSheetRules {
        this.system = system;
        return this;
    }

    withRules( rules:Array<Rule> ):CharacterSheetRules {
        this.rules = Immutable.List( rules || [] );
        return this;
    }

    withI18n( i18n:object ):CharacterSheetRules {
        this.i18n = i18n;
        return this;
    }

    withCharacterSheetFactory( func:Function ):CharacterSheetRules {
        this.characterSheetFactory = func;
        return this;
    }
}