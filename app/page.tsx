import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apps } from "@/config/apps";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ai-playground.svg"
            className="animate-spin-slow"
            width={128}
            height={128}
            alt="AI Playground's Logo"
          />
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-primary">AI</span> Playground
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Experiment with different apps powered by AI and LLMs.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#apps" className={buttonVariants({ size: "lg" })}>
              <Icons.start className="mr-2 h-4 w-4" /> Let&apos;s start
            </a>
            <a
              href="https://github.com/kypexfly/ai-playground"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "lg", variant: "secondary" })}
            >
              <Icons.github className="mr-2 h-4 w-4" /> GitHub
            </a>
          </div>
        </div>
      </section>

      <section
        id="apps"
        className="min-h-screen bg-muted pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32"
      >
        <div className="container flex flex-col gap-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl">Apps</h1>

          <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 md:py-8 lg:grid-cols-3 lg:py-16">
            {apps.map((app) => (
              <Link key={app.title} href={app.href}>
                <Card className="group h-full border-2 border-transparent py-8 transition-colors hover:border-primary">
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary">
                      {app.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>{app.description}</CardContent>
                  <CardFooter className="space-x-3">
                    {app.tags.map((tag) => (
                      <Badge variant="secondary" key={tag}>
                        {tag}
                      </Badge>
                    ))}
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
