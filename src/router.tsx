import { createBrowserRouter, Navigate } from "react-router";
import App from "./App";
import AppLayout from "components/layout/AppLayout";
import AuthLayout from "components/layout/AuthLayout";
import MainView from "views/MainView/MainView";
import PostView from "views/PostView/PostView";
import LoginView from "views/LoginView/LoginView";
import SignUpView from "views/SignUpView/SignUpView";
import RecoveryPasswordView from "views/RecoveryPasswordView/RecoveryPasswordView";
import ProfileView from "views/ProfileView/ProfileView";
import ProfileSettingsView from "views/ProfileSettingsView/ProfileSettingsView";
import NotAvailableView from "views/NotAvailableView/NotAvailableView";
import ProtectedRoute from "components/ProtectedRoute";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Navigate to="/home" replace />,
        },
        {
          element: <AuthLayout />,
          children: [
            { path: "login", element: <LoginView /> },
            { path: "signup", element: <SignUpView /> },
            { path: "recovery", element: <RecoveryPasswordView /> },
          ],
        },
        {
          element: (
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          ),
          children: [
            { path: "home", element: <MainView /> },
            { path: "post/:id", element: <PostView /> },
            { path: "profile/:username", element: <ProfileView /> },
            { path: "settings", element: <ProfileSettingsView /> },
            { path: "*", element: <NotAvailableView /> },
          ],
        },
      ],
    },
  ],
  {
    basename: "/",
  },
);
