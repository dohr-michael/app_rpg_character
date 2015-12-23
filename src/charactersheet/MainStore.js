import Store          from 'utils/Store';
import * as Actions   from 'charactersheet/Actions';
import Player         from 'model/Player';
import AppMainStore   from 'main/MainStore';
import CharacterSheet from 'model/CharacterSheet';

class MainStore extends Store {

    characterSheet:CharacterSheet;

    constructor() {
        super();
        AppMainStore.addChangeListener( this.appStoreChange.bind( this ) );
        this.listenOf( Actions.initCreation, this.initCreation.bind( this ) );
    }

    appStoreChange() {
        if( this.characterSheet ) {
            this.characterSheet.general.player = AppMainStore.player;
            this.emitChange();
        }
    }

    initCreation() {
        this.characterSheet = new CharacterSheet();
        this.characterSheet.general.player = AppMainStore.player;
        this.emitChange();
    }


    get states() {
        return {
            characterSheet: this.characterSheet
        };
    }
}

export default new MainStore();