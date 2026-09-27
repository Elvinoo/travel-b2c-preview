import { Detail } from "@/components/site";
import { tours } from "@/content/catalog";
import { notFound } from "next/navigation";
export function generateStaticParams() {
  return tours.filter((x) => x.visible).map((x) => ({ id: x.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return { title: tours.find((x) => x.id === id && x.visible)?.title };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!tours.some((x) => x.id === id && x.visible)) notFound();
  return <Detail kind="tours" id={id} />;
}
