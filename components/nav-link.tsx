"use client";

import { cn, isCurrentPathOrChild } from "@/lib/utils";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  children?: React.ReactNode;
  href: Url;
}

export function NavLink({ children, href }: NavLinkProps) {
  const currentPath = usePathname();

  return (
    <Link
      className={cn(
        "border-b-2 border-dotted border-transparent px-2 py-2 text-muted-foreground hover:text-secondary-foreground",
        isCurrentPathOrChild(currentPath, String(href)) &&
          "border-primary text-primary",
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
