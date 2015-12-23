import React, { Component }    from 'react';
import styles                  from './Main.scss';
import ViewStoreListener       from 'utils/ViewStoreListener';
import MainStore               from './MainStore';

import Header                  from './Header';

export default class Main extends Component {

    constructor() {
        super();
        this.storeListener = new ViewStoreListener( [MainStore], this );
        this.state = this.storeListener.initialState;
    }

    render() {
        return (
            <div className={styles['core']}>
                <Header className={styles['header']}
                        player={ this.state.player }/>
                <div className={styles['body']}>
                    <div className={styles['content']}>
                        { this.props.children }
                    </div>
                    <div className={styles['nav']}>
                        nav
                    </div>
                    <div className={styles['ads']}>
                        ads
                    </div>
                </div>
                <div className={styles['footer']}>
                    footer
                </div>
            </div>
        )
    }
}