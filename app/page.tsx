"use client";

import { useState } from "react";

const restaurants = ["Chipotle", "Chick-fil-A", "Panera", "McDonald's", "Taco Bell"];

export default function Home() {
  const [calories, setCalories] = useState(900);
  const [protein, setProtein] = useState(55);
  const [carbs, setCarbs] = useState(85);
  const [fat, setFat] = useState(30);
  const [selectedRestaurants, setSelectedRestaurants] = useState<string[]>(restaurants);
  const [hasSearched, setHasSearched] = useState(false);

  function toggleRestaurant(restaurant: string) {
    setSelectedRestaurants((current) =>
      current.includes(restaurant)
        ? current.filter((item) => item !== restaurant)
        : [...current, restaurant]
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasSearched(true);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold tracking-widest text-emerald-600">
            CALORIE COMPASS
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            What fits your macros today?
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Enter what you have left for the day and find restaurant meals that fit.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 shadow-sm sm:p-8"
        >
          <section>
            <h2 className="text-xl font-bold">Remaining daily macros</h2>
            <p className="mt-1 text-sm text-slate-500">
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
            <p className="mt-1 text-sm text-slate-500">
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
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-emerald-400"
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
            className="mt-8 w-full rounded-xl bg-emerald-600 px-5 py-4 font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Find meals that fit
          </button>
        </form>

        {hasSearched && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950">
            Searching {selectedRestaurants.length} restaurant
            {selectedRestaurants.length === 1 ? "" : "s"} for meals under{" "}
            <strong>{calories} calories</strong> with up to <strong>{protein}g protein</strong>,
            {" "}<strong>{carbs}g carbs</strong>, and <strong>{fat}g fat</strong>.
          </div>
        )}
      </div>
    </main>
  );
}