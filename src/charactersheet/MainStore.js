import * as Api       from 'api/VampireApi';
import Store          from 'utils/Store';
import * as Actions   from 'charactersheet/Actions';
import Player         from 'model/Player';
import CharacterSheet from 'model/CharacterSheet';
import * as Vampire   from 'model/VampireCharacter';
import AppMainStore   from 'main/MainStore';

class MainStore extends Store {
    ruleSystem:string = 'vampire';
    characterSheet:CharacterSheet;

    constructor() {
        super();
        this.listenOf( Actions.initCreation, this.initCreation.bind( this ) );
    }

    initCreation() {
        Api.getCharacterSheetRules( AppMainStore.player )
            .then( characterSheet => {
                this.characterSheet = characterSheet;
                this.emitChange();
            } );
    }


    get states() {
        return {
            ruleSystem:     this.ruleSystem,
            characterSheet: this.characterSheet
        };
    }
}

export default new MainStore();