import { FaFire } from "react-icons/fa6";

const TRENDING_TOPICS = [
  { tag: "#TypeScript", category: "Technology", posts: "12.4K posts" },
  { tag: "#ReactJS", category: "Development", posts: "8.7K posts" },
  { tag: "#TailwindCSS", category: "Design", posts: "5.2K posts" },
  { tag: "#WebDev", category: "Technology", posts: "22.1K posts" },
  { tag: "#OpenSource", category: "Software", posts: "3.9K posts" },
];

const TrendingSection = () => (
  <div className="rounded-xl border border-border-subtle overflow-hidden mb-4 bg-surface-secondary">
    <div className="px-4 py-3 flex items-center gap-2 border-b border-border-subtle">
      <FaFire size={14} className="text-brand-500" />
      <h3 className="font-display font-semibold text-sm text-primary">Trending</h3>
    </div>
    <div>
      {TRENDING_TOPICS.map((topic) => (
        <button
          key={topic.tag}
          className="w-full text-left px-4 py-3 transition-colors duration-150 block hover:bg-surface-primary"
        >
          <p className="text-xs text-tertiary">{topic.category}</p>
          <p className="font-semibold text-sm mt-0.5 text-primary">{topic.tag}</p>
          <p className="text-xs mt-0.5 text-tertiary">{topic.posts}</p>
        </button>
      ))}
    </div>
  </div>
);

export default TrendingSection;
