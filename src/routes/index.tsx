import { createBrowserRouter } from "react-router";
import SignIn from "../pages/auth/Auth";
import Browse from "../pages/browse/Browse";

const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },
  { path: "/browse", element: <Browse /> },
]);

export default router;
