import { FaUserPlus } from "react-icons/fa6";
import Button from "components/ui/Button";
import Avatar from "components/ui/Avatar";

const SUGGESTED_USERS = [
  { name: "Keanu Reeves", username: "keanur", avatar: "" },
  { name: "Neo Anderson", username: "neo_matrix", avatar: "" },
  { name: "Trinity Matrix", username: "trinity_m", avatar: "" },
];

const WhoToFollowSection = () => (
  <div className="rounded-xl border border-border-subtle overflow-hidden bg-surface-secondary">
    <div className="px-4 py-3 flex items-center gap-2 border-b border-border-subtle">
      <FaUserPlus size={13} className="text-brand-500" />
      <h3 className="font-display font-semibold text-sm text-primary">Who to follow</h3>
    </div>
    <div>
      {SUGGESTED_USERS.map((user) => (
        <div
          key={user.username}
          className="flex items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-surface-primary"
        >
          <Avatar src={user.avatar} alt={user.name} size="small" className="shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate text-primary">{user.name}</p>
            <p className="text-xs truncate text-tertiary">@{user.username}</p>
          </div>
          <Button variant="outlined" size="small" onClick={() => {}}>
            Follow
          </Button>
        </div>
      ))}
    </div>
  </div>
);

export default WhoToFollowSection;
