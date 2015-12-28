import CharacterSheet, { CharacterSheetItem, CharacterSheetSelect } from 'model/CharacterSheet';
import Player                                                       from 'model/Player';


function createGroup( name ) {
    return new CharacterSheetItem().withType( 'group' ).withName( name );
}

function createOneOf( name, availables:Array<object> ) {
    return new CharacterSheetItem().withType( 'oneOf' ).withName( name )
        .withSubItems( availables.map( it => new CharacterSheetSelect().withName( it.name ).withIcon( it.icon ) ) );
}

function createString( name ) {
    return new CharacterSheetItem().withType( 'string' ).withName( name );
}

function createInt( name, min = 0, max = 5 ) {
    return new CharacterSheetItem().withType( 'integer' ).withName( name )
        .withMeta( {
            min: min,
            max: max
        } );
}

function general() {
    return createGroup( 'general' ).withSubItems( [
        createGroup( 'information' ).withSubItems(
            [
                createString( 'name' ),
                createString( 'chronic' )
            ]
        ),
        createGroup( 'archetype' ).withSubItems(
            [
                createString( 'nature' ),
                createString( 'attitude' ),
                createString( 'concept' )
            ]
        ),
        createGroup( 'vampire' ).withSubItems(
            [
                createString( 'clan' ),
                createString( 'generation' ),
                createString( 'sire' )
            ]
        )
    ] );
}

function attributes() {
    return createGroup( 'attributes' ).withSubItems( [
        createGroup( 'physical' ).withSubItems(
            [
                createInt( 'strength', 1, 10 ),
                createInt( 'dexterity', 1, 10 ),
                createInt( 'stamina', 1, 10 )
            ]
        ),
        createGroup( 'social' ).withSubItems(
            [
                createString( 'charisma', 1, 10 ),
                createString( 'manipulation', 1, 10 ),
                createString( 'appearance', 1, 10 )
            ]
        ),
        createGroup( 'mental' ).withSubItems(
            [
                createString( 'perception', 1, 10 ),
                createString( 'intelligence', 1, 10 ),
                createString( 'wits', 1, 10 )
            ]
        )
    ] );
}

function abilities() {
    return createGroup( 'abilities' ).withSubItems( [
        createGroup( 'talents' ).withSubItems(
            [
                createInt( 'alertness', 0, 10 ),
                createInt( 'athletics', 0, 10 ),
                createInt( 'awareness', 0, 10 ),
                createInt( 'brawl', 0, 10 ),
                createInt( 'empathy', 0, 10 ),
                createInt( 'expression', 0, 10 ),
                createInt( 'intimidation', 0, 10 ),
                createInt( 'leadership', 0, 10 ),
                createInt( 'streetwise', 0, 10 ),
                createInt( 'subterfuge', 0, 10 )
            ]
        ),
        createGroup( 'skills' ).withSubItems(
            [
                createInt( 'animalken', 0, 10 ),
                createInt( 'crafts', 0, 10 ),
                createInt( 'drive', 0, 10 ),
                createInt( 'etiquette', 0, 10 ),
                createInt( 'firearms', 0, 10 ),
                createInt( 'larceny', 0, 10 ),
                createInt( 'melee', 0, 10 ),
                createInt( 'performance', 0, 10 ),
                createInt( 'stealth', 0, 10 ),
                createInt( 'survival', 0, 10 )
            ]
        ),
        createGroup( 'knowledges' ).withSubItems(
            [
                createInt( 'academics', 0, 10 ),
                createInt( 'computer', 0, 10 ),
                createInt( 'finance', 0, 10 ),
                createInt( 'investigation', 0, 10 ),
                createInt( 'law', 0, 10 ),
                createInt( 'medicine', 0, 10 ),
                createInt( 'occult', 0, 10 ),
                createInt( 'politics', 0, 10 ),
                createInt( 'science', 0, 10 ),
                createInt( 'technology', 0, 10 )
            ]
        )
    ] );
}

function advantages() {
    return createGroup( 'advantages' ).withSubItems( [] );
}

function other() {
    return createGroup( 'other' ).withSubItems( [] );
}

export function empty( player:Player ) {
    return new CharacterSheet()
        .withPlayer( player )
        .withItems( [
            general(),
            attributes(),
            abilities(),
            //advantages(),
            //other()
        ] );
}