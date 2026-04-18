import { Outlet, Navigate } from "react-router";
import { useAuth } from "context/AuthContext";
import DecorativePanel from "./components/DecorativePanel";
import BrandLogo from "./components/BrandLogo";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="min-h-screen flex">
      <DecorativePanel />

      <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-16 overflow-y-auto bg-surface-base">
        <div className="lg:hidden mb-8 self-start">
          <BrandLogo size="small" />
        </div>

        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
