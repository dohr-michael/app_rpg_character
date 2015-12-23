import _     from 'lodash';
import React from 'react';
import Store from 'utils/Store';

export default class ViewStoreListener {

    constructor( stores:Array<Store>, component:React.Component ) {
        this.stores = stores.map( store => {
            return {
                store, callback: this.createChangeStateCallback( store, component )
            }
        } );
        this.component = component;
        this.buildDidMount();
        this.buildWillUnmount();
    }

    get initialState() {
        var state = {};
        this.stores.forEach( data => {
            state = _.assign( state, data.store.states );
        } );
        return state;
    }

    createChangeStateCallback( store, component ) {
        return () => {
            component.setState( store.states );
        }
    }

    buildDidMount() {
        const callbacks = [];
        callbacks.push( () => {
            this.stores.forEach( data => {
                data.store.addChangeListener( data.callback );
            } );
        } );
        callbacks.push( this.component['componentDidMount'] || (() => null) );
        this.component['componentDidMount'] = () => {
            callbacks.forEach( cb => cb() );
        }
    }

    buildWillUnmount() {
        const callbacks = [];
        callbacks.push( this.component['componentWillUnmount'] || (() => null) );
        callbacks.push( () => {
            this.stores.forEach( data => {
                data.store.removeChangeListener( data.callback );
            } );
        } );

        this.component['componentWillUnmount'] = () => {
            callbacks.forEach( cb => cb() );
        }
    }
}