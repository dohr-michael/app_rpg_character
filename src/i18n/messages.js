import _                   from 'lodash';
import { addLocaleData }   from 'react-intl';
import baseEn              from 'react-intl/lib/locale-data/en';
import baseFr              from 'react-intl/lib/locale-data/fr';

import * as en             from './en';
import * as fr             from './fr';

addLocaleData( baseEn );
addLocaleData( baseFr );

function transform( item, items = {}, path = '' ) {
    const result = _.assign({}, items );
    _.keys( item ).forEach( key => {
        const currentPath = ( path === '' ? '' : path + '.' ) + key;
        const value = item[key];
        if ( _.isPlainObject( value )) {
            transform( value, result, currentPath );
        } else {
            result[currentPath] = value;
        }
    });
    return result;
}

export default {
    en: transform( en ),
    fr: transform( fr )
};
