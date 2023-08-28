import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Icons } from "./icons";
import { NavLink } from "./nav-link";
import { Button } from "./ui/button";
import AppsMenu from "./apps-menu";

const routes = [
  {
    href: "/",
    label: "Home",
  },
];

const SiteHeader = () => {
  return (
    <header className="h-16">
      <div className="container flex items-center justify-between px-2 py-4">
        <div className="flex items-center">
          <Link href="/" className="mr-4 flex items-center gap-3 px-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ai-playground.svg"
              width={32}
              height={32}
              alt="AI Playground's Logo"
            />
            <span className="font-bold text-primary">{siteConfig.name}</span>
          </Link>

          <nav className="text-sm">
            <ul className="flex flex-row items-center gap-6">
              {routes.map((route) => (
                <li key={route.href}>
                  <NavLink href={route.href}>{route.label}</NavLink>
                </li>
              ))}

              <AppsMenu />
            </ul>
          </nav>
        </div>

        <Button>
          <Icons.settings className="sm:mr-2" />
          <span className="hidden sm:block">Settings</span>
        </Button>
      </div>
    </header>
  );
};

export default SiteHeader;
