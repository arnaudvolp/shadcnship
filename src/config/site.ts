/**
 * Site configuration
 *
 * For production, set NEXT_PUBLIC_APP_URL in your Vercel environment variables
 * to your production domain (e.g., https://shadcn-ui-blocks-five.vercel.app)
 */
export const siteConfig = {
  appUrl:
    process.env.NODE_ENV === "production"
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL || ""
      : "http://localhost:3000",
};
