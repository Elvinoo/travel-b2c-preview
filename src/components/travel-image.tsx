"use client";
import { CSSProperties } from "react";
import { useLocale } from "./locale";
import { getB2CPhoto } from "@/content/photography";
import { publicAsset } from "@/config/paths";
export type ImageRole =
  | "hero"
  | "journey"
  | "destination"
  | "experience"
  | "gallery"
  | "editorial"
  | "day";
export const imageRules: Record<ImageRole, { ratio: string; sizes: string }> = {
  hero: { ratio: "16 / 9", sizes: "100vw" },
  journey: { ratio: "4 / 3", sizes: "(max-width:760px) 100vw, 50vw" },
  destination: { ratio: "3 / 4", sizes: "(max-width:760px) 100vw, 33vw" },
  experience: { ratio: "4 / 5", sizes: "(max-width:760px) 50vw, 25vw" },
  gallery: { ratio: "4 / 3", sizes: "(max-width:760px) 80vw, 33vw" },
  editorial: { ratio: "3 / 2", sizes: "100vw" },
  day: { ratio: "4 / 3", sizes: "(max-width:760px) 30vw, 180px" },
};
export function TravelImage({
  src,
  alt,
  role = "journey",
  priority = false,
  position,
  className = "",
}: {
  src: string;
  alt: string;
  role?: ImageRole;
  priority?: boolean;
  position?: string;
  className?: string;
}) {
  const { tr } = useLocale();
  const photo = getB2CPhoto(src);
  return (
    <img
      className={`travel-photo photo-${role} ${className}`}
      src={publicAsset(src)}
      srcSet={
        photo
          ? `${publicAsset(src.replace(".webp", "-sm.webp"))} 640w, ${publicAsset(src)} ${photo.width}w`
          : undefined
      }
      sizes={imageRules[role].sizes}
      alt={alt === "" ? "" : tr(photo?.alt || alt)}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      style={
        {
          objectPosition: position || photo?.position || "center",
          "--photo-ratio": imageRules[role].ratio,
        } as CSSProperties
      }
    />
  );
}
