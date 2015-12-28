import _                                from 'lodash';
import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';
import Grid, { Cell }                   from 'components/Grid';
import { SelectField,
    StringField, ValueLink,
    IntegerField }                      from 'components/Fields';
import { CharacterSheetItem }           from 'model/CharacterSheet';
import * as tools                       from 'utils/tools';

/**
 * Factory.
 * @param item to render.
 * @param path current path
 * @returns {*}
 */
function ItemFactory( item:CharacterSheetItem, path:string ) {
    let result;
    const props = {
        key: tools.guid(), item, path
    };
    switch( item.type ) {
        case 'group':
            result = <GroupItemView { ...props }/>;
            break;
        case 'string':
            result = <StringItemView { ...props }/>;
            break;
        case 'player':
            result = <PlayerItemView { ...props }/>
            break;
        case 'oneOf':
            result = <OneOfItemView { ...props }/>;
            break;
        case 'integer':
            result = <IntegerItemView { ...props }/>;
            break;
        default:
            result = <StringItemView { ...props }/>;
    }
    return result;
}

export default ItemFactory;


/**
 * Base item view.
 */
class ItemView extends Component {

    static contextTypes = {
        intl: PropTypes.object
    };

    static propTypes = {
        item: PropTypes.instanceOf( CharacterSheetItem ).isRequired,
        path: PropTypes.string.isRequired
    };

    get itemPath() {
        return `${this.props.path}.${this.props.item.name}`;
    }

    constructor( props ) {
        super( props );
    }

    createValueLink() {
        return new ValueLink( this.props.item.value, newValue => {
            this.props.item.value = newValue;
            this.setState( {} );
        } );
    }

    get message() {
        return this.context.intl.getMessage( `${this.itemPath}.name` );
    }
}

/**
 * Group renderer.
 */
class GroupItemView extends ItemView {

    constructor( props ) {
        super( props );
    }

    render() {
        const isRoot = this.props.path.split( '.' ).length <= 1;
        const path = this.itemPath;
        const message = this.context.intl.getMessage( `${path}.name`, null );
        const title = message ? (
            <Grid>
                <Cell full={true}>
                    { message }
                    { isRoot ? <hr /> : null }
                </Cell>
            </Grid>
        ) : null;
        const subItems = this.props.item.subItems.map( item => ItemFactory( item, path ) );
        if( !isRoot ) {
            return (
                <Cell>
                    { title }
                    <Grid>
                        <Cell full={true}>
                            { subItems }
                        </Cell>
                    </Grid>
                </Cell>
            )
        }
        return (
            <div>
                { title }
                <Grid>
                    { subItems }
                </Grid>
            </div>
        );
    }
}

/**
 * String renderer
 */
class StringItemView extends ItemView {

    constructor( props ) {
        super( props );
    }

    render() {
        return <StringField title={ this.message }
                            valueLink={ this.createValueLink() }/>;
    }
}

/**
 * Player render
 */
class PlayerItemView extends ItemView {

    constructor( props ) {
        super( props );
    }

    render() {
        const value = this.props.item.value;
        const valueLink = new ValueLink( value ? value.name : null, () => null );
        return <StringField title={ this.message }
                            valueLink={ valueLink }
                            readOnly={true}/>;
    }
}

/**
 * Select item view
 */
class OneOfItemView extends ItemView {

    constructor( props ) {
        super( props );
    }

    optionLabelFunction( item:CharacterSheetItem ) {
        const path = `${this.itemPath}.${item.name}`;
        return this.context.intl.getMessage( `${path}.name`, item.name );
    }

    render() {
        return <SelectField title={ this.message }
                            allowMultiSelect={ false }
                            options={ this.props.item.values.toArray() }
                            valueLink={ this.createValueLink() }
                            optionLabelFunction={ this.optionLabelFunction.bind( this ) }/>;
    }
}

class IntegerItemView extends ItemView {

    constructor( props ) {
        super( props );
    }

    render() {
        return <IntegerField title={ this.message }
                             valueLink={ this.createValueLink() }
                             min={ this.props.item.meta.get('min') }
                             max={ this.props.item.meta.get('max') }/>
    }
}