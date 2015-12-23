import _                                from 'lodash';
import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';
import ViewStoreListener                from 'utils/ViewStoreListener';

import MainStore                        from './MainStore';
import * as Actions                     from './Actions';
import styles                           from './Main.scss';
import Information                      from './parts/Information';
import Attributes                       from './parts/Attributes';
import Skills                           from './parts/Skills';
import Advantages                       from './parts/Advantages';
import Others                           from './parts/Others';

/**
 * @author michaeldohr
 * @since 21/12/15
 */
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
                <div>
                    <Information />
                    <Attributes />
                    <Skills />
                    <Advantages />
                    <Others />
                </div>
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