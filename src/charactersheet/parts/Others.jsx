import _                                from 'lodash';
import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';

/**
 * @author michaeldohr
 * @since 21/12/15
 */
export default class Others extends Component {

    static propTypes = {};

    static contextTypes = {};

    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <div>Hello, from Others</div>
        );
    }
}