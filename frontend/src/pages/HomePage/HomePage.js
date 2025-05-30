import React, { useState, useContext } from "react";
import NavBar from "../../components/NavBar";
import Calendar from "../../components/Calendar";
import MealSection from "../../components/HomeMealSection";
import WaterIntake from "../../components/WaterIntake";
import { UserContext } from "../../contexts/UserContext";
import "./HomePage.css";

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

const HomePage = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  const calculateDailyTotals = () => {
    const allMeals = [...breakfast, ...lunch, ...dinner, ...snacks];

    return allMeals.reduce(
      (totals, item) => {
        totals.calories += item.calories;
        totals.protein += item.protein;
        totals.carbs += item.carbs;
        totals.fat += item.fat;
        return totals;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };
  const getWeekdayName = (dateStr) => {
    if (!dateStr) return "";

    const date = new Date(dateStr);
    if (isNaN(date)) return "";

    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const totals = calculateDailyTotals();

  const handleDateChange = (dateStr) => {
    setSelectedDate(dateStr);
  };

  return (
    <div>
      <NavBar showButtons={false} />
      <div className="home-container">
        <div className="home-left">
          <div className="welcome-text-container">
            <h1>Hello {user?.email}</h1>
          </div>
          <div className="progress-container"></div>
          <div className="exercise-container"></div>
        </div>
        <div className="home-middle">
          <div className="mealplan-container">
            <div className="today-text">
              {selectedDate} ({getWeekdayName(selectedDate)})
            </div>
            <div className="meals-container">
              <MealSection title="Breakfast" products={breakfast} />
              <MealSection title="Lunch" products={lunch} />
              <MealSection title="Dinner" products={dinner} />
              <MealSection title="Snacks" products={snacks} />
            </div>
            <div className="daily-summary-container">
              <div className="daily-summary-header">Total</div>
              <div className="daily-summary-content-container">
                <div className="total-calories-text">
                  {totals.calories} kcal
                </div>
                <div className="total-macros-container">
                  <div className="total-macros-text">
                    P: {totals.protein.toFixed(1)} g
                  </div>
                  <div className="total-macros-text">
                    C: {totals.carbs.toFixed(1)} g
                  </div>
                  <div className="total-macros-text">
                    F: {totals.fat.toFixed(1)} g
                  </div>
                </div>
              </div>
            </div>
          </div>
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
