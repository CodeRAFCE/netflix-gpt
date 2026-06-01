import cn from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "w-full uppercase font-semibold p-3 bg-red-600 text-white rounded hover:bg-red-700 transition",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
