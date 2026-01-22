import { cn } from "@/lib/utils";

type MaskPosition = "top" | "bottom" | "center" | "none";

type Background02Props = {
  className?: string;
  dotColor?: string;
  dotSize?: number;
  spacingX?: number;
  spacingY?: number;
  mask?: MaskPosition;
};

const getMaskStyle = (mask: MaskPosition): string => {
  switch (mask) {
    case "top":
      return "radial-gradient(ellipse 60% 50% at 50% 0%, transparent 40%, #000 110%)";
    case "bottom":
      return "radial-gradient(ellipse 60% 50% at 50% 100%, transparent 40%, #000 110%)";
    case "center":
      return "radial-gradient(ellipse 50% 50% at 50% 50%, transparent 20%, #000 70%)";
    case "none":
    default:
      return "none";
  }
};

const Background02 = ({
  className,
  dotColor = "var(--border)",
  dotSize = 1,
  spacingX = 16,
  spacingY = 16,
  mask = "none",
}: Background02Props) => {
  const maskStyle = getMaskStyle(mask);

  return (
    <div className={cn("absolute inset-0 z-0 h-full w-full", className)}>
      <div
        className="absolute inset-0 h-full w-full pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${spacingX}px ${spacingY}px`,
          ...(mask !== "none" && {
            maskImage: maskStyle,
            WebkitMaskImage: maskStyle,
          }),
        }}
      />
    </div>
  );
};

export { Background02 };
