import { cn } from "@/lib/utils";

type Background06Props = {
  className?: string;
  stripeWidth?: number;
  stripeGap?: number;
  stripeColor?: string;
  angle?: number;
};

const Background06 = ({
  className,
  stripeWidth = 1,
  stripeGap = 12,
  stripeColor = "var(--border)",
  angle = 315,
}: Background06Props) => {
  const total = stripeWidth + stripeGap;
  return (
    <div className={cn("absolute inset-0 z-0 h-full w-full ", className)}>
      <div
        className="absolute inset-0 h-full w-full pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(${angle}deg,transparent,transparent ${stripeGap}px,${stripeColor} ${stripeGap}px,${stripeColor} ${total}px)`,
        }}
      />
    </div>
  );
};

export { Background06 };
