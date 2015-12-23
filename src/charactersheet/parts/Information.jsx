import _                                from 'lodash';
import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';

/**
 * @author michaeldohr
 * @since 21/12/15
 */
export default class Informations extends Component {

    static propTypes = {};

    static contextTypes = {};

    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <div className="section">
                <div className="group">
                    <div className="col span_4_of_12">
                        <ul>
                            <li>Nom:</li>
                            <li>Joueur:</li>
                            <li>Chronique:</li>
                        </ul>
                    </div>
                    <div className="col span_4_of_12">
                        <ul>
                            <li>Nature:</li>
                            <li>Attitude:</li>
                            <li>Concept:</li>
                        </ul>
                    </div>
                    <div className="col span_4_of_12">
                        <ul>
                            <li>Clan:</li>
                            <li>Génération:</li>
                            <li>Sire:</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}