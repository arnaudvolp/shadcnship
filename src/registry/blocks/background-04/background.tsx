import { cn } from "@/lib/utils";

type MaskPosition = "top" | "bottom" | "center" | "none";

type Background04Props = {
  className?: string;
  lineCount?: number;
  lineWidth?: number;
  lineColor?: string;
  gap?: number;
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

const Background04 = ({
  className,
  lineCount = 12,
  lineWidth = 1,
  lineColor = "var(--border)",
  gap = 0,
  mask = "none",
}: Background04Props) => {
  const maskStyle = getMaskStyle(mask);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className
      )}
      style={
        mask !== "none"
          ? {
              maskImage: maskStyle,
              WebkitMaskImage: maskStyle,
            }
          : undefined
      }
    >
      <div
        className="flex size-full items-stretch justify-between"
        style={{ padding: gap ? `0 ${gap}px` : undefined }}
      >
        {Array.from({ length: lineCount }).map((_, i) => (
          <div
            key={i}
            style={{
              width: `${lineWidth}px`,
              backgroundColor: lineColor,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export { Background04 };
