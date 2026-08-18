import { NextRequest, NextResponse } from "next/server";
import type { MenuItem } from "../../../lib/mock-menu-items";

type FatSecretServing = {
  serving_id?: string;
  calories?: string;
  protein?: string;
  carbohydrate?: string;
  fat?: string;
};

type FatSecretFood = {
  food_id?: string;
  food_name?: string;
  brand_name?: string;
  servings?: {
    serving?: FatSecretServing | FatSecretServing[];
  };
};

type FatSecretSearchResponse = {
  foods_search?: {
    results?: {
      food?: FatSecretFood | FatSecretFood[];
    };
  };
};

const restaurantConfigs = {
  Chipotle: {
    searchExpression: "Chipotle Mexican Grill",
    brandNames: ["Chipotle Mexican Grill",, "Chipotle"],
  },
  "Chick-fil-A": {
    searchExpression: "Chick-fil-A",
    brandNames: ["Chick-fil-A"],
  },
  Panera: {
    searchExpression: "Panera Bread",
    brandNames: ["Panera Bread", "Panera"],
  },
  "McDonald's": {
    searchExpression: "McDonald's",
    brandNames: ["McDonald's"],
  },
  "Taco Bell": {
    searchExpression: "Taco Bell",
    brandNames: ["Taco Bell"],
  },
};

const mealKeywords = [
  "bowl",
  "burrito",
  "quesadilla",
  "taco",
  "salad",
  "sandwich",
  "burger",
  "wrap",
  "nuggets",
  "strips",
  "soup",
  "chili",
  "mac",
  "crunchwrap",
  "chalupa",
  "pizza",
  "plate",
  "meal",
  "mcdouble",
  "mcchicken",
  "mccrispy",
  "big mac",
  "quarter pounder",
];

const componentKeywords = [
  "salsa",
  "tortilla",
  "rice",
  "beans",
  "cheese",
  "sour cream",
  "guacamole",
  "vinaigrette",
  "sauce",
  "topping",
  "lettuce",
  "vegetables",
  "mix",
  "chips",
];

function hasMatchingBrand(
  brandName: string | undefined,
  expectedBrands: Array<string | undefined>
): boolean {
  const normalizedBrand = brandName?.trim().toLowerCase() ?? "";

  if (!normalizedBrand) {
    return false;
  }

  return expectedBrands.some((expectedBrand) => {
    if (!expectedBrand) {
      return false;
    }
    const normalizedExpected = expectedBrand.toLowerCase();

    return (
      normalizedBrand === normalizedExpected ||
      normalizedBrand.includes(normalizedExpected) ||
      normalizedExpected.includes(normalizedBrand)
    );
  });
}

function toNumber(value: string | undefined): number | null {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? Math.round(parsed) : null;
}

function isMealCandidate(name: string): boolean {
  const normalizedName = name.toLowerCase();

  const hasMealKeyword = mealKeywords.some((keyword) =>
    normalizedName.includes(keyword)
  );

  const hasComponentKeyword = componentKeywords.some((keyword) =>
    normalizedName.includes(keyword)
  );

  return hasMealKeyword && !hasComponentKeyword;
}

function normalizeFood(
  food: FatSecretFood,
  restaurant: string
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

  if (
    calories === null ||
    protein === null ||
    carbs === null ||
    fat === null
  ) {
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

export async function GET(request: NextRequest) {
  const restaurant = request.nextUrl.searchParams.get("restaurant");

  if (!restaurant) {
    return NextResponse.json(
      { error: "Missing restaurant parameter" },
      { status: 400 }
    );
  }

  const config =
    restaurantConfigs[restaurant as keyof typeof restaurantConfigs];

  if (!config) {
    return NextResponse.json(
      { error: "Unsupported restaurant" },
      { status: 400 }
    );
  }

  const clientId = process.env.FATSECRET_CLIENT_ID;
  const clientSecret = process.env.FATSECRET_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Missing FatSecret credentials" },
      { status: 500 }
    );
  }

  try {
    const basicAuth = Buffer.from(
      `${clientId}:${clientSecret}`
    ).toString("base64");

    const tokenResponse = await fetch(
      "https://oauth.fatsecret.com/connect/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          scope: "premier",
        }),
      }
    );

    const token = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return NextResponse.json(token, { status: tokenResponse.status });
    }

    const foodUrl = new URL(
      "https://platform.fatsecret.com/rest/foods/search/v3"
    );

    foodUrl.searchParams.set(
      "search_expression",
      config.searchExpression
    );
    foodUrl.searchParams.set("max_results", "50");
    foodUrl.searchParams.set("region", "US");
    foodUrl.searchParams.set("language", "en");
    foodUrl.searchParams.set("format", "json");

    const foodResponse = await fetch(foodUrl, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });

    const foodData = (await foodResponse.json()) as FatSecretSearchResponse;

    if (!foodResponse.ok) {
      return NextResponse.json(foodData, {
        status: foodResponse.status,
      });
    }

    const foods = foodData.foods_search?.results?.food ?? [];
    const foodList = Array.isArray(foods) ? foods : [foods];

    const brandedFoods = foodList.filter((food) =>
      hasMatchingBrand(food.brand_name, config.brandNames)
    );

    const mealCandidates = brandedFoods.filter((food) =>
      isMealCandidate(food.food_name ?? "")
    );

    const items = mealCandidates
      .map((food) => normalizeFood(food, restaurant))
      .filter((item): item is MenuItem => item !== null);

    const debug = request.nextUrl.searchParams.get("debug") === "1";

    return NextResponse.json({
      restaurant,
      count: items.length,
      items,
      ...(debug
        ? {
        providerStatus: foodResponse.status,
        providerTopLevelKeys: Object.keys(foodData),
        providerError: (foodData as { error?: unknown }).error ?? null,
        rawCount: foodList.length,
        brandedCount: brandedFoods.length,
        mealCandidateCount: mealCandidates.length,
        brands: [
          ...new Set(
            foodList.map((food) => food.brand_name ?? "(missing)")
          ),
        ],
        sampleNames: foodList
          .slice(0, 10)
          .map((food) => food.food_name ?? "(missing)"),
      }
    : {}),
});

  } catch (error) {
    console.error("FatSecret food search failed:", error);

    return NextResponse.json(
      { error: "Unable to search FatSecret right now" },
      { status: 500 }
    );
  }
}