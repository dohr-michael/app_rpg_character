import _                   from 'lodash';
import * as Api            from 'api/RulesApi';
import Store               from 'utils/Store';
import * as Actions        from 'charactersheet/Actions';
import * as MainActions    from 'main/Actions';
import Player              from 'model/Player';
import CharacterSheet      from 'model/CharacterSheet';
import CharacterSheetRules from 'model/CharacterSheetRules';

class MainStore extends Store {
    rules:Map = new Map();
    ruleSystem:CharacterSheetRules;
    characterSheet:CharacterSheet;

    constructor() {
        super();
        this.listenOf( Actions.initCreation, this.initCreation.bind( this ) );
        this.listenOf( Actions.save.success, this.save.bind( this ) );
    }

    initCreation( ruleSystem, playerName ) {
        const emit = () => {
            this.ruleSystem = this.rules.get( ruleSystem );
            this.characterSheet = this.ruleSystem.characterSheetFactory().withPlayer( new Player().withName( playerName ) );
            this.emitChange();
        };
        this.ruleSystem = ruleSystem;
        if( this.rules.has( ruleSystem ) ) {
            emit();
        } else {
            Api.getRules( ruleSystem )
                .then( ( result:CharacterSheetRules ) => {
                    this.rules.set( ruleSystem, result );
                    MainActions.addTranslation( ruleSystem, result.i18n );
                    emit();
                } );
        }
    }

    save( characterSheet:CharacterSheet ) {
        console.log( JSON.stringify( characterSheet ) );
    }

    get states() {
        return {
            ruleSystem:     this.ruleSystem,
            characterSheet: this.characterSheet
        };
    }
}

export default new MainStore();