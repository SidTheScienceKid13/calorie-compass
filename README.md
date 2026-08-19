# Calorie Compass

Calorie Compass is a restaurant nutrition recommendation web app that helps users find restaurant meals that fit their remaining daily calories and macronutrients.

Instead of logging every meal, users enter what they have left for the day, choose restaurant chains, and receive ranked meal recommendations with macro-fit scores and clear explanations.

## Current MVP

* Enter remaining calories, protein, carbs, and fat
* Select one or more restaurant chains
* Fetch and normalize live restaurant nutrition data through the FatSecret Platform API
* Filter and rank meal candidates by macro fit
* View macro breakdowns, fit scores, and recommendation explanations
* Generate an optional Gemini-powered “Why this fits” explanation for a recommendation
* Keep calorie calculations, rankings, and fit scores deterministic and transparent
* Fall back to representative menu data if live nutrition data is unavailable
* Explore a responsive landing page with a macro before-and-after product preview
* Use dedicated landing, “How It Works,” and meal-planner routes
* Dark, accessible UI built with Next.js, TypeScript, and Tailwind CSS

> **Data status:** Live restaurant food search is integrated through FatSecret Premier Free access. Results are normalized into a common menu-item format and filtered to prioritize meal-like items over individual ingredients. If a live request is unavailable, the planner uses representative fallback data so the core recommendation flow remains usable.

## Live Demo

Try the deployed app: [Calorie Compass](https://calorie-compass-beige.vercel.app)

* [Landing page](https://calorie-compass-beige.vercel.app)
* [Open the meal planner](https://calorie-compass-beige.vercel.app/planner)

## Demo Flow

```text
Landing page
    ↓
Enter remaining macros + select restaurants
    ↓
Fetch and normalize live restaurant meal data
    ↓
Filter eligible menu items
    ↓
Score macro overages and rank best fits
    ↓
Display personalized restaurant recommendations
    ↓
Optionally generate a Gemini “Why this fits” explanation
```

## Routes

| Route           | Purpose                                                        |
| --------------- | -------------------------------------------------------------- |
| `/`             | Landing page with product overview and macro-impact preview    |
| `/how-it-works` | Three-step explanation of the recommendation workflow          |
| `/planner`      | Interactive macro planner with live restaurant recommendations |

## Tech Stack

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* Google Gemini API via `@google/genai`
* FatSecret Platform API with server-side OAuth 2.0 and Premier food search

## Recommendation Logic

Calorie Compass separates recommendation logic from its data sources.

For a selected restaurant, the app retrieves live food results from FatSecret, normalizes nutrition fields into a shared menu-item format, filters results to favor complete meals, and scores them against the user’s remaining macro targets.

The algorithm:

* Rewards meals that stay within calorie, protein, carbohydrate, and fat targets
* Penalizes macro overages, with higher penalties for calories and fat
* Sorts results by macro-fit score
* Returns up to 20 recommendations
* Uses representative mock data as a fallback if live search is unavailable

## AI Explanation Layer

The optional “Why this fits” feature uses Gemini to turn an already-calculated recommendation into a concise, user-friendly explanation.

* Calorie Compass calculates nutrition values, fit scores, and rankings itself
* Gemini receives the chosen meal and macro targets, then explains why that meal fits
* Gemini does not choose meals, calculate macros, or alter nutrition data
* Gemini is called only through a server-side API route
* Interaction storage is disabled for these explanation requests

## Project Structure

```text
app/
  api/
    explain-meal/         # Server-side Gemini "Why this fits" route
    fatsecret-test/       # Local FatSecret OAuth connection test
    food-search/          # FatSecret Premier search and normalization route
  how-it-works/
    page.tsx              # Workflow explainer route
  planner/
    page.tsx              # Interactive macro planner route
  globals.css             # Global styles and animations
  layout.tsx              # Global layout, metadata, and font configuration
  page.tsx                # Landing-page route

components/
  AppHeader.tsx           # Shared navigation
  HowItWorks.tsx          # Reusable workflow explainer
  LandingHero.tsx         # Landing-page hero
  MacroBeforeAfter.tsx    # Macro-impact product preview
  RestaurantMarquee.tsx   # Animated restaurant selection strip

lib/
  mock-menu-items.ts      # Representative fallback restaurant menu data
  recommend-meals.ts      # Deterministic macro-fit recommendation algorithm
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

3. Create a `.env.local` file in the project root:

```env
# Required for live FatSecret food search
FATSECRET_CLIENT_ID=your_client_id
FATSECRET_CLIENT_SECRET=your_client_secret

# Required only for Gemini "Why this fits" explanations
GEMINI_API_KEY=your_gemini_api_key
```

4. Start the development server:

```bash
npm run dev
```

Open http://localhost:3000.

The landing page and deterministic recommendation flow run without API credentials. Live restaurant search requires FatSecret credentials, and AI explanations require a Gemini API key.

## Gemini API Notes

Gemini is used only to explain a recommendation after Calorie Compass has calculated its nutrition values and fit score.

The API key remains server-side and must never be exposed through a `NEXT_PUBLIC_` environment variable or committed to GitHub.

## FatSecret API Notes

FatSecret credentials are used only in server-side API routes and are never committed to the repository.

The app uses the OAuth client-credentials flow with Premier access to query FatSecret food-search results. Live results are normalized into the app’s shared menu-item shape before recommendation scoring.

When live results are shown, the planner includes FatSecret attribution. Review FatSecret’s terms of use and attribution requirements before deploying publicly.

## Roadmap

* [x] Build macro-input and restaurant-selection interface
* [x] Implement deterministic macro-fit ranking
* [x] Build responsive landing, explainer, and planner routes
* [x] Add macro before-and-after product preview
* [x] Validate server-side FatSecret OAuth authentication
* [x] Integrate FatSecret Premier live food search
* [x] Normalize live food results into a shared menu-item format
* [x] Add server-side Gemini “Why this fits” explanations
* [x] Keep AI explanations separate from deterministic recommendation scoring
* [x] Deploy a public demo using secure server-side environment variables
* [x] Test live search across every supported restaurant chain
* [ ] Refine meal-candidate filtering and restaurant-brand mappings
* [ ] Cache OAuth tokens and improve live-search resilience
* [ ] Add automated tests for recommendation scoring and API-response normalization
* [ ] Add more restaurant locations

## Disclaimer

Calorie Compass is a portfolio project and is not medical or dietary advice. Nutrition values should be verified against official restaurant information when making dietary decisions.

AI explanations summarize Calorie Compass’s calculated results and should not be treated as dietary or medical guidance.

Restaurant names are used to identify restaurant menu data. Calorie Compass is not affiliated with or endorsed by those restaurants.
