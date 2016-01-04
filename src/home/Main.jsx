import _                                from 'lodash';
import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';

/**
 * @author michaeldohr
 * @since 28/12/15
 */
export default class Main extends Component {

    static propTypes = {};

    static contextTypes = {};

    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <div>Hello, from Main</div>
        );
    }
}