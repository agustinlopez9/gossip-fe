import { Link } from "react-router";

const SidebarLogo = () => (
  <Link to="/home" className="mb-8 px-2 block">
    <h1 className="font-display font-bold text-2xl">
      <span className="bg-clip-text text-transparent bg-linear-to-r from-brand-500 to-brand-400">
        Gossip
      </span>
      <span className="text-primary">!</span>
    </h1>
  </Link>
);

export default SidebarLogo;
