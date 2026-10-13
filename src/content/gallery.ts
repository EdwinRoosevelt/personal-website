import type { StaticImageData } from "next/image";
import photo04 from "@/assets/gallery/photo-04.jpg";
import photo01 from "@/assets/gallery/photo-01.jpg";
import photo02 from "@/assets/gallery/photo-02.jpg";
import photo07 from "@/assets/gallery/photo-07.jpg";
import photo09 from "@/assets/gallery/photo-09.jpg";
import photo14 from "@/assets/gallery/photo-14.jpg";
import photo03 from "@/assets/gallery/photo-03.jpg";
import photo05 from "@/assets/gallery/photo-05.jpg";
import photo06 from "@/assets/gallery/photo-06.jpg";
import photo08 from "@/assets/gallery/photo-08.jpg";
import photo10 from "@/assets/gallery/photo-10.jpg";
import photo11 from "@/assets/gallery/photo-11.jpg";
import photo12 from "@/assets/gallery/photo-12.jpg";
import photo13 from "@/assets/gallery/photo-13.jpg";
import photo15 from "@/assets/gallery/photo-15.jpg";
import poster03 from "@/assets/gallery/poster-03.jpg";
import poster01 from "@/assets/gallery/poster-01.jpg";
import poster02 from "@/assets/gallery/poster-02.jpg";
import poster04 from "@/assets/gallery/poster-04.jpg";
import poster05 from "@/assets/gallery/poster-05.jpg";
import poster06 from "@/assets/gallery/poster-06.jpg";
import poster07 from "@/assets/gallery/poster-07.jpg";
import poster08 from "@/assets/gallery/poster-08.jpg";
import poster09 from "@/assets/gallery/poster-09.jpg";
import logo03 from "@/assets/gallery/logo-03.jpg";
import logo01 from "@/assets/gallery/logo-01.jpg";
import logo04 from "@/assets/gallery/logo-04.jpg";
import logo02 from "@/assets/gallery/logo-02.jpg";
import art01 from "@/assets/gallery/art-01.jpg";
import art02 from "@/assets/gallery/art-02.jpg";
import art03 from "@/assets/gallery/art-03.jpg";
import art04 from "@/assets/gallery/art-04.jpg";
import art05 from "@/assets/gallery/art-05.jpg";

export const categories = ["photography", "poster", "logo", "art"] as const;
export type Category = (typeof categories)[number];

export const categoryLabels: Record<Category, string> = {
  photography: "Photographs",
  poster: "Posters",
  logo: "Logos",
  art: "Art",
};

export type Work = {
  slug: string;
  title: string;
  category: Category;
  image: StaticImageData;
  /** Frame number on the contact sheet, assigned in display order. */
  frame: number;
};

const works: Omit<Work, "frame">[] = [
  { slug: "sunrise-kodaikanal", title: "Sunrise, Kodaikanal", category: "photography", image: photo04 },
  { slug: "natya-night", title: "Natya Night", category: "photography", image: photo01 },
  { slug: "charminar-hyderabad", title: "Charminar, Hyderabad", category: "photography", image: photo02 },
  { slug: "double-decker-express", title: "Double Decker Express", category: "photography", image: photo07 },
  { slug: "blissful-green", title: "Blissful Green", category: "photography", image: photo09 },
  { slug: "god-s-own-country", title: "God's Own Country", category: "photography", image: photo14 },
  { slug: "happy-christmas", title: "Happy Christmas", category: "photography", image: photo03 },
  { slug: "soccer", title: "Soccer", category: "photography", image: photo05 },
  { slug: "gaming-nights", title: "Gaming Nights", category: "photography", image: photo06 },
  { slug: "amrita-coimbatore", title: "Amrita, Coimbatore", category: "photography", image: photo08 },
  { slug: "little-kavz", title: "Little Kavz", category: "photography", image: photo10 },
  { slug: "perfect-view", title: "Perfect View", category: "photography", image: photo11 },
  { slug: "tamil-ponnu", title: "Tamil Ponnu", category: "photography", image: photo12 },
  { slug: "anokha-nights", title: "Anokha Nights", category: "photography", image: photo13 },
  { slug: "amrita-albums", title: "Amrita Albums", category: "photography", image: photo15 },
  { slug: "remembering-avicii", title: "Remembering Avicii", category: "poster", image: poster03 },
  { slug: "laya-induction", title: "Laya Induction", category: "poster", image: poster01 },
  { slug: "wedding-invitation", title: "Wedding Invitation", category: "poster", image: poster02 },
  { slug: "bhumi-lakshya", title: "Bhumi – Lakshya", category: "poster", image: poster04 },
  { slug: "wedding-invitation-ii", title: "Wedding Invitation II", category: "poster", image: poster05 },
  { slug: "love-first-sight", title: "Love @ First Sight", category: "poster", image: poster06 },
  { slug: "arusuvai-food-stall", title: "Arusuvai Food Stall", category: "poster", image: poster07 },
  { slug: "ommalle-talks", title: "Ommalle Talks", category: "poster", image: poster08 },
  { slug: "see-you-soon", title: "See You Soon", category: "poster", image: poster09 },
  { slug: "eddy-designs", title: "Eddy Designs", category: "logo", image: logo03 },
  { slug: "aasha-scroodles", title: "Aasha Scroodles", category: "logo", image: logo01 },
  { slug: "spy-ultimate", title: "SPY Ultimate", category: "logo", image: logo04 },
  { slug: "community-square", title: "Community Square", category: "logo", image: logo02 },
  { slug: "sassy-girl", title: "Sassy Girl", category: "art", image: art01 },
  { slug: "i-can-draw-too", title: "I Can Draw Too", category: "art", image: art02 },
  { slug: "fly-high-grab", title: "Fly High & Grab", category: "art", image: art03 },
  { slug: "aasha-scroodles-art", title: "Aasha Scroodles", category: "art", image: art04 },
  { slug: "tea-decoction", title: "Tea Decoction", category: "art", image: art05 },
];

export const gallery: Work[] = works.map((w, i) => ({ ...w, frame: i + 1 }));

export function getWork(slug: string) {
  return gallery.find((w) => w.slug === slug);
}

/** Picked for the home page strip. */
export const selects = ["sunrise-kodaikanal", "remembering-avicii", "charminar-hyderabad", "fly-high-grab", "double-decker-express", "eddy-designs"]
  .map((slug) => getWork(slug)!)
  .filter(Boolean);
