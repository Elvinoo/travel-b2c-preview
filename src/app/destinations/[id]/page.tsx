import { Detail } from "@/components/site";
import { destinations } from "@/content/catalog";
import { notFound } from "next/navigation";
export function generateStaticParams() {
  return destinations.map((x) => ({ id: x.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return { title: destinations.find((x) => x.id === id)?.name };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!destinations.some((x) => x.id === id)) notFound();
  return <Detail kind="destinations" id={id} />;
}
