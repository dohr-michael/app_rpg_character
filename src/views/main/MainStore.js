/* @flow */

import { Store } from 'airflux';
import _         from 'lodash';
import messages  from '../../i18n/messages';

export const AVAILABLE_LOCALE = ['en', 'fr'];

export type MainStoreState = {
    locale:string,
    messages: ?Object
};

class MainStore extends Store {

    translations:Object = _.assign({}, messages );
    locale:string = 'en';

    constructor() {
        super();
    }

    get state():MainStoreState {
        return {
            locale: this.locale,
            messages: this.translations[this.locale]
        };
    }
}

export default new MainStore();
