const API_BASE = "http://localhost:8080";

export const fetchWaterGoal = async (token) => {
  const response = await fetch(`${API_BASE}/dailyLimits/find`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch water goal");
  return response.json();
};

export const fetchWaterIntakeByDate = async (token, dateStr) => {
  const response = await fetch(
    `${API_BASE}/waterIntake/findWaterIntakesByDate/${dateStr}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch water intake");
  return response.json();
};

export const createWaterIntake = async (token, intakeDate) => {
  const response = await fetch(`${API_BASE}/waterIntake/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ intakeDate, waterAmount: 0 }),
  });
  if (!response.ok) throw new Error("Failed to create water intake");
  return response.json();
};

export const updateWaterIntakeAmount = async (token, id, newAmount) => {
  const response = await fetch(`${API_BASE}/waterIntake/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ waterAmount: newAmount }),
  });
  if (!response.ok) throw new Error("Failed to update water intake");
  return response.json();
};
