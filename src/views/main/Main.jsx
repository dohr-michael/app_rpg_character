/* @flow */
import React, { Component }    from 'react';
import { IntlProvider }        from 'react-intl';
import { FluxComponent as fc } from 'airflux';
import MainView                from './MainView';
import MainStore               from './MainStore';
import type { MainStoreState } from './MainStore';

export type MainProps = {};
export type MainDefaultProps = {};
export type MainState = {
    locale: string,
    messages: ?Object
};

export default class Main extends Component< MainDefaultProps, MainProps, MainState > {

    constructor( props:MainProps ) {
        super( props );
        const mainState = MainStore.state;
        this.state = {
            locale: mainState.locale,
            messages: mainState.messages
        };
        this.listenTo( MainStore, this.mainChanged.bind( this ));
    }

    mainChanged( state:MainStoreState ) {
        this.setState({ locale: state.locale, messages: state.messages });
    }

    render():?ReactElement {
        return (
            <IntlProvider locale={ this.state.locale } messages={ this.state.messages || {} }>
                <MainView>
                    { this.props.children }
                </MainView>
            </IntlProvider>
        );
    }
}
fc( Main );
