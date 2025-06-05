import React, { useContext } from "react";
import glass_icon from "../../../assets/water-icon.svg";
import { UserContext } from "../../../contexts/UserContext";
import { useWaterIntake } from "../../../hooks/useWaterIntake";
import "../styles/HomeWaterIntake.css";

const WaterIntake = ({ selectedDate = new Date() }) => {
  const { user } = useContext(UserContext);
  const { currentIntake, waterIntakeGoal, glasses, error, updateIntake } =
    useWaterIntake(user, selectedDate);

  const handleAddGlass = () => {
    updateIntake(currentIntake + 250);
  };

  const handleRemoveGlass = () => {
    if (currentIntake >= 250) {
      updateIntake(currentIntake - 250);
    }
  };

  return (
    <div className="water-intake">
      <div className="water-intake-header">Water intake</div>
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
        {currentIntake / 1000} / {waterIntakeGoal / 1000} liters
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default WaterIntake;
