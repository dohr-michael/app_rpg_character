import _                                from 'lodash';
import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';
import styles                           from './Header.scss';
import Grid, { Cell }                   from 'components/Grid';
import * as Actions                     from './Actions';
import Player                           from 'model/Player';

class Title extends Component {

    render() {
        return (
            <div className={styles['title']}>
                <span>Vampire
                    <small> La Mascarade</small>
                </span>
            </div>
        );
    }
}

class PlayerView extends Component {

    static propTypes = {
        player: PropTypes.instanceOf( Player )
    };

    render() {
        let item;
        if( this.props.player ) {
            item = <span>Joueur : { this.props.player.name }</span>;
        }
        return (
            <div>
                { item }
            </div>
        );
    }
}

export default class Header extends Component {

    static propTypes = {
        player: PropTypes.instanceOf( Player )
    };

    static contextTypes = {};

    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <div className={styles['core']}>
                <Grid className={styles['bar']} gutter={true}>
                    <Cell className={styles['logo']}>
                        <div />
                    </Cell>
                    <Cell className={styles['title']} half={true}>
                        <Title />
                    </Cell>
                    <Cell className={styles['player']}>
                        <PlayerView player={ this.props.player }/>
                    </Cell>
                </Grid>
            </div>
        );
    }
}