import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import Calendar from "../../components/Calendar";
import MealSection from "../../components/HomeMealSection";
import WaterIntake from "../../components/WaterIntake";
import "./HomePage.css";

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const breakfast = [
    { name: "Apple", calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
    { name: "Banana", calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
    { name: "Greek yoghurt", calories: 60, protein: 10, carbs: 3.6, fat: 0.4 },
    { name: "Granola", calories: 250, protein: 6, carbs: 45, fat: 5 },
  ];

  const lunch = [
    {
      name: "Sweet chili chicken",
      calories: 300,
      protein: 25,
      carbs: 30,
      fat: 10,
    },
    { name: "Rice", calories: 200, protein: 4, carbs: 44, fat: 0.4 },
    { name: "Broccoli", calories: 55, protein: 4, carbs: 11, fat: 0.6 },
  ];

  const dinner = [
    { name: "Tomato soup", calories: 120, protein: 3, carbs: 20, fat: 4 },
    { name: "Bread", calories: 100, protein: 3, carbs: 20, fat: 1 },
  ];

  const snacks = [
    { name: "Almonds", calories: 180, protein: 6, carbs: 6, fat: 16 },
    { name: "Protein bar", calories: 250, protein: 20, carbs: 30, fat: 8 },
    { name: "Strawberries", calories: 40, protein: 0.8, carbs: 9, fat: 0.4 },
    { name: "Yoghurt", calories: 60, protein: 3, carbs: 5, fat: 1 },
  ];

  const handleDateChange = (dateStr) => {
    setSelectedDate(dateStr);
  };

  return (
    <div>
      <NavBar showButtons={false} />
      <div className="home-container">
        <div className="home-left">
          <div className="welcome-text-container">
            <h1>Welcome XYZ</h1>
          </div>
        </div>
        <div className="home-middle">
          <div className="mealplan-container">
            <div className="today-text">{selectedDate || "Null"}</div>
            <div className="meals-container">
              <MealSection title="Breakfast" products={breakfast} />
              <MealSection title="Lunch" products={lunch} />
              <MealSection title="Dinner" products={dinner} />
              <MealSection title="Snacks" products={snacks} />
            </div>
          </div>
        </div>
        <div className="home-right">
          <div className="calendar-container">
            <h2>Calendar</h2>
            <Calendar onDateSelect={handleDateChange} />
          </div>
          <div className="water-intake-container">
            <WaterIntake />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
