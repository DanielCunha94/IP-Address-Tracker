import React, { Component } from "react";
import "./App.css";
import Top from "./top";
import Map from "./map";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      ip: "",
      domain: "",
      validInputMSG: "",
      ipOrDomainData: {
        country: "",
        region: "",
        city: "",
        lat: 0,
        lng: 0,
        postalCode: "",
        timezone: "",
        isp: "",
      },
    };
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    //check if the Input is a IP or Domain and update the state
    if (this.isValidateIPaddress(this.state.input)) {
      this.setState(
        {
          ip: this.state.input,
          domain: "",
          validInputMSG: "",
          ipOrDomainData: {},
        },
        () => {
          this.fetchIpOrDomainData();
        }
      );
    } else if (this.isValidDomain(this.state.input)) {
      this.setState(
        {
          ip: "",
          domain: this.state.input,
          validInputMSG: "",
          ipOrDomainData: {},
        },
        () => {
          this.fetchIpOrDomainData();
        }
      );
    } else {
      this.setState({
        input: "",
        ip: "",
        domain: "",
        validInputMSG: "Please search for a Valid IP address or Domain ",
        ipOrDomainData: {
          country: "",
          region: "",
          city: "",
          lat: 30,
          lng: -9,
          postalCode: "",
          timezone: "",
          isp: "",
        },
      });
    }
  };

  // check if if a valid ipv4 or ipv6
  isValidateIPaddress(ipAddress) {
    if (
      /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/gm.test(
        ipAddress
      )
    ) {
      return true;
    }
    return false;
  }

  // check if if a valid domain
  isValidDomain(domain) {
    if (
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
        domain
      )
    ) {
      return true;
    }
    return false;
  }

  async fetchIpOrDomainData() {
    let APILink =
      "https://geo.ipify.org/api/v1?apiKey=at_6H2b0wobLFhi9lypcjnSzMDxdwc1p";
    if (this.state.ip.length > 0) {
      APILink += "&ipAddress=" + this.state.ip;
    } else if (this.state.domain.length > 0) {
      APILink += "&domain=" + this.state.domain;
    }
    const response = await fetch(APILink);
    const data = await response.json();

    this.setState(
      {
        ip: data.ip,
        ipOrDomainData: {
          country: data.location.country,
          region: data.location.region,
          city: data.location.city,
          lat: data.location.lat,
          lng: data.location.lng,
          postalCode: data.location.postalCode,
          timezone: data.location.timezone,
          isp: data.isp,
        },
      },
      () => {
        console.log(this.state.ipOrDomainData);
      }
    );
    //console.log(this.state);
  }

  componentWillMount() {
    this.fetchIpOrDomainData();
  }

  render() {
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossorigin=""
        />
        <script
          src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
          integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
          crossorigin=""
        ></script>
        <Top
          onHandleChange={this.handleChange}
          onHandleSubmit={this.handleSubmit}
          input={this.state.input}
          info={this.state.ipOrDomainData}
          ip={this.state.ip}
          msg={this.state.validInputMSG}
        />

        <Map
          lat={this.state.ipOrDomainData.lat}
          lng={this.state.ipOrDomainData.lng}
        />
      </div>
    );
  }
}

export default App;
