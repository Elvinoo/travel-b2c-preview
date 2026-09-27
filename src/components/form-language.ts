"use client";
import { FormEvent } from "react";
import { useLocale } from "./locale";
import { interfaceCopy } from "@/content/interface";
export function useLocalizedValidation() {
  const { tr } = useLocale();
  return {
    onInvalid(event: FormEvent<HTMLFormElement>) {
      const field = event.target as
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      const message = field.validity.valueMissing
        ? field.type === "checkbox"
          ? interfaceCopy.consentRequired
          : interfaceCopy.required
        : field.validity.typeMismatch
          ? interfaceCopy.emailInvalid
          : interfaceCopy.valueInvalid;
      field.setCustomValidity(tr(message));
    },
    onInputCapture(event: FormEvent<HTMLFormElement>) {
      const field = event.target as
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      field.setCustomValidity("");
    },
  };
}
