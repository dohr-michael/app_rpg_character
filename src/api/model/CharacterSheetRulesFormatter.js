import _                                     from 'lodash';
import CharacterSheet                        from 'model/CharacterSheet';
import CharacterSheetRules, { Rule, Option } from 'model/CharacterSheetRules';

function generateFactory( fieldsFunction:Array<Function> ):Function {
    return () => {
        const result = new CharacterSheet();
        fieldsFunction.forEach( func => {
            func( result );
        } );
        return result;
    }
}


function parseLinksAndMeta( csi:Rule, itemLinks:object, itemMeta:object, links:object ):object {
    const meta = {};
    _.keys( itemLinks ).forEach( key => {
        const linkValue = links[itemLinks[key]];
        switch( key ) {
            case 'options':
                csi.withOptions( linkValue || [] );
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

function toRule( item:object, factoryFunctions:Array<Function>, links:object, parent = '' ) {
    const path = (parent == '' ? '' : parent + '.') + item.name;
    const result = new Rule().withType( item.type ).withName( path );
    parseLinksAndMeta( result, item._links, item._meta, links );
    let defaultValue;
    switch( item.type ) {
        case 'group':
            result.withRules( item.items.map( subItem => toRule( subItem, factoryFunctions, links, path ) ) );
            break;
        case 'integer':
            if( result.meta.has( 'min' ) ) {
                defaultValue = result.meta.get( 'min' );
            }
        default:
            factoryFunctions.push( ( cr:CharacterSheet ) => {
                cr.fields.set( path, defaultValue );
            } );
    }
    return result;
}

function readCSRJson( json:object ):object {
    const links = json._links;
    const factoryFunctions:Array<Function> = [];
    const rules:Array<Rule> = json.items.map( item => toRule( item, factoryFunctions, links ) ) || [];
    return { rules: rules, factory: generateFactory( factoryFunctions ) };
}


export function toOption( item:object ):Option {
    return new Option()
        .withName( item.name )
        .withIcon( item.icon || null );
}

export function toCharacterSheetRules( json:object, ruleSystem:string ):CharacterSheetRules {
    const readed = readCSRJson( json );
    return new CharacterSheetRules()
        .withSystem( ruleSystem )
        .withI18n( json._i18n || {} )
        .withRules( readed.rules )
        .withCharacterSheetFactory( readed.factory );
}