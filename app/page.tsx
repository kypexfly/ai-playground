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
import { type AppType, apps } from "@/config/apps";
import Link from "next/link";

const AppCard = ({ title, description, href, tags }: AppType) => {
  return (
    <Link key={title} href={href}>
      <Card className="group h-full border-4 border-transparent bg-secondary/25 py-8 shadow-2xl shadow-transparent transition-shadow hover:border-primary hover:shadow-primary/50">
        <CardHeader>
          <CardTitle className="text-xl group-hover:text-primary">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>{description}</CardContent>
        <CardFooter className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <Badge variant="secondary" key={tag}>
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default function Home() {
  return (
    <main>
      <section>
        <div className="container relative flex min-h-[calc(100vh-4rem)] max-w-[64rem] flex-col items-center justify-center gap-4 overflow-hidden text-center">
          <div className="absolute -z-10 hidden h-[16rem] w-[16rem] -translate-y-1/2 animate-pulse cursor-none rounded-full bg-primary opacity-25 blur-3xl dark:block" />

          <h1 className="text-6xl font-bold sm:text-7xl md:text-8xl">
            <span className="text-primary">AI</span> Playground
          </h1>

          <p className="mb-10 mt-6 max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Welcome to our AI playground, where you can discover a variety of
            innovative applications powered by cutting-edge AI technologies.
          </p>
          <div className="flex w-full flex-col flex-wrap justify-center gap-6 sm:flex-row sm:gap-3">
            <a href="#apps" className={buttonVariants({ size: "lg" })}>
              <Icons.start className="mr-2 h-4 w-4" /> Get Started
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
        className="bg-gradient-to-b from-background via-background to-secondary py-20 dark:to-black"
      >
        <div className="container flex flex-col gap-4">
          <h1 className="text-5xl font-semibold sm:text-6xl md:text-7xl">
            Apps
          </h1>

          <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 md:py-8 lg:grid-cols-3 lg:py-16">
            {apps.map((app) => (
              <AppCard {...app} key={app.title} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
