import _                                from 'lodash';
import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';
import styles                           from './Grid.scss';

export class Cell extends Component {

    static propTypes = {
        top:     PropTypes.bool,
        bottom:  PropTypes.bool,
        center:  PropTypes.bool,
        full:    PropTypes.bool,
        half:    PropTypes.bool,
        third:   PropTypes.bool,
        quarter: PropTypes.bool
    };

    static defaultProps = {
        top:     false,
        bottom:  false,
        center:  false,
        full:    false,
        half:    false,
        third:   false,
        quarter: false
    };

    render() {
        const classes = {};
        classes[styles['cell-top']] = this.props.top;
        classes[styles['cell-bottom']] = this.props.bottom;
        classes[styles['cell-center']] = this.props.center;
        classes[styles['cell-full']] = this.props.full;
        classes[styles['cell-half']] = this.props.half;
        classes[styles['cell-third']] = this.props.third;
        classes[styles['cell-quarter']] = this.props.quarter;
        return (
            <div className={classNames( this.props.className, styles['cell'], classes )}>
                { this.props.children }
            </div>
        );
    }

}

/**
 * @author michaeldohr
 * @since 23/12/15
 */
export default class Grid extends Component {

    static propTypes = {
        gutter:       PropTypes.bool,
        top:          PropTypes.bool,
        bottom:       PropTypes.bool,
        center:       PropTypes.bool,
        // normal
        fit:          PropTypes.bool,
        full:         PropTypes.bool,
        half:         PropTypes.bool,
        third:        PropTypes.bool,
        quarter:      PropTypes.bool,
        // small
        smallFit:     PropTypes.bool,
        smallFull:    PropTypes.bool,
        smallHalf:    PropTypes.bool,
        smallThird:   PropTypes.bool,
        smallQuarter: PropTypes.bool,
        // large
        largeFit:     PropTypes.bool,
        largeFull:    PropTypes.bool,
        largeHalf:    PropTypes.bool,
        largeThird:   PropTypes.bool,
        largeQuarter: PropTypes.bool
    };

    static defaultProps = {
        gutter:       false,
        top:          false,
        bottom:       false,
        center:       false,
        // normal
        fit:          false,
        full:         false,
        half:         false,
        third:        false,
        quarter:      false,
        // small
        smallFit:     false,
        smallFull:    false,
        smallHalf:    false,
        smallThird:   false,
        smallQuarter: false,
        // large
        largeFit:     false,
        largeFull:    false,
        largeHalf:    false,
        largeThird:   false,
        largeQuarter: false
    };

    render() {
        const classes = {};
        classes[styles['grid-gutter']] = this.props.gutter;
        classes[styles['grid-top']] = this.props.top;
        classes[styles['grid-bottom']] = this.props.bottom;
        classes[styles['grid-center']] = this.props.center;
        // normal
        classes[styles['grid-fit']] = this.props.fit;
        classes[styles['grid-full']] = this.props.full;
        classes[styles['grid-half']] = this.props.half;
        classes[styles['grid-third']] = this.props.third;
        classes[styles['grid-quarter']] = this.props.quarter;
        // small
        classes[styles['small-grid-fit']] = this.props.smallFit;
        classes[styles['small-grid-full']] = this.props.smallFull;
        classes[styles['small-grid-half']] = this.props.smallHalf;
        classes[styles['small-grid-third']] = this.props.smallThird;
        classes[styles['small-grid-quarter']] = this.props.smallQuarter;
        // large
        classes[styles['large-grid-fit']] = this.props.largeFit;
        classes[styles['large-grid-full']] = this.props.largeFull;
        classes[styles['large-grid-half']] = this.props.largeHalf;
        classes[styles['large-grid-third']] = this.props.largeThird;
        classes[styles['large-grid-quarter']] = this.props.largeQuarter;

        return (
            <div className={classNames( this.props.className, styles['grid'], classes )}>
                { this.props.children }
            </div>
        );
    }
}