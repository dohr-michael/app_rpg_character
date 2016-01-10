/* @flow */
import React, { Component }    from 'react';
import { IntlProvider }        from 'react-intl';
import { FluxComponent as fc } from 'airflux';
import MainView                from './MainView';

export type MainProps = {};
export type MainDefaultProps = {};
export type MainState = {};

export default class Main extends Component< MainDefaultProps, MainProps, MainState > {

    constructor( props:MainProps ) {
        super( props );
    }

    render():?ReactElement {
        return (
            <IntlProvider locale={ this.state.locale } messages={ this.state.messages || {} }>
                <MainView player={ this.state.player }>
                    { this.props.children }
                </MainView>
            </IntlProvider>
        );
    }
}
fc( Main );
