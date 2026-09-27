"use client";
import { ArrowUpRight, Plane } from "lucide-react";
import { flightCopy } from "@/content/flights";
import { aviasales } from "@/config/flights";
import { Trip } from "./trip-state";
import { useLocale } from "./locale";

export function FlightSearch() {
  const { tr } = useLocale();
  return (
    <div className="flight-search">
      <a
        className="button flight-link"
        href={aviasales.href}
        target="_blank"
        rel={
          aviasales.affiliate
            ? "noopener noreferrer sponsored"
            : "noopener noreferrer"
        }
      >
        {tr(flightCopy.cta)}
        <ArrowUpRight size={17} aria-hidden="true" />
      </a>
      <p className="form-note">{tr(flightCopy.externalNote)}</p>
      {aviasales.affiliate && (
        <p className="form-note">{tr(flightCopy.affiliateNote)}</p>
      )}
    </div>
  );
}

export function FlightPreference({
  value,
  onChange,
}: {
  value: Trip["flights"];
  onChange: (value: Trip["flights"]) => void;
}) {
  const { tr } = useLocale();
  return (
    <fieldset className="flight-preference">
      <legend>
        <Plane size={19} aria-hidden="true" />
        {tr(flightCopy.question)}
      </legend>
      <p className="form-note">{tr(flightCopy.description)}</p>
      <div className="flight-options">
        {(["yes", "no"] as const).map((choice) => (
          <label className={value === choice ? "selected" : ""} key={choice}>
            <input
              type="radio"
              name="flights"
              value={choice}
              checked={value === choice}
              onChange={() => onChange(choice)}
            />
            <span>{tr(flightCopy[choice])}</span>
          </label>
        ))}
      </div>
      {value === "yes" && <FlightSearch />}
    </fieldset>
  );
}

export function flightPreferenceLabel(value: Trip["flights"]) {
  return value ? flightCopy[value] : flightCopy.unspecified;
}
