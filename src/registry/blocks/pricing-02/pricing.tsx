import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Plan {
  name: string;
  price: string;
  popular?: boolean;
}

interface FeatureItem {
  name: string;
  values: (string | boolean)[];
}

interface Pricing02Props {
  title?: string;
  description?: string;
  plans?: Plan[];
  features?: FeatureItem[];
  className?: string;
}

const Pricing02 = ({
  title = "Compare Plans",
  description = "Choose the plan that fits your needs.",
  plans = [
    { name: "Basic", price: "$29" },
    { name: "Standard", price: "$59" },
    { name: "Pro", price: "$99", popular: true },
    { name: "Enterprise", price: "$199" },
  ],
  features = [
    { name: "Components", values: ["50+", "100+", "200+", "Unlimited"] },
    { name: "Templates", values: ["5", "15", "50", "Unlimited"] },
    {
      name: "Support",
      values: ["Community", "Email", "Priority", "Dedicated"],
    },
    { name: "Updates", values: [true, true, true, true] },
    { name: "Custom branding", values: [false, true, true, true] },
    { name: "API access", values: [false, false, true, true] },
  ],
  className,
}: Pricing02Props) => (
  <section className={cn("container mx-auto py-12 md:py-24", className)}>
    <div className="px-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <h2 className="text-4xl leading-tight font-medium tracking-tight md:text-5xl">
          {title}
        </h2>
        <p className="text-muted-foreground md:text-lg">{description}</p>
      </div>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr>
              <th className="p-4" />
              {plans.map((plan, i) => (
                <th
                  key={i}
                  className={cn(
                    "p-6 text-center",
                    plan.popular &&
                      "rounded-t-md bg-primary text-primary-foreground",
                  )}
                >
                  <div className="text-sm font-medium">{plan.name}</div>
                  <div className="text-3xl font-medium">{plan.price}</div>
                  <div className="text-sm opacity-80">Per month</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, i) => (
              <tr key={i} className="border-b">
                <td className="p-4 font-medium">{feature.name}</td>
                {feature.values.map((value, j) => (
                  <td
                    key={j}
                    className={cn(
                      "p-4 text-center",
                      plans[j]?.popular && "bg-primary/5",
                    )}
                  >
                    {value === true ? (
                      <Check className="mx-auto size-5" />
                    ) : value === false ? (
                      <span className="text-muted-foreground">-</span>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="p-4" />
              {plans.map((plan, i) => (
                <td
                  key={i}
                  className={cn(
                    "p-4 text-center",
                    plan.popular && "rounded-b-md bg-primary/5",
                  )}
                >
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

export { Pricing02 };
