import { FooterLanding } from "@/components/landing/footer-landing";
import { Navbar } from "@/components/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar/>
      {children}
      <FooterLanding />
    </>
  );
}
