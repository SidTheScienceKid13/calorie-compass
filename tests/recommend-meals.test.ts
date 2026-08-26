import { describe, expect, it } from "vitest";
import type { MenuItem } from "../lib/mock-menu-items";
import { recommendMeals } from "../lib/recommend-meals";

const targets = {
  calories: 600,
  protein: 40,
  carbs: 60,
  fat: 20,
};

describe("recommendMeals", () => {
  it("returns only meals from selected restaurants", () => {
    const items: MenuItem[] = [
      {
        id: "chipotle-bowl",
        restaurant: "Chipotle",
        name: "Chicken Bowl",
        calories: 500,
        protein: 40,
        carbs: 55,
        fat: 15,
      },
      {
        id: "panera-salad",
        restaurant: "Panera",
        name: "Chicken Salad",
        calories: 500,
        protein: 40,
        carbs: 55,
        fat: 15,
      },
    ];

    const recommendations = recommendMeals(items, targets, ["Chipotle"]);

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].id).toBe("chipotle-bowl");
  });

  it("gives a perfect fit score to a meal within every macro target", () => {
    const items: MenuItem[] = [
      {
        id: "perfect-fit",
        restaurant: "Chipotle",
        name: "Perfect Fit Bowl",
        calories: 600,
        protein: 40,
        carbs: 60,
        fat: 20,
      },
    ];

    const recommendations = recommendMeals(items, targets, ["Chipotle"]);

    expect(recommendations[0].fitScore).toBe(100);
    expect(recommendations[0].explanation).toBe(
      "Fits within all of your remaining macro targets."
    );
  });

  it("sorts lower-overage meals ahead of higher-overage meals", () => {
    const items: MenuItem[] = [
      {
        id: "higher-overage",
        restaurant: "Chipotle",
        name: "Higher Overage Bowl",
        calories: 650,
        protein: 40,
        carbs: 60,
        fat: 30,
      },
      {
        id: "perfect-fit",
        restaurant: "Chipotle",
        name: "Perfect Fit Bowl",
        calories: 600,
        protein: 40,
        carbs: 60,
        fat: 20,
      },
      {
        id: "small-overage",
        restaurant: "Chipotle",
        name: "Small Overage Bowl",
        calories: 650,
        protein: 40,
        carbs: 60,
        fat: 20,
      },
    ];

    const recommendations = recommendMeals(items, targets, ["Chipotle"]);

    expect(recommendations.map((meal) => meal.id)).toEqual([
      "perfect-fit",
      "small-overage",
      "higher-overage",
    ]);
  });

  it("uses the high-protein explanation for a meal with at least 30g of protein", () => {
    const items: MenuItem[] = [
      {
        id: "high-protein",
        restaurant: "Chipotle",
        name: "High Protein Bowl",
        calories: 650,
        protein: 35,
        carbs: 60,
        fat: 20,
      },
    ];

    const recommendations = recommendMeals(items, targets, ["Chipotle"]);

    expect(recommendations[0].explanation).toBe(
      "High-protein choice with a small macro tradeoff."
    );
  });

    it("uses the overage explanation for a lower-protein meal that exceeds a target", () => {
    const items: MenuItem[] = [
      {
        id: "lower-protein-overage",
        restaurant: "Chipotle",
        name: "Lower Protein Overage Bowl",
        calories: 650,
        protein: 25,
        carbs: 60,
        fat: 20,
      },
    ];

    const recommendations = recommendMeals(items, targets, ["Chipotle"]);

    expect(recommendations[0].explanation).toBe(
      "Slightly exceeds one or more macro targets."
    );
  });

  it("returns at most 20 recommendations", () => {
    const items: MenuItem[] = Array.from({ length: 21 }, (_, index) => ({
      id: `chipotle-${index}`,
      restaurant: "Chipotle",
      name: `Chipotle Meal ${index}`,
      calories: 500,
      protein: 40,
      carbs: 50,
      fat: 15,
    }));

    const recommendations = recommendMeals(items, targets, ["Chipotle"]);

    expect(recommendations).toHaveLength(20);
  });
});