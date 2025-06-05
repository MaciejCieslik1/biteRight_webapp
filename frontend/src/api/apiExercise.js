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
