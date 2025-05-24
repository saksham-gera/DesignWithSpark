import React, { useState } from "react";
import { ColorPicker } from "../components";
import { useSnapshot } from "valtio";
import state from "../components/store.js";

function TShirtCustomizer() {
  const [tshirtType, setTshirtType] = useState("img/crew_front.png");
  const snap = useSnapshot(state);

  const handleTShirtTypeChange = (event) => {
    setTshirtType(event.target.value);
  };

  return (
    <div className="flex flex-col items-center mt-5  bg-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 ">
        Customize T-Shirt
      </h1>
      <div className="flex flex-col sm:flex-row bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col w-full sm:w-64 p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-gray-600 mb-3">
            T-Shirt Options
          </h2>
          <select
            className="p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 border-none"
            value={tshirtType}
            onChange={handleTShirtTypeChange}
          >
            <option value="img/crew_front.png">Short Sleeve Shirts</option>
            <option value="img/mens_longsleeve_front.png">Long Sleeve Shirts</option>
            <option value="img/mens_hoodie_front.png">Hoodies</option>
            <option value="img/mens_tank_front.png">Tank tops</option>
          </select>

          <ColorPicker />
        </div>
        <div className="flex flex-col items-center justify-center w-full p-4 sm:p-5">
          <div
            id="shirtDiv"
            style={{ height: "450px", backgroundColor: snap.color }}
          >
            <img
              name="tshirtview"
              id="tshirtFacing"
              src={tshirtType}
              alt="T-Shirt Facing"
              className="object-fill"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TShirtCustomizer;
