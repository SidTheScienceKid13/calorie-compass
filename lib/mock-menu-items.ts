export type MenuItem = {
  id: string;
  restaurant: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export const mockMenuItems: MenuItem[] = [
  {
    id: "chipotle-chicken-bowl",
    restaurant: "Chipotle",
    name: "Chicken Burrito Bowl",
    calories: 675,
    protein: 51,
    carbs: 68,
    fat: 21,
  },
  {
    id: "chipotle-salad",
    restaurant: "Chipotle",
    name: "Chicken Salad Bowl",
    calories: 460,
    protein: 42,
    carbs: 25,
    fat: 22,
  },
  {
    id: "chickfila-grilled-club",
    restaurant: "Chick-fil-A",
    name: "Grilled Chicken Club Sandwich",
    calories: 520,
    protein: 38,
    carbs: 41,
    fat: 22,
  },
  {
    id: "chickfila-nuggets",
    restaurant: "Chick-fil-A",
    name: "12-Count Grilled Nuggets",
    calories: 200,
    protein: 38,
    carbs: 2,
    fat: 4,
  },
  {
    id: "panera-chicken-salad",
    restaurant: "Panera",
    name: "Green Goddess Cobb Salad with Chicken",
    calories: 540,
    protein: 42,
    carbs: 23,
    fat: 34,
  },
  {
    id: "panera-turkey-chili",
    restaurant: "Panera",
    name: "Turkey Chili",
    calories: 300,
    protein: 21,
    carbs: 34,
    fat: 9,
  },
  {
    id: "mcdonalds-mcdouble",
    restaurant: "McDonald's",
    name: "McDouble",
    calories: 400,
    protein: 22,
    carbs: 33,
    fat: 20,
  },
  {
    id: "mcdonalds-mcchicken",
    restaurant: "McDonald's",
    name: "McChicken",
    calories: 400,
    protein: 14,
    carbs: 39,
    fat: 21,
  },
  {
    id: "tacobell-power-bowl",
    restaurant: "Taco Bell",
    name: "Chicken Power Menu Bowl",
    calories: 460,
    protein: 26,
    carbs: 49,
    fat: 19,
  },
  {
    id: "tacobell-chicken-soft-taco",
    restaurant: "Taco Bell",
    name: "Chicken Soft Taco",
    calories: 160,
    protein: 12,
    carbs: 16,
    fat: 6,
  },
];