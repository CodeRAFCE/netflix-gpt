import cn from "../../utils/cn";

interface TextField extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const TextField = ({ className, ...props }: TextField) => (
  <input
    className={cn(
      "w-full p-3 mb-4 rounded bg-gray-400/40 text-white",
      className,
    )}
    {...props}
  />
);

export default TextField;
