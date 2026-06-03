import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { onUserStateChange } from "../../services/auth.service";
import { addUser, removeUser } from "../../store/slices/userSlice";
import Header from "../navigation/Header";

const RootLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    //dispatch is created once by Redux when the store is created and
    // never changes — it's always the same function reference.
    // So even though it's in the dependency array, the effect never
    // re-runs because Redux never gives you a new dispatch.
    const unsubscribe = onUserStateChange((user) => {
      if (user) {
        dispatch(addUser(user));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/sign-in");
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootLayout;
