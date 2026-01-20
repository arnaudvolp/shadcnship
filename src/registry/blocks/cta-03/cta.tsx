import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Cta03Props {
  heading?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

const Cta03 = ({
  heading = "Stay Updated",
  description = "Subscribe to get the latest blocks, updates, and tips directly in your inbox.",
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  className,
}: Cta03Props) => (
  <section className={cn("container max-w-7xl mx-auto py-12 md:py-24", className)}>
    <div className="px-6 md:px-12">
      <div className="grid items-center gap-8 rounded-md bg-primary p-8 text-primary-foreground lg:grid-cols-2 md:p-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            {heading}
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="space-y-2">
          <div className="flex gap-4 flex-col lg:flex-row">
            <Input
              type="email"
              placeholder={placeholder}
              className="flex-1 border-0 bg-primary-foreground/10 placeholder:text-primary-foreground/50 py-4"
            />
            <Button variant="secondary" size="lg" className="py-4">
              {buttonText}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            By subscribing you agree to our{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
);

export { Cta03 };
