import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const MealPage = () => {
  const location = useLocation();
  const { meal } = location.state || {};
  const { user } = useContext(UserContext);
  const [currentMeal, setCurrentMeal] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    console.log("🟡 location.state:", location.state);
    if (meal) {
      console.log("🟢 Meal received from navigation:", meal);
      setCurrentMeal(meal);
    } else {
      console.warn("🔴 No meal data received in navigation state");
    }
  }, [meal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`🔧 Changing field '${name}' to '${value}'`);
    setCurrentMeal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    console.log("📤 Attempting to save meal:", currentMeal);

    const body = {
      mealTypeId: currentMeal.mealTypeId,
      name: currentMeal.name,
      description: currentMeal.description,
      contents: currentMeal.contents || [],
    };

    if (!currentMeal?.mealId) {
      console.error("❌ Meal ID is missing in currentMeal:", currentMeal);
      setStatus("Meal ID is missing.");
      return;
    }

    const token = localStorage.getItem("jwt");
    const url = `http://localhost:8080/meal/update/${currentMeal.mealId}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };

    console.log("📦 Full request:");
    console.log("➡️ URL:", url);
    console.log("➡️ Headers:", requestOptions.headers);
    console.log("➡️ Body:", requestOptions.body);

    try {
      const response = await fetch(url, requestOptions);

      console.log("📨 Server responded with status:", response.status);

      const contentType = response.headers.get("content-type");
      console.log("📥 Response Content-Type:", contentType);

      const responseText = await response.text();
      console.log("📥 Raw response text:", responseText);

      let responseJson = null;
      try {
        responseJson = JSON.parse(responseText);
        console.log("📥 Parsed response JSON:", responseJson);
      } catch (e) {
        console.warn("⚠️ Response is not valid JSON");
      }

      if (response.ok) {
        if (responseJson) setCurrentMeal(responseJson);
        setStatus("Saved successfully!");
      } else {
        setStatus("Save failed. " + (responseJson?.message || responseText));
      }
    } catch (error) {
      console.error("❗ Error during save operation:", error);
      setStatus("Unexpected error occurred.");
    }
  };

  if (!currentMeal) {
    return <div>Loading meal data...</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Edit meal: {currentMeal.name}</h1>

      <form style={{ maxWidth: "400px", marginTop: "1rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="name">Meal name:</label>
          <input
            id="name"
            name="name"
            value={currentMeal.name}
            onChange={handleInputChange}
            type="text"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={currentMeal.description}
            onChange={handleInputChange}
            rows="3"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
      </form>

      <p>
        Date:{" "}
        {new Date(currentMeal.mealDate || currentMeal.meal_date).toDateString()}
      </p>

      <button
        onClick={handleSave}
        style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}
      >
        Save
      </button>

      {status && <p>{status}</p>}
    </div>
  );
};

export default MealPage;
