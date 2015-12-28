import Store          from 'utils/Store';
import Player         from 'model/Player';
import * as Actions   from './Actions';

const AVAILABLE_LOCALE = ['en', 'fr'];

class MainStore extends Store {

    locale:string = 'en';
    player:Player;

    constructor() {
        super();
        this.player = new Player().withName( 'Michael DOHR' );
        this.listenOf( Actions.updateLocale, this.updateLocale.bind( this ) );
    }

    updateLocale( locale ) {
        if( locale && AVAILABLE_LOCALE.indexOf( locale ) > -1 ) {
            this.locale = locale;
            this.emitChange();
        }
    }

    get states() {
        return {
            locale: this.locale,
            player: this.player
        };
    }
}

export default new MainStore();