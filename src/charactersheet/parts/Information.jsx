import _                                from 'lodash';
import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';
import Grid, { Cell }                   from 'components/Grid';
import Fields, { ValueLink }            from 'components/Fields';

import { General, Archetype, Vampire }  from 'CharacterSheetOld.js';


export default class Informations extends Component {

    static propTypes = {
        general:   PropTypes.instanceOf( General ).isRequired,
        archetype: PropTypes.instanceOf( Archetype ).isRequired,
        vampire:   PropTypes.instanceOf( Vampire ).isRequired
    };

    static contextTypes = {};

    constructor() {
        super();
    }

    genValueLink( name:string, fieldName:string ) {
        const obj = this.props[name];
        return new ValueLink(
            obj[fieldName], newValue => {
                obj[fieldName] = newValue;
                const newState = {};
                newState[name] = obj;
                this.setState( newState );
            }
        );
    }

    genReadOnlyValueLink( value:object ) {
        return new ValueLink( value, newValue => {

        } );
    }

    render() {
        return (
            <Grid>
                <Cell>
                    <div>
                        <Fields title="Nom :" valueLink={ this.genValueLink('general', 'name') }/>
                        <Fields title="Joueur :"
                                valueLink={ this.genReadOnlyValueLink(this.props.general.player.name) }
                                readOnly={ true }/>
                        <Fields title="Chronique :" valueLink={ this.genValueLink('general', 'chronic') }/>
                    </div>
                </Cell>
                <Cell>
                    <div>
                        <Fields title="Nature :" valueLink={ this.genValueLink('archetype', 'nature') }/>
                        <Fields title="Attitude :" valueLink={ this.genValueLink('archetype', 'attitude') }/>
                        <Fields title="Concept :" valueLink={ this.genValueLink('archetype', 'concept') }/>
                    </div>
                </Cell>
                <Cell>
                    <div>
                        <Fields title="Clan :" valueLink={ this.genValueLink('vampire', 'clan') }/>
                        <Fields title="Génération :" valueLink={ this.genValueLink('general', 'generation') }/>
                        <Fields title="Sire :" valueLink={ this.genValueLink('general', 'sire') }/>
                    </div>
                </Cell>
            </Grid>
        );
    }
}