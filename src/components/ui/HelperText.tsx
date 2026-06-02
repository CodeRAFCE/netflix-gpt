import cn from "../../utils/cn";

interface HelperTextProps {
  helperText: string;
  className?: string;
  isError?: boolean;
}

const HelperText = ({
  helperText,
  className,
  isError,
  ...props
}: HelperTextProps) => {
  return (
    <label
      className={cn(
        "text-sm leading-0",
        isError ? "text-red-500" : "text-gray-400",
        className,
      )}
      {...props}
    >
      {helperText}
    </label>
  );
};

export default HelperText;
