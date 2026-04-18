import { Link } from "react-router";
import { FaRocket, FaArrowLeft } from "react-icons/fa6";
import Button from "components/ui/Button";

const NotAvailableView = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-surface-secondary border border-border-subtle flex items-center justify-center mb-6">
        <FaRocket className="text-brand-500 text-3xl" />
      </div>

      <h2 className="font-display font-bold text-2xl text-primary mb-2">Coming soon</h2>
      <p className="text-secondary text-sm max-w-xs leading-relaxed mb-8">
        This feature is still being built. Check back later — it&apos;ll be worth the wait.
      </p>

      <Link to="/home">
        <Button
          variant="outlined"
          size="medium"
          icon={<FaArrowLeft size={13} />}
          iconPosition="start"
        >
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotAvailableView;
