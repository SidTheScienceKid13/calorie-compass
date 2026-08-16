import { AppHeader } from "../components/AppHeader";
import { LandingHero } from "../components/LandingHero";
import { RestaurantMarquee } from "../components/RestaurantMarquee";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <AppHeader />
      <LandingHero />
      <RestaurantMarquee />
    </main>
  );
}