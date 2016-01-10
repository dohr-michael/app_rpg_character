import _                                from 'lodash';
import React, { Component, PropTypes }  from 'react';
import { FormattedDate, IntlProvider }  from 'react-intl';
import { AuthListener }                 from '../auth-back/AppAuthStore';
import * as AuthAction                  from '../auth-back/AppAuthActions';
import styles                           from './Main.scss';
import ViewStoreListener                from 'utils/ViewStoreListener';
import MainStore                        from './MainStore';
import Header                           from './Header';

class View extends Component {

    static contextTypes = {
        intl: PropTypes.object,
        router: PropTypes.object
    };

    static childContextTypes = {
        intl: PropTypes.object
    };

    constructor( props ) {
        super( props );
        AuthAction.authSuccess.listen( ::this.authSuccess );
    }

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

    authSuccess( newRoute ) {
        this.context.router.push( newRoute );
    }

    render() {
        if( AuthListener.isAuthCallBack() ) {
            AuthListener.endAuth();
            return null;
        }
        return (
            <div className={styles['core']}>
                <Header className={styles['header']}
                        player={ this.props.player }/>
                <div className={styles['body']}>
                    <div className={styles['content']}>
                        { this.props.children }
                    </div>
                    <div className={styles['nav']}/>
                    <div className={styles['ads']}/>
                </div>
                <div className={styles['footer']}/>
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
            <IntlProvider locale={ this.state.locale } messages={ this.state.messages || {} }>
                <View player={ this.state.player }>
                    { this.props.children }
                </View>
            </IntlProvider>
        )
    }
}