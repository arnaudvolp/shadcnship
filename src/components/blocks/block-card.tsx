import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SerializableRegistryBlock } from "@/types/blocks";

interface BlockCardProps {
  block: SerializableRegistryBlock;
}

export function BlockCard({ block }: BlockCardProps) {
  const cardContent = (
    <>
      {/* Preview Area */}
      <div className="relative w-full overflow-hidden bg-background">
        <div className="relative aspect-video w-full">
          {block.image ? (
            <Image
              src={block.image}
              alt={block.title}
              fill
              className="object-cover object-center"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted/20">
              <div className="text-center">
                <div className="mb-2 text-4xl">
                  {block.categories[0]?.icon || "📦"}
                </div>
                <p className="text-muted-foreground text-xs">{block.title}</p>
              </div>
            </div>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 border-t border-border bg-background p-4 opacity-0 transition-opacity group-hover:opacity-100">
          <p className="text-muted-foreground">{block.title}</p>
          <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </div>
    </>
  );

  return (
    <Link href={`/blocks/${block.name}`} className="block">
      <Card className="group cursor-pointer overflow-hidden shadow-none p-0 transition-all hover:shadow-lg">
        <CardContent className="p-0">{cardContent}</CardContent>
      </Card>
    </Link>
  );
}
