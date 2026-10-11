"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Post {
  title: string;
  category: string;
  date: string;
  readTime: string;
  img: string;
  href: string;
  excerpt?: string;
}

interface Blog02Props {
  featured?: Post;
  latestTitle?: string;
  latest?: Post[];
  collectionTitle?: string;
  collection?: Post[];
  className?: string;
}

const placeholder = (n: number) =>
  `https://www.shadcnship.com/images/placeholders/hero-architecture-${n}.webp`;

const PostMeta = ({ date, readTime }: Pick<Post, "date" | "readTime">) => (
  <p className="text-xs text-muted-foreground">
    <time>{date}</time> · {readTime}
  </p>
);

const Blog02 = ({
  featured = {
    title: "How small teams ship big products with a shared component library",
    category: "Engineering",
    date: "Sep 18, 2026",
    readTime: "8 min read",
    img: placeholder(2),
    href: "#",
  },
  latestTitle = "Latest posts",
  latest = [
    {
      title: "Designing clear navigation for complex dashboards",
      category: "Design",
      date: "Sep 15, 2026",
      readTime: "5 min read",
      img: placeholder(4),
      href: "#",
    },
    {
      title: "A practical guide to dark mode with design tokens",
      category: "Design",
      date: "Sep 11, 2026",
      readTime: "6 min read",
      img: placeholder(12),
      href: "#",
    },
    {
      title: "Building accessible forms that users finish",
      category: "Product",
      date: "Sep 8, 2026",
      readTime: "4 min read",
      img: placeholder(7),
      href: "#",
    },
    {
      title: "What we learned shipping 40 releases in a year",
      category: "Company",
      date: "Sep 2, 2026",
      readTime: "7 min read",
      img: placeholder(6),
      href: "#",
    },
  ],
  collectionTitle = "From the team",
  collection = [
    {
      title: "Why we write docs before code",
      category: "Process",
      date: "Aug 28, 2026",
      readTime: "5 min read",
      img: placeholder(8),
      href: "#",
      excerpt:
        "Writing the docs first forces the API to make sense before anyone builds it.",
    },
    {
      title: "Our approach to remote collaboration",
      category: "Culture",
      date: "Aug 21, 2026",
      readTime: "6 min read",
      img: placeholder(3),
      href: "#",
      excerpt:
        "Async by default, sync when it matters: how we keep a distributed team aligned.",
    },
    {
      title: "Keeping a design system alive after launch",
      category: "Design",
      date: "Aug 14, 2026",
      readTime: "4 min read",
      img: placeholder(1),
      href: "#",
      excerpt:
        "Ownership, versioning, and the small rituals that stop a library from rotting.",
    },
    {
      title: "Measuring what users actually do",
      category: "Product",
      date: "Aug 7, 2026",
      readTime: "6 min read",
      img: placeholder(10),
      href: "#",
      excerpt:
        "The handful of metrics we check every week, and the ones we stopped tracking.",
    },
    {
      title: "Hiring for curiosity over experience",
      category: "Culture",
      date: "Jul 31, 2026",
      readTime: "5 min read",
      img: placeholder(11),
      href: "#",
      excerpt:
        "What we look for in interviews and why it changed the way our team works.",
    },
    {
      title: "The case for boring technology",
      category: "Engineering",
      date: "Jul 24, 2026",
      readTime: "7 min read",
      img: placeholder(9),
      href: "#",
      excerpt:
        "Picking proven tools freed us to spend our novelty budget on the product.",
    },
  ],
  className,
}: Blog02Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setSnapCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
      {/* Featured + latest */}
      <div className="grid gap-8 lg:grid-cols-3">
        <article className="group relative overflow-hidden rounded-lg lg:col-span-2">
          <a href={featured.href} className="block">
            <div className="aspect-4/3 w-full bg-muted sm:aspect-16/9">
              <img
                src={featured.img}
                alt=""
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div
              className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-background via-background/70 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:p-8">
              <Badge variant="secondary" className="w-fit">
                {featured.category}
              </Badge>
              <h2 className="max-w-xl text-2xl leading-tight font-medium tracking-tight md:text-3xl">
                {featured.title}
              </h2>
              <PostMeta date={featured.date} readTime={featured.readTime} />
            </div>
          </a>
        </article>

        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">{latestTitle}</h2>
          <ul className="flex flex-col gap-4">
            {latest.map((post) => (
              <li key={post.title}>
                <article>
                  <a href={post.href} className="group flex gap-4">
                    <img
                      src={post.img}
                      alt=""
                      className="size-16 shrink-0 rounded-md bg-muted object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="line-clamp-2 text-sm font-medium group-hover:underline">
                        {post.title}
                      </h3>
                      <PostMeta date={post.date} readTime={post.readTime} />
                    </div>
                  </a>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Collection carousel */}
      <Carousel
        setApi={setApi}
        opts={{ align: "start" }}
        className="mt-16"
        aria-label={collectionTitle}
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-medium tracking-tight">
            {collectionTitle}
          </h2>
          <div className="flex gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </div>

        <CarouselContent>
          {collection.map((post) => (
            <CarouselItem
              key={post.title}
              className="basis-5/6 sm:basis-1/2 lg:basis-1/3"
            >
              <article className="h-full">
                <a
                  href={post.href}
                  className="group flex h-full flex-col gap-3"
                >
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    <img
                      src={post.img}
                      alt=""
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {post.category}
                  </Badge>
                  <h3 className="font-medium group-hover:underline">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                  )}
                  <PostMeta date={post.date} readTime={post.readTime} />
                </a>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        {snapCount > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: snapCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current ? "true" : undefined}
                className={cn(
                  "size-2 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  i === current
                    ? "bg-foreground"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/60",
                )}
              />
            ))}
          </div>
        )}
      </Carousel>
    </section>
  );
};

export default Blog02;
