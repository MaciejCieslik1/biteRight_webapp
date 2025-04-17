import React from "react";
import NavBar from "../../components/NavBar";
import "./landingPage.css";
import avocado from "../../assets/avocado.svg";
import calorie_icon from "../../assets/calorie-icon.svg";
import meal_plan_icon from "../../assets/meal-plan-icon.svg";
import scale_icon from "../../assets/scale-icon.svg";
import workout_icon from "../../assets/workout-icon.svg";
import recipe_icon from "../../assets/recipe-icon.svg";
import friend_icon from "../../assets/friend-icon.svg";

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <NavBar />
      <div className="welcome-container">
        <img className="picture-avocado" src={avocado} alt="Avocado" />
        <div className="welcome-text top-text">Eat, track</div>
        <div className="welcome-text bottom-text">Succeed</div>
      </div>
      <div className="features-container">
        <div class="feature calorie">
          <img className="calorie-icon" src={calorie_icon} alt="Calorie Icon" />
          <div className="feature red text">
            Calculate your recommended calorie intake
          </div>
        </div>
        <div class="feature meal-plan">
          <img
            className="meal-plan-icon"
            src={meal_plan_icon}
            alt="Meal Plan Icon"
          />
          <div className="feature green text">Track your meals and macros</div>
        </div>
        <div class="feature weight">
          <img className="scale-icon" src={scale_icon} alt="Scale Icon" />
          <div className="feature blue text">
            Monitor your weight and measurements
          </div>
        </div>
        <div class="feature workout">
          <img className="workout-icon" src={workout_icon} alt="Workout Icon" />
          <div className="feature yellow text">
            Track your workouts and progress
          </div>
        </div>
        <div class="feature recipe">
          <img className="recipe-icon" src={recipe_icon} alt="Recipe Icon" />
          <div className="feature orange text">
            Get healthy recipes and meal ideas
          </div>
        </div>
        <div class="feature friend">
          <img className="friend-icon" src={friend_icon} alt="Friend Icon" />
          <div className="feature purple text">
            Share your progress with friends
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
