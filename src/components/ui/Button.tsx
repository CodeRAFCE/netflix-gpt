import cn from "../../utils/cn";

interface ButtonElement extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const Button = ({
  children,
  className,
  isLoading,
  ...props
}: ButtonElement) => {
  return (
    <button
      className={cn(
        "w-full disabled:opacity-50 disabled:cursor-not-allowed uppercase font-semibold p-3 bg-red-600 text-white rounded hover:bg-red-700 transition",
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-90"
              d="M12 2a10 10 0 0 1 10 10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
