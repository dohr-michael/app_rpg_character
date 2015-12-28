import _                                from 'lodash';
import React, { Component, PropTypes }  from 'react';
import { FormattedDate, IntlProvider }  from 'react-intl';
import styles                           from './Main.scss';
import ViewStoreListener                from 'utils/ViewStoreListener';
import MainStore                        from './MainStore';
import Header                           from './Header';
import messages                         from 'i18n/messages';

class View extends Component {

    static contextTypes = {
        intl: PropTypes.object
    };

    static childContextTypes = {
        intl: PropTypes.object
    };

    getChildContext() {
        const intl = {
            getMessage: ( key, defaultValue = key ) => {
                if( this.context.intl.messages.hasOwnProperty( key ) ) {
                    return this.context.intl.formatMessage( { id: key } );
                }
                return defaultValue;
            }
        };
        return {
            intl: _.assign( this.context.intl, intl )
        };
    }

    render() {
        return (
            <div className={styles['core']}>
                <Header className={styles['header']}
                        player={ this.props.player }/>
                <div className={styles['body']}>
                    <div className={styles['content']}>
                        { this.props.children }
                    </div>
                    <div className={styles['nav']}>
                        <FormattedDate
                            value={new Date()}
                            day="numeric"
                            month="long"
                            year="numeric"/>
                    </div>
                    <div className={styles['ads']}>
                        ads
                    </div>
                </div>
                <div className={styles['footer']}>
                    footer
                </div>
            </div>
        );
    }
}

export default class Main extends Component {

    constructor() {
        super();
        this.storeListener = new ViewStoreListener( [MainStore], this );
        this.state = this.storeListener.initialState;
    }

    render() {
        return (
            <IntlProvider locale={ this.state.locale } messages={ messages[this.state.locale] || {} }>
                <View player={ this.state.player }>
                    { this.props.children }
                </View>
            </IntlProvider>
        )
    }
}