import _                                        from 'lodash';
import React, { Component, PropTypes }          from 'react';
import classNames                               from 'classnames';
import Grid, { Cell }                           from 'components/Grid';

import ViewStoreListener                        from 'utils/ViewStoreListener';
import CharacterSheet,{ CharacterSheetItem }    from 'model/CharacterSheet';
import Fields, { ValueLink }                    from 'components/Fields';
import MainStore                                from './MainStore';
import * as Actions                             from './Actions';
import styles                                   from './Main.scss';
import * as tools                               from 'utils/tools';


class CharacterSheetView extends Component {

    static propTypes = {
        characterSheet: PropTypes.instanceOf( CharacterSheet ).isRequired
    };

    createValueLink( item:CharacterSheetItem ) {
        return new ValueLink( item.value, newValue => {
            item.value = newValue;
        } );
    }

    buildGroup( item:CharacterSheetItem, fromGroup:boolean ) {
        const subItems = item.subItems.map( item => this.buildItem( item, true ) );
        if( fromGroup ) {
            return (
                <Cell key={ tools.guid() }>
                    <Grid>
                        <Cell full={true}>
                            { item.name }
                        </Cell>
                    </Grid>
                    <Grid>
                        <Cell full={true}>
                            { subItems }
                        </Cell>
                    </Grid>
                </Cell>
            )
        }
        return (
            <div key={ tools.guid() }>
                <Grid>
                    <Cell full={true}>
                        { item.name } <br />
                        <hr />
                    </Cell>
                </Grid>
                <Grid>
                    { subItems }
                </Grid>
            </div>
        );
    }

    buildItem( item:CharacterSheetItem, fromGroup:boolean ) {
        let result;
        switch( item.type ) {
            case 'group':
                result = this.buildGroup( item, fromGroup );
                break;
            default:
                result = (
                    <Fields key={ tools.guid() }
                            title={ item.name }
                            valueLink={ this.createValueLink( item ) }/>
                );
        }
        return result;
    }

    render() {
        let items;
        if( this.props.characterSheet.items ) {
            items = this.props.characterSheet.items.map( item => this.buildItem( item, false ) );
        }
        return (
            <div>
                { items }
            </div>
        );
    }
}


export default class Main extends Component {

    static propTypes = {};

    static contextTypes = {};

    constructor( props ) {
        super( props );
        this.storeListener = new ViewStoreListener( [MainStore], this );
        this.state = this.storeListener.initialState;
    }

    componentDidMount() {
        Actions.initCreation();
    }

    render() {
        let comp;
        if( this.state.characterSheet ) {
            comp = (
                <CharacterSheetView characterSheet={ this.state.characterSheet }/>
            )
        } else {
            comp = (
                <div>
                    Loading ...
                </div>
            );
        }
        return (
            <div className={classNames(styles['core'])}>
                { comp }
            </div>
        );
    }
}