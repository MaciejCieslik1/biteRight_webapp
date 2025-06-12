import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeIngredientSearch from "./RecipeIngredientSearch";
import RecipeIngredientCreate from "./RecipeIngredientCreate";
import RecipeIngredientList from "./RecipeIngredientList";
import NavBar from "../../components/NavBar";
import "./RecipePage.css";
import "../MealPage/MealForm.css";
import "../MealPage/MealPage.css";
import Footer from "../../components/Footer";

const RecipeFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    contents: [],
  });

  const [ingredientQuery, setIngredientQuery] = useState("");
  const [ingredientResults, setIngredientResults] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [editingField, setEditingField] = useState(null);


  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      const token = localStorage.getItem("jwt");
      fetch(`http://localhost:8080/recipe/findById/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setRecipe(data))
        .catch(() => alert("Failed to load recipe."));
    }
  }, [id, isEditing]);

  const searchIngredients = async (query) => {
    setIngredientQuery(query);
    if (!query.trim()) {
      setIngredientResults([]); // Clear results if query is empty
      return;
    }
    const token = localStorage.getItem("jwt");
    const res = await fetch(`http://localhost:8080/ingredient/find/${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    setIngredientResults(json);
  };

  const addIngredientToRecipe = async (ingredient, amount) => {
    const token = localStorage.getItem("jwt");
    if (!recipe.recipeId) return alert("Please save the recipe first.");
    const res = await fetch("http://localhost:8080/recipeContent/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipeId: recipe.recipeId,
        ingredientId: ingredient.ingredientId,
        ingredientAmount: amount,
      }),
    });

    if (res.ok) {
      const updated = await fetch(`http://localhost:8080/recipe/findById/${recipe.recipeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await updated.json();
      setRecipe(json);
      alert("Ingredient added!");
    } else {
      const text = await res.text();
      alert("Failed to add: " + text);
    }

    setIngredientQuery("");
    setIngredientResults([]);
    setIngredientAmount("");
    setSelectedIngredient(null);
  };

  const deleteIngredientFromRecipe = async (contentId) => {
    const token = localStorage.getItem("jwt");
    const res = await fetch(`http://localhost:8080/recipeContent/delete/${contentId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      const refreshed = await fetch(`http://localhost:8080/recipe/findById/${recipe.recipeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await refreshed.json();
      setRecipe(json);
      alert("Ingredient removed.");
    } else {
      const text = await res.text();
      alert("Failed to remove: " + text);
    }
  };


  const handleSave = async () => {
    const token = localStorage.getItem("jwt");
    const url = isEditing
      ? `http://localhost:8080/recipe/update/${recipe.recipeId}`
      : "http://localhost:8080/recipe/create";

    const method = isEditing ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: recipe.name,
        description: recipe.description,
        contents: recipe.contents || [],
      }),
    });

    const text = await res.text();
    let json = null;
    try {
      json = JSON.parse(text);
    } catch {}

    if (res.ok && json) {
      alert("Recipe saved!");
      if (!isEditing) navigate(`/recipes/edit/${json.recipeId}`, { state: json });
      else setRecipe(json);
    } else {
      alert("Save failed: " + (json?.message || text));
    }
  };

  return (
    <>
      <NavBar showButtons={false} showLogoutButton={true} logoTarget="/home" />
      <div className="meal-page-container">
        {/* Left: Form + Add */}
        <div className="meal-page-left">
          <header className="meal-page-header">
            <div className="meal-form">
              <div className="form-group">
                <label htmlFor="name">Recipe name:</label>
                {editingField === "name" ? (
                  <input
                    id="name"
                    value={recipe.name}
                    onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
                    onBlur={() => setEditingField(null)}
                    autoFocus
                  />
                ) : (
                  <div className="display-field">
                    <div className="meal-page-name">{recipe.name || <em>Unnamed</em>}</div>
                    <button
                      className="edit-btn"
                      type="button"
                      onClick={() => setEditingField("name")}
                    >
                      ✏️ Edit
                    </button>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description:</label>
                {editingField === "description" ? (
                  <textarea
                    id="description"
                    value={recipe.description}
                    onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
                    onBlur={() => setEditingField(null)}
                    autoFocus
                  />
                ) : (
                  <div className="display-field">
                    <div className="meal-page-description">
                      {recipe.description || <em>No description</em>}
                    </div>
                    <button
                      className="edit-btn"
                      type="button"
                      onClick={() => setEditingField("description")}
                    >
                      ✏️ Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <button onClick={handleSave} className="meal-save-btn">Save</button>

          <RecipeIngredientSearch
            query={ingredientQuery}
            results={ingredientResults}
            onQueryChange={searchIngredients}
            onSelect={(ing) => {
              setSelectedIngredient(ing);
              setIngredientQuery("");
              setIngredientResults([]);
            }}
          />

          {selectedIngredient && (
            <div className="selected-ingredient-form">
              <div className="selected-ingredient-header">
                Adding: <strong>{selectedIngredient.name}</strong>
              </div>
              <input
                type="number"
                placeholder="Amount (g)"
                value={ingredientAmount}
                onChange={(e) => setIngredientAmount(e.target.value)}
              />
              <button
                className="add-ingredient-btn"
                onClick={() => {
                  if (!ingredientAmount || isNaN(ingredientAmount)) return alert("Invalid amount");
                  addIngredientToRecipe(selectedIngredient, Number(ingredientAmount));
                }}
              >
                Add
              </button>
            </div>
          )}
        </div>

        <div className="meal-page-middle">
          {/* Pass the deleteIngredientFromRecipe function to the onDelete prop */}
          <RecipeIngredientList contents={recipe.contents || []} onDelete={deleteIngredientFromRecipe} />
        </div>

        <div className="meal-page-right">
          <RecipeIngredientCreate onStatus={(msg) => msg && alert(msg)} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecipeFormPage;