import { describe, expect, it } from "vitest";
import {
  normalizeFood,
  type FatSecretFood,
} from "../lib/fatsecret-normalization";

function validFood(): FatSecretFood {
  return {
    food_id: "123",
    food_name: "Chicken Bowl",
    brand_name: "Chipotle",
    servings: {
      serving: {
        serving_id: "456",
        calories: "510",
        protein: "42.6",
        carbohydrate: "48",
        fat: "15.4",
      },
    },
  };
}

describe("normalizeFood", () => {
  it("normalizes a valid FatSecret food into a menu item", () => {
    expect(normalizeFood(validFood(), "Chipotle")).toEqual({
      id: "fatsecret-123-456",
      restaurant: "Chipotle",
      name: "Chicken Bowl",
      calories: 510,
      protein: 43,
      carbs: 48,
      fat: 15,
    });
  });

it("rejects a food without serving data", () => {
  const food = validFood();
  food.servings = {};

  expect(normalizeFood(food, "Chipotle")).toBeNull();
});
  
  it("uses the first serving when FatSecret returns multiple servings", () => {
    const food = validFood();
    food.servings!.serving = [
      {
        serving_id: "first",
        calories: "500",
        protein: "40",
        carbohydrate: "45",
        fat: "14",
      },
      {
        serving_id: "second",
        calories: "900",
        protein: "60",
        carbohydrate: "90",
        fat: "30",
      },
    ];

    expect(normalizeFood(food, "Chipotle")?.id).toBe("fatsecret-123-first");
  });

  it("rejects a food with invalid nutrition data", () => {
    const food = validFood();
    food.servings!.serving = {
      serving_id: "456",
      calories: "510",
      protein: "42",
      carbohydrate: "48",
      fat: "not-a-number",
    };

    expect(normalizeFood(food, "Chipotle")).toBeNull();
  });

  it("accepts zero-valued nutrition fields", () => {
    const food = validFood();
    food.servings!.serving = {
      serving_id: "456",
      calories: "0",
      protein: "0",
      carbohydrate: "0",
      fat: "0",
    };

    expect(normalizeFood(food, "Chipotle")).toMatchObject({
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    });
  });
});