import React from "react";
import svnitIcon from "../assets/tshirt.webp";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import "./Landpage.css";
export default function Landing() {
  return (
    <div className="aakhu w-full md:h-[100vh] h-full">
      
      <div className="body flex md:flex-row flex-col">
        <div className="content">
          <div className="tag font-black text-violet-800">AI-Powered 3D T-Shirts</div>
          <div className="head font-black text-violet-800">Elevate Your Style with </div>
          <div className="head1 font-black text-violet-800">Intelligent Fashion</div>

          <div className="subhead  text-violet-800 text-xl md:text-2xl">
            Indulge in the mesmerizing world of 3D fashion and
          </div>
          <div className="subhead  text-violet-800 text-xl md:text-2xl">
            elevate your style with our extraordinary collection of
          </div>
          <div className="subhead  text-violet-800 text-xl md:text-2xl">vibrant designs.</div>
          <a className="bt p-3 font-serif" href="/dashboard" >Try Free < ArrowOutwardIcon sx={{ fontSize: 24 }}/></a>
        </div>
        <div className="im">
  <img src={svnitIcon} alt="" />
</div>



      </div>
    </div>
  );
}
