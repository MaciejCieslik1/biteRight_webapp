import React, { useContext, useEffect, useState } from "react";
import "./WaterIntake.css";
import glass_icon from "../assets/water-icon.svg";
import { UserContext } from "../contexts/UserContext";
import dayjs from "dayjs";

const WaterIntake = ({ selectedDate = new Date() }) => {
  const { user } = useContext(UserContext);
  const [glasses, setGlasses] = useState([]);
  const [currentIntake, setCurrentIntake] = useState(0);
  const [waterIntakeGoal, setWaterIntakeGoal] = useState(0);
  const [waterIntakeId, setWaterIntakeId] = useState(null);

  const fullDateTimeStr = dayjs(selectedDate).format("YYYY-MM-DDTHH:mm:ss");
  const dateStr = dayjs(selectedDate).format("YYYY-MM-DD");

  useEffect(() => {
    const fetchWaterGoal = async () => {
      //console.log("[fetchWaterGoal] Start fetching water goal");
      try {
        const token = localStorage.getItem("jwt");
        //console.log("[fetchWaterGoal] Using token:", token);
        const response = await fetch("http://localhost:8080/dailyLimits/find", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        //console.log("[fetchWaterGoal] Response status:", response.status);

        if (response.ok) {
          const data = await response.json();
          //console.log("[fetchWaterGoal] Fetched data:", data);
          setWaterIntakeGoal(data.waterGoal);
        } else {
          //console.warn(
          //"[fetchWaterGoal] Fetch failed with status:",
          // response.status
          // );
        }
      } catch (error) {
        //console.error("[fetchWaterGoal] Error:", error);
      }
    };

    const fetchOrCreateWaterIntake = async () => {
      try {
        const token = localStorage.getItem("jwt");
        //console.log("[fetchOrCreateWaterIntake] Token:", token);
        //console.log(
        //"[fetchOrCreateWaterIntake] Fetching water intake for date:",
        //dateStr
        //);

        const response = await fetch(
          `http://localhost:8080/waterIntake/findWaterIntakesByDate/${dateStr}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        //console.log(
        // "[fetchOrCreateWaterIntake] Fetch response status:",
        // response.status
        // );

        if (response.ok) {
          const data = await response.json();
          //console.log("[fetchOrCreateWaterIntake] Fetched data:", data);

          if (data.content && data.content.length > 0) {
            const entry = data.content[0];
            //console.log(
            //"[fetchOrCreateWaterIntake] Existing entry found:",
            //entry
            //);
            setWaterIntakeId(entry.id);
            setCurrentIntake(entry.waterAmount);
            setGlasses(Array(Math.floor(entry.waterAmount / 250)).fill({}));
          } else {
            //console.log(
            //"[fetchOrCreateWaterIntake] No entry found. Creating new..."
            //);

            const createResp = await fetch(
              "http://localhost:8080/waterIntake/create",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  intakeDate: fullDateTimeStr,
                  waterAmount: 0,
                }),
              }
            );

            //console.log(
            //"[fetchOrCreateWaterIntake] Create response status:",
            //createResp.status
            // );

            if (createResp.ok) {
              const newEntry = await createResp.json();
              console.log(
                "[fetchOrCreateWaterIntake] Created new entry:",
                newEntry
              );
              setWaterIntakeId(newEntry.id);
              console.log(
                "[fetchOrCreateWaterIntake] New entry id:",
                newEntry.id
              );
              setCurrentIntake(0);
              setGlasses([]);
            } else {
              const errorText = await createResp.text();
              //console.warn(
              // "[fetchOrCreateWaterIntake] Create failed with status:",
              // createResp.status,
              // "Response text:",
              //errorText
              //);
            }
          }
        } else {
          const errorText = await response.text();
          //console.warn(
          //"[fetchOrCreateWaterIntake] Fetch failed with status:",
          //response.status,
          //"Response text:",
          //errorText
          // );
        }
      } catch (error) {
        //console.error("[fetchOrCreateWaterIntake] Error:", error);
      }
    };

    if (user) {
      //console.log("[useEffect] User detected:", user);
      fetchWaterGoal();
      fetchOrCreateWaterIntake();
    } else {
      //console.log("[useEffect] No user detected");
    }
  }, [user, fullDateTimeStr, dateStr]);

  const updateWaterIntake = async (newAmount) => {
    const token = localStorage.getItem("jwt");
    if (!waterIntakeId) {
      //console.warn("[updateWaterIntake] No waterIntakeId available");
      return;
    }

    //console.log(
    // `[updateWaterIntake] Updating water intake to ${newAmount}ml for ID: ${waterIntakeId}`
    // );

    try {
      const response = await fetch(
        `http://localhost:8080/waterIntake/update/${waterIntakeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            waterAmount: newAmount,
          }),
        }
      );

      //console.log("[updateWaterIntake] Response status:", response.status);

      if (response.ok) {
        // console.log("[updateWaterIntake] Update success");
        setCurrentIntake(newAmount);
        setGlasses(Array(Math.floor(newAmount / 250)).fill({}));
      } else {
        const errorText = await response.text();
        // console.warn(
        //   "[updateWaterIntake] Update failed:",
        //  response.status,
        //  "Response text:",
        //  errorText
        // );
      }
    } catch (error) {
      //console.error("[updateWaterIntake] Error:", error);
    }
  };

  const handleAddGlass = () => {
    const newAmount = currentIntake + 250;
    //console.log(`[handleAddGlass] Adding glass → new amount: ${newAmount}ml`);
    updateWaterIntake(newAmount);
  };

  const handleRemoveGlass = () => {
    if (currentIntake >= 250) {
      const newAmount = currentIntake - 250;
      //console.log(
      //`[handleRemoveGlass] Removing glass → new amount: ${newAmount}ml`
      //);
      updateWaterIntake(newAmount);
    } else {
      //console.log("[handleRemoveGlass] No glasses to remove");
    }
  };

  return (
    <div className="water-intake">
      <div className="water-intake-header"> Water intake </div>
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
    </div>
  );
};

export default WaterIntake;
