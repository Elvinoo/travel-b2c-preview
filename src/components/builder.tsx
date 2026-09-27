"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useTrip, initialTrip as initial } from "./trip-state";
import { TripSummary, RequestComplete } from "./trip-summary";
import { TravelImage } from "./travel-image";
import { Itinerary } from "./discovery";
import { refinement as r } from "@/content/refinement";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Check,
  Minus,
  Plus,
  Compass,
  CalendarDays,
  Users,
  MapPin,
  Leaf,
  Utensils,
  Mountain,
  Camera,
  Heart,
  Landmark,
  Sun,
  Wine,
  Gem,
  Building2,
  Globe2,
  X,
  ChevronDown,
} from "lucide-react";
import { en as t } from "@/content/en";
import {
  destinations,
  tours,
  interests,
  accommodation,
  transport,
  activities,
} from "@/content/catalog";
const icons = [
  Landmark,
  Landmark,
  Leaf,
  Mountain,
  Sun,
  Utensils,
  Wine,
  Heart,
  Building2,
  Gem,
  Camera,
  Globe2,
];
export function Builder() {
  const { step, setStep, trip, setTrip, visited, setVisited } = useTrip();
  const query = useSearchParams().toString();
  const lastQuery = useRef<string | null>(null);
  const summaryDialog = useRef<HTMLDialogElement>(null);
  const tour = tours.find((x) => x.id === trip.tourId);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");
  const today = new Date();
  const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  useEffect(() => {
    if (lastQuery.current === query) return;
    lastQuery.current = query;
    const q = new URLSearchParams(query);
    const sourceTour = tours.find((x) => x.visible && x.id === q.get("tour"));
    const d = destinations.find((x) => x.id === q.get("destination"));
    const interest = q.get("interest");
    if (sourceTour)
      setTrip((x) => ({
        ...x,
        tourId: sourceTour.id,
        places: [...sourceTour.destinations],
        interests: [...new Set([...x.interests, ...sourceTour.interests])],
      }));
    if (d)
      setTrip((x) => ({ ...x, places: [...new Set([...x.places, d.id])] }));
    if (interest && interests.includes(interest))
      setTrip((x) => ({
        ...x,
        interests: [...new Set([...x.interests, interest])],
      }));
    if (sourceTour || d || interest) {
      setStep(0);
      setComplete(false);
    }
  }, [query, setTrip, setStep]);
  function goTo(index: number) {
    setStep(index);
    setVisited((x) => Math.max(x, index));
    setError("");
    summaryDialog.current?.close();
    document
      .getElementById("builder-top")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function update<K extends keyof typeof trip>(
    key: K,
    value: (typeof trip)[K],
  ) {
    setTrip((x) => ({ ...x, [key]: value }));
    setError("");
  }
  function toggle(key: "interests" | "places" | "activities", value: string) {
    update(
      key,
      trip[key].includes(value)
        ? trip[key].filter((x) => x !== value)
        : [...trip[key], value],
    );
  }
  function next() {
    const datesError = validateDates();
    if (step === 0 && datesError) {
      setError(datesError);
      return;
    }
    setVisited((x) => Math.max(x, step + 1));
    setStep((x) => x + 1);
    setError("");
    document
      .getElementById("builder-top")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function validateDates() {
    if (
      (!trip.flexible || trip.start || trip.end) &&
      (!trip.start || !trip.end)
    )
      return r.builder.chooseDates;
    if (trip.start && trip.start < localToday) return r.builder.pastDate;
    if (trip.start && trip.end && trip.end < trip.start)
      return t.helpers.orderError;
    return "";
  }
  const selected = trip.places.flatMap((id) =>
    destinations.filter((x) => x.id === id),
  );
  const dayCount =
    trip.start && trip.end
      ? Math.max(
          1,
          Math.round(
            (new Date(trip.end).getTime() - new Date(trip.start).getTime()) /
              86400000,
          ) + 1,
        )
      : null;
  const plan = selected.length
    ? selected.map((d, i) => ({ day: i + 1, title: d.itinerary }))
    : [
        { day: 1, title: t.helpers.fallbackPlan[0] },
        { day: 2, title: t.helpers.fallbackPlan[1] },
        { day: 3, title: t.helpers.fallbackPlan[2] },
      ];
  return (
    <>
      <section className="builder-intro wrap">
        <p className="eyebrow">{t.builder.label}</p>
        <h1>{t.builder.title}</h1>
        <p>{t.builder.text}</p>
        {tour && (
          <div className="builder-origin">
            <MapPin size={14} />
            <span>
              {r.builder.tourStart}: <strong>{tour.title}</strong>
            </span>
            <button type="button" onClick={() => update("tourId", "")}>
              {r.builder.clearTour}
            </button>
          </div>
        )}
      </section>
      <section id="builder-top" className="builder-layout wrap">
        {complete ? (
          <RequestComplete
            trip={trip}
            tour={tour}
            onEdit={() => {
              setComplete(false);
              goTo(4);
            }}
            onRestart={() => {
              setComplete(false);
              setStep(0);
              setVisited(0);
              setTrip(initial);
            }}
          />
        ) : (
          <>
            <div className="wizard">
              <div className="wizard-topline">
                <div>
                  <span>
                    {r.builder.step} {step + 1} {r.builder.of}{" "}
                    {t.builder.steps.length}
                  </span>
                  <strong>{t.builder.steps[step]}</strong>
                </div>
                <button
                  type="button"
                  className="mobile-summary-trigger"
                  onClick={() => summaryDialog.current?.showModal()}
                >
                  {r.builder.summary}
                  <ChevronDown size={16} />
                </button>
              </div>
              <div
                className="wizard-meter"
                role="progressbar"
                aria-label={r.builder.progress}
                aria-valuemin={0}
                aria-valuemax={5}
                aria-valuenow={step + 1}
              >
                <span style={{ width: `${(step + 1) * 20}%` }} />
              </div>
              <div className="wizard-progress">
                {t.builder.steps.map((s, i) => (
                  <button
                    key={s}
                    aria-label={s}
                    disabled={i > visited}
                    className={
                      i === step ? "current" : i <= visited ? "done" : ""
                    }
                    onClick={() => {
                      goTo(i);
                      setError("");
                    }}
                    aria-current={i === step ? "step" : undefined}
                  >
                    <span>
                      {i <= visited && i !== step ? <Check size={13} /> : i + 1}
                    </span>
                    <small>{s}</small>
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (step < 4) next();
                  else {
                    if (
                      !trip.first.trim() ||
                      !trip.last.trim() ||
                      !trip.country.trim()
                    ) {
                      setError(r.builder.nameError);
                      return;
                    }
                    if (trip.phone.replace(/\D/g, "").length < 7) {
                      setError(r.builder.phoneError);
                      return;
                    }
                    const datesError = validateDates();
                    if (datesError) {
                      goTo(0);
                      setError(datesError);
                      return;
                    }
                    setComplete(true);
                    document
                      .getElementById("builder-top")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {step === 0 && (
                  <>
                    <p className="eyebrow">{t.helpers.steps[0]}</p>
                    <h2>{t.builder.dates}</h2>
                    <p className="step-description">
                      {t.helpers.dateDescription}
                    </p>
                    <div className="field-grid">
                      <label>
                        {t.builder.start}
                        <input
                          type="date"
                          value={trip.start}
                          min={localToday}
                          onInput={(e) =>
                            update("start", e.currentTarget.value)
                          }
                          required={!trip.flexible}
                        />
                      </label>
                      <label>
                        {t.builder.end}
                        <input
                          type="date"
                          value={trip.end}
                          min={trip.start || localToday}
                          onInput={(e) => update("end", e.currentTarget.value)}
                          required={!trip.flexible}
                        />
                      </label>
                    </div>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={trip.flexible}
                        onChange={(e) => update("flexible", e.target.checked)}
                      />
                      {t.builder.flexible}
                    </label>
                    <h3 className="field-heading">{t.builder.travellers}</h3>
                    {(["adults", "children"] as const).map((key) => (
                      <div className="counter-row" key={key}>
                        <span>
                          {t.builder[key]}
                          <small>
                            {key === "adults"
                              ? t.helpers.adultsAge
                              : t.helpers.childrenAge}
                          </small>
                        </span>
                        <div>
                          <button
                            type="button"
                            aria-label={`Remove one ${key}`}
                            disabled={trip[key] <= (key === "adults" ? 1 : 0)}
                            onClick={() => update(key, trip[key] - 1)}
                          >
                            <Minus size={16} />
                          </button>
                          <span aria-live="polite">{trip[key]}</span>
                          <button
                            type="button"
                            aria-label={`Add one ${key}`}
                            disabled={trip[key] >= 20}
                            onClick={() => update(key, trip[key] + 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {step === 1 && (
                  <>
                    <p className="eyebrow">{t.helpers.steps[1]}</p>
                    <h2>{t.builder.interestsTitle}</h2>
                    <p className="step-description">
                      {t.builder.interestsText}
                    </p>
                    <p className="selection-status" aria-live="polite">
                      <Check size={14} />
                      {trip.interests.length} {r.builder.selected} ·{" "}
                      {r.builder.saved}
                    </p>
                    <div className="interest-grid">
                      {interests.map((x, i) => {
                        const Icon = icons[i] || Compass;
                        return (
                          <button
                            type="button"
                            aria-pressed={trip.interests.includes(x)}
                            className={
                              trip.interests.includes(x)
                                ? "choice selected"
                                : "choice"
                            }
                            key={x}
                            onClick={() => toggle("interests", x)}
                          >
                            <Icon size={24} strokeWidth={1.3} />
                            <span>{x}</span>
                            {trip.interests.includes(x) && (
                              <Check size={14} className="choice-check" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <p className="eyebrow">{t.helpers.steps[2]}</p>
                    <h2>{t.builder.placesTitle}</h2>
                    <p className="step-description">{t.builder.placesText}</p>
                    <p className="selection-status" aria-live="polite">
                      <MapPin size={14} />
                      {trip.places.length} {r.builder.selected}
                    </p>
                    <div className="place-choices">
                      {destinations.map((d) => (
                        <button
                          className={
                            trip.places.includes(d.id)
                              ? "place-choice selected"
                              : "place-choice"
                          }
                          type="button"
                          key={d.id}
                          onClick={() => toggle("places", d.id)}
                          aria-pressed={trip.places.includes(d.id)}
                        >
                          <TravelImage
                            src={d.image}
                            alt=""
                            role="destination"
                          />
                          <span>{d.name}</span>
                          <span className="place-check">
                            {trip.places.includes(d.id) ? (
                              <Check size={15} />
                            ) : (
                              <Plus size={15} />
                            )}
                          </span>
                        </button>
                      ))}
                    </div>
                    <h3 className="field-heading">{t.builder.accommodation}</h3>
                    <div className="option-pills">
                      {accommodation.map((x) => (
                        <button
                          type="button"
                          className={trip.stay === x ? "selected" : ""}
                          aria-pressed={trip.stay === x}
                          key={x}
                          onClick={() => update("stay", x)}
                        >
                          {x}
                        </button>
                      ))}
                    </div>
                    <p className="form-note">{t.builder.stayHint}</p>
                    <h3 className="field-heading">{t.builder.activities}</h3>
                    <div className="option-pills">
                      {activities.map((x) => (
                        <button
                          type="button"
                          aria-pressed={trip.activities.includes(x)}
                          className={
                            trip.activities.includes(x) ? "selected" : ""
                          }
                          key={x}
                          onClick={() => toggle("activities", x)}
                        >
                          {x}
                        </button>
                      ))}
                    </div>
                    <h3 className="field-heading">{t.builder.transport}</h3>
                    <select
                      aria-label={t.builder.transport}
                      value={trip.transport}
                      onChange={(e) => update("transport", e.target.value)}
                    >
                      {transport.map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                  </>
                )}
                {step === 3 && (
                  <>
                    <p className="eyebrow">{t.helpers.steps[3]}</p>
                    <h2>{r.builder.review}</h2>
                    <p className="step-description">{r.builder.reviewText}</p>
                    {tour ? (
                      <>
                        <div className="builder-source-route">
                          <TravelImage src={tour.image} alt={tour.title} />
                          <div>
                            <p className="eyebrow">{r.builder.tourStart}</p>
                            <h3>{tour.title}</h3>
                            <span>
                              {tour.duration} {t.ui.days} · {tour.places}
                            </span>
                          </div>
                        </div>
                        {(tour.destinations.some(
                          (id) => !trip.places.includes(id),
                        ) ||
                          trip.places.some(
                            (id) => !tour.destinations.includes(id),
                          )) && (
                          <div className="route-adjustment">
                            <h3>{r.builder.adjustments}</h3>
                            <p>{r.builder.adjustmentText}</p>
                            <p>
                              {r.builder.added}:{" "}
                              {selected
                                .filter(
                                  (x) => !tour.destinations.includes(x.id),
                                )
                                .map((x) => x.name)
                                .join(", ") || "—"}
                            </p>
                            <p>
                              {r.builder.removed}:{" "}
                              {destinations
                                .filter(
                                  (x) =>
                                    tour.destinations.includes(x.id) &&
                                    !trip.places.includes(x.id),
                                )
                                .map((x) => x.name)
                                .join(", ") || "—"}
                            </p>
                          </div>
                        )}
                        {dayCount && dayCount !== tour.duration && (
                          <p className="route-adjustment">
                            {r.builder.dateMismatch}
                          </p>
                        )}
                        <Itinerary days={tour.itinerary} compact />
                      </>
                    ) : (
                      <>
                        <div className="itinerary">
                          {plan.map((x) => (
                            <div key={x.day}>
                              <span>
                                {t.helpers.day} {x.day}
                              </span>
                              <h3>{x.title}</h3>
                              <p>{t.helpers.pace}</p>
                            </div>
                          ))}
                        </div>
                        <p className="form-note">{r.builder.flexibleRoute}</p>
                      </>
                    )}
                    <div className="review-preferences">
                      <p>
                        <strong>{t.helpers.stay}</strong>
                        {trip.stay}
                      </p>
                      <p>
                        <strong>{t.helpers.transport}</strong>
                        {trip.transport}
                      </p>
                      <p>
                        <strong>{t.helpers.experiences}</strong>
                        {trip.activities.join(", ") || t.builder.unspecified}
                      </p>
                    </div>
                    <p className="form-note">{t.helpers.noBooking}</p>
                  </>
                )}
                {step === 4 && (
                  <>
                    <p className="eyebrow">{t.helpers.steps[4]}</p>
                    <h2>{t.builder.contactTitle}</h2>
                    <p className="step-description">{t.builder.contactText}</p>
                    <div className="field-grid">
                      {(
                        ["first", "last", "email", "phone", "country"] as const
                      ).map((key) => (
                        <label
                          className={key === "country" ? "full-field" : ""}
                          key={key}
                        >
                          {t.builder[key]}
                          <input
                            name={key}
                            type={
                              key === "email"
                                ? "email"
                                : key === "phone"
                                  ? "tel"
                                  : "text"
                            }
                            required
                            value={trip[key]}
                            autoComplete={
                              {
                                first: "given-name",
                                last: "family-name",
                                email: "email",
                                phone: "tel",
                                country: "country-name",
                              }[key]
                            }
                            onChange={(e) => update(key, e.target.value)}
                          />
                        </label>
                      ))}
                    </div>
                    <label className="notes-field">
                      {t.builder.notes}
                      <textarea
                        value={trip.notes}
                        rows={3}
                        onChange={(e) => update("notes", e.target.value)}
                      />
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        required
                        checked={trip.consent}
                        onChange={(e) => update("consent", e.target.checked)}
                      />
                      {t.builder.consent}
                    </label>
                    <p className="form-note">{r.builder.demo}</p>
                  </>
                )}
                {error && (
                  <p role="alert" className="error-message">
                    {error}
                  </p>
                )}
                <div className="wizard-actions">
                  {step > 0 ? (
                    <button
                      className="back-button"
                      type="button"
                      onClick={() => {
                        goTo(step - 1);
                        setError("");
                      }}
                    >
                      <ArrowLeft size={16} />
                      {t.builder.back}
                    </button>
                  ) : (
                    <span className="form-note">{t.helpers.durationHint}</span>
                  )}
                  <button className="button" type="submit">
                    {step === 4 ? r.send : t.builder.next}
                    <ArrowRight size={17} />
                  </button>
                </div>
              </form>
            </div>
            <aside className="trip-summary">
              <TripSummary trip={trip} tour={tour} onEdit={goTo} />
            </aside>
            <dialog
              className="mobile-summary-sheet"
              aria-label={t.builder.summary}
              ref={summaryDialog}
            >
              <div className="sheet-header">
                <h3>{t.builder.summary}</h3>
                <button
                  type="button"
                  aria-label={r.builder.closeSummary}
                  onClick={() => summaryDialog.current?.close()}
                >
                  <X size={22} />
                </button>
              </div>
              <TripSummary trip={trip} tour={tour} onEdit={goTo} />
            </dialog>
          </>
        )}
      </section>
    </>
  );
}
