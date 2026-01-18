import { FooterLanding } from "@/components/footer-landing";
import { Navbar } from "@/components/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <FooterLanding />
    </>
  );
}
