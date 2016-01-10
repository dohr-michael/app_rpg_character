/* @flow */

import React, { PropTypes  }   from 'react';
import { FluxComponent as fc } from 'airflux';
import _                       from 'lodash';
import ViewContainer           from '../../components/ViewContainer';
import AuthStore               from '../../auth/AuthStore';
import type { AuthStoreState } from '../../auth/AuthStore';
import type AuthProfile        from '../../auth/AuthProfile';
// $ScssImport
import styles                  from './MainView.scss';
import HeaderView              from './HeaderView';

export const MainViewStyles = styles;

export type MainViewProps = {
    children:?ReactElement
};
export type MainViewDefaultProps = {};
export type MainViewState = {
    profile: ?AuthProfile
};
export type MainViewContext = {
    intl: Object
};

export default class MainView extends ViewContainer< MainViewDefaultProps, MainViewProps, MainViewState > {

    static contextTypes = {
        intl: PropTypes.object,
        router: PropTypes.object
    };

    static childContextTypes = {
        intl: PropTypes.object,
        containerUpdater: PropTypes.object
    };

    constructor( props:MainViewProps ) {
        super( props );
        this.state = _.assign( super.state, {
            profile: AuthStore.profile
        });
        this.listenTo( AuthStore, this.authChange.bind( this ));
    }

    state:MainViewState;

    getChildContext():?Object {
        const intl = {
            getMessage: ( key, defaultValue = key ) => {
                if ( this.context.intl.messages.hasOwnProperty( key )) {
                    return this.context.intl.formatMessage({ id: key });
                }
                return defaultValue;
            }
        };
        return _.assign( super.getChildContext(), {
            intl: _.assign( this.context.intl, intl )
        });
    }

    props:MainViewProps;

    authChange( data:AuthStoreState ) {
        this.setState({ profile: data.profile });
    }

    render():?ReactElement {
        return (
            <div className={ styles.core }>
                <HeaderView className={ styles.header } profile={ this.state.profile } />
                <div className={ styles.body }>
                    <div className={ styles.content }>
                        { this.props.children }
                    </div>
                    <div className={ styles.nav }>
                        { this.leftBar }
                    </div>
                    <div className={ styles.ads }>
                        { this.rightBar }
                    </div>
                </div>
                <div className={ styles.footer }/>
            </div>
        );
    }
}
fc( MainView );
