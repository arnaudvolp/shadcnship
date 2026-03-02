import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

type FeatureValue =
  | string
  | boolean
  | { type: "colors"; values: string[] }
  | { type: "percentage"; value: number };

interface Product {
  name: string;
  image?: string;
  featured?: boolean;
}
interface Feature {
  name: string;
  values: FeatureValue[];
}
interface Comparison01Props {
  label?: string;
  heading?: string;
  description?: string;
  products?: Product[];
  features?: Feature[];
  className?: string;
}

const FeatureValueCell = ({ value }: { value: FeatureValue }) => {
  if (typeof value === "boolean")
    return value ? (
      <Check className="size-5 text-foreground" />
    ) : (
      <X className="size-5 text-muted-foreground/40" />
    );
  if (typeof value === "object" && value.type === "colors")
    return (
      <div className="flex items-center gap-1.5">
        {value.values.map((color, i) => (
          <div
            key={i}
            className="size-5 rounded-full border border-border"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    );
  if (typeof value === "object" && value.type === "percentage")
    return <span className="text-sm">{value.value}%</span>;
  return <span className="text-sm">{value}</span>;
};

const Comparison01 = ({
  label = "Compare",
  heading = "Find your perfect home",
  description = "Compare our apartments side by side to find the one that best suits your lifestyle.",
  products = [
    { name: "Studio", image: "https://www.shadcnship.com/images/image-preview.webp" },
    {
      name: "2-Bedroom",
      image: "https://www.shadcnship.com/images/image-preview.webp",
      featured: true,
    },
    { name: "Penthouse", image: "https://www.shadcnship.com/images/image-preview.webp" },
  ],
  features = [
    { name: "Type", values: ["Studio", "2-Bedroom Apartment", "Penthouse Suite"] },
    { name: "Surface", values: ["35 m²", "75 m²", "150 m²"] },
    { name: "Bedrooms", values: ["1", "2", "4"] },
    { name: "Bathrooms", values: ["1", "2", "3"] },
    { name: "Balcony", values: [false, true, true] },
    { name: "Parking", values: [false, true, true] },
    { name: "Floor", values: ["Ground", "3rd - 8th", "Top Floor"] },
    { name: "View", values: ["Courtyard", "City View", "Panoramic"] },
    { name: "Price", values: ["$1,200/mo", "$2,400/mo", "$5,500/mo"] },
    {
      name: "Finishes",
      values: [
        { type: "colors", values: ["#f5f5f5", "#d4d4d4"] },
        { type: "colors", values: ["#f5f5f5", "#a3a3a3", "#78716c"] },
        { type: "colors", values: ["#1f2937", "#78716c", "#f5f5f5"] },
      ],
    },
  ],
  className,
}: Comparison01Props) => {
  const gridStyle = { gridTemplateColumns: `180px repeat(${products.length}, 1fr)` };

  return (
    <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
        {label && (
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
        )}
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
          {heading}
        </h2>
        {description && <p className="text-muted-foreground md:text-lg">{description}</p>}
      </div>
      <div className="mx-auto mt-12 max-w-5xl overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="grid" style={gridStyle}>
            <div className="p-4" />
            {products.map((product, idx) => (
              <div key={idx} className="p-2">
                <div
                  className={cn(
                    "overflow-hidden rounded-md",
                    product.featured ? "bg-foreground text-background" : "bg-muted",
                  )}
                >
                  <div className="aspect-3/4 w-full overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-muted-foreground/10">
                        <span className="text-4xl font-light text-muted-foreground/30">
                          {idx + 1}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {features.map((feature, featureIdx) => (
            <div key={featureIdx} className="grid items-center" style={gridStyle}>
              <div className="p-4 pr-6">
                <span className="text-sm font-medium text-muted-foreground">
                  {feature.name}
                </span>
              </div>
              {feature.values.map((value, valueIdx) => (
                <div
                  key={valueIdx}
                  className={cn(
                    "flex justify-center p-4",
                    products[valueIdx]?.featured &&
                      "bg-foreground/5 first:rounded-t-xl last:rounded-b-xl",
                  )}
                >
                  <FeatureValueCell value={value} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Comparison01 };
