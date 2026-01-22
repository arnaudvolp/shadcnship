import { cn } from "@/lib/utils";

type MaskPosition = "top" | "bottom" | "center" | "none";

type Background03Props = {
  className?: string;
  lineColor?: string;
  lineWidth?: number;
  spacing?: number;
  angle?: number;
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

const Background03 = ({
  className,
  lineColor = "var(--border)",
  lineWidth = 1,
  spacing = 24,
  angle = 135,
  mask = "none",
}: Background03Props) => {
  const maskStyle = getMaskStyle(mask);

  return (
    <div className={cn("absolute inset-0 z-0 h-full w-full", className)}>
      <div
        className="absolute inset-0 h-full w-full pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(${angle}deg, ${lineColor} 0px ${lineWidth}px, transparent ${lineWidth}px ${spacing}px)`,
          ...(mask !== "none" && {
            maskImage: maskStyle,
            WebkitMaskImage: maskStyle,
          }),
        }}
      />
    </div>
  );
};

export { Background03 };
