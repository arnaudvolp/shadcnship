import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Mail, Send } from "lucide-react";

interface ContactInfo {
  icon: React.ReactNode;
  value: string;
}

interface Contact01Props {
  heading?: string;
  description?: string;
  contactInfo?: ContactInfo[];
  className?: string;
}

const Contact01 = ({
  heading = "Get in Touch",
  description = "Have questions about our components? Want to collaborate? We'd love to hear from you.",
  contactInfo = [
    { icon: <Phone className="size-4" />, value: "+1 (555) 123-4567" },
    { icon: <Mail className="size-4" />, value: "hello@example.com" },
  ],
  className,
}: Contact01Props) => {
  return (
    <section className={cn("py-12 md:py-24", className)}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              {heading}
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">{description}</p>
            <div className="mt-8 flex flex-wrap gap-6">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {info.icon}
                  </div>
                  <span className="text-sm font-medium">{info.value}</span>
                </div>
              ))}
            </div>
          </div>
          <Card className="p-8">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label>Your Name</Label>
                <Input placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label>Your Email</Label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Input placeholder="How can we help?" />
              </div>
              <Button size="lg" className="w-full">
                <Send className="size-4" />
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export { Contact01 };
