import { useState, useEffect } from "react";
import {
  fetchWaterGoal,
  fetchWaterIntakeByDate,
  createWaterIntake,
  updateWaterIntakeAmount,
} from "../api/apiWaterIntake";
import dayjs from "dayjs";

export const useWaterIntake = (user, selectedDate) => {
  const [waterIntakeId, setWaterIntakeId] = useState(null);
  const [currentIntake, setCurrentIntake] = useState(0);
  const [waterIntakeGoal, setWaterIntakeGoal] = useState(0);
  const [glasses, setGlasses] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("jwt");
  const fullDateTimeStr = dayjs(selectedDate).format("YYYY-MM-DDTHH:mm:ss");
  const dateStr = dayjs(selectedDate).format("YYYY-MM-DD");

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        const goalData = await fetchWaterGoal(token);
        setWaterIntakeGoal(goalData.waterGoal);

        const intakeData = await fetchWaterIntakeByDate(token, dateStr);
        if (intakeData.content && intakeData.content.length > 0) {
          const entry = intakeData.content[0];
          setWaterIntakeId(entry.id);
          setCurrentIntake(entry.waterAmount);
          setGlasses(Array(Math.floor(entry.waterAmount / 250)).fill({}));
        } else {
          const newEntry = await createWaterIntake(token, fullDateTimeStr);
          setWaterIntakeId(newEntry.id);
          setCurrentIntake(0);
          setGlasses([]);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    loadData();
  }, [user, dateStr, fullDateTimeStr, token]);

  const updateIntake = async (newAmount) => {
    if (!waterIntakeId) return;
    try {
      await updateWaterIntakeAmount(token, waterIntakeId, newAmount);
      setCurrentIntake(newAmount);
      setGlasses(Array(Math.floor(newAmount / 250)).fill({}));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    currentIntake,
    waterIntakeGoal,
    glasses,
    error,
    updateIntake,
  };
};
