export type TabKey = "posts" | "replies" | "likes";

const TABS: { key: TabKey; label: string }[] = [
  { key: "posts", label: "Posts" },
  { key: "replies", label: "Replies" },
  { key: "likes", label: "Likes" },
];

interface ProfileTabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => (
  <div className="bg-surface-base/85 border-border-subtle sticky top-0 z-10 flex border-b backdrop-blur-md">
    {TABS.map((tab) => (
      <button
        key={tab.key}
        onClick={() => onTabChange(tab.key)}
        className={`relative flex-1 py-3.5 text-sm font-medium transition-colors duration-150 ${activeTab === tab.key ? "text-primary" : "text-tertiary"}`}
      >
        {tab.label}
        {activeTab === tab.key && (
          <span className="bg-brand-500 absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-full" />
        )}
      </button>
    ))}
  </div>
);

export default ProfileTabs;
