"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, ArrowUpRight } from "lucide-react";

interface Feature07Props {
  label?: string;
  heading?: string;
  description?: string;
  videoSrc?: string;
  thumbnailSrc?: string;
  overlayTitle?: string;
  overlayDescription?: string;
  showArrowButton?: boolean;
  arrowButtonHref?: string;
  aspectRatio?: "video" | "wide" | "square";
  className?: string;
}

const Feature07 = ({
  label = "See it in action",
  heading = "A demo is worth a thousand words",
  description = "Watch how our platform transforms the way teams work together. No complex setup, just results.",
  videoSrc = "https://videos.pexels.com/video-files/8005482/8005482-uhd_2560_1440_25fps.mp4",
  thumbnailSrc = "https://www.apple.com/v/airpods-max/j/images/overview/bento/blue/bento_1_airpod_max_blue__blqgkfdancya_xlarge_2x.jpg",
  overlayTitle,
  overlayDescription,
  showArrowButton = false,
  arrowButtonHref = "#",
  aspectRatio = "video",
  className,
}: Feature07Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const aspectClass = {
    video: "aspect-video",
    wide: "aspect-[21/9]",
    square: "aspect-square",
  }[aspectRatio];

  return (
    <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
        {label && (
          <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
            {label}
          </p>
        )}
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
          {heading}
        </h2>
        {description && (
          <p className="text-muted-foreground md:text-lg">{description}</p>
        )}
      </div>

      <div className="mx-auto mt-12 max-w-5xl">
        <div
          className={cn(
            "group relative cursor-pointer overflow-hidden rounded-2xl bg-black shadow-2xl",
            aspectClass,
          )}
          onClick={togglePlay}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            poster={thumbnailSrc}
            className="size-full object-cover"
            onEnded={() => {
              setIsPlaying(false);
              setShowControls(true);
            }}
            playsInline
          />
          {(!isPlaying || overlayTitle || overlayDescription) && (
            <div
              className={cn(
                "absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/30 transition-opacity duration-300",
                isPlaying && !overlayTitle && !overlayDescription
                  ? "opacity-0"
                  : "opacity-100",
              )}
            />
          )}
          {overlayTitle && (
            <div className="absolute top-6 right-6 left-6">
              <p className="text-lg font-medium text-white md:text-xl">
                {overlayTitle}
              </p>
            </div>
          )}
          {overlayDescription && (
            <div className="absolute right-16 bottom-6 left-6">
              <p className="text-sm text-white/90 md:text-base">
                {overlayDescription}
              </p>
            </div>
          )}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
              isPlaying && !showControls ? "opacity-0" : "opacity-100",
            )}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className={cn(
                "flex items-center justify-center rounded-full bg-white/95 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white",
                isPlaying ? "size-14" : "size-16 md:size-20",
              )}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <Pause className="size-6 fill-black text-black md:size-7" />
              ) : (
                <Play className="ml-1 size-7 fill-black text-black md:size-8" />
              )}
            </button>
          </div>
          {showArrowButton && (
            <a
              href={arrowButtonHref}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-4 bottom-4 flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/30 md:size-12"
              aria-label="Learn more"
            >
              <ArrowUpRight className="size-5 text-white md:size-6" />
            </a>
          )}
          {!isPlaying && (
            <div className="absolute bottom-4 left-4 rounded-sm bg-black/60 px-2 py-1 backdrop-blur-sm">
              <span className="text-xs font-medium text-white">2:45</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Feature07WithOverlay = (
  props: Omit<
    Feature07Props,
    "overlayTitle" | "overlayDescription" | "showArrowButton"
  >,
) => (
  <Feature07
    {...props}
    overlayTitle="Quality candidates, faster"
    overlayDescription="Match with expert recruiters and fill your hardest roles in record time."
    showArrowButton
    label=""
    heading=""
    description=""
  />
);

const Feature07Minimal = (
  props: Omit<Feature07Props, "label" | "heading" | "description">,
) => <Feature07 {...props} label="" heading="" description="" />;

export { Feature07, Feature07WithOverlay, Feature07Minimal };
