import { Link } from "react-router";

interface BrandLogoProps {
  size?: "small" | "large";
}

const BrandLogo = ({ size = "small" }: BrandLogoProps) => (
  <Link to="/login" className="block">
    <h1 className={`font-display font-bold ${size === "large" ? "text-5xl leading-tight" : "text-2xl"}`}>
      <span className="bg-clip-text text-transparent bg-linear-to-r from-brand-500 to-brand-400">
        Gossip
      </span>
      <span className="text-primary">!</span>
    </h1>
  </Link>
);

export default BrandLogo;
