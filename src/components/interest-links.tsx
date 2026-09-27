import Link from "next/link";
import {
  Landmark,
  Mountain,
  Utensils,
  Wine,
  Leaf,
  Camera,
  ArrowUpRight,
} from "lucide-react";
import { en as t } from "@/content/en";
import { interests } from "@/content/catalog";

const collection = [
  { index: 0, icon: Landmark },
  { index: 3, icon: Mountain },
  { index: 5, icon: Utensils },
  { index: 6, icon: Wine },
  { index: 2, icon: Leaf },
  { index: 10, icon: Camera },
];

export function InterestLinks() {
  return (
    <div className="experience-links">
      <p className="eyebrow">{t.helpers.experienceHeading}</p>
      <div>
        {collection.map(({ index, icon: Icon }) => (
          <Link
            key={index}
            href={`/build-your-trip?interest=${encodeURIComponent(interests[index])}`}
          >
            <Icon size={22} strokeWidth={1.3} />
            <span>{interests[index]}</span>
            <ArrowUpRight size={13} />
          </Link>
        ))}
      </div>
    </div>
  );
}
