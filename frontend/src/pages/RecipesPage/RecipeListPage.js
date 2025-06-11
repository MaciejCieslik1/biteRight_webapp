import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import RecipeViewModal from "./RecipeViewModal";
import "./RecipePage.css";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const RecipeListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const RECIPES_PER_PAGE = 12;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const res = await fetch(`http://localhost:8080/recipe/findRecipes/e`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (Array.isArray(data)) setRecipes(data);
      } catch (e) {
        console.error("Failed to fetch recipes:", e);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (location.state?.showModal && location.state?.recipe) {
      setSelectedRecipe(location.state.recipe);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirm) return;
    const token = localStorage.getItem("jwt");
    const res = await fetch(`http://localhost:8080/recipe/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setRecipes((prev) => prev.filter((r) => r.recipeId !== id));
      setSelectedRecipe(null);
      alert("Recipe deleted successfully!");
    } else {
      alert("Failed to delete recipe.");
    }
  };

  const filteredRecipes = recipes.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );
  const pageCount = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);
  const displayedRecipes = filteredRecipes.slice(
    (currentPage - 1) * RECIPES_PER_PAGE,
    currentPage * RECIPES_PER_PAGE
  );

  return (
    <div className="recipe-list-page">
      <NavBar showButtons={false} showLogoutButton={true} logoTarget="/home" />
      <header className="recipe-list-header">
        <h2>Recipes</h2>
        <button className="create-btn" onClick={() => navigate("/recipes/create")}>
          + New Recipe
        </button>
      </header>

      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      <div className="recipe-grid">
        {displayedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.recipeId}
            recipe={recipe}
            onClick={() => setSelectedRecipe(recipe)}
          />
        ))}
      </div>

      {pageCount > 1 && (
        <div className="pagination-controls">
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
            Prev
          </button>
          <span>Page {currentPage} / {pageCount}</span>
          <button onClick={() => setCurrentPage((p) => Math.min(p + 1, pageCount))} disabled={currentPage === pageCount}>
            Next
          </button>
        </div>
      )}

      {selectedRecipe && (
        <RecipeViewModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onEdit={() => {
            navigate(`/recipes/edit/${selectedRecipe.recipeId}`, { state: selectedRecipe });
            setSelectedRecipe(null);
          }}
          onDelete={handleDelete}
        />
      )}
      <Footer />
    </div>
  );
};

export default RecipeListPage;
