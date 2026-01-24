import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { QuoteIcon } from "@/components/social-icons";

interface Testimonial {
  type: "text" | "image" | "cta";
  image?: string;
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
  tagline?: string;
  heading?: string;
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
      <Card className="bg-primary text-primary-foreground h-full shadow-none ">
        <CardContent className="flex h-full flex-col p-6">
          <h3 className="text-xl font-semibold">{testimonial.title}</h3>
          <p className="mt-2 flex-1 text-sm opacity-90">
            {testimonial.content}
          </p>
          <Button variant="secondary" className="mt-4 w-full" asChild>
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
      <Card className="h-full shadow-none py-0">
        <div className="aspect-3/4 w-full overflow-hidden rounded-xl bg-muted h-full">
          {testimonial.image && (
            <img
              src={testimonial.image}
              alt=""
              className="size-full object-cover aspect-3/4 h-full"
            />
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full shadow-none p-4">
      <CardContent className="flex h-full flex-col justify-between gap-12 p-0 ">
        <div className="space-y-2">
          <QuoteIcon className="size-4 dark:invert" />
          {testimonial.title && (
            <h4 className="text-2xl leading-tight">{testimonial.title}</h4>
          )}
        </div>
        <div>
          {testimonial.content && (
            <p className="mt-3 flex-1  text-muted-foreground">
              {testimonial.content}
            </p>
          )}
          {testimonial.author && (
            <div className="mt-4 flex items-center gap-3">
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
  tagline = "Testimonials",
  heading = "Wall of Love",
  description = "See what our customers are saying about their experience with our product.",
  testimonials = [
    {
      type: "image",
      //image: "https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg",
    },
    {
      type: "text",
      title: "Game Changer for Our Team!",
      content:
        "Daily support, tailored insights-Halse revolutionized my well-being. A most-have for a healthier life!",
      author: {
        name: "Emma Thompson",
        avatar:
          "https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg",
      },
      rating: 5,
    },
    {
      type: "image",
      //  image: "https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg",
    },
    {
      type: "text",
      title: "Incredible Support!",
      content:
        "The customer support team is exceptional. They helped us get set up quickly and answered all our questions.",
      author: {
        name: "Emily Johnson",
        avatar:
          "https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg",
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
        avatar:
          "https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg",
      },
      rating: 5,
    },
    {
      type: "image",
      // image:  "https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg",
    },
    {
      type: "text",
      title: "Best Decision We Made!",
      content:
        "Switching to this platform was the best decision for our business. Highly recommend!",
      author: {
        name: "Ryan Carter",
        avatar:
          "https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg",
      },
      rating: 5,
    },
    {
      type: "image",
      // image: "https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg",
    },
    {
      type: "cta",
      title: "Join Our Community",
      content:
        "Join thousands of happy customers who have transformed their workflow with our product.",
      button: {
        url: "#",
        text: "Get Started",
      },
    },
    {
      type: "text",
      title: "Exceeded Expectations!",
      content:
        "We expected good, but got amazing. The features are exactly what we needed.",
      author: {
        name: "Jasmine Lee",
        avatar:
          "https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg",
      },
      rating: 5,
    },
    {
      type: "image",
      // image:        "https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg",
    },
    {
      type: "text",
      title: "Exceeded Expectations!",
      content:
        "We expected good, but got amazing. The features are exactly what we needed.",
      author: {
        name: "Jasmine Lee",
        avatar:
          "https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg",
      },
      rating: 5,
    },
  ],
  className,
}: Testimonial02Props) => {
  return (
    <section
      className={cn(
        "container mx-auto px-6 py-12 md:py-24 lg:min-w-6xl",
        className,
      )}
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium">{tagline}</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          {heading}
        </h2>
        <p className="mt-4 text-muted-foreground">{description}</p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/*ctaCard && <CTACardComponent cta={ctaCard} />*/}
        {testimonials.map((testimonial, index) => (
          <TestimonialCard testimonial={testimonial} key={index} />
        ))}
      </div>
    </section>
  );
};

export { Testimonial02 };
