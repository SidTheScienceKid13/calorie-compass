# Calorie Compass

Calorie Compass is a restaurant nutrition recommendation web app that helps users find menu items that fit their remaining daily calories and macronutrients.

Instead of logging every meal, users enter what they have left for the day, choose restaurant chains, and receive ranked menu recommendations with macro-fit scores and clear explanations.

## Current MVP

* Enter remaining calories, protein, carbs, and fat
* Select one or more restaurant chains
* Filter and rank menu items by macro fit
* View macro breakdowns, fit scores, and recommendation explanations
* Generate an optional AI-powered “Why this fits” explanation for a recommendation
* Keep nutrition values, rankings, and fit scores deterministic and transparent
* Explore a responsive landing page with a macro before-and-after preview
* Use dedicated landing, “How It Works,” and meal-planner routes
* Dark, accessible UI built with Next.js, TypeScript, and Tailwind CSS
* Validate FatSecret OAuth authentication server-side during local development

> **Data status:** The current recommendation interface uses representative mock menu data while FatSecret Premier Free approval is pending. The Gemini integration is an optional server-side explanation layer; it does not calculate nutrition values, fit scores, or rankings.

## Demo Flow

```text
Landing page
    ↓
Enter remaining macros + select restaurants
    ↓
Filter eligible menu items
    ↓
Score macro overages and rank best fits
    ↓
Display personalized restaurant recommendations
    ↓
Optionally generate a “Why this fits” explanation
```

## Routes

| Route           | Purpose                                                         |
| --------------- | --------------------------------------------------------------- |
| `/`             | Landing page with product overview and macro-impact preview     |
| `/how-it-works` | Three-step explanation of the recommendation workflow           |
| `/planner`      | Interactive macro planner and ranked restaurant recommendations |

## Tech Stack

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* Google Gemini API via `@google/genai`
* FatSecret Platform API — server-side OAuth 2.0 integration scaffold

## Recommendation Logic

Each menu item is filtered by the selected restaurant chains and scored against the user’s remaining macro targets.

The current algorithm:

* Rewards meals that stay within calorie, protein, carbohydrate, and fat targets
* Penalizes macro overages, with higher penalties for calories and fat
* Sorts results by macro-fit score
* Returns up to 20 recommendations with a plain-English explanation

The recommendation logic is separated from the data source, so mock data can be replaced by normalized FatSecret responses without changing the ranking workflow.

## AI Explanation Layer

The optional “Why this fits” feature uses Gemini to turn the app’s calculated meal data into a concise, user-friendly explanation.

* Calorie Compass calculates the nutrition values, fit score, and ranking first
* Gemini receives those calculated values and explains why the meal fits
* Gemini does not choose meals, calculate macros, or invent nutrition data
* The Gemini API key is used only in a server-side API route
* Interaction storage is disabled for these explanation requests

## Project Structure

```text
app/
  api/
    explain-meal/          # Server-side Gemini “Why this fits” route
    fatsecret-test/        # Local OAuth connection test
    food-search/           # FatSecret food-search scaffold
  how-it-works/
    page.tsx               # Workflow explainer route
  planner/
    page.tsx               # Interactive macro planner route
  globals.css              # Global styles and animations
  layout.tsx               # Global layout, metadata, and font configuration
  page.tsx                 # Landing-page route

components/
  AppHeader.tsx            # Shared navigation
  HowItWorks.tsx           # Reusable workflow explainer
  LandingHero.tsx          # Landing-page hero
  MacroBeforeAfter.tsx     # Macro-impact product preview
  RestaurantMarquee.tsx    # Animated restaurant selection strip

lib/
  mock-menu-items.ts       # Temporary MVP restaurant menu data
  recommend-meals.ts       # Macro-fit recommendation algorithm
```

## Local Setup

1. Clone the repository:

```bash
git clone https://github.com/SidTheScienceKid13/calorie-compass.git
cd calorie-compass
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Open http://localhost:3000.

4. Create a `.env.local` file in the project root for optional API features:

```env
# Required only for Gemini “Why this fits” explanations
GEMINI_API_KEY=your_gemini_api_key

# Required only for local FatSecret OAuth and food-search testing
FATSECRET_CLIENT_ID=your_client_id
FATSECRET_CLIENT_SECRET=your_client_secret
```

The landing page, planner, mock recommendations, and deterministic macro-fit scores work without API credentials.

## Gemini API Notes

Gemini is used only to explain the recommendation after Calorie Compass has calculated the nutrition values and fit score.

The API key remains server-side and must never be exposed through a `NEXT_PUBLIC_` environment variable or committed to GitHub.

## FatSecret API Notes

FatSecret credentials are used only in server-side API routes and are never committed to the repository.

The local OAuth token flow has been validated successfully. Live food search is currently blocked by FatSecret’s Premier-only scope requirement, and Premier Free approval is pending.

## Roadmap

* [x] Build macro-input and restaurant-selection interface
* [x] Implement mock restaurant data and macro-fit ranking
* [x] Validate server-side FatSecret OAuth authentication
* [x] Scaffold FatSecret food-search API route
* [x] Build responsive landing, explainer, and planner routes
* [x] Add macro before-and-after product preview
* [x] Add server-side Gemini “Why this fits” explanations
* [x] Keep Gemini explanations separate from deterministic macro-fit scoring
* [ ] Integrate live Premier food-search results
* [ ] Normalize live API responses across restaurant-name and serving-size variations
* [ ] Add restaurant locations for the MVP
* [ ] Deploy a public demo using secure server-side environment variables

## Disclaimer

Calorie Compass is a portfolio project and is not medical or dietary advice. Nutrition values should be verified against official restaurant information when making dietary decisions.

AI explanations summarize Calorie Compass’s calculated results and should not be treated as dietary or medical guidance.

Restaurant names are used only to identify representative menu data. Calorie Compass is not affiliated with or endorsed by those restaurants.
