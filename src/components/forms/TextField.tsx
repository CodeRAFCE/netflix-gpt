import cn from "../../utils/cn";
import HelperText from "../ui/HelperText";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  helperText?: string;
  isError?: boolean;
  ref?: React.RefObject<HTMLInputElement | null>;
  hideHelper?: boolean;
}

const TextField = ({
  className,
  helperText,
  isError,
  hideHelper,
  ...props
}: TextFieldProps) => (
  <div>
    <input
      className={cn(
        "w-full p-3 rounded bg-gray-400/40 text-white",
        isError && "border border-red-500",
        className,
      )}
      {...props}
    />
    {!hideHelper && (
      <div className="min-h-6 mb-1 ">
        {helperText && <HelperText helperText={helperText} isError={isError} />}
      </div>
    )}
  </div>
);

export default TextField;
