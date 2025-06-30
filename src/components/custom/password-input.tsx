import { forwardRef, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  showIcon?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showIcon = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative group">
        {showIcon && (
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 group-focus-within:text-green-500 transition-colors duration-200 drop-shadow-sm" />
        )}
        <Input
          {...props}
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={cn(
            showIcon ? "pl-11 pr-12" : "pr-12",
            "h-12 bg-white/50 dark:bg-gray-800/30 border-gray-300/50 dark:border-gray-700/50 focus:border-green-500 dark:focus:border-green-400 focus:ring-2 focus:ring-green-500/20 rounded-lg transition-all backdrop-blur-sm focus:shadow-lg focus:shadow-green-500/10",
            className
          )}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors focus:outline-none focus:text-green-500 p-1 rounded-md hover:bg-green-50 dark:hover:bg-green-900/20 group"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5 drop-shadow-sm group-hover:drop-shadow-md transition-all" />
          ) : (
            <Eye className="w-5 h-5 drop-shadow-sm group-hover:drop-shadow-md transition-all" />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput }; 