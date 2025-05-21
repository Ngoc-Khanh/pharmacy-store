import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme.provider";
import { Moon, Sun } from "lucide-react";

interface ModeToggleProps {
  className?: string;
}

export const ModeToggle = ({ className }: ModeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const isLightMode = theme === "light";

  const handleToggle = () => {
    setTheme(isLightMode ? "dark" : "light");
  };

  return (
    <div className={cn("flex items-center justify-between rounded-lg px-2.5 py-2", className)}>
      <div className="flex items-center gap-3">
        <div className="relative h-6 w-12 cursor-pointer rounded-full bg-blue-100 dark:bg-blue-900/40" onClick={handleToggle}>
          <div className="absolute inset-y-0 left-0 flex items-center justify-center">
            <Sun 
              className={cn(
                "h-4 w-4 ml-1.5 text-yellow-500 transition-all duration-300", 
                isLightMode ? "opacity-100" : "opacity-30"
              )} 
            />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center justify-center">
            <Moon 
              className={cn(
                "h-4 w-4 mr-1.5 text-blue-500 transition-all duration-300", 
                !isLightMode ? "opacity-100" : "opacity-30"
              )} 
            />
          </div>
          <div 
            className={cn(
              "absolute top-1 h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out",
              isLightMode ? "left-1" : "translate-x-6"
            )}
          />
        </div>
        <span className="text-sm font-medium">
          Giao diện {isLightMode ? 'sáng' : 'tối'}
        </span>
      </div>
    </div>
  );
};