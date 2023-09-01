"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Switch } from "../ui/switch";

export const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted)
    return (
      <Button variant="ghost" className="p-2" aria-label="Site settings">
        <Icons.settings />
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2" aria-label="Site settings">
          <Icons.settings />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Site Configuration</DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className="justify-between"
          onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          Theme
          <Switch checked={theme === "dark"} />
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Icons.github className="mr-2 h-4 w-4" />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icons.globe className="mr-2 h-4 w-4" />
          <span>Language</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
