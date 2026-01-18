import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TestimonialItem {
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

interface Testimonial01Props {
  heading?: string;
  description?: string;
  testimonials?: TestimonialItem[];
  className?: string;
}

const testimonials: TestimonialItem[] = [
  {
    name: "Alex Chen",
    role: "Frontend Developer",
    content:
      "These components saved me weeks of development time. Copy, paste, customize—it's that simple!",
  },
  {
    name: "Sarah Johnson",
    role: "UI/UX Designer",
    content:
      "The components are beautifully designed and fully customizable. Perfect for rapid prototyping and production.",
  },
  {
    name: "Michael Rodriguez",
    role: "Full-Stack Engineer",
    content:
      "TypeScript support and accessibility built-in? This is exactly what I need to ship faster without compromising quality.",
  },
  {
    name: "Emily Watson",
    role: "Product Manager",
    content:
      "Our team's velocity increased significantly. We're shipping features faster than ever with these reusable components.",
  },
  {
    name: "David Kim",
    role: "Senior Developer",
    content:
      "Zero dependencies, fully typed, and production-ready. This is how component libraries should be built.",
  },
  {
    name: "Lisa Anderson",
    role: "Tech Lead",
    content:
      "The best part? Everything is customizable with Tailwind. No fighting with CSS frameworks or complex overrides.",
  },
];

const TestimonialCard = ({ name, role, content, avatar }: TestimonialItem) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="w-80 p-6 gap-4">
      <div className="flex items-center gap-2">
        <Avatar className="size-10 bg-primary text-primary-foreground">
          {avatar ? (
            <img src={avatar} alt={name} className="size-full object-cover" />
          ) : (
            <AvatarFallback className="bg-primary text-primary-foreground font-medium">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      <p className="pl-1 text-sm text-muted-foreground">{content}</p>
    </Card>
  );
};

const Testimonial01 = ({
  heading = "Loved by Developers",
  description = "See what developers are saying about building faster with our components",
  testimonials: items = testimonials,
  className,
}: Testimonial01Props) => {
  const firstRow = items.slice(0, Math.ceil(items.length / 2));
  const secondRow = items.slice(Math.ceil(items.length / 2));

  return (
    <section className={cn("py-12 md:py-24", className)}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mx-auto text-center">
          <h2 className=" text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            {heading}
          </h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </div>
      <div className="relative flex flex-col overflow-hidden mt-8">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-linear-to-r from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-linear-to-l from-background" />
      </div>
    </section>
  );
};

export { Testimonial01 };
