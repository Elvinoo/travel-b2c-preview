import { Builder } from "@/components/builder";
import { Suspense } from "react";
export const metadata = { title: "Build your trip" };
export default function Page() {
  return (
    <Suspense fallback={<div className="wrap section" aria-busy="true" />}>
      <Builder />
    </Suspense>
  );
}
