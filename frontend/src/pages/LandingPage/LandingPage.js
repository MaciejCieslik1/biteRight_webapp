import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import "./LandingPage.css";
import avocado from "../../assets/avocado.svg";
import calorie_icon from "../../assets/calorie-icon.svg";
import meal_plan_icon from "../../assets/meal-plan-icon.svg";
import scale_icon from "../../assets/scale-icon.svg";
import workout_icon from "../../assets/workout-icon.svg";
import recipe_icon from "../../assets/recipe-icon.svg";
import friend_icon from "../../assets/friend-icon.svg";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/register");
  };
  return (
    <div className="landing-page-container">
      <NavBar />
      <div className="welcome-container">
        <img className="picture-avocado" src={avocado} alt="Avocado" />
        <div className="welcome-text top-text">Eat, track</div>
        <div className="welcome-text bottom-text">Succeed</div>
        <button className="button start" onClick={handleGetStarted}>
          Get started
        </button>
      </div>
      <div className="feature-text">Start a healthy lifestyle with us</div>
      <div className="features-container">
        <div class="feature calorie">
          <img className="icon calorie" src={calorie_icon} alt="Calorie Icon" />
          <div className="feature calorie text">
            Calculate your recommended calorie intake
          </div>
        </div>
        <div class="feature meal-plan">
          <img
            className="icon meal-plan"
            src={meal_plan_icon}
            alt="Meal Plan Icon"
          />
          <div className="feature meal-plan text">
            Track your meals and macros
          </div>
        </div>
        <div class="feature weight">
          <img className="icon scale" src={scale_icon} alt="Scale Icon" />
          <div className="feature weight text">
            Monitor your weight and measurements
          </div>
        </div>
        <div class="feature workout">
          <img className="icon workout" src={workout_icon} alt="Workout Icon" />
          <div className="feature workout text">
            Track your workouts and progress
          </div>
        </div>
        <div class="feature recipe">
          <img className="icon recipe" src={recipe_icon} alt="Recipe Icon" />
          <div className="feature recipe text">
            Get healthy recipes and meal ideas
          </div>
        </div>
        <div class="feature friend">
          <img className="icon friend" src={friend_icon} alt="Friend Icon" />
          <div className="feature friend text">
            Share your progress with friends
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
