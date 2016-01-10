/* @flow */

import React, { Component } from 'react';
// $ScssImport
import styles               from './HeaderView.scss';
import Grid, { Cell }       from '../../components/Grid';
import type AuthProfile     from '../../auth/AuthProfile';

export const HeaderViewStyle = styles;

export type HeaderViewProps = {
    profile: AuthProfile
};
export type HeaderViewDefaultProps = {};
export type HeaderViewState = {};

export default class HeaderView extends Component< HeaderViewDefaultProps, HeaderViewProps, HeaderViewState > {

    static defaultProps:HeaderViewDefaultProps = {};

    constructor( props:HeaderViewProps ) {
        super( props );
    }

    state:HeaderViewState;
    props:HeaderViewProps;

    render():?ReactElement {
        return (
            <div className={ styles.core }>
                <Grid className={ styles.bar } gutter={ true }>
                    <Cell className={ styles.logo }>
                        <div> Logo </div>
                    </Cell>
                    <Cell className={ styles.title } half={ true }>
                        <div> Title </div>
                    </Cell>
                    <Cell className={ styles.profile }>
                        <div>{ this.props.profile ? this.props.profile.name : '' }</div>
                    </Cell>
                </Grid>
            </div>
        );
    }
}
