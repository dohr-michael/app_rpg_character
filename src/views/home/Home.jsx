/* @flow */

import React, { Component } from 'react';

export type HomeProps = {};
export type HomeDefaultProps = {};
export type HomeState = {};

/**
 * @author michaeldohr
 * @since 09/01/16
 */
export default class Home extends Component< HomeDefaultProps, HomeProps, HomeState > {

    constructor( props:HomeProps ) {
        super( props );
    }

    render():?ReactElement {
        return (
            <div>Hello, from Home</div>
        );
    }
}
