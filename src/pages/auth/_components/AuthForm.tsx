import { Link } from "react-router";
import Button from "../../../components/button/Button";
import TextField from "../../../components/forms/TextField";
import { useState } from "react";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleFormChange = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <form className="w-full max-w-sm bg-black/80 p-8 rounded">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        {isSignUp ? "Sign Up" : "Sign In"}
      </h2>
      {isSignUp && (
        <TextField type="text" placeholder="Full Name" className="mb-4" />
      )}
      <TextField type="email" placeholder="Email" />
      <TextField type="password" placeholder="Password" />
      {!isSignUp && (
        <div className="flex flex-1 items-center mb-4">
          <TextField
            type="checkbox"
            id="remember"
            placeholder="Remember me"
            className="w-auto mb-0"
          />
          <label htmlFor="remember" className="ml-2 text-white">
            Remember me
          </label>
        </div>
      )}
      <Button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</Button>
      <div className="mt-4 text-center text-gray-400">
        Don't have an account?{" "}
        <Link
          to="#"
          className="text-white hover:underline"
          onClick={handleFormChange}
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default AuthForm;
