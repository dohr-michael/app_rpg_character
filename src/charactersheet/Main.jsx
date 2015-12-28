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
import ItemFactory                              from './items/ItemFactory';

class CharacterSheetView extends Component {

    static propTypes = {
        characterSheet: PropTypes.instanceOf( CharacterSheet ).isRequired,
        ruleSystem:     PropTypes.string.isRequired
    };

    render() {
        let items;
        if( this.props.characterSheet.items ) {
            items = this.props.characterSheet.items.map( item => ItemFactory( item, this.props.ruleSystem ) );
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
                <CharacterSheetView characterSheet={ this.state.characterSheet }
                                    ruleSystem={ this.state.ruleSystem }/>
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