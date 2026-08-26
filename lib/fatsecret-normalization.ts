import type { MenuItem } from "./mock-menu-items";

export type FatSecretServing = {
  serving_id?: string;
  calories?: string;
  protein?: string;
  carbohydrate?: string;
  fat?: string;
};

export type FatSecretFood = {
  food_id?: string;
  food_name?: string;
  brand_name?: string;
  servings?: {
    serving?: FatSecretServing | FatSecretServing[];
  };
};

function toNumber(value: string | undefined): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.round(parsed) : null;
}

export function normalizeFood(
  food: FatSecretFood,
  restaurant: string,
): MenuItem | null {
  const servings = food.servings?.serving;
  const serving = Array.isArray(servings) ? servings[0] : servings;

  if (!food.food_id || !food.food_name || !serving?.serving_id) {
    return null;
  }

  const calories = toNumber(serving.calories);
  const protein = toNumber(serving.protein);
  const carbs = toNumber(serving.carbohydrate);
  const fat = toNumber(serving.fat);

  if (calories === null || protein === null || carbs === null || fat === null) {
    return null;
  }

  return {
    id: `fatsecret-${food.food_id}-${serving.serving_id}`,
    restaurant,
    name: food.food_name,
    calories,
    protein,
    carbs,
    fat,
  };
}