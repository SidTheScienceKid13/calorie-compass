import { ArrowRight } from "lucide-react";

const macros = [
  { label: "Calories", before: "900", after: "225", unit: "cal", width: "25%", delay: "0ms" },
  { label: "Protein", before: "55g", after: "4g", unit: "left", width: "7%", delay: "100ms" },
  { label: "Carbs", before: "85g", after: "17g", unit: "left", width: "20%", delay: "200ms" },
  { label: "Fat", before: "30g", after: "9g", unit: "left", width: "30%", delay: "300ms" },
];

export function MacroBeforeAfter() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 rounded-full bg-orange-500/15 blur-3xl" />

      <section className="relative rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-2xl shadow-black/40">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="text-sm text-zinc-400">Tonight&apos;s best match</p>
            <h2 className="mt-1 text-xl font-bold text-white">
              Chicken Burrito Bowl
            </h2>
            <p className="mt-2 text-sm font-semibold text-orange-400">
              Chipotle
            </p>
          </div>

          <div className="rounded-2xl bg-orange-500 px-3 py-2 text-center text-sm font-extrabold text-black">
            94%
            <span className="block text-[10px] uppercase tracking-wide">
              fit
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Before
            </p>

            <div className="mt-3 space-y-3">
              {macros.map((macro) => (
                <div key={macro.label}>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">{macro.label}</span>
                    <span className="font-bold text-white">{macro.before}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-zinc-700">
                    <div className="h-full w-full rounded-full bg-zinc-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ArrowRight
            size={20}
            className="mt-6 shrink-0 text-orange-400"
            aria-hidden="true"
          />

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-orange-400">
              After meal
            </p>

            <div className="mt-3 space-y-3">
              {macros.map((macro) => (
                <div key={macro.label}>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">{macro.label}</span>
                    <span className="font-bold text-white">
                      {macro.after} {macro.unit}
                    </span>
                  </div>

                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-zinc-700">
                    <div
                      className="macro-fill h-full rounded-full bg-orange-400"
                      style={{
                        width: macro.width,
                        animationDelay: macro.delay,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-sm text-orange-100">
          This meal fits your targets and leaves room for a snack later.
        </p>
      </section>
    </div>
  );
}