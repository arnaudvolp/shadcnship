import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Author {
  name: string;
  avatar?: string;
}

interface BlogPost {
  img?: string;
  category: string;
  readTime: string;
  title: string;
  description: string;
  author: Author;
  date: string;
  href?: string;
}

interface Blog01Props {
  label?: string;
  title?: string;
  description?: string;
  posts?: BlogPost[];
  className?: string;
}

const BlogCard = ({
  img,
  category,
  readTime,
  title,
  description,
  author,
  date,
  href = "#",
}: BlogPost) => (
  <Card className="group overflow-hidden bg-transparent py-0 shadow-none">
    <a href={href} className="flex flex-col">
      <div className="aspect-4/3 w-full overflow-hidden rounded-t-md bg-muted/30">
        {img && (
          <img
            src={img}
            alt={title}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="rounded-full font-normal">
            {category}
          </Badge>
          <span className="text-sm text-muted-foreground">{readTime}</span>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg leading-snug font-medium group-hover:underline">
            {title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback className="bg-muted/30" />
          </Avatar>
          <div className="flex flex-col gap-0 text-xs">
            <p className="t font-medium">{author.name}</p>
            <p className="text-muted-foreground">{date}</p>
          </div>
        </div>
      </CardContent>
    </a>
  </Card>
);

const Blog01 = ({
  label = "Blog",
  title = "Latest Articles",
  description = "Discover insights, tutorials, and best practices to build better products faster.",
  posts = [
    {
      img: "/images/placeholders/hero-architecture-10.webp",
      category: "Design System",
      readTime: "5 min read",
      title: "Building Consistent UI with Shadcn",
      description:
        "Learn how to create a cohesive design system using Shadcn components.",
      author: { name: "Sarah Chen", avatar: "/images/avatars/avatar-1.webp" },
      date: "15 Jan, 2026",
    },
    {
      img: "/images/placeholders/hero-architecture-12.webp",
      category: "Tutorial",
      readTime: "8 min read",
      title: "From Zero to Landing Page in 10 Minutes",
      description:
        "Ship your next project faster with pre-built blocks and components.",
      author: {
        name: "Marcus Johnson",
        avatar: "/images/avatars/avatar-4.webp",
      },
      date: "12 Jan, 2026",
    },
    {
      img: "/images/placeholders/hero-architecture-11.webp",
      category: "Best Practices",
      readTime: "4 min read",
      title: "Accessible Components That Convert",
      description:
        "Why accessibility matters for your business and how to implement it.",
      author: {
        name: "Emily Rodriguez",
        avatar: "/images/avatars/avatar-5.webp",
      },
      date: "10 Jan, 2026",
    },
  ],
  className,
}: Blog01Props) => (
  <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
      <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
        {label}
      </p>
      <h2 className="text-4xl font-medium tracking-tight md:text-5xl">
        {title}
      </h2>
      <p className="text-muted-foreground md:text-lg">{description}</p>
    </div>
    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <BlogCard key={index} {...post} />
      ))}
    </div>
  </section>
);

export default Blog01;
