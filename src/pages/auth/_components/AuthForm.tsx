import { useRef, useState } from "react";
import { Link } from "react-router";
import { signIn, signUp } from "../../../services/auth.service";
import Button from "../../../components/ui/Button";
import TextField from "../../../components/forms/TextField";
import checkValidation from "../../../utils/validation";
import useAsync from "../../../hooks/useAsync";

interface AuthFormProps {
  isSignUp: boolean;
}

const AuthForm = ({ isSignUp }: AuthFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const fullNameRef = useRef<HTMLInputElement | null>(null);

  const { error, loading, run } = useAsync();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior (Prevent Reloading Browser)
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const fullName = isSignUp ? fullNameRef.current?.value || "" : undefined;
    const form = e.currentTarget;

    const messages = checkValidation(email, password, fullName);
    setErrors(messages);

    if (Object.keys(messages).length === 0) {
      // No validation errors, proceed with form submission (e.g., API call)

      const ok = isSignUp
        ? await run(() => signUp({ email, password, fullName }))
        : await run(() => signIn({ email, password }));

      if (ok) form.reset();
    }
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
      {error && (
        <div className="text-red-500 text-center mb-4">😡{error}‼️</div>
      )}

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
      <Button type="submit" isLoading={loading} disabled={loading}>
        {isSignUp ? "Sign Up" : "Sign In"}
      </Button>
      <div className="mt-4 text-center text-gray-400">
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <Link
          to={isSignUp ? "/sign-in" : "/sign-up"}
          className="text-white hover:underline"
        >
          {!isSignUp ? "Sign Up" : "Sign In"}
        </Link>
      </div>
    </form>
  );
};

export default AuthForm;
