const supportedHosts = new Set([
  "aviasales.com",
  "www.aviasales.com",
  "avs.io",
  "tp.media",
]);

// Use the homepage link generated for this website in Travelpayouts.
// This is a public referral URL, never an API key or account credential.
export function aviasalesConfig(affiliateUrl?: string) {
  const configured = affiliateUrl?.trim();
  if (!configured)
    return { href: "https://www.aviasales.com/", affiliate: false };
  const url = new URL(configured);
  if (
    url.protocol !== "https:" ||
    !supportedHosts.has(url.hostname) ||
    url.username ||
    url.password ||
    url.port
  )
    throw new Error("Use an HTTPS Aviasales/Travelpayouts referral URL.");
  return { href: url.href, affiliate: true };
}

export const aviasales = aviasalesConfig(
  process.env.NEXT_PUBLIC_AVIASALES_AFFILIATE_URL,
);
