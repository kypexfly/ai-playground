import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import AppsMenu from "./apps-menu";
import Settings from "./settings";
import AppsMobile from "./apps-mobile";

const SiteHeader = () => {
  return (
    <header className="h-16">
      <div className="container flex items-center justify-between px-2 py-4">
        <div className="flex items-center">
          {/* TODO: Add aria-label for ALL buttons */}
          <AppsMobile />
          <Link
            href="/"
            className="mr-4 hidden items-center gap-3 px-3 sm:flex"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ai-playground.svg"
              width={32}
              height={32}
              alt="AI Playground's Logo"
            />
            <span className="font-bold">{siteConfig.name}</span>
          </Link>

          <nav className="hidden text-sm sm:block">
            <ul className="flex flex-row items-center gap-6">
              <AppsMenu />
            </ul>
          </nav>
        </div>

        <div>
          <Settings />

          <Button variant="ghost" className="p-2">
            <Icons.settings />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
