import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useNavigate } from "react-router";
import Avatar from "components/ui/Avatar";
import { useAuth } from "context/AuthContext";

const SidebarUserCard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="border-t border-border-subtle pt-4">
      <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-surface-secondary transition-colors duration-150 group">
        <div className="flex-1 min-w-0">
          <Avatar
            src={user?.avatar}
            alt={user?.name ?? "User"}
            title={user?.name}
            subtitle={user?.username ? `@${user.username}` : undefined}
            direction="column"
            size="small"
            className="shrink-0"
          />
        </div>
        <button
          onClick={handleLogout}
          className="shrink-0 text-tertiary hover:text-error transition-colors duration-150 p-1 rounded"
          title="Sign out"
        >
          <FaArrowRightFromBracket size={14} />
        </button>
      </div>
    </div>
  );
};

export default SidebarUserCard;
