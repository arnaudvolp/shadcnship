"use client";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

type MaskPosition = "top" | "bottom" | "center" | "none";

interface Background05Props {
  className?: string;
  gridSize?: number;
  hoverColor?: string;
  borderColor?: string;
  traceDelay?: number;
  mask?: MaskPosition;
}

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

const Background05 = ({
  className,
  gridSize = 60,
  hoverColor = "var(--accent)",
  borderColor = "var(--border)",
  traceDelay = 200,
  mask = "none",
}: Background05Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState({ cols: 0, rows: 0, cellWidth: 0, cellHeight: 0 });
  const [hoveredCells, setHoveredCells] = useState<Set<number>>(new Set());
  const timeoutsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());
  const maskStyle = getMaskStyle(mask);

  useEffect(() => {
    const updateGrid = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const cols = Math.round(width / gridSize);
      const rows = Math.round(height / gridSize);
      setGrid({
        cols,
        rows,
        cellWidth: width / cols,
        cellHeight: height / rows,
      });
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, [gridSize]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  const handleMouseEnter = useCallback((index: number) => {
    const existingTimeout = timeoutsRef.current.get(index);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      timeoutsRef.current.delete(index);
    }
    setHoveredCells((prev) => new Set(prev).add(index));
  }, []);

  const handleMouseLeave = useCallback(
    (index: number) => {
      const timeout = setTimeout(() => {
        setHoveredCells((prev) => {
          const next = new Set(prev);
          next.delete(index);
          return next;
        });
        timeoutsRef.current.delete(index);
      }, traceDelay);
      timeoutsRef.current.set(index, timeout);
    },
    [traceDelay],
  );

  const totalCells = grid.cols * grid.rows;

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 z-0 h-full w-full overflow-hidden",
        className,
      )}
      style={{
        ...(mask !== "none" && {
          maskImage: maskStyle,
          WebkitMaskImage: maskStyle,
        }),
      }}
    >
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${grid.cols}, ${grid.cellWidth}px)`,
          gridTemplateRows: `repeat(${grid.rows}, ${grid.cellHeight}px)`,
        }}
      >
        {Array.from({ length: totalCells }).map((_, i) => (
          <div
            key={i}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
            className="transition-all duration-300 ease-out z-99 border "
            style={{
              borderRight: `1px solid ${borderColor}`,
              borderBottom: `1px solid ${borderColor}`,
              backgroundColor: hoveredCells.has(i) ? hoverColor : "transparent",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export { Background05 };
