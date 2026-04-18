import { NavLink } from "react-router";
import {
  FaHouse,
  FaMagnifyingGlass,
  FaBell,
  FaEnvelope,
  FaUser,
  FaGear,
} from "react-icons/fa6";
import { useAuth } from "context/AuthContext";
import type { NavItem } from "../interfaces";

const SidebarNav = () => {
  const { user } = useAuth();

  const navItems: NavItem[] = [
    { icon: <FaHouse />, label: "Home", to: "/home" },
    { icon: <FaMagnifyingGlass />, label: "Explore", to: "/explore" },
    { icon: <FaBell />, label: "Notifications", to: "/notifications" },
    { icon: <FaEnvelope />, label: "Messages", to: "/messages" },
    { icon: <FaUser />, label: "Profile", to: `/profile/${user?.username ?? "me"}` },
    { icon: <FaGear />, label: "Settings", to: "/settings" },
  ];

  return (
    <div className="flex-1 flex flex-col gap-0.5">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-150 group
            ${
              isActive
                ? "text-brand-500 bg-surface-sidebar-active border-l-2 border-brand-500 pl-2.5"
                : "text-secondary hover:text-primary hover:bg-surface-secondary"
            }`
          }
        >
          <span className="text-base shrink-0">{item.icon}</span>
          <span className="font-medium text-sm">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default SidebarNav;
