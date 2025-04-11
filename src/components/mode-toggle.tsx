import { useTheme } from "@/providers/theme.provider";
import { Moon, Sun } from "lucide-react";
import { Switch } from "./ui/switch";

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isLightMode = theme === "light";

  const handleToggle = () => {
    setTheme(isLightMode ? "dark" : "light");
  };

  return (
    <div className="flex items-center justify-between px-2 py-1">
      <div className="flex items-center gap-2">
        {isLightMode ? (
          <>
            <Sun className="h-4 w-4 transition-all dark:-rotate-90 dark:scale-0" />
            <span className="text-sm">Light mode</span>
          </>
        ) : (
          <>
            <Moon className="h-4 w-4 transition-all dark:rotate-0 dark:scale-100" />
            <span className="text-sm">Dark mode</span>
          </>
        )}
      </div>
      <Switch
        id="theme-toggle"
        checked={isLightMode}
        onCheckedChange={handleToggle}
      />
    </div>
  );
};