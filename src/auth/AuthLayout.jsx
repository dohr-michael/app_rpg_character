/* @flow */

import React, { Component }    from 'react';
import { FluxComponent as fc } from 'airflux';
import * as Actions            from './AuthActions';
import AuthStore               from './AuthStore';
// $IgnoreFlow : scss import
import styles                  from './AuthLayout.scss';

import type { AuthStoreState } from './AuthStore';

export const AuthLayoutStyles = styles;

export type AuthLayoutProps = {};
export type AuthLayoutDefaultProps = {};
export type AuthLayoutState = AuthStoreState;


export default class AuthLayout extends Component< AuthLayoutDefaultProps, AuthLayoutProps, AuthLayoutState > {

    constructor( props:?AuthLayoutProps ) {
        super( props );
        this.state = AuthStore.state;
        this.listenTo( AuthStore, this.setState.bind( this ));
    }

    componentWillMount() {
        Actions.checkAuth();
    }

    render():?ReactElement {
        let result:?ReactElement;
        if ( this.state.idToken ) {
            result = <div>{ this.props.children }</div>;
        } else {
            Actions.showLoginForm();
            result = (
                <div className={ styles.main }>
                    <div className={ styles.content } id="login-container" />
                </div>
            );
        }
        return result;
    }
}
fc( AuthLayout );
