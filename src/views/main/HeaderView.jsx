/* @flow */

import React, { Component } from 'react';
import classNames           from 'classnames';
// $ScssImport
import styles               from './HeaderView.scss';
import Grid, { Cell }       from '../../components/Grid';
import AuthProfile          from '../../auth/AuthProfile';
import * as AuthActions     from '../../auth/AuthActions';

export const HeaderViewStyle = styles;

export type HeaderViewProps = {
    profile: AuthProfile,
    titleBar: ?ReactElement,
    title: string
};
export type HeaderViewDefaultProps = {};
export type HeaderViewState = {};


type MenuProps = {
    picture:string,
    name:string
};

type MenuState = {
    listVisible:boolean
};

class HeaderProfileMenu extends Component< any, MenuProps, MenuState> {

    constructor( props:MenuProps ) {
        super( props );
        this.state = {
            listVisible: false
        };
    }

    componentWillUnmount() {
        document.removeEventListener( 'click', this.closeList );
    }

    closeList = () => {
        if ( this.state.listVisible ) {
            this.setState({ listVisible: false });
            document.removeEventListener( 'click', this.closeList );
        }
    };

    openList = () => {
        if ( !this.state.listVisible ) {
            this.setState({ listVisible: true });
            document.addEventListener( 'click', this.closeList );
        }
    };

    openOrClose = () => {
        if ( this.state.listVisible ) {
            this.closeList();
        } else {
            this.openList();
        }
    };

    render():?ReactElement {
        const containerClasses = [styles['action-menu']];
        if ( this.state.listVisible ) {
            containerClasses.push( styles.show );
        }

        const picture = this.props.picture ? <img className={ styles.avatar } src={ this.props.picture } /> : null;
        const name = this.props.name ? <span className={ styles.name }>{ this.props.name }</span> : null;
        return (
            <div className={ classNames( containerClasses ) }>
                <div className={ classNames( styles.display ) } onClick={ this.openOrClose }>
                    { picture }{ name }
                    <i className="fa fa-angle-down" />
                </div>
                <ul className={ styles.list }>
                    <li className={ styles.action } onClick={ AuthActions.logout }>Logout</li>
                    <li className={ styles.divider }/>
                </ul>
            </div>
        );
    }
}

export default class HeaderView extends Component< HeaderViewDefaultProps, HeaderViewProps, HeaderViewState > {

    static defaultProps:HeaderViewDefaultProps = {};

    constructor( props:HeaderViewProps ) {
        super( props );
    }

    state:HeaderViewState;
    props:HeaderViewProps;

    renderProfile():?ReactElement {
        const picture = this.props.profile.picture ? <img className={ styles.avatar } src={ this.props.profile.picture } /> : null;
        const name = this.props.profile.name ? <span className={ styles.profileName }>{ this.props.profile.name }</span> : null;
        return <span className={ styles.profile }>{ picture }{ name }</span>;
    }

    render():?ReactElement {
        const titleBar = this.props.titleBar ? <Cell>{ this.props.titleBar }</Cell> : null;
        const title = this.props.title ? <Cell>{ this.props.title }</Cell> : null;
        return (
            <div className={ styles.core }>
                <Grid className={ styles.bar } gutter={ true }>
                    <Cell className={ styles.logo }>
                        <div> Logo </div>
                    </Cell>
                    <Cell className={ styles.title } half={ true }>
                        <Grid>
                            { titleBar }
                            { title }
                        </Grid>
                    </Cell>
                    <Cell>
                        <HeaderProfileMenu picture={ this.props.profile.picture } name={ this.props.profile.name } />
                    </Cell>
                </Grid>
            </div>
        );
    }
}
