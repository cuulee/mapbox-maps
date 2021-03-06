import React, {Component} from 'react';
import {connect} from 'react-redux';
import {triggerMapUpdate, setStateValue} from '../actions/index';

class TrafficSwitch extends Component {
  render() {
    return (
      <label className='switch-container align-middle px3 bg-lighten75'>
        <input type='checkbox'
          onChange={(e) => this.toggle(e, this.trafficInStyle())}
          checked={this.trafficInStyle()}
        />
        <div className='switch switch--blue'></div>
        <svg className='icon icon-switch color-blue'><use xlinkHref='#icon-street'/></svg>
      </label>
    );
  }

  toggle(e, trafficInStyle) {
    var checked = e.target.checked;
    if (checked && !trafficInStyle) {
      this.props.setStateValue('mapStyle', this.props.mapStyle + '-traffic');
      this.props.setStateValue('needMapRestyle', true);
      this.props.triggerMapUpdate();
    } else if (!checked && trafficInStyle) {
      this.props.setStateValue('mapStyle', this.props.mapStyle.split('-')[0]);
      this.props.setStateValue('needMapRestyle', true);
      this.props.triggerMapUpdate();
    }
  }

  trafficInStyle() {
    return this.props.mapStyle.indexOf('traffic') > -1;
  }
}

TrafficSwitch.propTypes = {
  setStateValue: React.PropTypes.func,
  mapStyle: React.PropTypes.string,
  triggerMapUpdate: React.PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    mapStyle: state.mapStyle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setStateValue: (k, v) => dispatch(setStateValue(k, v)),
    triggerMapUpdate: (v) => dispatch(triggerMapUpdate(v))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrafficSwitch);
