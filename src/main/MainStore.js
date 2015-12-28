import _              from 'lodash';
import Store          from 'utils/Store';
import Player         from 'model/Player';
import * as Actions   from './Actions';
import messages       from 'i18n/messages';

const AVAILABLE_LOCALE = ['en', 'fr'];

class MainStore extends Store {

    translations:object = _.assign( {}, messages );
    locale:string = 'en';
    player:Player;

    constructor() {
        super();
        this.player = new Player().withName( 'Michael DOHR' );
        this.listenOf( Actions.updateLocale, this.updateLocale.bind( this ) );
        this.listenOf( Actions.addTranslation, this.addTranslation.bind( this ) );
    }

    addTranslation( ref, translations ) {
        var isChanged = false;
        AVAILABLE_LOCALE.forEach( lang => {
            if( !this.translations.hasOwnProperty( lang ) ) {
                this.translations[lang] = {};
            }
            if( translations.hasOwnProperty( lang ) ) {
                _.keys( translations[lang] ).forEach( key => {
                    var transKey = `${ref}.${key}`;
                    if( !this.translations[lang].hasOwnProperty( transKey ) ) {
                        isChanged = true;
                        this.translations[lang][transKey] = translations[lang][key];
                    }
                } );
            }
        } );
        if( isChanged )this.emitChange();
    }

    updateLocale( locale ) {
        if( locale && AVAILABLE_LOCALE.indexOf( locale ) > -1 ) {
            this.locale = locale;
            this.emitChange();
        }
    }

    get states() {
        return {
            locale:   this.locale,
            player:   this.player,
            messages: this.translations[this.locale]
        };
    }
}

export default new MainStore();