import React from "react";
import NavBar from "../../components/NavBar";
import "./landingPage.css";
import avocado from "../../assets/avocado.jpg";

const LandingPage = () => {
  return (
    <div class="landing-page-container">
      <NavBar />
      <div class="welcome-container">
        <img class="picture-avocado" src={avocado} />
      </div>
    </div>
  );
};

export default LandingPage;
