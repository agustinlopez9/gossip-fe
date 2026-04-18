import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = () => (
  <div className="relative mb-5">
    <FaMagnifyingGlass
      size={13}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary"
    />
    <input
      type="text"
      placeholder="Search Gossip!"
      className="w-full rounded-full pl-9 pr-4 py-2.5 text-sm outline-none transition-colors duration-150 bg-surface-secondary text-primary border border-border-subtle focus:border-border-focus"
    />
  </div>
);

export default SearchBar;
