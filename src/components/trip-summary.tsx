"use client";
import { useLocale } from "./locale";
import { Tour, destinations, countries } from "@/content/catalog";
import { Trip } from "./trip-state";
import { TravelImage } from "./travel-image";
import { FlightSearch, flightPreferenceLabel } from "./flights";
import { flightCopy } from "@/content/flights";
import {
  Check,
  ArrowUpRight,
  ArrowLeft,
  Compass,
  CalendarDays,
  Users,
  MapPin,
  Plane,
} from "lucide-react";
export function TripSummary({
  trip,
  tour,
  onEdit,
}: {
  trip: Trip;
  tour?: Tour;
  onEdit: (step: number) => void;
}) {
  const { t, r, tr, unit } = useLocale();
  const selected = trip.places.flatMap((id) =>
    destinations.filter((x) => x.id === id),
  );
  const travelCountries = [...new Set(selected.map((x) => x.country))];
  const countryNames = (
    travelCountries.length ? travelCountries : ["azerbaijan"]
  )
    .map((id) => countries.find((x) => x.id === id)?.name)
    .filter(Boolean)
    .join(" · ");
  return (
    <>
      <div className="summary-image">
        <TravelImage
          src={tour?.image || selected[0]?.image || destinations[2].image}
          alt={tour?.title || selected[0]?.name || destinations[2].alt}
        />
        <span>{tr(countryNames)}</span>
      </div>
      <div className="summary-body">
        <p className="eyebrow">{t.builder.summary}</p>
        <h3>{tr(tour?.title || r.builder.customPlan)}</h3>
        {tour && (
          <p className="summary-source">
            {tour.duration} {r.builder.sourceDays}
          </p>
        )}
        <div className="summary-line">
          <CalendarDays size={17} />
          <div>
            <small>{t.builder.timing}</small>
            <span>
              {tr(
                trip.start && trip.end
                  ? `${trip.start} → ${trip.end}`
                  : trip.flexible
                    ? t.builder.flexibleTiming
                    : t.builder.unspecified,
              )}
            </span>
            {trip.flexible && trip.start && trip.end && (
              <small>{r.builder.dateFlexible}</small>
            )}
          </div>
          <button type="button" onClick={() => onEdit(0)}>
            {r.builder.edit}
          </button>
        </div>
        <div className="summary-line">
          <Users size={17} />
          <div>
            <small>{t.helpers.travellers}</small>
            <span>
              {trip.adults} {unit("adult", trip.adults)}
              {tr(
                trip.children
                  ? `, ${trip.children} ${unit("child", trip.children)}`
                  : "",
              )}
            </span>
          </div>
          <button type="button" onClick={() => onEdit(0)}>
            {r.builder.edit}
          </button>
        </div>
        <div className="summary-line">
          <Plane size={17} aria-hidden="true" />
          <div>
            <small>{tr(flightCopy.summary)}</small>
            <span>{tr(flightPreferenceLabel(trip.flights))}</span>
          </div>
          <button type="button" onClick={() => onEdit(0)}>
            {r.builder.edit}
          </button>
        </div>
        <div className="summary-edit-heading">
          <small>{t.builder.interests}</small>
          <button type="button" onClick={() => onEdit(1)}>
            {r.builder.edit}
          </button>
        </div>
        <div className="summary-tags">
          {trip.interests.length ? (
            trip.interests.map((x) => <span key={x}>{tr(x)}</span>)
          ) : (
            <p>{r.builder.nothing}</p>
          )}
        </div>
        <div className="summary-edit-heading">
          <small>{t.builder.selectedPlaces}</small>
          <button type="button" onClick={() => onEdit(2)}>
            {r.builder.edit}
          </button>
        </div>
        <p className="summary-places">
          {tr(selected.map((x) => x.name).join(" · ") || r.builder.nothing)}
        </p>
        <div className="summary-preferences">
          <span>{tr(trip.stay)}</span>
          <span>{tr(trip.transport)}</span>
          {trip.activities.map((x) => (
            <span key={x}>{tr(x)}</span>
          ))}
        </div>
        <div className="summary-note">
          <Compass size={19} />
          <p>{t.helpers.summaryNote}</p>
        </div>
      </div>
    </>
  );
}
export function RequestComplete({
  trip,
  tour,
  onEdit,
  onRestart,
}: {
  trip: Trip;
  tour?: Tour;
  onEdit: () => void;
  onRestart: () => void;
}) {
  const { t, r, tr, unit } = useLocale();
  const selected = trip.places.flatMap((id) =>
    destinations.filter((x) => x.id === id),
  );
  return (
    <div className="builder-complete request-complete">
      <div className="complete-icon">
        <Check size={32} />
      </div>
      <p className="eyebrow">{r.builder.preview}</p>
      <h2>{r.builder.ready}</h2>
      <p role="status">{r.builder.readyText}</p>
      <div className="completion-next">
        <h3>{r.builder.next}</h3>
        {r.builder.nextSteps.map((x, i) => (
          <article key={x.title}>
            <span>0{i + 1}</span>
            <div>
              <h4>{tr(x.title)}</h4>
              <p>{tr(x.text)}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="request-preview">
        <h3>{r.builder.included}</h3>
        <dl>
          <dt>{t.helpers.previewContact}</dt>
          <dd>
            {trip.first} {trip.last}
            <br />
            {trip.email}
            <br />
            {trip.phone}
            <br />
            {trip.country}
          </dd>
          <dt>{t.builder.timing}</dt>
          <dd>
            {tr(
              trip.start && trip.end
                ? `${trip.start} → ${trip.end}`
                : t.builder.flexibleTiming,
            )}
            {tr(
              trip.flexible &&
                trip.start &&
                trip.end &&
                ` · ${t.builder.flexible}`,
            )}
          </dd>
          <dt>{t.helpers.travellers}</dt>
          <dd>
            {trip.adults} {unit("adult", trip.adults)}
            {tr(
              trip.children
                ? `, ${trip.children} ${unit("child", trip.children)}`
                : "",
            )}
          </dd>
          <dt>{r.builder.base}</dt>
          <dd>{tr(tour?.title || r.builder.customPlan)}</dd>
          <dt>{tr(flightCopy.summary)}</dt>
          <dd>{tr(flightPreferenceLabel(trip.flights))}</dd>
          <dt>{t.builder.selectedPlaces}</dt>
          <dd>
            {tr(selected.map((x) => x.name).join(" · ") || r.builder.nothing)}
          </dd>
          <dt>{t.builder.interests}</dt>
          <dd>{tr(trip.interests.join(", ") || r.builder.nothing)}</dd>
          <dt>{t.helpers.stay}</dt>
          <dd>{tr(trip.stay)}</dd>
          <dt>{t.helpers.transport}</dt>
          <dd>{tr(trip.transport)}</dd>
          <dt>{t.helpers.experiences}</dt>
          <dd>{tr(trip.activities.join(", ") || r.builder.nothing)}</dd>
          {trip.notes && (
            <>
              <dt>{t.builder.notes}</dt>
              <dd>{trip.notes}</dd>
            </>
          )}
        </dl>
        {tour && (
          <details className="completion-itinerary">
            <summary>
              {r.builder.submittedItinerary}
              <span>
                {tour.duration} {unit("day", tour.duration)}
              </span>
            </summary>
            <ol>
              {tour.itinerary.map((d) => (
                <li key={d.day}>
                  <strong>
                    {t.helpers.day} {d.day}
                  </strong>
                  {tr(d.title)}
                </li>
              ))}
            </ol>
          </details>
        )}
      </div>
      {trip.flights === "yes" && <FlightSearch />}
      <div className="completion-actions">
        <button className="back-button" onClick={onEdit}>
          <ArrowLeft size={16} />
          {r.builder.edit}
        </button>
        <button className="button" onClick={onRestart}>
          {t.builder.restart}
          <ArrowUpRight size={18} />
        </button>
      </div>
    </div>
  );
}
