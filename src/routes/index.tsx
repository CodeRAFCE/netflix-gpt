import { createBrowserRouter, Navigate } from "react-router";
import Browse from "../pages/browse/Browse";
import RootLayout from "../components/layout/RootLayout";
import AuthLayout from "../pages/auth/AuthLayout";
import AuthForm from "../pages/auth/_components/AuthForm";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { index: true, element: <Navigate to="/sign-in" replace /> },
          { path: "/sign-up", element: <AuthForm isSignUp={true} /> },
          { path: "/sign-in", element: <AuthForm isSignUp={false} /> },
        ],
      },
      { path: "/browse", element: <Browse /> },
    ],
  },
]);

export default router;
