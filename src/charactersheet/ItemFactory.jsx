import _                                from 'lodash';
import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';
import Grid, { Cell }                   from 'components/Grid';
import { SelectField,
    StringField, ValueLink,
    IntegerField }                      from 'components/Fields';
import CharacterSheet                   from 'model/CharacterSheet';
import { Rule, Option }                 from 'model/CharacterSheetRules';
import * as tools                       from 'utils/tools';

/**
 * Factory.
 * @param system
 * @param rule to render.
 * @param characterSheet
 * @returns {*}
 */
function ItemFactory( system:string, rule:Rule, characterSheet:CharacterSheet ) {
    let result;
    const props = {
        key: tools.guid(), system, rule, characterSheet
    };
    switch( rule.type ) {
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
        system:         PropTypes.string.isRequired,
        rule:           PropTypes.instanceOf( Rule ).isRequired,
        characterSheet: PropTypes.instanceOf( CharacterSheet ).isRequired
    };

    get itemPath() {
        return `${this.props.system}.${this.props.rule.name}`;
    }

    constructor( props ) {
        super( props );
    }

    createValueLink() {
        return new ValueLink( this.props.characterSheet.fields.get( this.props.rule.name ), newValue => {
            this.props.characterSheet.fields.set( this.props.rule.name, newValue );
            this.setState( {} );
        } );
    }

    get message() {
        return this.context.intl.getMessage( this.itemPath );
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
        console.log( this.props );
        const isRoot = this.props.rule.name.split( '.' ).length <= 1;
        const path = this.itemPath;
        const message = this.context.intl.getMessage( `${path}`, null );
        const title = message ? (
            <Grid>
                <Cell full={true}>
                    { message }
                    { isRoot ? <hr /> : null }
                </Cell>
            </Grid>
        ) : null;
        const subItems = this.props.rule.rules.map( item => ItemFactory( this.props.system, item, this.props.characterSheet ) );
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
        const value = this.props.characterSheet.player;
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

    optionLabelFunction( item:Option ) {
        const path = `${this.itemPath}.${item.name}`;
        return this.context.intl.getMessage( `${path}`, item.name );
    }

    render() {
        return <SelectField title={ this.message }
                            allowMultiSelect={ false }
                            options={ this.props.rule.options.toArray() }
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
                             min={ this.props.rule.meta.get('min') }
                             max={ this.props.rule.meta.get('max') }/>
    }
}