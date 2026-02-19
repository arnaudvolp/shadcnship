import { cn } from "@/lib/utils";
import { IterationCw, Handshake, FolderCog, UserRoundPlus } from "lucide-react";

interface Step {
  step: number;
  title: string;
  description: string;
  image?: string;
  icon?: React.ReactNode;
}

interface Feature06Props {
  tagline?: string;
  heading?: string;
  description?: string;
  steps?: Step[];
  className?: string;
}

const StepCard = ({ step, index, total }: { step: Step; index: number; total: number }) => {
  const isLast = index === total - 1;
  const isLeftColumnMd = index % 2 === 0;
  const isTopRowMd = index < 2;

  return (
    <div
      className={cn(
        "relative flex flex-col p-4 h-full",
        !isLast && "border-b md:border-b-0",
        isLeftColumnMd && !isLast && "md:border-r lg:border-r-0",
        isTopRowMd && "md:border-b lg:border-b-0",
        !isLast && "lg:border-r",
      )}
    >
      <div className="relative flex items-center mb-4">
        <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full border bg-background z-10">
          Step {step.step}
        </span>
      </div>
      <div className="space-y-3 flex-1">
        <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
      </div>
      <div className="aspect-video w-full rounded-xl bg-muted overflow-hidden mt-4">
        {step.image ? (
          <img src={step.image} alt={step.title} className="size-full object-cover" />
        ) : (
          <div className="size-full flex items-center justify-center">
            {step.icon ? (
              <div className="text-primary">{step.icon}</div>
            ) : (
              <div className="size-16 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                <span className="text-2xl font-semibold text-muted-foreground/40">{step.step}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Feature06 = ({
  tagline = "How it works",
  heading = "Work normally. We handle the rest.",
  description = "Get started in minutes with our simple 4-step process. No complex setup required.",
  steps = [
    { step: 1, title: "Create your account", description: "Sign up in seconds with your email or connect with your favorite tools. No credit card required to get started.", icon: <UserRoundPlus className="size-16" strokeWidth={1} /> },
    { step: 2, title: "Configure your workspace", description: "Set up your workspace with our intuitive dashboard. Import existing data or start fresh with our templates.", icon: <FolderCog className="size-16" strokeWidth={1} /> },
    { step: 3, title: "Invite your team", description: "Collaborate seamlessly by inviting team members. Set permissions and roles to keep everyone aligned.", icon: <Handshake className="size-16" strokeWidth={1} /> },
    { step: 4, title: "Launch and iterate", description: "Go live with confidence. Monitor performance with built-in analytics and optimize as you grow.", icon: <IterationCw className="size-16" strokeWidth={1} /> },
  ],
  className,
}: Feature06Props) => (
  <section className={cn("container mx-auto px-2 py-12 md:py-24", className)}>
    <div className="mx-auto text-center">
      <p className="text-sm font-medium text-muted-foreground">{tagline}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">{heading}</h2>
      {description && <p className="mt-4 text-muted-foreground">{description}</p>}
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 border rounded-sm mt-12">
      {steps.map((step, index) => (
        <StepCard key={step.step} step={step} index={index} total={steps.length} />
      ))}
    </div>
  </section>
);

export { Feature06 };
