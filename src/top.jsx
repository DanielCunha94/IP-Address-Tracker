import React from "react";
import button from "./assets/images/icon-arrow.svg";

function Top({ onHandleSubmit, input, onHandleChange, info, ip, msg }) {
  if (msg.length == 0) {
    return (
      <div className="top">
        <div className="inputContainer">
          <h4 className="app-title">IP Address Tracker</h4>
          <form onSubmit={onHandleSubmit} className="form">
            <input
              className="inputFild"
              value={input}
              onChange={onHandleChange}
              placeholder="Search for any IP address or domain"
            />
            <button className="button" type="submit">
              <img src={button} alt="" />
            </button>
          </form>
        </div>
        <div className="information">
          <div>
            <h4>IP ADDRESS</h4>
            <h1>{ip}</h1>
          </div>

          <div>
            <h4>LOCATION</h4>
            <h1>
              {info.city}, {info.region} {info.country}
            </h1>
          </div>

          <div>
            <h4>TIMEZONE</h4>
            <h1>{info.timezone}</h1>
          </div>

          <div>
            <h4>ISP</h4>
            <h1>{info.isp}</h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="top">
      <div className="inputContainer">
        <h4 className="app-title">IP Address Tracker</h4>
        <form onSubmit={onHandleSubmit} className="form">
          <input
            className="inputFild"
            value={input}
            onChange={onHandleChange}
            placeholder="Search for any IP address or domain"
          />
          <button className="button" type="submit">
            <img src={button} alt="" />
          </button>
        </form>
      </div>
      <div className="information">
        <h1>{msg}</h1>
      </div>
    </div>
  );
}

export default Top;
