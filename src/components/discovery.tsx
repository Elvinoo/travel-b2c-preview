"use client";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { b2cAsset } from "@/content/photography";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  MapPin,
  Moon,
  Footprints,
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight,
  Compass,
  MessagesSquare,
  Route,
} from "lucide-react";
import { en as t } from "@/content/en";
import { refinement as r } from "@/content/refinement";
import {
  destinations,
  tours,
  experiences,
  images,
  ItineraryDay,
} from "@/content/catalog";
import { TravelImage } from "./travel-image";
import { CTA, DestinationCards, TourCards } from "./site";

export function FeaturedJourneys() {
  const collection = tours.filter((x) => x.visible);
  const featured = collection[0];
  return (
    <div className="curated-journeys">
      <article className="signature-journey">
        <Link className="signature-image" href={`/tours/${featured.id}`}>
          <TravelImage
            src={featured.image}
            alt={featured.title}
            role="journey"
          />
          <span className="image-tag">{r.signature}</span>
        </Link>
        <div className="signature-copy">
          <div className="tour-meta">
            <span>
              {featured.duration} {t.ui.days} / {featured.nights} {r.nights}
            </span>
            <span>{featured.style}</span>
          </div>
          <Link href={`/tours/${featured.id}`}>
            <h3>{featured.title}</h3>
          </Link>
          <p>{featured.description}</p>
          <div className="journey-route">
            <MapPin size={14} />
            {featured.places}
          </div>
          <Link className="text-link" href={`/tours/${featured.id}`}>
            {r.view}
            <ArrowUpRight size={17} />
          </Link>
          <Link
            className="customize-link"
            href={`/build-your-trip?tour=${featured.id}`}
          >
            {r.customize}
            <ArrowRight size={15} />
          </Link>
        </div>
      </article>
      <div className="supporting-journeys">
        {collection.slice(1).map((x) => (
          <article className="horizontal-journey" key={x.id}>
            <Link href={`/tours/${x.id}`} className="horizontal-image">
              <TravelImage src={x.image} alt={x.title} />
            </Link>
            <div>
              <p className="eyebrow">
                {x.style} · {x.duration} {t.ui.days}
              </p>
              <Link href={`/tours/${x.id}`}>
                <h3>{x.title}</h3>
              </Link>
              <p>{x.description}</p>
              <Link className="text-link" href={`/tours/${x.id}`}>
                {r.view}
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ExperienceCards({
  all = false,
  selected,
}: {
  all?: boolean;
  selected?: string[];
}) {
  const collection = selected
    ? experiences.filter((x) => selected.includes(x.name))
    : all
      ? experiences
      : [experiences[0], experiences[3], experiences[5], experiences[11]];
  return (
    <div className={`experience-collection ${all ? "all-experiences" : ""}`}>
      {collection.map((x, i) => (
        <article className="experience-card" key={x.id}>
          <Link
            href={`/build-your-trip?interest=${encodeURIComponent(x.name)}`}
            className="experience-image"
          >
            <TravelImage src={x.image} alt={x.name} role="experience" />
            <span className="experience-index">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="round-arrow">
              <ArrowUpRight size={20} />
            </span>
          </Link>
          <div>
            <h3>{x.name}</h3>
            <p>{x.description}</p>
            <Link
              className="experience-add"
              href={`/build-your-trip?interest=${encodeURIComponent(x.name)}`}
            >
              {r.add}
              <ArrowUpRight size={15} />
            </Link>
            {all && (
              <div className="experience-context">
                {tours.some(
                  (tour) => tour.visible && tour.interests.includes(x.name),
                ) && (
                  <Link href={`/tours?interest=${encodeURIComponent(x.name)}`}>
                    {t.nav.tours}
                    <ArrowUpRight size={12} />
                  </Link>
                )}
                {destinations
                  .filter((d) => d.interests.includes(x.name))
                  .slice(0, 1)
                  .map((d) => (
                    <Link key={d.id} href={`/destinations/${d.id}`}>
                      {d.name}
                      <ArrowUpRight size={12} />
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function RefinedHome() {
  return (
    <>
      <section className="hero refined-hero">
        <TravelImage
          className="hero-image"
          src={images.hero}
          alt="Travellers following an open road through the foothills"
          role="hero"
          priority
          position="85% center"
        />
        <div className="hero-shade" />
        <div className="hero-content wrap">
          <span className="hero-kicker">
            <span />
            {r.heroEdition}
          </span>
          <h1>{t.hero.title}</h1>
          <p>{t.hero.description}</p>
          <div className="hero-buttons">
            <Link className="button light" href="/build-your-trip">
              {r.build}
              <ArrowUpRight size={18} />
            </Link>
            <Link className="hero-secondary" href="/tours">
              {r.exploreTours}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        <Link className="hero-postcard" href="/destinations/baku">
          <TravelImage
            src={images.oldCity}
            alt={destinations[0].alt}
            role="destination"
          />
          <span>
            <small>
              FROM OLD CITY LANES
              <br />
              TO OPEN MOUNTAIN SKIES
            </small>
            <ArrowUpRight size={18} />
          </span>
        </Link>
        <div className="hero-bottom wrap">
          <span>{t.hero.footnote}</span>
          <a href="#discover" aria-label={t.helpers.scroll}>
            <span>{t.helpers.scrollText}</span>
            <ChevronDown size={18} />
          </a>
          <span className="hero-location">
            {r.heroCaption}
            <span>{r.heroLocation}</span>
          </span>
        </div>
      </section>
      <section className="intro-ribbon">
        <span>
          <Compass size={19} />
          {t.helpers.ribbon[0]}
        </span>
        <span>{t.helpers.ribbon[1]}</span>
        <span>{t.helpers.ribbon[2]}</span>
      </section>
      <section id="discover" className="section wrap refined-discover">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.home.discoveryLabel}</p>
            <h2>{t.home.discoveryTitle}</h2>
          </div>
          <div className="heading-aside">
            <p>{t.home.discoveryText}</p>
            <Link className="text-link" href="/destinations">
              {t.home.destinationsLink}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <DestinationCards />
      </section>
      <section className="journeys section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{r.featured}</p>
              <h2>{r.featuredTitle}</h2>
              <p>{r.featuredText}</p>
            </div>
            <Link className="text-link" href="/tours">
              {t.home.allTours}
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <FeaturedJourneys />
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{r.experienceLabel}</p>
            <h2>{r.experienceTitle}</h2>
          </div>
          <div className="heading-aside">
            <p>{r.experienceText}</p>
            <Link className="text-link" href="/experiences">
              {r.allExperiences}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <ExperienceCards />
      </section>
      <section className="section wrap how refined-how">
        <div className="how-intro">
          <p className="eyebrow">{t.home.howLabel}</p>
          <h2>{t.home.howTitle}</h2>
          <p>{t.home.howText}</p>
          <Link className="button" href="/build-your-trip">
            {r.build}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="steps-list">
          {t.home.steps.map((x, i) => (
            <div className="how-step" key={x.title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </div>
              <ArrowUpRight size={19} />
            </div>
          ))}
        </div>
      </section>
      <section className="destination-moment">
        <TravelImage
          src={images.village}
          alt="Stone arches and a quiet courtyard at the Sheki caravanserai"
          role="editorial"
          position="center 58%"
        />
        <div className="moment-shade" />
        <div className="wrap moment-copy">
          <p className="eyebrow">{r.momentLabel}</p>
          <h2>{r.momentTitle}</h2>
          <p>{r.momentText}</p>
          <Link className="text-link" href="/destinations/sheki">
            {r.momentLink}
            <ArrowUpRight size={18} />
          </Link>
          <span className="moment-caption">{r.momentCaption}</span>
        </div>
      </section>
      <section className="section wrap confidence">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{r.localLabel}</p>
            <h2>{r.localTitle}</h2>
          </div>
          <div className="heading-aside">
            <p>{r.localText}</p>
            <Link className="text-link" href="/about">
              {t.nav.about}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <div className="confidence-grid">
          {r.trustCards.map((x, i) => {
            const Icon = [Compass, Route, MessagesSquare][i];
            return (
              <article key={x.title}>
                <Icon size={25} strokeWidth={1.3} />
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </article>
            );
          })}
        </div>
        <div className="honest-reviews">
          <span className="eyebrow">{t.home.reviewLabel}</span>
          <p>{t.home.reviewDescription}</p>
        </div>
      </section>
      <CTA />
    </>
  );
}

export function Itinerary({
  days,
  compact = false,
}: {
  days: ItineraryDay[];
  compact?: boolean;
}) {
  const [open, setOpen] = useState<number[]>([]);
  const itineraryId = useId();
  return (
    <div className={`visual-itinerary ${compact ? "compact" : ""}`}>
      {days.map((d) => (
        <article
          className={
            open.includes(d.day) ? "itinerary-day expanded" : "itinerary-day"
          }
          key={d.day}
        >
          <span className="timeline-node">
            {String(d.day).padStart(2, "0")}
          </span>
          <div className="itinerary-day-card">
            <div className="day-experience">
              <div className="day-thumb">
                <TravelImage src={d.image} alt="" role="day" />
              </div>
              <div className="day-heading">
                <span className="eyebrow">
                  {t.helpers.day} {d.day}
                </span>
                <h3>{d.title}</h3>
                <p className="day-intro">{d.intro}</p>
                <div className="day-themes">
                  {d.themes.map((theme) => (
                    <span key={theme}>{theme}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="day-context">
              <span className="day-location">
                <MapPin size={12} />
                {d.location}
              </span>
              <button
                className="day-toggle day-detail-toggle"
                type="button"
                aria-expanded={open.includes(d.day)}
                aria-controls={`${itineraryId}-day-${d.day}`}
                aria-label={`${open.includes(d.day) ? r.hideDayDetails : r.dayDetails} · ${t.helpers.day} ${d.day}`}
                onClick={() =>
                  setOpen((x) =>
                    x.includes(d.day)
                      ? x.filter((n) => n !== d.day)
                      : [...x, d.day],
                  )
                }
              >
                {open.includes(d.day) ? r.hideDayDetails : r.dayDetails}
                <ChevronDown className="day-chevron" size={15} />
              </button>
            </div>
            <div
              id={`${itineraryId}-day-${d.day}`}
              className="day-content"
              hidden={!open.includes(d.day)}
            >
              <span className="day-activity">
                <Footprints size={13} />
                {d.activity}
              </span>
              <p>{d.description}</p>
              <div className="day-highlights">
                {d.highlights.map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
              {d.overnight !== "—" && (
                <p className="overnight-note">
                  <Moon size={13} />
                  {r.overnight}: {d.overnight}
                </p>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function Gallery({
  photos,
  title,
}: {
  photos: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <div className="photo-gallery">
        {photos.map((p, i) => (
          <button
            type="button"
            key={`${p}-${i}`}
            aria-label={`Open ${title} photo ${i + 1}`}
            onClick={() => {
              setActive(i);
              ref.current?.showModal();
            }}
          >
            <TravelImage
              src={p}
              alt={`${title}, view ${i + 1}`}
              role="gallery"
            />
            <span>
              0{i + 1}
              <ArrowUpRight size={17} />
            </span>
          </button>
        ))}
      </div>
      <dialog
        className="gallery-dialog"
        ref={ref}
        onClick={(e) => {
          if (e.target === e.currentTarget) ref.current?.close();
        }}
      >
        <button
          className="gallery-close"
          type="button"
          aria-label={t.ui.close}
          onClick={() => ref.current?.close()}
        >
          <X />
        </button>
        <TravelImage
          src={photos[active]}
          alt={`${title}, view ${active + 1}`}
          role="gallery"
        />
        <div className="gallery-controls">
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() =>
              setActive((i) => (i - 1 + photos.length) % photos.length)
            }
          >
            <ChevronLeft />
          </button>
          <span>
            {active + 1} / {photos.length}
          </span>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => setActive((i) => (i + 1) % photos.length)}
          >
            <ChevronRight />
          </button>
        </div>
      </dialog>
    </>
  );
}

export function TourDetail({ id }: { id: string }) {
  const tour = tours.find((x) => x.id === id && x.visible);
  if (!tour) return null;
  return (
    <>
      <section className="detail-hero tour-detail-hero">
        <TravelImage
          src={b2cAsset(tour.photography.hero)}
          alt={tour.title}
          role="hero"
          position={tour.photography.heroPosition}
          priority
        />
        <div className="hero-shade" />
        <div className="wrap">
          <Link className="detail-back" href="/tours">
            ← {t.nav.tours}
          </Link>
          <p className="eyebrow">
            {tour.style} · {tour.duration} {t.ui.days} / {tour.nights}{" "}
            {r.nights}
          </p>
          <h1>{tour.title}</h1>
          <p>{tour.description}</p>
          <div className="detail-hero-buttons">
            <Link className="button light" href={`/build-your-trip?tour=${id}`}>
              {r.customize}
              <ArrowUpRight size={18} />
            </Link>
            <Link
              className="hero-secondary"
              href={`/build-your-trip?tour=${id}&intent=request`}
            >
              {r.request}
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <div className="journey-facts wrap">
        <div>
          <small>{r.duration}</small>
          <strong>
            {tour.duration} {t.ui.days} / {tour.nights} {r.nights}
          </strong>
        </div>
        <div>
          <small>{r.route}</small>
          <strong>{tour.places}</strong>
        </div>
        <div>
          <small>{r.style}</small>
          <strong>{tour.style}</strong>
        </div>
      </div>
      <section className="section wrap tour-detail-layout">
        <div className="tour-detail-main">
          <div className="tour-introduction">
            <p className="eyebrow">{r.signature}</p>
            <h2>{r.highlights}</h2>
            <p>{tour.introduction}</p>
            <div className="highlight-list">
              {tour.highlights.map((x) => (
                <p key={x}>
                  <Check size={16} />
                  {x}
                </p>
              ))}
            </div>
          </div>
          <section className="itinerary-section">
            <p className="eyebrow">{r.route}</p>
            <h2>{r.itinerary}</h2>
            <p>{r.itineraryText}</p>
            <Itinerary days={tour.itinerary} />
          </section>
        </div>
        <aside className="journey-conversion">
          <TravelImage
            src={tour.gallery[1]}
            alt={tour.title}
            role="destination"
          />
          <div>
            <p className="eyebrow">{t.builder.label}</p>
            <h3>{tour.duration} days. Your way.</h3>
            <p>{r.noPayment}</p>
            <Link className="button" href={`/build-your-trip?tour=${id}`}>
              {r.customize}
              <ArrowUpRight size={16} />
            </Link>
            <Link
              className="text-link"
              href={`/build-your-trip?tour=${id}&intent=request`}
            >
              {r.request}
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </aside>
      </section>
      <section className="gallery-section wrap">
        <div className="section-heading">
          <h2>{r.gallery}</h2>
          <span className="form-note">{r.photos}</span>
        </div>
        <Gallery photos={tour.gallery} title={tour.title} />
      </section>
      <section className="section wrap practical-layout">
        <div>
          <p className="eyebrow">{t.builder.accommodation}</p>
          <h2>{r.stay}</h2>
          <p>{tour.stay}</p>
          <Link className="text-link" href={`/build-your-trip?tour=${id}`}>
            {r.customize}
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <div>
          <h3>{r.practical}</h3>
          {tour.practical.map((x, i) => (
            <p className="practical-item" key={x}>
              <span>0{i + 1}</span>
              {x}
            </p>
          ))}
        </div>
      </section>
      <section className="wrap related-experiences">
        <div className="section-heading">
          <h2>{r.suited}</h2>
        </div>
        <ExperienceCards selected={tour.interests} />
      </section>
      <CTA />
    </>
  );
}

export function DestinationDetail({ id }: { id: string }) {
  const destination = destinations.find((x) => x.id === id);
  if (!destination) return null;
  const related = tours.filter((x) => x.visible && x.destinations.includes(id));
  return (
    <>
      <section className="detail-hero destination-detail-hero">
        <TravelImage
          src={destination.image}
          alt={destination.alt}
          role="hero"
          priority
        />
        <div className="hero-shade" />
        <div className="wrap">
          <Link className="detail-back" href="/destinations">
            ← {t.nav.destinations}
          </Link>
          <p className="eyebrow">{destination.tag}</p>
          <h1>{destination.name}</h1>
          <p>{destination.description}</p>
          <Link
            className="button light"
            href={`/build-your-trip?destination=${id}`}
          >
            {r.add}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section wrap destination-why">
        <div>
          <p className="eyebrow">{r.destinationWhy}</p>
          <h2>{destination.description}</h2>
        </div>
        <p>{destination.why}</p>
      </section>
      <section className="wrap destination-stories">
        {destination.discover.map((x, i) => (
          <article key={x.title} className={i % 2 ? "reverse" : ""}>
            <TravelImage src={x.image} alt={x.title} role="editorial" />
            <div>
              <p className="eyebrow">
                0{i + 1} / {r.places}
              </p>
              <h2>{x.title}</h2>
              <p>{x.text}</p>
              <Link
                className="text-link"
                href={`/build-your-trip?destination=${id}`}
              >
                {r.add}
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </article>
        ))}
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{r.suited}</p>
            <h2>{r.experienceTitle}</h2>
          </div>
        </div>
        <ExperienceCards selected={destination.interests} />
      </section>
      {related.length > 0 && (
        <section className="journeys section">
          <div className="wrap">
            <div className="section-heading">
              <h2>{r.suggested}</h2>
              <Link className="text-link" href="/tours">
                {t.home.allTours}
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="destination-related-journeys">
              {related.map((x) => (
                <Link key={x.id} href={`/tours/${x.id}`}>
                  <TravelImage src={x.image} alt={x.title} />
                  <div>
                    <p className="eyebrow">
                      {x.duration} {t.ui.days} · {x.style}
                    </p>
                    <h3>{x.title}</h3>
                    <span className="text-link">
                      {r.view}
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="gallery-section section wrap">
        <Gallery photos={destination.gallery} title={destination.name} />
      </section>
      <CTA />
    </>
  );
}

export function ExperiencesPage() {
  return (
    <>
      <section className="page-intro wrap">
        <p className="eyebrow">{r.experiencesPage.label}</p>
        <h1>{r.experiencesPage.title}</h1>
        <p>{r.experiencesPage.text}</p>
      </section>
      <section className="wrap experiences-page">
        <ExperienceCards all />
      </section>
      <CTA />
    </>
  );
}
