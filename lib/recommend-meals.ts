import { MenuItem } from "./mock-menu-items";

type MacroTargets = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type Recommendation = MenuItem & {
  fitScore: number;
  explanation: string;
};

export function recommendMeals(
  items: MenuItem[],
  targets: MacroTargets,
  selectedRestaurants: string[]
): Recommendation[] {
  return items
    .filter((item) => selectedRestaurants.includes(item.restaurant))
    .map((item) => {
      const calorieDifference = Math.max(0, item.calories - targets.calories);
      const proteinDifference = Math.max(0, item.protein - targets.protein);
      const carbDifference = Math.max(0, item.carbs - targets.carbs);
      const fatDifference = Math.max(0, item.fat - targets.fat);

      const totalOverage =
        calorieDifference * 0.1 +
        proteinDifference * 2 +
        carbDifference * 1 +
        fatDifference * 1.5;

      const fitScore = Math.max(0, Math.round(100 - totalOverage));

      const fitsAllTargets =
        calorieDifference === 0 &&
        proteinDifference === 0 &&
        carbDifference === 0 &&
        fatDifference === 0;

      let explanation = "Close match for your remaining macros.";

      if (fitsAllTargets) {
        explanation = "Fits within all of your remaining macro targets.";
      } else if (item.protein >= 30) {
        explanation = "High-protein choice with a small macro tradeoff.";
      } else {
        explanation = "Slightly exceeds one or more macro targets.";
      }

      return {
        ...item,
        fitScore,
        explanation,
      };
    })
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 20);
}