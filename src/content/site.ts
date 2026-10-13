export const site = {
  name: "Edwin Roosevelt",
  url: "https://www.edwinroosevelt.com",
  role: "Senior developer",
  location: "Kolkata, India",
  email: "b.edwinroosevelt@gmail.com",
  description:
    "Edwin Roosevelt is a senior developer in Kolkata. Mechanical engineer by degree, building for the web since 2021. Also a photographer and designer.",
  resume:
    "https://drive.google.com/file/d/1xI5ExTde9kriVnSUI9WkuehAsmC3LOFL/view?usp=drive_link",
  formspree: "https://formspree.io/f/mdobnepg",
  updated: "2026-10-13",
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/EdwinRoosevelt", handle: "EdwinRoosevelt" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/edwin-roosevelt", handle: "edwin-roosevelt" },
  { label: "Instagram", href: "https://www.instagram.com/eddy.insta.in", handle: "eddy.insta.in" },
  { label: "X", href: "https://x.com/edwinroosevelt", handle: "edwinroosevelt" },
  { label: "Facebook", href: "https://www.facebook.com/Edwinroosevelt", handle: "Edwinroosevelt" },
] as const;

/** Sections of the home page, in order. The header marks the one in view. */
export const sections = [
  { id: "top", title: "Intro", eyebrow: "Now showing" },
  { id: "about", title: "About", eyebrow: "The person" },
  { id: "career", title: "Career", eyebrow: "Tour dates" },
  { id: "projects", title: "Projects", eyebrow: "Releases" },
  { id: "gallery", title: "Gallery", eyebrow: "Prints" },
  { id: "contact", title: "Contact", eyebrow: "Bookings" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
