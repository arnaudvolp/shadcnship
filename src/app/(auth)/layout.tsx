/**
 * Auth Layout
 *
 * Minimal layout for authentication pages.
 * Does not include main navigation to keep auth pages clean.
 */

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
