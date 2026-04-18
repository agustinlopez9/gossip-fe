import { Link } from "react-router";
import { FaCheck, FaArrowLeft } from "react-icons/fa6";

const SuccessState = () => (
  <div className="text-center py-4">
    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-success/15">
      <FaCheck size={24} className="text-success" />
    </div>
    <h2 className="font-display font-bold text-2xl mb-3 leading-tight text-primary">
      Check your email
    </h2>
    <p className="text-sm mb-8 max-w-xs mx-auto leading-relaxed text-secondary">
      We&apos;ve sent a password reset link to your inbox. Follow the instructions to reset your
      password.
    </p>
    <Link
      to="/login"
      className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-150 text-brand-500 hover:text-brand-400"
    >
      <FaArrowLeft size={12} />
      Back to sign in
    </Link>
  </div>
);

export default SuccessState;
