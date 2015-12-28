import _                                                            from 'lodash';
import CharacterSheet, { CharacterSheetSelect, CharacterSheetItem } from 'model/CharacterSheet';
import Player                                                       from 'model/Player';

function parseLinksAndMeta( csi:CharacterSheetItem, itemLinks:object, itemMeta:object, links:object ):object {
    const meta = {};
    _.keys( itemLinks ).forEach( key => {
        const linkValue = links[itemLinks[key]];
        switch( key ) {
            case 'values':
                csi.withValues( linkValue || [] );
                break;
            default:
                meta[key] = linkValue;

        }
    } );
    _.keys( itemMeta ).forEach( key => {
        switch( key ) {
            default:
                meta[key] = itemMeta[key];
        }
    } );
    csi.withMeta( meta );
}

function toItem( item:object, links:object, player:Player ):CharacterSheetItem {
    const result = new CharacterSheetItem()
        .withType( item.type )
        .withName( item.name );
    parseLinksAndMeta( result, item._links, item._meta, links );
    switch( item.type ) {
        case 'group':
            result.withSubItems( item.subItems.map( subItem => toItem( subItem, links, player ) ) );
            break;
        case 'integer':
            if( result.meta.has( 'min' ) ) {
                result.value = result.meta.get( 'min' );
            }
            break;
        case 'player':
            result.withValue( player );
            break;
        default:
    }
    return result;
}

export function toSelect( item:object ):CharacterSheetSelect {
    return new CharacterSheetSelect()
        .withName( item.name )
        .withIcon( item.icon || null );
}

export function toCharacterSheet( json:object, player:Player = null ):CharacterSheet {
    return new CharacterSheet().withPlayer( player ).withItems( json.items.map( item => toItem( item, json._links, player ) ) );
}