/* @flow */

import { Component, PropTypes } from 'react';

export type ContainerViewUpdater = {
    updateLeftBar: Function,
    updateRightBar: Function,
    updateMainToolbar: Function,
    updateTitleBar: Function
};

export default class ViewContainer< DefaultProps, Props, State > extends Component< DefaultProps, Props, State > {

    static childContextTypes = {
        containerUpdater: PropTypes.object
    };

    static defaultProps:DefaultProps = {};

    constructor( props:Props ) {
        super( props );
        this.__childContext = this.generateChildContext();
    }

    state:State;

    getChildContext():?Object {
        return {
            containerUpdater: this.__childContext
        };
    }

    props:Props;
    __childContext: ContainerViewUpdater;
    _leftBar:?ReactElement;
    _rightBar:?ReactElement;
    _mainToolbar:?ReactElement;
    _titleBar:?ReactElement;


    get leftBar():?ReactElement {
        return this._leftBar;
    }

    get rightBar():?ReactElement {
        return this._rightBar;
    }

    get mainToolbar():?ReactElement {
        return this._mainToolbar;
    }

    get titleBar():?ReactElement {
        return this._titleBar;
    }

    generateChildContext():ContainerViewUpdater {
        const $this = this;
        const updater = ( name:string ) => ( el:?ReactElement ) => {
            $this[name] = el;
            $this.setState({});
        };
        return {
            updateLeftBar: updater( '_leftBar' ),
            updateRightBar: updater( '_rightBar' ),
            updateMainToolbar: updater( '_mainToolbar' ),
            updateTitleBar: updater( '_titleBar' )
        };
    }
}
