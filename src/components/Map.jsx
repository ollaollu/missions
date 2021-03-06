import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createMap, updateMap, initiateZoomTransition } from '../lib/map';
import './Map.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.onVehicleClick = this.onVehicleClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    updateMap(this.map, nextProps.vehicles);

    if(this.props.orderStage === 'draft' && nextProps.orderStage === 'searching')
    {
      initiateZoomTransition(this.map, 15, 14, nextProps.orderPickupCoords);
    }

    return false;
  }

  onVehicleClick(id) {
    this.props.history.push('/vehicle/'+id);
  }

  componentDidMount() {
    this.map = createMap({
      'containerId': 'map',
      'coords': this.props.coords,
      'onVehicleClick': this.onVehicleClick,
      'onMoveEnd': this.props.onMoveEnd
    });
    updateMap(this.map, this.props.vehicles);
  }

  render() {
    return (
      <div>
        <div id="map" />
        <div id="map-overlay" />
      </div>
    );
  }
}

Map.defaultProps = {
  coords: {lat: 32.068717, long: 34.775805}
};

Map.propTypes = {
  vehicles: PropTypes.array.isRequired,
  coords: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onMoveEnd: PropTypes.func.isRequired,
  orderStage: PropTypes.string.isRequired,
  orderPickupCoords: PropTypes.object
};

export default Map;
