import React, { useState } from "react";
import "./WaterIntake.css";
import glass_icon from "../assets/water-icon.svg";

const WaterIntake = () => {
  const [glasses, setGlasses] = useState([]);

  const handleAddGlass = () => {
    setGlasses([...glasses, {}]);
  };

  const handleRemoveGlass = () => {
    if (glasses.length > 0) {
      setGlasses(glasses.slice(0, -1));
    }
  };

  return (
    <div className="water-intake">
      <div className="water-intake-header"> Water intake </div>
      <div className="water-intake-body">
        <div className="water-intake-buttons-container">
          <button className="water-intake-button" onClick={handleAddGlass}>
            +
          </button>
          <button className="water-intake-button" onClick={handleRemoveGlass}>
            −
          </button>
        </div>
        <div className="glasses-container">
          {glasses.map((_, index) => (
            <div key={index} className="glass-icon-container">
              <img src={glass_icon} alt="Glass" className="glass-icon" />
            </div>
          ))}
        </div>
      </div>
      <div className="water-intake-footer">
        {(glasses.length * 250) / 1000} / 2 liters
      </div>
    </div>
  );
};
export default WaterIntake;
