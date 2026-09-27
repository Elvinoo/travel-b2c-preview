"use client";
import Link from "next/link";
import { InterestLinks } from "./interest-links";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TripProvider } from "./trip-state";
import { RefinedHome, TourDetail, DestinationDetail } from "./discovery";
import { TravelImage } from "./travel-image";
import { photographyNote } from "@/content/photography";
import { refinement as r } from "@/content/refinement";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Globe2,
  MoveUpRight,
  Compass,
  Check,
  ChevronDown,
} from "lucide-react";
import { brand } from "@/config/brand";
import { publicAsset } from "@/config/paths";
import { en as t } from "@/content/en";
import {
  destinations,
  tours,
  images,
  countries,
  interests,
} from "@/content/catalog";
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const nav = [
    ["/destinations", t.nav.destinations],
    ["/tours", t.nav.tours],
    ["/experiences", t.nav.experiences],
    ["/about", t.nav.about],
    ["/contact", t.nav.contact],
  ];
  return (
    <TripProvider>
      <a className="skip-link" href="#main">
        {t.helpers.skip}
      </a>
      <header className="header">
        <Link className="wordmark" href="/" onClick={() => setOpen(false)}>
          {brand.logo ? (
            <img src={publicAsset(brand.logo)} alt={brand.name} />
          ) : (
            <>
              <Compass size={24} strokeWidth={1.4} />
              <span>{brand.name}</span>
            </>
          )}
        </Link>
        <nav
          id="main-navigation"
          className={open ? "navigation open" : "navigation"}
          aria-label={t.helpers.navLabel}
        >
          {nav.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                path === href || path.startsWith(href + "/")
                  ? "page"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            className="button mobile-build"
            href="/build-your-trip"
            onClick={() => setOpen(false)}
          >
            {t.nav.build}
            <ArrowUpRight size={17} />
          </Link>
        </nav>
        <div className="header-actions">
          <span className="language" title={t.helpers.language}>
            <Globe2 size={16} /> EN
          </span>
          <Link className="button header-build" href="/build-your-trip">
            {t.nav.build}
            <ArrowUpRight size={16} />
          </Link>
          <button
            className="menu-button"
            aria-label={open ? t.ui.close : t.ui.menu}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">{children}</main>
      <Footer />
    </TripProvider>
  );
}
export function CTA() {
  return (
    <section className="cta wrap">
      <div>
        <p className="eyebrow">{t.cta.label}</p>
        <h2>{t.cta.title}</h2>
        <p>{t.cta.text}</p>
      </div>
      <Link className="button light" href="/build-your-trip">
        {r.build}
        <ArrowUpRight size={19} />
      </Link>
      <Compass className="cta-compass" size={230} strokeWidth={0.5} />
    </section>
  );
}
function Footer() {
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        <div>
          <Link className="wordmark" href="/">
            <Compass size={22} />
            {brand.name}
          </Link>
          <p>{t.footer.description}</p>
        </div>
        <div>
          <h4>{t.footer.explore}</h4>
          <Link href="/destinations">{t.nav.destinations}</Link>
          <Link href="/tours">{t.nav.tours}</Link>
          <Link href="/experiences">{t.nav.experiences}</Link>
          <Link href="/about">{t.nav.about}</Link>
        </div>
        <div>
          <h4>{t.footer.planning}</h4>
          <Link href="/build-your-trip">{t.nav.build}</Link>
          <Link href="/contact">{t.nav.contact}</Link>
          {brand.email && <a href={`mailto:${brand.email}`}>{brand.email}</a>}
          {brand.phone && <a href={`tel:${brand.phone}`}>{brand.phone}</a>}
          {Object.entries(brand.social).map(([name, url]) => (
            <a key={name} href={url}>
              {name}
            </a>
          ))}
        </div>
        <div className="footer-note">
          <p>{t.footer.note}</p>
          <span>{t.footer.prototype}</span>
          <small className="photography-note">{photographyNote}</small>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {brand.name}. {t.footer.rights}
        </span>
        <span>{brand.legal}</span>
        <Link href="/privacy">
          {t.footer.privacy}
          <ArrowUpRight size={12} />
        </Link>
      </div>
    </footer>
  );
}
export function DestinationCards({ all = false }: { all?: boolean }) {
  return (
    <div className="destination-grid">
      {destinations.slice(0, all ? destinations.length : 3).map((d, i) => (
        <Link
          className="destination-card"
          key={d.id}
          href={`/destinations/${d.id}`}
        >
          <TravelImage src={d.image} alt={d.alt} role="destination" />
          <div className="image-shade" />
          <span className="destination-number">0{i + 1}</span>
          <div className="destination-copy">
            <span className="eyebrow">{d.tag}</span>
            <h3>{d.name}</h3>
            <span className="round-arrow">
              <ArrowUpRight size={22} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
export function TourCards({ filter = "All journeys" }: { filter?: string }) {
  return (
    <div className="tour-grid">
      {tours
        .filter(
          (x) =>
            x.visible &&
            (filter === t.ui.all ||
              x.style === filter ||
              x.interests.includes(filter)),
        )
        .map((tour) => (
          <Link className="tour-card" key={tour.id} href={`/tours/${tour.id}`}>
            <div className="tour-image">
              <TravelImage src={tour.image} alt={tour.title} role="journey" />
              <span className="image-tag">{tour.style}</span>
              <span className="tour-save">
                <ArrowUpRight size={20} />
              </span>
            </div>
            <div className="tour-meta">
              <span>
                {tour.duration} {t.ui.days}
              </span>
              <span>{tour.places}</span>
            </div>
            <h3>{tour.title}</h3>
            <p>{tour.description}</p>
            <span className="text-link">
              {r.view}
              <ArrowUpRight size={15} />
            </span>
          </Link>
        ))}
    </div>
  );
}
export function Home() {
  return <RefinedHome />;
}
export function Listing({ kind }: { kind: "destinations" | "tours" }) {
  const [filter, setFilter] = useState(t.ui.all);
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get(
      "interest",
    );
    if (requested && interests.includes(requested)) setFilter(requested);
  }, []);
  const copy = t.pages[kind];
  return (
    <>
      <section className="page-intro wrap">
        <p className="eyebrow">{copy.label}</p>
        <h1>{copy.title}</h1>
        <p>{copy.text}</p>
      </section>
      <section className="wrap listing">
        {kind === "destinations" ? (
          <>
            <div className="listing-label">
              <span>{countries[0].name}</span>
              <span>{t.helpers.firstChapter}</span>
            </div>
            <DestinationCards all />
            <div className="future-destinations">
              <p className="eyebrow">{t.helpers.horizon}</p>
              <p>
                {countries
                  .filter((x) => !x.active)
                  .map((x, i) => (
                    <span className="future-country" key={x.id}>
                      {i > 0 && <span>·</span>}
                      {x.name}
                    </span>
                  ))}
              </p>
              <small>
                {t.ui.coming} — {t.helpers.unavailable}
              </small>
            </div>
          </>
        ) : (
          <>
            <div className="filters" aria-label="Filter journeys">
              {[
                t.ui.all,
                ...new Set(tours.filter((x) => x.visible).map((x) => x.style)),
                "Nature",
                ...(interests.includes(filter) &&
                !["Culture", "Adventure", "City break", "Nature"].includes(
                  filter,
                )
                  ? [filter]
                  : []),
              ].map((x) => (
                <button
                  className={filter === x ? "active" : ""}
                  aria-pressed={filter === x}
                  onClick={() => setFilter(x)}
                  key={x}
                >
                  {x}
                </button>
              ))}
            </div>
            <TourCards filter={filter} />
          </>
        )}
      </section>
      <CTA />
    </>
  );
}
export function About() {
  return (
    <>
      <section className="page-intro wrap">
        <p className="eyebrow">{t.pages.about.label}</p>
        <h1>{t.pages.about.title}</h1>
        <p>{t.pages.about.text}</p>
      </section>
      <section className="about-image wrap">
        <TravelImage
          src={images.village}
          alt="Sheki caravanserai courtyard"
          role="editorial"
        />
        <span>{t.helpers.wonder}</span>
      </section>
      <section className="section wrap about-values">
        <p className="about-body">{t.about.body}</p>
        <div>
          {t.about.values.map((x, i) => (
            <article key={x.title}>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{x.title}</h3>
              <p>{x.text}</p>
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="page-intro wrap">
        <p className="eyebrow">{t.pages.contact.label}</p>
        <h1>{t.pages.contact.title}</h1>
        <p>{t.pages.contact.text}</p>
      </section>
      <section className="contact-layout wrap">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label>
            {t.contact.name}
            <input
              required
              name="name"
              autoComplete="name"
              placeholder="Alex Morgan"
            />
          </label>
          <label>
            {t.contact.email}
            <input
              required
              name="email"
              type="email"
              autoComplete="email"
              placeholder="alex@example.com"
            />
          </label>
          <label>
            {t.contact.message}
            <textarea
              required
              name="message"
              rows={5}
              placeholder={t.helpers.messagePlaceholder}
            />
          </label>
          <p className="form-note">{t.helpers.messageDemo}</p>
          <button className="button" type="submit">
            {t.contact.send}
            <ArrowUpRight size={18} />
          </button>
          {sent && (
            <p role="status" className="success-message">
              {t.contact.success}
            </p>
          )}
        </form>
        <aside>
          <Compass size={40} strokeWidth={1} />
          <h2>{t.contact.info}</h2>
          <p>{t.contact.infoText}</p>
          <Link className="text-link" href="/build-your-trip">
            {t.contact.build}
            <ArrowUpRight size={17} />
          </Link>
        </aside>
      </section>
    </>
  );
}
export function Detail({
  kind,
  id,
}: {
  kind: "destinations" | "tours";
  id: string;
}) {
  return kind === "tours" ? (
    <TourDetail id={id} />
  ) : (
    <DestinationDetail id={id} />
  );
}
