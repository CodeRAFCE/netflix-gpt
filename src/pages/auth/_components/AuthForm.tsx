import { Link } from "react-router";
import Button from "../../../components/ui/Button";
import TextField from "../../../components/forms/TextField";
import { useRef, useState } from "react";
import checkValidation from "../../../utils/validation";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const fullNameRef = useRef<HTMLInputElement | null>(null);

  const handleFormChange = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior (Prevent Reloading Browser)
    // Handle form submission logic here
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const fullName = isSignUp ? fullNameRef.current?.value || "" : "";

    const messages = checkValidation(email, password, fullName);
    console.log("Form submitted with:", { email, password, fullName });
    console.log("Validation messages:", messages);
    setErrors(messages);
  };

  return (
    <form
      className="w-full max-w-sm bg-black/80 p-8 rounded"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        {isSignUp ? "Sign Up" : "Sign In"}
      </h2>
      {isSignUp && (
        <TextField
          name="fullName"
          type="text"
          placeholder="Full Name"
          className="mb-0"
          helperText={errors.fullName}
          isError={!!errors.fullName}
          ref={fullNameRef}
        />
      )}
      <TextField
        type="email"
        placeholder="Email"
        ref={emailRef}
        helperText={errors.email}
        isError={!!errors.email}
      />
      <TextField
        type="password"
        placeholder="Password"
        ref={passwordRef}
        helperText={errors.password}
        isError={!!errors.password}
      />
      {!isSignUp && (
        <div className="flex flex-1 items-center mb-4">
          <TextField
            type="checkbox"
            id="remember"
            placeholder="Remember me"
            className="w-auto mb-0"
            hideHelper
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
