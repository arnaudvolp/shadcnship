"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon, GithubIcon, LogoIcon } from "@/components/social-icons";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm, FieldError, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

interface FormFieldProps {
  id: keyof SignUpFormData;
  label: string;
  type?: string;
  placeholder: string;
  register: UseFormRegister<SignUpFormData>;
  error?: FieldError;
  hint?: string;
  children?: React.ReactNode;
}

const FormField = ({
  id,
  label,
  type = "text",
  placeholder,
  register,
  error,
  hint,
  children,
}: FormFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <div className="relative">
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        aria-invalid={!!error}
        className={children ? "pr-10" : ""}
      />
      {children}
    </div>
    {error ? (
      <p className="text-xs text-destructive">{error.message}</p>
    ) : (
      hint && <p className="text-xs text-muted-foreground">{hint}</p>
    )}
  </div>
);

interface Login01Props {
  logo?: React.ReactNode;
  logoText?: string;
  img?: string;
  tagline?: string;
  title?: string;
  subheading?: string;
  description?: string;
  socialLinks?: { icon: React.ReactNode; href: string; title: string }[];
  onSubmit?: (data: SignUpFormData) => void;
  className?: string;
}

const Login01 = ({
  logo = <LogoIcon className="size-6 invert dark:invert" />,
  logoText = "Shadcnship",
  img = "/images/placeholders/hero-architecture-9.webp",
  tagline = "Convert your ideas into successful business.",
  title = "Sign Up Account",
  subheading = "Get Started",
  description = "Enter your personal data to create your account.",
  socialLinks = [
    {
      icon: <GoogleIcon className="mr-2 size-5" />,
      href: "#",
      title: "Google",
    },
    {
      icon: <GithubIcon className="mr-2 size-5" />,
      href: "#",
      title: "Github",
    },
  ],
  onSubmit,
  className,
}: Login01Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <section className={cn("min-h-screen w-full", className)}>
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side - Gradient */}
        <div
          className={cn(
            "relative hidden flex-col justify-between overflow-hidden p-10 lg:flex",
            "bg-accent text-white",
          )}
        >
          {img && (
            <img
              src={img}
              alt="img"
              className="absolute top-0 right-0 left-0 w-full object-cover"
            ></img>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="relative z-10 flex items-center gap-2">
            {logo}
            <span className="text-lg font-semibold">{logoText}</span>
          </div>
          <div className="relative z-10 max-w-md">
            <p className="mb-2 text-sm text-muted dark:text-muted-foreground">
              {subheading}
            </p>
            <h2 className="text-3xl leading-tight font-medium tracking-tight md:text-4xl">
              {tagline}
            </h2>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-4 flex items-center justify-center gap-2 lg:hidden">
              {logo}
            </div>

            <div className="mb-6 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {description}
              </p>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4">
              {socialLinks.map((link) => (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  key={link.title}
                >
                  {link.icon}
                  {link.title}
                </Button>
              ))}
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-4 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <form
              onSubmit={handleSubmit((data) => onSubmit?.(data))}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  id="firstName"
                  label="First Name"
                  placeholder="ex. John"
                  register={register}
                  error={errors.firstName}
                />
                <FormField
                  id="lastName"
                  label="Last Name"
                  placeholder="ex. Doe"
                  register={register}
                  error={errors.lastName}
                />
              </div>
              <FormField
                id="email"
                label="Email"
                type="email"
                placeholder="ex. john.doe@gmail.com"
                register={register}
                error={errors.email}
              />
              <FormField
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                register={register}
                error={errors.password}
                hint="Must be at least 8 characters."
              >
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </FormField>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a
                href="#"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Login01, signUpSchema, type SignUpFormData };
