"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  GoogleIcon,
  FacebookIcon,
  AppleIcon,
  LogoIcon,
} from "@/components/social-icons";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registerSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[0-9]/, "Must contain a number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface Register01Props {
  logo?: React.ReactNode;
  heading?: string;
  description?: string;
  socialLinks?: { icon: React.ReactNode; href: string; title: string }[];
  onSubmit?: (data: RegisterFormData) => void;
  termsText?: React.ReactNode;
  loginLink?: { text: string; href: string };
  className?: string;
}

const Register01 = ({
  logo = <LogoIcon className="size-10 dark:invert" />,
  heading = "Create an account",
  description = "Enter your details to get started",
  socialLinks = [
    { icon: <GoogleIcon className="size-5" />, href: "#", title: "Google" },
    { icon: <FacebookIcon className="size-5" />, href: "#", title: "Facebook" },
    { icon: <AppleIcon className="size-5" />, href: "#", title: "Apple" },
  ],
  onSubmit,
  termsText = (
    <>
      By signing up, you agree to our{" "}
      <a
        href="#"
        className="underline underline-offset-4 hover:text-foreground"
      >
        Terms of Service
      </a>{" "}
      and{" "}
      <a
        href="#"
        className="underline underline-offset-4 hover:text-foreground"
      >
        Privacy Policy
      </a>
      .
    </>
  ),
  loginLink = { text: "Already have an account?", href: "#" },
  className,
}: Register01Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const PasswordToggle = ({
    show,
    onToggle,
  }: {
    show: boolean;
    onToggle: () => void;
  }) => (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
    >
      {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
    </button>
  );

  return (
    <section
      className={cn(
        "min-h-screen w-full flex items-center justify-center bg-muted/30 p-4",
        className,
      )}
    >
      <Card className="w-full max-w-md rounded-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">{logo}</div>
          <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => onSubmit?.(data))}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          placeholder="Email"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="pl-10 pr-10"
                          {...field}
                        />
                        <PasswordToggle
                          show={showPassword}
                          onToggle={() => setShowPassword(!showPassword)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          className="pl-10 pr-10"
                          {...field}
                        />
                        <PasswordToggle
                          show={showConfirmPassword}
                          onToggle={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Creating account..."
                  : "Sign Up"}
              </Button>
            </form>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-dashed" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-4 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {socialLinks.map((link) => (
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                key={link.title}
                asChild
              >
                <a href={link.href} aria-label={`Sign up with ${link.title}`}>
                  {link.icon}
                </a>
              </Button>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          {termsText && (
            <p className="text-center text-xs text-muted-foreground">
              {termsText}
            </p>
          )}
          <p className="text-center text-sm text-muted-foreground">
            {loginLink.text}{" "}
            <a
              href={loginLink.href}
              className="font-medium text-foreground hover:underline underline-offset-4"
            >
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export { Register01, registerSchema, type RegisterFormData };
