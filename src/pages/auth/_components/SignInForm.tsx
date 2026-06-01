import Button from "../../../components/button/Button";
import TextField from "../../../components/forms/TextField";

const SignInForm = () => (
  <form className="w-full max-w-md bg-black/80 p-8 rounded">
    <h2 className="text-3xl font-bold mb-6 text-center text-white">Sign In</h2>
    <TextField type="email" placeholder="Email" />
    <TextField type="password" placeholder="Password" />
    <div className="flex items-center mb-4">
      <TextField type="checkbox" id="remember" placeholder="Remember me" />
      <label htmlFor="remember" className="ml-2 text-white">
        Remember me
      </label>
    </div>
    <Button type="submit">Sign In</Button>
  </form>
);

export default SignInForm;
