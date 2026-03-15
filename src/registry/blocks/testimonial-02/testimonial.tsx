import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { QuoteIcon } from "@/components/social-icons";

interface Testimonial {
  type: "text" | "image" | "cta";
  img?: string;
  title?: string;
  content?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  rating?: number;
  button?: { text: string; url: string };
}

interface Testimonial02Props {
  label?: string;
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
  className?: string;
}

const StarRating = ({ rating = 5 }: { rating?: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: rating }).map((_, i) => (
      <Star key={i} className="size-3.5 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  if (testimonial.type === "cta") {
    return (
      <Card className="aspect-3/4 h-full bg-primary text-primary-foreground shadow-none">
        <CardContent className="flex h-full flex-col gap-4 p-6">
          <h3 className="text-xl font-medium">{testimonial.title}</h3>
          <p className="flex-1 text-sm opacity-90">{testimonial.content}</p>
          <Button variant="secondary" className="w-full" asChild>
            <a href={testimonial.button?.url || "#"}>
              {testimonial.button?.text}
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (testimonial.type === "image") {
    return (
      <Card className="h-full py-0 shadow-none">
        <div className="aspect-3/4 h-full w-full overflow-hidden rounded-xl bg-muted">
          {testimonial.img && (
            <img
              src={testimonial.img}
              alt=""
              className="size-full object-cover"
            />
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full p-4 shadow-none">
      <CardContent className="flex h-full flex-col justify-between gap-12 p-0">
        <div className="flex flex-col gap-2">
          <QuoteIcon className="size-4 dark:invert" />
          {testimonial.title && (
            <h4 className="text-2xl leading-tight">{testimonial.title}</h4>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {testimonial.content && (
            <p className="flex-1 text-muted-foreground">
              {testimonial.content}
            </p>
          )}
          {testimonial.author && (
            <div className="flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarImage
                  src={testimonial.author.avatar}
                  alt={testimonial.author.name}
                  className="object-cover"
                />
                <AvatarFallback>
                  {testimonial.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <StarRating rating={testimonial.rating} />
                <span className="text-sm font-medium text-muted-foreground">
                  {testimonial.author.name}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonial02 = ({
  label = "Testimonials",
  title = "Wall of Love",
  description = "See what our customers are saying about their experience with our product.",
  testimonials = [
    {
      type: "image",
      img: "https://www.shadcnship.com/images/avatars/avatar-1.webp",
    },
    {
      type: "text",
      title: "Game Changer for Our Team!",
      content:
        "Daily support, tailored insights-Halse revolutionized my well-being. A most-have for a healthier life!",
      author: {
        name: "Emma Thompson",
        avatar: "https://www.shadcnship.com/images/avatars/avatar-1.webp",
      },
      rating: 5,
    },
    {
      type: "image",
      img: "https://www.shadcnship.com/images/avatars/avatar-2.webp",
    },
    {
      type: "text",
      title: "Incredible Support!",
      content:
        "The customer support team is exceptional. They helped us get set up quickly and answered all our questions.",
      author: {
        name: "Emily Johnson",
        avatar: "https://www.shadcnship.com/images/avatars/avatar-2.webp",
      },
      rating: 5,
    },
    {
      type: "text",
      title: "Streamlined Our Workflow!",
      content:
        "From day one, this tool has made our processes smoother. A game-changer for productivity.",
      author: {
        name: "Alex Rodriguez",
        avatar: "https://www.shadcnship.com/images/avatars/avatar-3.webp",
      },
      rating: 5,
    },
    {
      type: "image",
      img: "https://www.shadcnship.com/images/avatars/avatar-3.webp",
    },
    {
      type: "text",
      title: "Best Decision We Made!",
      content:
        "Switching to this platform was the best decision for our business. Highly recommend!",
      author: {
        name: "Ryan Carter",
        avatar: "https://www.shadcnship.com/images/avatars/avatar-4.webp",
      },
      rating: 5,
    },
    {
      type: "image",
      img: "https://www.shadcnship.com/images/avatars/avatar-4.webp",
    },
    {
      type: "cta",
      title: "Join Our Community",
      content:
        "Join thousands of happy customers who have transformed their workflow with our product.",
      button: { url: "#", text: "Get Started" },
    },
    {
      type: "text",
      title: "Exceeded Expectations!",
      content:
        "We expected good, but got amazing. The features are exactly what we needed.",
      author: {
        name: "Jasmine Lee",
        avatar: "https://www.shadcnship.com/images/avatars/avatar-5.webp",
      },
      rating: 5,
    },
    {
      type: "image",
      img: "https://www.shadcnship.com/images/avatars/avatar-5.webp",
    },
    {
      type: "text",
      title: "Exceeded Expectations!",
      content:
        "We expected good, but got amazing. The features are exactly what we needed.",
      author: {
        name: "Jasmine Lee",
        avatar: "https://www.shadcnship.com/images/avatars/avatar-6.webp",
      },
      rating: 5,
    },
  ],
  className,
}: Testimonial02Props) => (
  <section
    className={cn(
      "container mx-auto px-8 py-12 md:py-24 lg:min-w-6xl",
      className,
    )}
  >
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
      <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
        {label}
      </p>
      <h2 className="text-4xl font-medium tracking-tight md:text-5xl">
        {title}
      </h2>
      <p className="text-muted-foreground md:text-lg">{description}</p>
    </div>
    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard testimonial={testimonial} key={index} />
      ))}
    </div>
  </section>
);

export default Testimonial02;
