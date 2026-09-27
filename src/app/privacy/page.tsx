import { brand } from "@/config/brand";
export const metadata = { title: "Privacy & your request" };
export default function Page() {
  return (
    <section className="page-intro wrap privacy">
      <p className="eyebrow">DESIGN PREVIEW</p>
      <h1>Privacy & your request.</h1>
      <p>
        This {brand.name} prototype does not send or store form submissions.
        Details entered in the trip builder are held in browser memory and are
        cleared when the page is reloaded. No online payments or automatic
        booking confirmations are provided.
      </p>
      <p>
        Illustrative editorial imagery is served from this website. Typography
        loads from Google Fonts, which receives standard browser connection
        information. Before launch, a complete privacy policy, contact details
        and the live request handling process must be provided.
      </p>
    </section>
  );
}
