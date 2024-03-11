import React from "react";
import svnitIcon from "../assets/tshirt.webp";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import "./Landpage.css";
import { useAuth } from "../components/Auth";
export default function Landing() {

  const { IsLoggedIn} = useAuth();

  return (
    <div className="aakhu">

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
          <a className="bt" href={IsLoggedIn ? "/dashboard" : "/login"} style={{gap:"10px",alignContent:"center",alignItems:"center",fontSize:"30px"}} >Design Now< ArrowOutwardIcon sx={{ fontSize: 24 }}/></a>
        </div>
        <div className="im">
          <img src={svnitIcon} alt="" />
        </div>
      </div>
    </div>
  );
}
