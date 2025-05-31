export const calculateDailyTotals = (meals) => {
  const allContents = Object.values(meals)
    .filter(Boolean)
    .flatMap((meal) => meal.contents || []);

  return allContents.reduce(
    (totals, item) => {
      totals.calories += item.calories || 0;
      totals.protein += item.protein || 0;
      totals.carbs += item.carbs || 0;
      totals.fat += item.fat || 0;
      return totals;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
};

export const getWeekdayName = (date) => {
  return new Date(date).toLocaleDateString("en-US", { weekday: "long" });
};
