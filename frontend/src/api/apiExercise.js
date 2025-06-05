export async function fetchExercisesByDate(token, dateStr) {
  const url = `http://localhost:8080/userExercise/findExercisesByDate/${dateStr}`;

  console.debug("[fetchExercisesByDate] === START ===");
  console.debug("[fetchExercisesByDate] URL:", url);
  console.debug("[fetchExercisesByDate] Token:", token);

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.debug("[fetchExercisesByDate] Response status:", res.status);
    console.debug("[fetchExercisesByDate] Response headers:", [...res.headers]);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("[fetchExercisesByDate] Error response text:", errorText);
      throw new Error(`HTTP ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    console.debug("[fetchExercisesByDate] Fetched exercises data:", data);
    return data;
  } catch (error) {
    console.error("[fetchExercisesByDate] Exception caught:", error);
    throw error;
  } finally {
    console.debug("[fetchExercisesByDate] === END ===");
  }
}

export async function createExerciseInfo({ name, metabolicEquivalent }) {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("JWT token not found");
  }

  const body = {
    name,
    metabolicEquivalent,
  };

  const res = await fetch("http://localhost:8080/exerciseInfo/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to create exercise info: ${errText}`);
  }

  const data = await res.json();
  return data;
}

export async function createUserExercise(userExerciseData) {
  const token = localStorage.getItem("jwt");

  console.debug("[createUserExercise] === START ===");
  console.debug("[createUserExercise] Input data:", userExerciseData);
  console.debug("[createUserExercise] JWT token:", token);

  if (!token) {
    console.error("[createUserExercise] No JWT token found");
    throw new Error("JWT token not found");
  }

  try {
    const res = await fetch("http://localhost:8080/userExercise/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userExerciseData),
    });

    console.debug("[createUserExercise] Response status:", res.status);
    console.debug("[createUserExercise] Response headers:", [...res.headers]);

    if (!res.ok) {
      const errText = await res.text();
      console.error("[createUserExercise] Error response:", errText);
      throw new Error(`Failed to create user exercise: ${errText}`);
    }

    const data = await res.json();
    console.debug("[createUserExercise] Created user exercise:", data);
    return data;
  } catch (error) {
    console.error("[createUserExercise] Exception caught:", error);
    throw error;
  } finally {
    console.debug("[createUserExercise] === END ===");
  }
}

export const fetchExerciseInfoByName = async (name) => {
  const token = localStorage.getItem("jwt");

  const response = await fetch(
    `http://localhost:8080/exerciseInfo/find/${encodeURIComponent(name)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Exercise not found or server error");
  }

  return await response.json();
};
