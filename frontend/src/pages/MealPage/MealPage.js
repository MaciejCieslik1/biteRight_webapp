import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import "./MealPage.css";

const MealPage = () => {
  const location = useLocation();
  const { meal } = location.state || {};
  const { user } = useContext(UserContext);

  const [currentMeal, setCurrentMeal] = useState(null);
  const [status, setStatus] = useState(null);

  // Stany do wyszukiwania składników
  const [ingredientQuery, setIngredientQuery] = useState("");
  const [ingredientResults, setIngredientResults] = useState([]);
  const [ingredientLoading, setIngredientLoading] = useState(false);
  const [ingredientError, setIngredientError] = useState(null);

  // Stany do tworzenia nowego składnika
  const [newIngredientName, setNewIngredientName] = useState("");
  const [newIngredientBrand, setNewIngredientBrand] = useState("");
  const [newIngredientPortionSize, setNewIngredientPortionSize] = useState("");
  const [newIngredientCalories, setNewIngredientCalories] = useState("");
  const [newIngredientProtein, setNewIngredientProtein] = useState("");
  const [newIngredientFat, setNewIngredientFat] = useState("");
  const [newIngredientCarbs, setNewIngredientCarbs] = useState("");

  const [creatingIngredient, setCreatingIngredient] = useState(false);
  const [createIngredientError, setCreateIngredientError] = useState(null);

  useEffect(() => {
    if (meal) {
      setCurrentMeal(meal);
    }
  }, [meal]);

  // Funkcja wyszukiwania składników po nazwie
  const searchIngredients = async (query) => {
    if (!query) {
      setIngredientResults([]);
      return;
    }
    console.log("🔍 Searching ingredients for query:", query);
    setIngredientLoading(true);
    setIngredientError(null);
    try {
      const token = localStorage.getItem("jwt");
      const res = await fetch(
        `http://localhost:8080/ingredient/find/${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Błąd podczas wyszukiwania składników");
      const data = await res.json();
      setIngredientResults(Array.isArray(data) ? data : []);
    } catch (e) {
      setIngredientError(e.message);
      setIngredientResults([]);
      console.error("MealPage.js:51 ❌ Error searching ingredients:", e);
    } finally {
      setIngredientLoading(false);
    }
  };

  // Obsługa zmiany pola wyszukiwania składnika
  const handleIngredientChange = (e) => {
    const value = e.target.value;
    setIngredientQuery(value);
    searchIngredients(value);
  };

  // Dodanie składnika do currentMeal.contents
  const addIngredientToMeal = (ingredient) => {
    setCurrentMeal((prev) => {
      const contents = prev.contents || [];
      if (contents.find((i) => i.id === ingredient.id)) return prev;
      return {
        ...prev,
        contents: [...contents, ingredient],
      };
    });
    setIngredientQuery("");
    setIngredientResults([]);
  };

  // Obsługa zmian pól meal (name, description)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentMeal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Funkcja zapisu meal
  const handleSave = async () => {
    if (!currentMeal) return;

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

    try {
      const response = await fetch(url, requestOptions);
      const responseText = await response.text();

      let responseJson = null;
      try {
        responseJson = JSON.parse(responseText);
      } catch (e) {
        // response not JSON
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

  // Funkcja tworzenia nowego składnika w bazie
  const handleCreateIngredient = async () => {
    if (!newIngredientName.trim()) {
      setCreateIngredientError("Name cannot be empty");
      return;
    }

    setCreatingIngredient(true);
    setCreateIngredientError(null);
    setStatus(null);

    const body = {
      name: newIngredientName.trim(),
      brand: newIngredientBrand.trim() || null,
      portionSize: newIngredientPortionSize
        ? Number(newIngredientPortionSize)
        : null,
      calories: newIngredientCalories ? Number(newIngredientCalories) : null,
      protein: newIngredientProtein ? Number(newIngredientProtein) : null,
      fat: newIngredientFat ? Number(newIngredientFat) : null,
      carbs: newIngredientCarbs ? Number(newIngredientCarbs) : null,
    };

    try {
      const token = localStorage.getItem("jwt");
      console.log("📤 Creating ingredient with body:", body);

      const response = await fetch("http://localhost:8080/ingredient/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const responseText = await response.text();
      console.log("📥 Create ingredient response text:", responseText);

      let responseJson = null;
      try {
        responseJson = JSON.parse(responseText);
      } catch {
        // Not JSON
      }

      if (response.ok) {
        setStatus(`Ingredient "${newIngredientName}" created successfully!`);
        // Dodaj nowy składnik do currentMeal.contents
        if (responseJson) addIngredientToMeal(responseJson);

        // Reset formularza
        setNewIngredientName("");
        setNewIngredientBrand("");
        setNewIngredientPortionSize("");
        setNewIngredientCalories("");
        setNewIngredientProtein("");
        setNewIngredientFat("");
        setNewIngredientCarbs("");
      } else {
        setCreateIngredientError(
          responseJson?.message || responseText || "Failed to create ingredient"
        );
      }
    } catch (error) {
      setCreateIngredientError("Unexpected error occurred");
      console.error("❗ Error creating ingredient:", error);
    } finally {
      setCreatingIngredient(false);
    }
  };

  if (!currentMeal) {
    return <div>Loading meal data...</div>;
  }

  return (
    <div className="meal-page-container" style={{ padding: "1rem" }}>
      <header className="meal-header">
        <h1>
          {currentMeal.mealTypeName.charAt(0).toUpperCase() +
            currentMeal.mealTypeName.slice(1).toLowerCase()}
        </h1>
      </header>

      <form
        className="meal-form"
        style={{ maxWidth: "400px", marginTop: "10px" }}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="meal-info">
          <div className="form-group">
            <label htmlFor="name">Meal name:</label>
            <input
              id="name"
              name="name"
              value={currentMeal.name}
              onChange={handleInputChange}
              type="text"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={currentMeal.description}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
        </div>

        <div className="ingredient-search">
          <label htmlFor="ingredientSearch">Add ingredient:</label>
          <input
            id="ingredientSearch"
            name="ingredientSearch"
            value={ingredientQuery}
            onChange={handleIngredientChange}
            type="text"
            placeholder="Type ingredient name..."
            autoComplete="off"
          />
          {ingredientLoading && <p>Loading ingredients...</p>}
          {ingredientError && <p className="error">{ingredientError}</p>}
          {ingredientResults.length > 0 && (
            <ul className="ingredient-results-list">
              {ingredientResults.map((ing) => (
                <li
                  key={ing.id}
                  onClick={() => addIngredientToMeal(ing)}
                  className="ingredient-result-item"
                >
                  {ing.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="ingredient-create">
          <label>Add new ingredient to database:</label>
          <input
            type="text"
            placeholder="Name (required)"
            value={newIngredientName}
            onChange={(e) => setNewIngredientName(e.target.value)}
            disabled={creatingIngredient}
            required
          />
          <input
            type="text"
            placeholder="Brand"
            value={newIngredientBrand}
            onChange={(e) => setNewIngredientBrand(e.target.value)}
            disabled={creatingIngredient}
          />
          <input
            type="number"
            placeholder="Portion size (g)"
            value={newIngredientPortionSize}
            onChange={(e) => setNewIngredientPortionSize(e.target.value)}
            disabled={creatingIngredient}
            min="0"
          />
          <input
            type="number"
            placeholder="Calories"
            value={newIngredientCalories}
            onChange={(e) => setNewIngredientCalories(e.target.value)}
            disabled={creatingIngredient}
            min="0"
          />
          <input
            type="number"
            placeholder="Protein (g)"
            value={newIngredientProtein}
            onChange={(e) => setNewIngredientProtein(e.target.value)}
            disabled={creatingIngredient}
            min="0"
          />
          <input
            type="number"
            placeholder="Fat (g)"
            value={newIngredientFat}
            onChange={(e) => setNewIngredientFat(e.target.value)}
            disabled={creatingIngredient}
            min="0"
          />
          <input
            type="number"
            placeholder="Carbs (g)"
            value={newIngredientCarbs}
            onChange={(e) => setNewIngredientCarbs(e.target.value)}
            disabled={creatingIngredient}
            min="0"
          />

          <button
            type="button-ingredient"
            onClick={handleCreateIngredient}
            disabled={creatingIngredient}
          >
            {creatingIngredient ? "Creating..." : "Create Ingredient"}
          </button>

          {createIngredientError && (
            <p className="error">{createIngredientError}</p>
          )}
        </div>

        <div className="ingredient-list">
          <h3>Current Ingredients:</h3>
          {currentMeal.contents && currentMeal.contents.length > 0 ? (
            <ul>
              {currentMeal.contents.map((ing) => (
                <li key={ing.id}>{ing.name}</li>
              ))}
            </ul>
          ) : (
            <p>No ingredients added yet.</p>
          )}
        </div>
      </form>

      <footer className="meal-page-footer">
        <p>
          Date:{" "}
          {new Date(
            currentMeal.mealDate || currentMeal.meal_date
          ).toDateString()}
        </p>

        <button onClick={handleSave} className="save-btn">
          Save
        </button>

        {status && <p className="status-msg">{status}</p>}
      </footer>
    </div>
  );
};

export default MealPage;
