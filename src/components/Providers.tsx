import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import store from "../store";
import router from "../routes";

const Providers = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default Providers;
