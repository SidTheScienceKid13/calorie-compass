import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Macros = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type ExplainMealRequest = {
  meal: Macros & {
    restaurant: string;
    name: string;
    fitScore: number;
    deterministicExplanation: string;
  };
  remaining: Macros;
};

function isValidNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is missing from .env.local." },
      { status: 500 }
    );
  }

  try {
    const body = (await request.json()) as ExplainMealRequest;
    const { meal, remaining } = body;

    const validMeal =
      meal &&
      typeof meal.restaurant === "string" &&
      typeof meal.name === "string" &&
      isValidNumber(meal.calories) &&
      isValidNumber(meal.protein) &&
      isValidNumber(meal.carbs) &&
      isValidNumber(meal.fat) &&
      isValidNumber(meal.fitScore);

    const validRemaining =
      remaining &&
      isValidNumber(remaining.calories) &&
      isValidNumber(remaining.protein) &&
      isValidNumber(remaining.carbs) &&
      isValidNumber(remaining.fat);

    if (!validMeal || !validRemaining) {
      return NextResponse.json(
        { error: "Invalid meal or remaining-macro data." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
You write concise, transparent nutrition explanations for Calorie Compass.

Important rules:
- The computed macro-fit score and nutrition values below are the source of truth.
- Do not change, estimate, or invent nutrition values.
- Do not give medical advice, diagnose conditions, or make health claims.
- Explain tradeoffs plainly and neutrally.
- Return one paragraph only, between 35 and 70 words.
- Do not use markdown, headings, bullet points, or disclaimers.

User's remaining macros:
- Calories: ${remaining.calories}
- Protein: ${remaining.protein}g
- Carbs: ${remaining.carbs}g
- Fat: ${remaining.fat}g

Selected meal:
- Restaurant: ${meal.restaurant}
- Meal: ${meal.name}
- Calories: ${meal.calories}
- Protein: ${meal.protein}g
- Carbs: ${meal.carbs}g
- Fat: ${meal.fat}g
- Deterministic fit score: ${meal.fitScore}%
- Existing computed summary: ${meal.deterministicExplanation}

Explain why this meal fits or what tradeoff it makes.
`;

        const interaction = await ai.interactions.create({
        model: "gemini-3.6-flash",
        input: prompt,
        store: false,
    });

    const explanation = interaction.output_text?.trim();

    if (!explanation) {
      throw new Error("Gemini returned an empty explanation.");
    }

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("Gemini explanation error:", error);

    return NextResponse.json(
      {
        error:
          "The AI explainer is temporarily unavailable. Your macro-fit score is still calculated normally.",
      },
      { status: 503 }
    );
  }
}