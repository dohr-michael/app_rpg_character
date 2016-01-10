/* @flow */

import { Component, PropTypes }      from 'react';
import type { ContainerViewUpdater } from './ViewContainer';


export default class View< DefaultProps, Props, State > extends Component< DefaultProps, Props, State > {

    static contextTypes = {
        containerUpdater: PropTypes.object
    };

    constructor( props:Props ) {
        super( props );
    }

    state:State;

    componentWillMount() {
        this._containerUpdater.updateLeftBar( this.leftBar );
        this._containerUpdater.updateRightBar( this.rightBar );
        this._containerUpdater.updateMainToolbar( this.mainToolbar );
        this._containerUpdater.updateTitleBar( this.titleBar );
    }

    props:Props;

    get leftBar():?ReactElement {return null;}
    get rightBar():?ReactElement {return null;}
    get mainToolbar():?ReactElement {return null;}
    get titleBar():?ReactElement {return null;}

    get _containerUpdater():ContainerViewUpdater {
        return this.context.containerUpdater;
    }
}
