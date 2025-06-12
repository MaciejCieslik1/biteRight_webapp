export async function searchIngredientsAPI(query, token) {
  const res = await fetch(`http://localhost:8080/ingredient/find/${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Ingredient search failed");
  return await res.json();
}

export async function addIngredientToMealAPI(body, token) {
  try {
    const res = await fetch("http://localhost:8080/mealContent/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }

    if (res.ok && json) {
      return { success: true, data: json };
    } else {
      return { success: false, data: json, raw: text };
    }
  } catch (e) {
    return { success: false, data: null, raw: e.message };
  }
}

export async function updateMealAPI(mealId, body, token) {
  try {
    const res = await fetch(`http://localhost:8080/meal/update/${mealId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }

    if (res.ok && json) {
      return { success: true, data: json };
    } else {
      return { success: false, data: json, raw: text };
    }
  } catch (e) {
    return { success: false, data: null, raw: e.message };
  }
}

export async function deleteIngredientFromMealAPI(mealContentId, token) {
  try {
    const res = await fetch(
      `http://localhost:8080/mealContent/delete/${mealContentId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.ok) {
      return { success: true };
    } else {
      const text = await res.text();
      return { success: false, data: null, raw: text };
    }
  } catch (e) {
    return { success: false, data: null, raw: e.message };
  }
}
