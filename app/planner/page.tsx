"use client";

import { useState } from "react";
import { mockMenuItems } from "../../lib/mock-menu-items";
import {
  recommendMeals,
  type Recommendation,
} from "../../lib/recommend-meals";
import { AppHeader } from "../../components/AppHeader";

const restaurants = ["Chipotle", "Chick-fil-A", "Panera", "McDonald's", "Taco Bell"];

export default function Home() {
  const [calories, setCalories] = useState(900);
  const [protein, setProtein] = useState(55);
  const [carbs, setCarbs] = useState(85);
  const [fat, setFat] = useState(30);
  const [selectedRestaurants, setSelectedRestaurants] = useState<string[]>(restaurants);
  const [hasSearched, setHasSearched] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  function toggleRestaurant(restaurant: string) {
    setSelectedRestaurants((current) =>
      current.includes(restaurant)
        ? current.filter((item) => item !== restaurant)
        : [...current, restaurant]
    );
  }

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const results = recommendMeals(
    mockMenuItems,
    { calories, protein, carbs, fat },
    selectedRestaurants
  );

  setRecommendations(results);
  setHasSearched(true);
}

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <AppHeader />
      <div
       className="mx-auto max-w-3xl scroll-mt-24 px-6 pb-24 pt-20"
      >
        <header className="mb-8">
        <p className="text-sm font-bold tracking-widest text-orange-400">
         PLAN YOUR MEAL
        </p>
       <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
         What do you have left today?
        </h2>
        <p className="mt-3 text-lg text-zinc-300">
          Set your remaining macros and we’ll rank restaurant options that fit.
        </p>
      </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-zinc-900 p-6 shadow-sm sm:p-8"
        >
          <section>
            <h2 className="text-xl font-bold">Remaining daily macros</h2>
            <p className="mt-1 text-sm text-white">
              These are the nutrients you still want available for your next meal.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold">Calories</span>
                <input
                  type="number"
                  min="0"
                  value={calories}
                  onChange={(event) => setCalories(Number(event.target.value))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold">Protein (g)</span>
                <input
                  type="number"
                  min="0"
                  value={protein}
                  onChange={(event) => setProtein(Number(event.target.value))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold">Carbs (g)</span>
                <input
                  type="number"
                  min="0"
                  value={carbs}
                  onChange={(event) => setCarbs(Number(event.target.value))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold">Fat (g)</span>
                <input
                  type="number"
                  min="0"
                  value={fat}
                  onChange={(event) => setFat(Number(event.target.value))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </label>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-bold">Where are you thinking of eating?</h2>
            <p className="mt-1 text-sm text-white">
              Select one or more restaurant chains.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {restaurants.map((restaurant) => {
                const selected = selectedRestaurants.includes(restaurant);

                return (
                  <button
                    type="button"
                    key={restaurant}
                    onClick={() => toggleRestaurant(restaurant)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      selected
                        ? "border-orange-500 bg-orange-500 text-white"
                        : "border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-orange-400"
                    }`}
                  >
                    {restaurant}
                  </button>
                );
              })}
            </div>
          </section>

          <button
            type="submit"
            disabled={selectedRestaurants.length === 0}
            className="mt-8 w-full rounded-xl bg-orange-500 px-5 py-4 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-zinc-700"
          >
            Find meals that fit
          </button>
        </form>

        {hasSearched && (
  <section className="mt-6">
    <h2 className="mb-4 text-xl font-bold">Your best restaurant options</h2>

    {recommendations.length === 0 ? (
      <p className="rounded-xl bg-white p-5 text-slate-600 shadow-sm">
        No menu items matched those restaurant selections.
      </p>
    ) : (
      <div className="grid gap-4 sm:grid-cols-2">
        {recommendations.map((item) => (
          <article key={item.id} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-orange-400">
                  {item.restaurant}
                </p>
                <h3 className="mt-1 text-lg font-bold">{item.name}</h3>
              </div>

              <span className="rounded-full bg-orange-500/15 px-3 py-1 text-sm font-bold text-orange-300">
                {item.fitScore}% fit
              </span>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2 text-center text-sm">
              <div><strong>{item.calories}</strong><br />cal</div>
              <div><strong>{item.protein}g</strong><br />protein</div>
              <div><strong>{item.carbs}g</strong><br />carbs</div>
              <div><strong>{item.fat}g</strong><br />fat</div>
            </div>

            <p className="mt-4 text-sm text-white">{item.explanation}</p>
          </article>
        ))}
      </div>
    )}
  </section>
)}
      </div>
    </main>
  );
}