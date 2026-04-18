const LINKS = ["Terms", "Privacy", "Cookies", "About"];

const FooterLinks = () => (
  <div className="mt-5 px-1 flex flex-wrap gap-x-3 gap-y-1">
    {LINKS.map((link) => (
      <button
        key={link}
        className="text-xs text-tertiary hover:text-secondary transition-colors duration-150"
      >
        {link}
      </button>
    ))}
    <span className="text-xs text-tertiary opacity-60">© 2025 Gossip!</span>
  </div>
);

export default FooterLinks;
