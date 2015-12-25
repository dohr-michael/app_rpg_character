import Store          from 'utils/Store';
import * as Actions   from 'charactersheet/Actions';
import Player         from 'model/Player';
import CharacterSheet from 'model/CharacterSheet';
import * as Vampire   from 'model/VampireCharacter';
import AppMainStore   from 'main/MainStore';

class MainStore extends Store {

    characterSheet:CharacterSheet;

    constructor() {
        super();
        AppMainStore.addChangeListener( this.appStoreChange.bind( this ) );
        this.listenOf( Actions.initCreation, this.initCreation.bind( this ) );
    }

    appStoreChange() {
        if( this.characterSheet ) {
            this.characterSheet.player = AppMainStore.player;
            this.emitChange();
        }
    }

    initCreation() {
        this.characterSheet = Vampire.empty(AppMainStore.player);
        this.emitChange();
    }


    get states() {
        return {
            characterSheet: this.characterSheet
        };
    }
}

export default new MainStore();