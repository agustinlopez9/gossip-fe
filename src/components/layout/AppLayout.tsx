import { Outlet, NavLink } from "react-router";
import { FaHouse, FaMagnifyingGlass, FaBell, FaUser } from "react-icons/fa6";
import { useAuth } from "context/AuthContext";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

const AppLayout = () => {
  const { user } = useAuth();

  const mobileNavItems = [
    { icon: <FaHouse size={20} />, to: "/home" },
    { icon: <FaMagnifyingGlass size={20} />, to: "/explore" },
    { icon: <FaBell size={20} />, to: "/notifications" },
    { icon: <FaUser size={20} />, to: `/profile/${user?.username ?? "me"}` },
  ];

  return (
    <div className="min-h-screen flex mx-auto gap-4 bg-surface-navbar max-w-[1400px]">
      <aside className="hidden lg:flex k-0 w-[280px] p-3 pr-0">
        <div className="sticky top-3 flex flex-col overflow-hidden w-full h-[calc(100vh-1.5rem)]">
          <LeftSidebar />
        </div>
      </aside>

      <main className="flex-1 min-w-0 min-h-screen pb-16 lg:pb-0 border-x border-border-subtle">
        <Outlet />
      </main>

      <aside className="hidden lg:flex shrink-0 w-[320px] p-3 pl-0">
        <div className="sticky top-3 flex flex-col rounded-2xl overflow-hidden w-full">
          <RightSidebar />
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 lg:hidden z-50 flex bg-surface-navbar border-t border-border-subtle">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex-1 flex items-center justify-center py-3 transition-colors duration-150
              ${isActive ? "text-brand-500" : "text-tertiary hover:text-secondary"}`
            }
          >
            {item.icon}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AppLayout;
