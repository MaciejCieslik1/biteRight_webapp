import React, { useState, useContext } from "react";
import NavBar from "../../components/NavBar";
import Calendar from "../../components/Calendar";
import WaterIntake from "../../components/WaterIntake";
import HomeMeals from "./HomeMeals/HomeMeals";
import { UserContext } from "../../contexts/UserContext";
import "./HomePage.css";

const HomePage = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (dateStr) => {
    setSelectedDate(dateStr);
  };

  return (
    <div>
      <NavBar showButtons={false} showLogoutButton={true} logoTarget="/home" />
      <div className="home-container">
        <div className="home-left">
          <div className="welcome-text-container">
            <h1>Hello {user?.email}</h1>
          </div>
          <div className="progress-container"></div>
          <div className="exercise-container"></div>
        </div>
        <div className="home-middle">
          <HomeMeals selectedDate={selectedDate} />
        </div>
        <div className="home-right">
          <div className="calendar-container">
            <h2>Calendar</h2>
            <Calendar onDateSelect={handleDateChange} />
          </div>
          <div className="water-intake-container">
            <WaterIntake selectedDate={selectedDate} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
