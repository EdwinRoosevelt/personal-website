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
  revision: "2.2",
  issued: "2026-10-15",
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/EdwinRoosevelt", handle: "EdwinRoosevelt" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/edwin-roosevelt", handle: "edwin-roosevelt" },
  { label: "Instagram", href: "https://www.instagram.com/eddy.insta.in", handle: "eddy.insta.in" },
  { label: "X", href: "https://x.com/edwinroosevelt", handle: "edwinroosevelt" },
  { label: "Facebook", href: "https://www.facebook.com/Edwinroosevelt", handle: "Edwinroosevelt" },
] as const;

/** Sections of the home page, in order. The title block tracks which one is in view. */
export const sheets = [
  { id: "top", title: "Introduction", drafting: "General arrangement" },
  { id: "about", title: "About", drafting: "General notes" },
  { id: "career", title: "Career", drafting: "Revision history" },
  { id: "projects", title: "Projects", drafting: "Assemblies" },
  { id: "gallery", title: "Gallery", drafting: "Field photographs" },
  { id: "contact", title: "Contact", drafting: "Issue for contact" },
] as const;

export type SheetId = (typeof sheets)[number]["id"];
