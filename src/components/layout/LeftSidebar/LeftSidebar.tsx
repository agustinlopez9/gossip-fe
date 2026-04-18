import SidebarLogo from "./components/SidebarLogo";
import SidebarNav from "./components/SidebarNav";
import SidebarUserCard from "./components/SidebarUserCard";

const LeftSidebar = () => (
  <nav className="flex flex-col h-full px-4 py-6">
    <SidebarLogo />
    <SidebarNav />
    <SidebarUserCard />
  </nav>
);

export default LeftSidebar;
