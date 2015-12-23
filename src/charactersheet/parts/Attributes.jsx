import _                                from 'lodash';
import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';

/**
 * @author michaeldohr
 * @since 21/12/15
 */
export default class Attributes extends Component {

    static propTypes = {};

    static contextTypes = {};

    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <div className="section">
                <div className="group">
                    <div className="col span_12_of_12">
                        Attributs
                    </div>
                </div>
                <div className="group">
                    <div className="col span_4_of_12">
                        Physique
                    </div>
                    <div className="col span_4_of_12">
                        Sociaux
                    </div>
                    <div className="col span_4_of_12">
                        Mentaux
                    </div>
                </div>
                <div className="group">
                    <div className="col span_4_of_12">
                        <ul>
                            <li>Force</li>
                            <li>Dextérité</li>
                            <li>Vigueur</li>
                        </ul>
                    </div>
                    <div className="col span_4_of_12">
                        <ul>
                            <li>Charisme</li>
                            <li>Manipulation</li>
                            <li>Apparence</li>
                        </ul>
                    </div>
                    <div className="col span_4_of_12">
                        <ul>
                            <li>Perception</li>
                            <li>Intelligence</li>
                            <li>Astuce</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}