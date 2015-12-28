import _                                from 'lodash';
import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';
import Grid, { Cell }                   from 'components/Grid';
import * as tools                       from 'utils/tools';
import ViewStoreListener                from 'utils/ViewStoreListener';
import CharacterSheetRules              from 'model/CharacterSheetRules';
import CharacterSheet                   from 'model/CharacterSheet';
import MainStore                        from './MainStore';
import * as Actions                     from './Actions';
import styles                           from './Main.scss';
import ItemFactory                      from './ItemFactory';

class CharacterSheetView extends Component {

    static propTypes = {
        characterSheet: PropTypes.instanceOf( CharacterSheet ).isRequired,
        ruleSystem:     PropTypes.instanceOf( CharacterSheetRules ).isRequired
    };

    render() {
        let items;
        if( this.props.ruleSystem.rules ) {
            items = this.props.ruleSystem.rules.map( item => ItemFactory( this.props.ruleSystem.system, item, this.props.characterSheet ) );
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
        Actions.initCreation( 'vampire' );
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