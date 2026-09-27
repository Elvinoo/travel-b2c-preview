"use client";
import NextLink from "next/link";
import { ComponentProps } from "react";
import { useLocale } from "./locale";
export default function Link({
  href,
  ...props
}: ComponentProps<typeof NextLink>) {
  const { locale } = useLocale();
  let localized = href;
  if (
    typeof href === "string" &&
    href.startsWith("/") &&
    !href.startsWith("//")
  ) {
    const url = new URL(href, "https://travel.invalid");
    url.searchParams.set("lang", locale);
    localized = url.pathname + url.search + url.hash;
  }
  return <NextLink href={localized} {...props} />;
}
