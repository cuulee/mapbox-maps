import React, {Component} from 'react';
import {connect} from 'react-redux';
import PlaceName from './PlaceName';
import {setStateValue, triggerMapUpdate, resetContextMenu} from '../actions/index';

class ContextMenu extends Component {
  render() {
    let style = {
      left: Math.min(window.innerWidth - 240, this.props.position[0]) + 'px',
      top: Math.min(window.innerHeight - 240, this.props.position[1]) + 'px'
    };

    return (
      <div className='absolute bg-white w240 hmax300 shadow-darken25 border--gray' style={style}>
        <div className='px12 py12 bg-darken10-on-hover cursor-pointer align-center border-b border--darken10'>
          <PlaceName
            location={this.props.place}
            className='w-full cursor-pointer'
            colors='dark'
            onClick={() => this.search()}
          />
          <p>{this.formatCoordinates()}</p>
        </div>
        <div onClick={() => this.directionsFrom()} className='px12 py6 bg-darken10-on-hover cursor-pointer'>
          directions from this place
        </div>
        <div onClick={() => this.directionsTo()} className='px12 py6 bg-darken10-on-hover cursor-pointer'>
          directions to this place
        </div>
      </div>
    );
  }

  formatCoordinates() {
    return this.props.coordinates
      .map(e => e.toFixed(6))
      .join(',');
  }

  search() {
    console.log('search ' + this.props.coordinates);
    this.props.setStateValue('mode', 'search');
    this.props.setStateValue('searchLocation', this.props.place);
    this.props.triggerMapUpdate();
    this.props.resetContextMenu();
  }

  directionsTo() {
    console.log('directions to ' + this.props.coordinates);
    this.props.setStateValue('mode', 'directions');
    this.props.setStateValue('directionsTo', this.props.place);
    this.props.triggerMapUpdate();
    this.props.resetContextMenu();
  }

  directionsFrom() {
    console.log('directions from ' + this.props.coordinates);
    this.props.setStateValue('mode', 'directions');
    this.props.setStateValue('directionsFrom', this.props.place);
    this.props.triggerMapUpdate();
    this.props.resetContextMenu();
  }

  reset() {

  }
}

ContextMenu.propTypes = {
  active: React.PropTypes.bool,
  coordinates: React.PropTypes.array,
  position: React.PropTypes.array,
  place: React.PropTypes.object,
  resetContextMenu: React.PropTypes.func,
  setStateValue: React.PropTypes.func,
  triggerMapUpdate: React.PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    active: state.contextMenuActive,
    coordinates: state.contextMenuCoordinates,
    position: state.contextMenuPosition,
    place: state.contextMenuPlace,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetContextMenu: () => dispatch(resetContextMenu()),
    setStateValue: (key, value) => dispatch(setStateValue(key, value)),
    triggerMapUpdate: (needMapRepan) => dispatch(triggerMapUpdate(needMapRepan))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContextMenu);
