import React, { useContext } from "react";
import ExerciseList from "../../../components/ExerciseList";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const ExerciseSection = ({ selectedDate }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  console.debug("[ExerciseSection] user:", user);
  const dateStr = dayjs(selectedDate).format("YYYY-MM-DD");

  const goToExercisePage = () => {
    navigate("/exercises");
  };

  return (
    <section>
      <h1>Twoje ćwiczenia</h1>
      <ExerciseList user={user} dateStr={dateStr} />
      <button onClick={goToExercisePage}>Go to Exercise Page</button>
    </section>
  );
};

export default ExerciseSection;
