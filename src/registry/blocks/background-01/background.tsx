import { cn } from "@/lib/utils";

type MaskPosition = "top" | "bottom" | "center" | "none";

type Background01Props = {
  className?: string;
  lineColor?: string;
  gridSizeX?: number;
  gridSizeY?: number;
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

const Background01 = ({
  className,
  lineColor = "var(--border)",
  gridSizeX = 20,
  gridSizeY = 20,
  mask = "none",
}: Background01Props) => {
  const maskStyle = getMaskStyle(mask);

  return (
    <div className={cn("absolute inset-0 z-0 h-full w-full", className)}>
      <div
        className="absolute inset-0 h-full w-full pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, ${lineColor} 1px, transparent 1px), linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`,
          backgroundSize: `${gridSizeX}px ${gridSizeY}px`,
          ...(mask !== "none" && {
            maskImage: maskStyle,
            WebkitMaskImage: maskStyle,
          }),
        }}
      />
    </div>
  );
};

export { Background01 };
