import { useTheme } from "next-themes";
import React from "react";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

const ModeToggleV2 = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Moon /> : <Sun />}
    </Button>
  );
};

export default ModeToggleV2;
