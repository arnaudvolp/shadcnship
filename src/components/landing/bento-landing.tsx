"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Separator } from "@radix-ui/react-separator";

const BentoLanding = () => {
  return (
    <section className="">
      <Separator className="absolute right-0 left-0 w-full border-t border-border z-99" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="container relative text-center items-center justify-center py-8  border-x border-border space-y-4"
      >
        <h2 className="text-2xl md:text-5xl font-bold">
          Discovers ours blocks
        </h2>
        <p className="text-muted-foreground">
          Production-ready components for your landing pages. One command to
          install.
        </p>
      </motion.div>
      <Separator className="absolute right-0 left-0 w-full border-t border-border z-99" />

      {/* Bento Grid - Extended Layout with lines */}
      <div className=" container grid p-0 h-auto min-h-[800px] md:min-h-[1200px] lg:min-h-[1400px] grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-auto 2xl:grid-rows-15  gap-0 border-x border-border  ">
        {/* Hero Preview - Large Top Left */}
        <Link
          href="/blocks/hero-02"
          className="group relative col-span-4 md:col-span-4 lg:col-span-4 2xl:col-span-4 row-span-6 md:row-span-4 lg:row-span-6 2xl:row-span-6 6xl:row-span-6 min-h-[250px] md:min-h-0 overflow-hidden md:border-r border-b border-border bg-card transition-colors hover:bg-accent/5"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 p-4 md:p-0"
          >
            <div className="relative h-full w-full overflow-hiddenbg-muted">
              <img
                src="/r/previews/hero-02.webp"
                alt="Hero"
                className="size-full object-contain bg-white transition-transform duration-500 group-hover:scale-105 dark:invert"
              />
            </div>
          </motion.div>
        </Link>

        {/* Pricing Preview - Top */}
        <Link
          href="/blocks/pricing-01"
          className="group relative col-span-4 md:col-span-4 lg:col-span-4 2xl:col-span-4 row-span-6 md:row-span-4 lg:row-span-3 2xl:row-span-3 min-h-[250px] md:min-h-0 overflow-hidden lg:border-r border-b border-border bg-card transition-colors hover:bg-accent/5"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 p-4 md:p-0"
          >
            <div className="relative h-full w-full overflow-hidden bg-muted">
              <img
                src="/r/previews/pricing-01.webp"
                alt="Pricing"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105 dark:invert"
              />
            </div>
          </motion.div>
        </Link>

        {/* Hero 04 Preview - Top Right */}
        <Link
          href="/blocks/hero-04"
          className="group relative col-span-4 md:col-span-4 lg:col-span-4 2xl:col-span-4 row-span-6 md:row-span-4 lg:row-span-6 2xl:row-span-6 min-h-[250px] md:min-h-0 overflow-hidden md:border-r lg:border-r-0 border-b border-border bg-card transition-colors hover:bg-accent/5"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 p-4 md:p-0"
          >
            <div className="relative h-full w-full overflow-hidden bg-muted">
              <img
                src="/r/previews/hero-04.webp"
                alt="Hero Alt"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105 dark:invert"
              />
            </div>
          </motion.div>
        </Link>

        {/* Logo Preview - Top Far Right */}
        <Link
          href="/blocks/testimonial-02"
          className="group relative col-span-2 md:col-span-4 lg:col-span-4 2xl:col-span-4 row-span-4 md:row-span-4 lg:row-span-3 2xl:row-span-3 min-h-[180px] md:min-h-0 overflow-hidden border-r md:border-r-0 lg:border-r border-b border-border bg-card transition-colors hover:bg-accent/5"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 p-4 md:p-0"
          >
            <div className="relative h-full w-full overflow-hidden bg-muted">
              <img
                src="/r/previews/testimonial-02.webp"
                alt="Logo"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105 dark:invert"
              />
            </div>
          </motion.div>
        </Link>

        {/* Stats Preview */}
        <Link
          href="/blocks/testimonial-01"
          className="group relative col-span-2 md:col-span-4 lg:col-span-6 2xl:col-span-6 row-span-4 md:row-span-4 lg:row-span-5 2xl:row-span-5 min-h-[180px] md:min-h-0 overflow-hidden md:border-r border-b border-border bg-card transition-colors hover:bg-accent/5"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 p-4 md:p-0"
          >
            <div className="relative h-full w-full overflow-hidden bg-muted">
              <img
                src="/r/previews/testimonial-01.webp"
                alt="Stats"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105 dark:invert"
              />
            </div>
          </motion.div>
        </Link>

        {/* Features Preview */}
        <Link
          href="/blocks/feature-05"
          className="group relative col-span-4  md:col-span-4 lg:col-span-6 2xl:col-span-6 row-span-8 md:row-span-4 lg:row-span-5 2xl:row-span-5 min-h-[320px] md:min-h-0 overflow-hidden border-b border-border bg-card transition-colors hover:bg-accent/5"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 p-4 md:p-0"
          >
            <div className="relative h-full w-full overflow-hidden bg-muted">
              <img
                src="/r/previews/feature-05.webp"
                alt="Features"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105 dark:invert"
              />
            </div>
          </motion.div>
        </Link>

        {/* FAQ Preview - Bottom Row */}
        <Link
          href="/blocks/faq-01"
          className="group relative col-span-2 md:col-span-4 lg:col-span-4 2xl:col-span-4 row-span-4 md:row-span-4 lg:row-span-4 2xl:row-span-4 min-h-[120px] md:min-h-0 overflow-hidden border-r border-border bg-card transition-colors hover:bg-accent/5"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 p-4 md:p-0"
          >
            <div className="relative h-full w-full overflow-hidden bg-muted">
              <img
                src="/r/previews/faq-01.webp"
                alt="FAQ"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105 dark:invert"
              />
            </div>
          </motion.div>
        </Link>

        {/* Contact Preview */}
        <Link
          href="/blocks/contact-01"
          className="group relative col-span-2 md:col-span-4 lg:col-span-4 2xl:col-span-4 row-span-4 md:row-span-4 lg:row-span-4 2xl:row-span-4 min-h-[180px] md:min-h-0 overflow-hidden md:border-r-0 lg:border-r border-border bg-card transition-colors hover:bg-accent/5"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 p-4 md:p-0"
          >
            <div className="relative h-full w-full overflow-hidden bg-muted">
              <img
                src="/r/previews/contact-01.webp"
                alt="Contact"
                className="size-full object-contain bg-white transition-transform duration-500 group-hover:scale-105 dark:invert"
              />
            </div>
          </motion.div>
        </Link>

        {/* Pricing 02 Preview */}
        <Link
          href="/blocks/pricing-02"
          className=" hidden lg:block group relative col-span-2 md:col-span-3 lg:col-span-4 2xl:col-span-4 row-span-2 md:row-span-3 lg:row-span-4 2xl:row-span-4 min-h-[180px] md:min-h-0 overflow-hidden border-border bg-card transition-colors hover:bg-accent/5"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 p-4 md:p-0"
          >
            <div className="relative h-full w-full overflow-hidden bg-muted">
              <img
                src="/r/previews/pricing-02.webp"
                alt="Pricing Alt"
                className="size-full object-contain bg-white transition-transform duration-500 group-hover:scale-105 dark:invert"
              />
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export { BentoLanding };
