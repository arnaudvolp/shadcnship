"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, ArrowUpRight } from "lucide-react";

interface Feature07Props {
  tagline?: string;
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
  tagline = "See it in action",
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

  const aspectClass = { video: "aspect-video", wide: "aspect-[21/9]", square: "aspect-square" }[aspectRatio];

  return (
    <section className={cn("container mx-auto px-6 py-12 md:py-24", className)}>
      <div className="mx-auto max-w-5xl text-center">
        {tagline && <p className="text-sm font-medium text-muted-foreground">{tagline}</p>}
        <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">{heading}</h2>
        {description && <p className="mt-4 text-sm md:text-base text-muted-foreground">{description}</p>}
      </div>
      <div className="mx-auto max-w-5xl mt-12">
        <div
          className={cn("relative group rounded-2xl overflow-hidden bg-black shadow-2xl cursor-pointer", aspectClass)}
          onClick={togglePlay}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            poster={thumbnailSrc}
            className="size-full object-cover"
            onEnded={() => { setIsPlaying(false); setShowControls(true); }}
            playsInline
          />
          {(!isPlaying || overlayTitle || overlayDescription) && (
            <div className={cn(
              "absolute inset-0 transition-opacity duration-300 bg-linear-to-t from-black/60 via-transparent to-black/30",
              isPlaying && !overlayTitle && !overlayDescription ? "opacity-0" : "opacity-100"
            )} />
          )}
          {overlayTitle && (
            <div className="absolute top-6 left-6 right-6">
              <p className="text-white text-lg md:text-xl font-medium">{overlayTitle}</p>
            </div>
          )}
          {overlayDescription && (
            <div className="absolute bottom-6 left-6 right-16">
              <p className="text-white/90 text-sm md:text-base">{overlayDescription}</p>
            </div>
          )}
          <div className={cn("absolute inset-0 flex items-center justify-center transition-opacity duration-300", isPlaying && !showControls ? "opacity-0" : "opacity-100")}>
            <button
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className={cn(
                "flex items-center justify-center rounded-full transition-all duration-300 bg-white/95 hover:bg-white hover:scale-110 shadow-lg backdrop-blur-sm",
                isPlaying ? "size-14" : "size-16 md:size-20"
              )}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause className="size-6 md:size-7 text-black fill-black" /> : <Play className="size-7 md:size-8 text-black fill-black ml-1" />}
            </button>
          </div>
          {showArrowButton && (
            <a href={arrowButtonHref} onClick={(e) => e.stopPropagation()} className="absolute bottom-4 right-4 size-10 md:size-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110" aria-label="Learn more">
              <ArrowUpRight className="size-5 md:size-6 text-white" />
            </a>
          )}
          {!isPlaying && (
            <div className="absolute bottom-4 left-4 px-2 py-1 rounded-sm bg-black/60 backdrop-blur-sm">
              <span className="text-xs text-white font-medium">2:45</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Feature07WithOverlay = (props: Omit<Feature07Props, "overlayTitle" | "overlayDescription" | "showArrowButton">) => (
  <Feature07 {...props} overlayTitle="Quality candidates, faster" overlayDescription="Match with expert recruiters and fill your hardest roles in record time." showArrowButton tagline="" heading="" description="" />
);

const Feature07Minimal = (props: Omit<Feature07Props, "tagline" | "heading" | "description">) => (
  <Feature07 {...props} tagline="" heading="" description="" />
);

export { Feature07, Feature07WithOverlay, Feature07Minimal };
