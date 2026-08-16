import { ArrowRight, ListFilter, Store, Target } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Set what you have left",
    description:
      "Enter your remaining calories, protein, carbs, and fat for the day.",
    icon: Target,
  },
  {
    number: "02",
    title: "Choose your restaurants",
    description:
      "Select the restaurant chains you are considering for your next meal.",
    icon: Store,
  },
  {
    number: "03",
    title: "Compare your best fits",
    description:
      "Get ranked recommendations and see exactly how each meal affects your remaining macros.",
    icon: ListFilter,
  },
];

export function HowItWorks() {
  return (
    <section className="border-b border-white/10 bg-zinc-950 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm font-bold tracking-widest text-orange-400">
            HOW IT WORKS
          </p>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Make your next meal decision with confidence.
          </h1>

          <p className="mt-4 text-lg leading-8 text-zinc-300">
            Calorie Compass turns the macros you have left into restaurant
            options that actually fit your day.
          </p>

          <a
            href="/planner"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-black transition hover:bg-orange-400"
          >
            Plan your meal
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="rounded-2xl border border-white/10 bg-zinc-900 p-6 transition hover:-translate-y-1 hover:border-orange-500/50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-orange-400">
                    {step.number}
                  </span>

                  <div className="rounded-xl border border-orange-500/20 bg-orange-500/10 p-3 text-orange-400">
                    <Icon size={22} />
                  </div>
                </div>

                <h2 className="mt-8 text-xl font-bold text-white">
                  {step.title}
                </h2>

                <p className="mt-3 leading-7 text-zinc-300">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}