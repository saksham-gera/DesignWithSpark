import React from "react";
import Character from "../assets/first.webp";
import join from "../assets/second.webp";

const Aboutus = () => {
  return (
<div className="flex justify-center text-justify lg:text-left bg-[#3B4049]">

      <div className="p-4 m-4 faq border-2  lg:w-[80%] md:w-[90%] w-[100%] bg-gradient-to-br from-[#3B4049] via-[#6C9FA4] to-[#3B4049]">
        {/* ---------------About us -------------------- */}
        <div className=" grid lg:grid-flow-col items-center grid-flow-row">
          <div className="lg:ml-[10%]">
            <p className="p-4 text-5xl font-medium text-purple-500 mt-[5%] ">
              Who are we?
            </p>
            <p className="text-5xl p-4 font-medium  text-[#FAFBFF]">
              About us
            </p>
            <p className="text-l lg:text-xl p-4 text-[#FAFBFF]">
            Welcome to our customized T-shirt design platform, where creativity meets convenience! We understand the challenges faced by salespersons like Jaswanth in providing personalized designs efficiently. That's why we've developed an innovative solution to revolutionize the T-shirt customization process.
            </p>
          </div>
          <div>
            <img
              src={Character}
              className="character lg:justify-end p-4 mt-[6%] shadow-none"
              style={{
                filter: "drop-shadow(0px 10px 10px rgba(118, 171, 174, 0.8))",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
              }}
            />
          </div>
        </div>
        {/*--------------- Our Mission ---------------*/}
        <div className="mt-[5%] text-center grid place-items-center">
          <p className="lg:text-5xl md:text-4xl text-3xl p-4 m-4 font-medium text-purple-400 lg:w-[80%] md:w-[90%] w-[100%]">
            Our Mission
          </p>
          <div className="flex justify-center text-justify p-4">
            <p className=" text-[#FAFBFF] text-sm md:text-base lg:text-xl lg:w-[80%] md:w-[90%] w-[100%]">
            Our mission is to empower salespersons like Jaswanth to create customized T-shirts effortlessly. With our user-friendly application, salespersons can easily access a wide range of tools and features to design unique T-shirts tailored to each customer's preferences.
            </p>
          </div>
        </div>
        {/* -----------------What Sets Us Apart----------- */}
        <div className="grid place-items-center mt-[5%]">
          <p className="p-4 m-4 font-medium text-[#7f17f7] lg:text-5xl md:text-4xl text-3xl mt-[5%] text-center lg:w-[80%] w-[90%]">
            What Sets Us Apart?
          </p>
          <ul className=" lg:w-[70%] md:w-[80%] w-[100%]">
            <li className="backdrop-blur-sm p-4 m-4 text-[#FAFBFF]  border-2 border-purple-400 shadow-sm shadow-black rounded-lg text-lg md:text-base lg:text-lg">
            Seamless Customization: Our application provides an intuitive interface equipped with powerful tools to streamline the customization process. Salespersons can effortlessly create personalized designs that exceed customer expectations.
            </li>
            <li className="backdrop-blur-sm p-4 m-4 text-[#FAFBFF] border-2 border-purple-400 shadow-sm shadow-black rounded-lg text-lg md:text-base  lg:text-lg">
            AI-Powered Designs: Leveraging the latest advancements in artificial intelligence, our application generates high-quality images and designs that cater to customer needs. Salespersons can rely on AI-generated designs to impress customers and enhance their shopping experience.
            </li>
           
          </ul>
        </div>
        {/* -----------------Our Vision-------------- */}
        <div className=" grid place-items-center">
          <p className="lg:text-5xl md:text-4xl text-3xl p-4 m-4 mt-[5%] font-medium text-[#7f17f7]  text-center lg:w-[80%] md:w-[90%] w-[100%]">
            Our Vision
          </p>
          <p className="p-4 m-4 text-[#FAFBFF] text-sm md:text-base lg:text-xl lg:w-[80%] md:w-[90%] w-[100%]">
          At our core, we envision a future where T-shirt customization is accessible to all. Through our platform, we aim to democratize the customization process, making it easy for salespersons like Jaswanth to deliver exceptional service and meet customer demands effectively.
          </p>
        </div>
        {/* ----------------Join us Today ---------------- */}
        <div className="grid place-items-center">
          <div className="grid md:grid-flow-row lg:grid-flow-col place-items-center mt-[5%]">
            <img src={join} className="character lg:justify-end p-4 mt-[6%] shadow-none"
              style={{
                filter: "drop-shadow(0px 10px 10px rgba(118, 171, 174, 0.8))",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
              }} />
            <div className="lg:w-[80%] md:w-[90%] w-[100%] mb-[10%] faq lg:mr-[20%]">
              <div>
                <p className="p-4 m-4 mt-[5%] text-center font-medium text-[#7f17f7] lg:text-5xl md:text-4xl text-3xl lg:w-[80%] w-[90%]">
                  Join Us Today
                </p>
                <div className="p-4 text-[#FAFBFF]">
                <p className="p-4 m-4 lg:text-xl text-sm md:text-base">
                Whether you're a salesperson seeking efficiency or a customer craving personalized T-shirts,{" "} 
  <span className="relative inline-block">
    <span className="text-white text-2xl font-bold">DesignwithSpark  </span>
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7F17F7]"></span>
  </span>
 {" "} invite you to join our community. Together, let's redefine the T-shirt customization experience and unlock endless possibilities.
</p>


                  <p className="p-4 m-4 text-center font-medium text-white text-5xl md:text-base lg:text-2xl">
                    Thank you for being a part of our vibrant community. Together,
                    let's make the world a more colorful and expressive place, one
                    T-shirt design at a time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
