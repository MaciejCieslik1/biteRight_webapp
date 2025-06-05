export const fetchMealInfo = async (mealId) => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("No JWT token found");
  }

  const res = await fetch(`http://localhost:8080/mealInfo/find/${mealId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch meal info: ${errText}`);
  }

  const data = await res.json();
  return data;
};
