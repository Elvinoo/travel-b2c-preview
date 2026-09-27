"use client";
import { useLocale } from "./locale";
import { interfaceCopy } from "@/content/interface";
export function Privacy() {
  const { t, tr } = useLocale();
  return (
    <section className="page-intro wrap privacy">
      <p className="eyebrow">{t.helpers.previewLabel}</p>
      <h1>{tr(interfaceCopy.privacyTitle)}</h1>
      <p>{tr(interfaceCopy.privacyMemory)}</p>
      <p>{tr(interfaceCopy.privacyServices)}</p>
    </section>
  );
}
