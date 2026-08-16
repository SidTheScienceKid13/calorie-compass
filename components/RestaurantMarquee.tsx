const restaurants = [
  "Chipotle",
  "Chick-fil-A",
  "Panera",
  "McDonald's",
  "Taco Bell",
];

const marqueeItems = [...restaurants, ...restaurants, ...restaurants];

export function RestaurantMarquee() {
  return (
    <section className="overflow-hidden border-y border-white/10 bg-zinc-950 py-5">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {marqueeItems.map((restaurant, index) => (
          <div
            key={`${restaurant}-${index}`}
            className="flex items-center gap-3 text-sm font-semibold text-zinc-400"
          >
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            {restaurant}
          </div>
        ))}
      </div>
    </section>
  );
}