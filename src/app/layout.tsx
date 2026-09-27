import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { publicAsset } from "@/config/paths";
import { SiteChrome } from "@/components/site";
import "./globals.css";
import "./refinements.css";
export const metadata: Metadata = {
  title: {
    default: `${brand.name} | Thoughtfully personal journeys`,
    template: `%s | ${brand.name}`,
  },
  description:
    "Explore Azerbaijan and build a personal travel request. Thoughtful journeys shaped around you.",
  icons: { icon: publicAsset(brand.favicon) },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={
          {
            "--primary": brand.colors.primary,
            "--paper": brand.colors.secondary,
            "--accent": brand.colors.accent,
          } as React.CSSProperties
        }
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
