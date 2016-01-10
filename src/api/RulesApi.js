import _                              from 'lodash';
import CharacterSheet                 from 'model/CharacterSheet';
import CharacterSheetRules            from 'model/CharacterSheetRules';
import Player                         from 'model/Player';
import * as Formatter                 from 'api/model/CharacterSheetRulesFormatter';


const baseUrl = 'http://localhost:9000';

function getLinks( links:object ):Promise {
    const urls = _.values( links );
    const keys = _.keys( links );
    return Promise.all(
        urls.map( url => fetch( url )
            .then( result => result.json() )
            .then( json => json.values.map( Formatter.toOption ) ) )
    ).then( values => _.zipObject( keys, values ) );
}

function getI18n( url:string ):Promise {
    return url ? fetch( url ).then( result => result.json() ) : Promise.success( {} );
}

export function getRules( ruleSystem ):Promise<CharacterSheetRules> {
    return fetch( require( 'api/vampire/rules.json' ) )
        .then( result => result.json() )
        .then( json => Promise.all( [getLinks( json._links || {} ), getI18n( json._i18n || null )] )
            .then( items => {
                json._links = items[0];
                json._i18n = items[1];
                return json;
            } )
        ).
        then( json => {
            return Formatter.toCharacterSheetRules( json, ruleSystem );
        } );
}

export function save( ruleSystem:string, characterSheet:CharacterSheet ):Promise<CharacterSheet> {
    return fetch( `${baseUrl}`, { method: 'POST', body: characterSheet } )
        .then( result => result.json() );
}
