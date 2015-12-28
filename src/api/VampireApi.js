import _                              from 'lodash';
import CharacterSheet                 from 'model/CharacterSheet';
import Player                         from 'model/Player';
import * as CharacterSheetFormatter   from 'api/charactersheet/Formatter.js';

function getLinks( links:object ):Promise {
    const urls = _.values( links );
    const keys = _.keys( links );
    return Promise.all(
        urls.map( url => fetch( url )
            .then( result => result.json() )
            .then( json => json.values.map( CharacterSheetFormatter.toSelect ) ) )
    ).then( values => _.zipObject( keys, values ) );
}

/**
 *
 */
export function getCharacterSheetRules( player:Player ):Promise<CharacterSheet> {
    return fetch( require( 'api/vampire/rules.json' ) )
        .then( result => result.json() )
        .then( json => getLinks( json._links || {} ).then( links => {
                json._links = links;
                return json;
            } )
        ).
        then( json => CharacterSheetFormatter.toCharacterSheet( json, player ) );
}