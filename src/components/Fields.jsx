import _                                from 'lodash';
import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';
import Select                           from 'react-select';
import Grid, { Cell }                   from 'components/Grid';
import styles                           from './Fields.scss';
import * as tools                       from 'utils/tools';

export class ValueLink {
    value:object;
    requestChange:Function;

    constructor( value:Object, requestChange:Function ) {
        this.value = value;
        this.requestChange = requestChange;
    }
}


class Fields extends Component {

    static propTypes = {
        title:     PropTypes.string.isRequired,
        valueLink: PropTypes.instanceOf( ValueLink ).isRequired,
        readOnly:  PropTypes.bool
    };

    static contextTypes = {};

    static defaultProps = {
        readOnly: false
    };

    constructor( props ) {
        super( props );
    }

    /**
     * @abstract
     */
    renderField() {
        throw new Error( 'implement it' );
    }

    render() {
        return (
            <div className={ styles['fields'] }>
                <span quarter={ true } className={ styles['label'] }>
                    { this.props.title }
                </span>
                <div className={ styles['input'] }>
                    { this.renderField() }
                </div>
            </div>
        );
    }
}

export class SelectField extends Fields {

    static propTypes = {
        options:             PropTypes.array.isRequired,
        allowMultiSelect:    PropTypes.bool.isRequired,
        optionLabelFunction: PropTypes.func.isRequired
    };

    static defaultProps = {
        allowMultiSelect:    false,
        optionLabelFunction: item => item.name
    };

    constructor( props ) {
        super( props );
    }

    onChange( item ) {
        this.props.valueLink.requestChange( item ? item.value : null );
    }

    renderField() {
        const options = this.props.options.map( item => {
            return {
                value: item.name,
                label: this.props.optionLabelFunction( item )
            }
        } );
        return (
            <Select options={ options }
                    disabled={ this.props.readOnly }
                    value={ this.props.valueLink.value }
                    onChange={ this.onChange.bind( this ) }
                    multi={ this.props.allowMultiSelect }/>
        );
    }
}

export class StringField extends Fields {

    constructor( props ) {
        super( props );
    }

    renderField() {
        return (
            <input readOnly={ this.props.readOnly }
                   type="text"
                   valueLink={ this.props.valueLink }/>
        );
    }
}

export class IntegerField extends Fields {

    static propTypes = {
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired
    };

    constructor( props ) {
        super( props );
    }

    onChange( event ) {
        var value = event.target.value;
        this.props.valueLink.requestChange( Math.max( this.props.min, Math.min( this.props.max, value ) ) );
    }

    renderField() {
        return (
            <input readOnly={ this.props.readOnly }
                   type="number"
                   min={ this.props.min }
                   max={ this.props.max }
                   value={ this.props.valueLink.value }
                   onChange={ this.onChange.bind( this )}/>
        );
    }
}