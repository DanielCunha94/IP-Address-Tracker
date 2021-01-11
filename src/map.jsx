import React from "react";
import L from "leaflet";
import markerIconSVG from "./assets/images/icon-location.svg";

class Map extends React.Component {
  componentDidMount() {
    // create map
    this.map = L.map("map", {
      center: [this.props.lat, this.props.lng],
      zoom: 17,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
      zoomControl: false,
    });
    // costum map marker
    this.markerIcon = L.icon({
      iconUrl: markerIconSVG,
      iconSize: [42, 52],
    });

    new L.Control.Zoom({ position: "bottomright" }).addTo(this.map);

    this.marker = L.marker([this.props.lat, this.props.lng], {
      icon: this.markerIcon,
    }).addTo(this.map);
  }

  componentDidUpdate() {
    // change position when state change
    if (this.props.lat !== undefined && this.props.lng !== undefined) {
      this.map.setView(new L.LatLng(this.props.lat, this.props.lng));
      this.marker.setLatLng([this.props.lat, this.props.lng]);
    }
  }

  render() {
    return <div id="map"></div>;
  }
}

export default Map;
