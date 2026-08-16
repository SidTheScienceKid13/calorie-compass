import { Compass, GitBranch } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="/"
          className="flex items-center gap-2 font-bold tracking-tight text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-black">
            <Compass size={18} strokeWidth={2.5} />
          </span>
          Calorie Compass
        </a>

        <div className="flex items-center gap-5">
          <a
            href="#how-it-works"
            className="hidden text-sm text-zinc-300 transition hover:text-white sm:block"
          >
            How it works
          </a>

          <a
            href="https://github.com/SidTheScienceKid13/calorie-compass"
            target="_blank"
            rel="noreferrer"
            aria-label="View Calorie Compass source code on GitHub"
            className="rounded-lg border border-white/10 p-2 text-zinc-300 transition hover:border-orange-500 hover:text-orange-400"
          >
            <GitBranch size={18} />
          </a>
        </div>
      </nav>
    </header>
  );
}