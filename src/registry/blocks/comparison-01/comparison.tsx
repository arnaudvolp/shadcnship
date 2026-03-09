import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { LogoIcon } from "@/registry/blocks/social-icons/icons";

type FeatureValue =
  | string
  | boolean
  | { type: "colors"; values: string[] }
  | { type: "percentage"; value: number };

interface Product {
  name: string;
  img?: string;
  icon?: React.ReactNode;
  featured?: boolean;
}
interface Feature {
  name: string;
  values: FeatureValue[];
}
interface Comparison01Props {
  label?: string;
  title?: string;
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
  label = "Why choose us",
  title = "Not all creams are created equal",
  description = "See how our formula compares to the competition.",
  products = [
    {
      name: "Basic Cream",
      img: "/images/placeholders/product-design-1.webp",
    },
    {
      name: "Lumière Pro",
      featured: true,
      img: "/images/placeholders/product-design-2.webp",
    },
    {
      name: "Other Brands",
      img: "/images/placeholders/product-design-3.webp",
    },
  ],
  features = [
    { name: "Hydration duration", values: ["4 hours", "72 hours", "8 hours"] },
    { name: "Dermatologist tested", values: [false, true, false] },
    { name: "Fragrance-free", values: [false, true, false] },
    { name: "For sensitive skin", values: [false, true, "Partial"] },
    { name: "SPF protection", values: [false, true, false] },
    { name: "Natural ingredients", values: ["Partial", true, false] },
    { name: "Vegan & cruelty-free", values: [false, true, false] },
    { name: "Price", values: ["$12", "$48", "$65"] },
  ],
  className,
}: Comparison01Props) => {
  const gridStyle = {
    gridTemplateColumns: `180px repeat(${products.length}, 1fr)`,
  };

  return (
    <section className={cn("container mx-auto px-8 py-12 md:py-24", className)}>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
        {label && (
          <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
            {label}
          </p>
        )}
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground md:text-lg">{description}</p>
        )}
      </div>
      <div className="mx-auto mt-12 max-w-5xl overflow-x-auto">
        <div className="flex min-w-[640px] flex-col gap-1">
          <div className="grid" style={gridStyle}>
            <div className="p-4" />
            {products.map((product, idx) => (
              <div key={idx} className="p-2">
                <div
                  className={cn(
                    "overflow-hidden rounded-md",
                    product.featured
                      ? "bg-foreground text-background"
                      : "bg-muted",
                  )}
                >
                  <div className="aspect-square w-full overflow-hidden">
                    {product.img ? (
                      <img
                        src={product.img}
                        alt={product.name}
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-muted-foreground/10">
                        {product.icon ?? (
                          <span className="text-4xl font-light text-muted-foreground/30">
                            {idx + 1}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {features.map((feature, featureIdx) => (
            <div
              key={featureIdx}
              className="grid items-center"
              style={gridStyle}
            >
              <div className="p-4 pr-6">
                <span className="line-clamp-2 text-sm font-medium text-muted-foreground">
                  {feature.name}
                </span>
              </div>
              {feature.values.map((value, valueIdx) => (
                <div
                  key={valueIdx}
                  className={cn(
                    "mx-2 flex h-full items-center justify-center rounded-md p-4",
                    products[valueIdx]?.featured &&
                      "bg-foreground/5 px-4 first:rounded-t-xl last:rounded-b-xl",
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
