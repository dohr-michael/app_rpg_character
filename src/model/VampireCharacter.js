import CharacterSheet, { CharacterSheetItem } from 'model/CharacterSheet';
import Player                                 from 'model/Player';

function createGroup( name ) {
    return new CharacterSheetItem().withType( 'group' ).withName( name );
}

function createString( name ) {
    return new CharacterSheetItem().withType( 'string' ).withName( name );
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
    return createGroup( 'attributes' ).withSubItems( [] );
}

function skills() {
    return createGroup( 'skills' ).withSubItems( [] );
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
            //skills(),
            //advantages(),
            //other()
        ] );
}