import BrandLogo from "./BrandLogo";

const DecorativePanel = () => (
  <aside
    className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col items-center justify-center p-12 select-none"
    style={{
      background: "linear-gradient(135deg, oklch(18% 0.05 41) 0%, oklch(10% 0.02 41) 100%)",
    }}
  >
    {/* Grain texture overlay — must use inline style for SVG data URI */}
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.06]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />

    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      <span className="font-display font-black text-[14rem] leading-none whitespace-nowrap text-brand-500/7">
        Gossip!
      </span>
    </div>

    <div className="relative z-10 max-w-md">
      <div className="mb-10">
        <BrandLogo size="large" />
      </div>

      <blockquote className="border-l-2 border-brand-500 pl-4">
        <p
          className="font-display text-2xl font-medium leading-snug"
          style={{ color: "oklch(85% 0.02 41)" }}
        >
          Say it. Share it.{" "}
          <em className="not-italic text-brand-400">Spread the word.</em>
        </p>
      </blockquote>

      <p className="mt-6 text-sm leading-relaxed" style={{ color: "oklch(65% 0.015 41)" }}>
        Join thousands of people sharing thoughts, ideas, and moments — in real time.
      </p>

      <div className="flex gap-2 mt-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`rounded-full h-2 ${i === 0 ? "w-6 bg-brand-500" : "w-2"}`}
            style={i !== 0 ? { backgroundColor: "oklch(45% 0.03 41)" } : undefined}
          />
        ))}
      </div>
    </div>
  </aside>
);

export default DecorativePanel;
