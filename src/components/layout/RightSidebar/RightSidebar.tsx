import SearchBar from "./components/SearchBar";
import TrendingSection from "./components/TrendingSection";
import WhoToFollowSection from "./components/WhoToFollowSection";
import FooterLinks from "./components/FooterLinks";

const RightSidebar = () => (
  <aside className="flex flex-col h-full py-6 px-4 overflow-y-auto">
    <SearchBar />
    <TrendingSection />
    <WhoToFollowSection />
    <FooterLinks />
  </aside>
);

export default RightSidebar;
