import { cn } from "@/lib/utils";
import { IterationCw, Handshake, FolderCog, UserRoundPlus } from "lucide-react";

interface StepItem {
  step: number;
  title: string;
  description: string;
  img?: string;
  icon?: React.ReactNode;
}

interface Feature06Props {
  label?: string;
  title?: string;
  description?: string;
  steps?: StepItem[];
  className?: string;
}

const StepCard = ({
  step,
  index,
  total,
}: {
  step: StepItem;
  index: number;
  total: number;
}) => {
  const isLast = index === total - 1;
  const isLeftColumnMd = index % 2 === 0;
  const isTopRowMd = index < 2;

  return (
    <div
      className={cn(
        "relative flex h-full flex-col gap-4 p-4",
        !isLast && "border-b md:border-b-0",
        isLeftColumnMd && !isLast && "md:border-r lg:border-r-0",
        isTopRowMd && "md:border-b lg:border-b-0",
        !isLast && "lg:border-r",
      )}
    >
      <span className="inline-flex w-fit items-center justify-center rounded-full border bg-background px-4 py-1 text-sm font-medium">
        Step {step.step}
      </span>
      <div className="flex flex-1 flex-col gap-4">
        <h3 className="text-xl font-medium tracking-tight">{step.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </div>
      <div className="mt-4 aspect-video w-full overflow-hidden rounded-md bg-muted">
        {step.img ? (
          <img
            src={step.img}
            alt={step.title}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            {step.icon ? (
              <div className="text-primary">{step.icon}</div>
            ) : (
              <div className="flex size-16 items-center justify-center rounded-full bg-muted-foreground/10">
                <span className="text-2xl font-medium text-muted-foreground/40">
                  {step.step}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Feature06 = ({
  label = "How it works",
  title = "Work normally. We handle the rest.",
  description = "Get started in minutes with our simple 4-step process. No complex setup required.",
  steps = [
    {
      step: 1,
      title: "Create your account",
      description:
        "Sign up in seconds with your email or connect with your favorite tools. No credit card required to get started.",
      icon: <UserRoundPlus className="size-16" strokeWidth={1} />,
    },
    {
      step: 2,
      title: "Configure your workspace",
      description:
        "Set up your workspace with our intuitive dashboard. Import existing data or start fresh with our templates.",
      icon: <FolderCog className="size-16" strokeWidth={1} />,
    },
    {
      step: 3,
      title: "Invite your team",
      description:
        "Collaborate seamlessly by inviting team members. Set permissions and roles to keep everyone aligned.",
      icon: <Handshake className="size-16" strokeWidth={1} />,
    },
    {
      step: 4,
      title: "Launch and iterate",
      description:
        "Go live with confidence. Monitor performance with built-in analytics and optimize as you grow.",
      icon: <IterationCw className="size-16" strokeWidth={1} />,
    },
  ],
  className,
}: Feature06Props) => (
  <section className={cn("container mx-auto px-4 py-12 md:py-24", className)}>
    <div className="mx-auto flex flex-col items-center gap-4 text-center">
      <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
        {label}
      </p>
      <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </div>
    <div className="mt-12 grid rounded-sm border md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <StepCard
          key={step.step}
          step={step}
          index={index}
          total={steps.length}
        />
      ))}
    </div>
  </section>
);

export { Feature06 };
