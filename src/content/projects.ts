import type { StaticImageData } from "next/image";
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
  image: StaticImageData | null;
  size: "major" | "mini";
};

export const projects: Project[] = [
  {
    name: "Edz Central",
    summary:
      "A private life record: diary, trips, photos and spending in one timeline. Bank alerts become transactions, and receipt emails fill in what each payment was for. Ships with Life Record, an Android app.",
    stack: ["Android", "MongoDB Atlas", "AWS S3", "Gmail API", "Claude API"],
    href: "/edz-central/",
    image: null,
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
