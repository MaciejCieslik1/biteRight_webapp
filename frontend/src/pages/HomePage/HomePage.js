import React, { useState, useContext } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Calendar from "../../components/Calendar";
import WaterIntake from "./HomeWaterIntake/HomeWaterIntake";
import HomeMeals from "./HomeMeals/HomeMeals";
import HomeExerciseSection from "./HomeExerciseSection/HomeExerciseSection";
import { UserContext } from "../../contexts/UserContext";
import "./styles/HomePage.css";
import salad_picture from "../../assets/salad.jpg";

const HomePage = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (dateStr) => {
    setSelectedDate(dateStr);
  };

  return (
    <div className="page-wrapper">
      <NavBar showButtons={false} showLogoutButton={true} logoTarget="/home" />
      <div className="home-container">
        <div className="home-left">
          <div className="welcome-text-container">
            <h1>Hello {user?.email}</h1>
          </div>
          <div className="photo-container">
            <img className="salad-picture" src={salad_picture} alt="Salad" />
          </div>
          <div className="exercise-container">
            <HomeExerciseSection selectedDate={selectedDate} />
          </div>
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
      <Footer />
    </div>
  );
};
export default HomePage;
