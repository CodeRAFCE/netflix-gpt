type ValidationFunction = (
  email: string,
  password: string,
  fullName?: string | null,
) => Record<string, string>;

// utils/validation.ts
export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePassword = (password: string) =>
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
    password,
  );
export const validateFullName = (fullName: string) =>
  fullName.trim().length >= 3 && /^[a-zA-Z\s]+$/.test(fullName);

const checkValidation: ValidationFunction = (email, password, fullName) => {
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isFullNameValid = fullName != null ? validateFullName(fullName) : true;

  const errors: Record<string, string> = {};

  if (!isEmailValid) errors.email = "Invalid email format.";

  if (!isPasswordValid)
    errors.password = "Invalid password. check the requirements.";

  if (fullName !== undefined && !isFullNameValid) {
    errors.fullName = "Full name must be at least 3 characters long.";
  }

  return errors;
};

export default checkValidation;
