import React from "react";
import svnitIcon from "../assets/tshirt.webp";
import "./Landing.css";
export default function Landing() {
  return (
    <div>
      <div className="header">
        <div className="navbar">
          <img className="logo" src={svnitIcon} alt="Logo" />
          <div className="nav-links">
            <button className="navbar-button">Home</button>
            <button className="navbar-button">Features</button>
            <button className="navbar-button">Contributors</button>
            <button className="navbar-button">Log In</button>
            <button className="profile-button">Try Free</button>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="content">
          <div className="tag">AI-Powered 3D T-Shirts</div>
          <div className="head">Elevate Your Style with </div>
          <div className="head1">Intelligent Fashion</div>

          <div className="subhead">
            Indulge in the mesmerizing world of 3D fashion and
          </div>
          <div className="subhead">
            elevate your style with our extraordinary collection of
          </div>
          <div className="subhead">vibrant designs.</div>
          <button className="bt">Design now</button>
        </div>
        <div className="im">
          <img src={svnitIcon} alt="" />
        </div>
      </div>
    </div>
  );
}
