import _                                from 'lodash';
import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';
import Grid, { Cell }                   from 'components/Grid';
import styles                           from './Fields.scss';

export class ValueLink {
    value:object;
    requestChange:Function;

    constructor( value:Object, requestChange:Function ) {
        this.value = value;
        this.requestChange = requestChange;
    }
}

export default class Fields extends Component {

    static propTypes = {
        title:     PropTypes.string.isRequired,
        valueLink: PropTypes.instanceOf( ValueLink ).isRequired,
        type:      PropTypes.oneOf( ['string', 'number'] ).isRequired,
        readOnly:  PropTypes.bool
    };

    static contextTypes = {};

    static defaultProps = {
        readOnly: false,
        type:     'string'
    };

    constructor( props ) {
        super( props );
    }

    render() {
        const field = <input readOnly={ this.props.readOnly }
                             className={ styles['input'] }
                             type="text"
                             valueLink={ this.props.valueLink }/>;

        return (
            <div className={ styles['fields'] }>
                <span quarter={ true } className={ styles['label'] }>
                    { this.props.title }
                </span>
                { field }
            </div>
        );
    }
}