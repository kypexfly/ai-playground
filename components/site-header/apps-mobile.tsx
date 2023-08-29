import { apps } from "@/config/apps";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Icons } from "../icons";
import { Button, buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const AppsMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex gap-2 p-2 font-bold sm:hidden">
          <Icons.menu /> {siteConfig.name}
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="w-full">
        <SheetHeader>
          <SheetTitle className="justify center flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ai-playground.svg"
              width={32}
              height={32}
              alt="AI Playground's Logo"
            />
            {siteConfig.name}
          </SheetTitle>
        </SheetHeader>
        <nav className="grid gap-4 py-4">
          <SheetClose asChild>
            <Link className={buttonVariants({ variant: "secondary" })} href="/">
              Home
            </Link>
          </SheetClose>
          <Separator />
          <h2 className="font-bold text-primary">Apps</h2>
          {apps.map((app) => {
            return (
              <SheetClose key={app.href} asChild>
                <Link
                  className={buttonVariants({ variant: "secondary" })}
                  href={app.href}
                >
                  {app.title}
                </Link>
              </SheetClose>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default AppsMobile;
