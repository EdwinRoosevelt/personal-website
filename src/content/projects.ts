import type { StaticImageData } from "next/image";
import manolai from "@/assets/projects/manolai_banner.png";
import bitbash from "@/assets/projects/bitbash-banner.png";
import timetabler from "@/assets/projects/timetabler_banner.png";
import logparser from "@/assets/projects/logparser_banner.png";
import desk from "@/assets/projects/desk_setup_banner.png";

export type Project = {
  name: string;
  summary: string;
  stack: string[];
  href: string | null;
  /** Shown instead of a link when the project isn't reachable. */
  status?: string;
  image: StaticImageData;
  size: "major" | "mini";
};

export const projects: Project[] = [
  {
    name: "Manolai",
    summary:
      "Made-to-order wedding websites for Indian weddings, each at the couple's own address. Before the day, guests open a sealed-envelope invitation with every event and venue, RSVPs, wishes and a countdown; when the day arrives the page turns on its own into a keepsake album.",
    stack: ["Next.js", "React", "TypeScript"],
    href: "https://manolai.com",
    image: manolai,
    size: "major",
  },
  {
    name: "TimeTabler",
    summary:
      "Builds colour-coded timetables for every class and teacher in a school in a few minutes, free.",
    stack: ["Next.js", "Bootstrap"],
    href: "https://timetabler.edwinroosevelt.com",
    image: timetabler,
    size: "major",
  },
  {
    name: "BitBash",
    summary: "Classic and modern board games to play in the browser, anytime.",
    stack: [],
    href: null,
    status: "Site offline",
    image: bitbash,
    size: "major",
  },
  {
    name: "Log Parser",
    summary: "Upload a .log file and get its Error and Warn lines pulled out and grouped.",
    stack: ["NestJS", "React", "Vite"],
    href: "https://logparser.edwinroosevelt.com",
    image: logparser,
    size: "mini",
  },
  {
    name: "Desk Setup",
    summary: "Pick items for a desk, then drag and drop them into place.",
    stack: ["React"],
    href: "https://desk-setup.edwinroosevelt.com",
    image: desk,
    size: "mini",
  },
];
