import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Author {
  name: string;
  avatar?: string;
}

interface BlogPost {
  image?: string;
  category: string;
  readTime: string;
  title: string;
  description: string;
  author: Author;
  date: string;
  href?: string;
}

interface Blog01Props {
  tagline?: string;
  heading?: string;
  description?: string;
  posts?: BlogPost[];
  className?: string;
}

const BlogCard = ({
  image,
  category,
  readTime,
  title,
  description,
  author,
  date,
  href = "#",
}: BlogPost) => (
  <Card className="group overflow-hidden bg-transparent shadow-none pt-0">
    <a href={href} className="flex flex-col">
      <div className="aspect-4/3 w-full overflow-hidden rounded-xl bg-muted">
        {image && (
          <img
            src={image}
            alt={title}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <CardContent className="px-4 pt-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="rounded-full font-normal">
            {category}
          </Badge>
          <span className="text-sm text-muted-foreground">{readTime}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug group-hover:underline">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>
              {author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-medium">{author.name}</p>
            <p className="text-muted-foreground">{date}</p>
          </div>
        </div>
      </CardContent>
    </a>
  </Card>
);

const Blog01 = ({
  tagline = "Blog",
  heading = "Latest Articles",
  description = "Discover insights, tutorials, and best practices to build better products faster.",
  posts = [
    {
      category: "Design System",
      readTime: "5 min read",
      title: "Building Consistent UI with Shadcn",
      description:
        "Learn how to create a cohesive design system using Shadcn components.",
      author: { name: "Sarah Chen", avatar: "https://avatar.vercel.sh/8" },
      date: "15 Jan, 2026",
    },
    {
      category: "Tutorial",
      readTime: "8 min read",
      title: "From Zero to Landing Page in 10 Minutes",
      description:
        "Ship your next project faster with pre-built blocks and components.",
      author: { name: "Marcus Johnson", avatar: "https://avatar.vercel.sh/8" },
      date: "12 Jan, 2026",
    },
    {
      category: "Best Practices",
      readTime: "4 min read",
      title: "Accessible Components That Convert",
      description:
        "Why accessibility matters for your business and how to implement it.",
      author: { name: "Emily Rodriguez", avatar: "https://avatar.vercel.sh/8" },
      date: "10 Jan, 2026",
    },
  ],
  className,
}: Blog01Props) => {
  return (
    <section className={cn("container mx-auto px-6 py-12 md:py-24", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium">{tagline}</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          {heading}
        </h2>
        <p className="mt-4 text-muted-foreground">{description}</p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <BlogCard key={index} {...post} />
        ))}
      </div>
    </section>
  );
};

export { Blog01 };
