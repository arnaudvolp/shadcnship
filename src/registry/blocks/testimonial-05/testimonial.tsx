import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Testimonial05Props {
  image?: {
    src: string;
    alt: string;
  };
  socialProof?: {
    avatars: string[];
    text: string;
  } | null;
  rating?: number;
  quote?: string;
  details?: string;
  author?: {
    name: string;
    role: string;
  };
  tags?: string[];
  className?: string;
}

const Testimonial05 = ({
  image = {
    src: "https://www.shadcnship.com/images/avatars/avatar-3.webp",
    alt: "Portrait of Alex Chen",
  },
  socialProof = {
    avatars: [
      "https://www.shadcnship.com/images/avatars/avatar-1.webp",
      "https://www.shadcnship.com/images/avatars/avatar-2.webp",
      "https://www.shadcnship.com/images/avatars/avatar-4.webp",
    ],
    text: "1000+ developers already on board",
  },
  rating = 5,
  quote = "These components saved our team weeks of development time. Copy, paste, customize—it's that simple!",
  details = "We dropped the blocks straight into our project and shipped our new landing page in just a couple of days.",
  author = { name: "Alex Chen", role: "Frontend Developer" },
  tags = ["Landing page", "Design system", "Web platform"],
  className,
}: Testimonial05Props) => {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-5 md:gap-12">
        <div className="rounded-xl bg-muted p-3 md:col-span-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-md md:aspect-auto md:h-full">
            <img
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 size-full bg-muted object-cover"
            />
            {socialProof && (
              <div className="absolute bottom-4 left-4 flex max-w-full items-center gap-2 rounded-full border bg-background/90 py-1 pr-3 pl-1 backdrop-blur-sm">
                <div className="flex -space-x-2">
                  {socialProof.avatars.map((src, i) => (
                    <Avatar
                      key={src}
                      className="size-6 border-2 border-background"
                    >
                      <AvatarImage src={src} alt="" />
                      <AvatarFallback>{i + 1}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="text-xs font-medium">{socialProof.text}</span>
              </div>
            )}
          </div>
        </div>

        <figure className="flex flex-col justify-center gap-8 md:col-span-3">
          <div
            role="img"
            aria-label={`Rated ${filled} out of 5`}
            className="flex gap-0.5"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                aria-hidden="true"
                className={cn(
                  "size-4",
                  i < filled
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-muted text-muted",
                )}
              />
            ))}
          </div>

          <blockquote>
            <p className="text-2xl leading-snug tracking-tight md:text-3xl">
              {quote}
            </p>
          </blockquote>

          <figcaption className="flex flex-col gap-2">
            {details && (
              <p className="max-w-md text-sm text-muted-foreground">
                {details}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              —{" "}
              <cite className="font-medium text-foreground not-italic">
                {author.name}
              </cite>
              , {author.role}
            </p>
          </figcaption>

          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag}>
                  <Badge
                    variant="secondary"
                    className="h-8 cursor-pointer px-3"
                  >
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </figure>
      </div>
    </section>
  );
};

export default Testimonial05;
