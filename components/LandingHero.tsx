import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { MacroBeforeAfter } from "./MacroBeforeAfter";

export function LandingHero() {
  return (
    <section className="overflow-hidden border-b border-white/10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div>

          <h1 className="max-w-xl text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Restaurant meals that fit your{" "}
            <span className="text-orange-400">macros.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-300">
            Stop guessing what to order. Calorie Compass ranks restaurant meals
            around the calories and macros you have left today.
          </p>

          <div className="mt-8 flex">
            <a
              href="/planner"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-black transition hover:bg-orange-400"
            >
              Find my best meal
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-zinc-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-orange-400" />
              Macro-aware recommendations
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-orange-400" />
              Restaurant-specific results
            </span>
          </div>
        </div>

        <MacroBeforeAfter />
      </div>
    </section>
  );
}