import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = "Edwin Roosevelt, senior developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fonts = join(process.cwd(), "src/assets/fonts");
const barlow = await readFile(join(fonts, "BarlowCondensed-SemiBold.ttf"));
const plex = await readFile(join(fonts, "IBMPlexMono-Regular.ttf"));

const paper = "#e7ece9";
const ink = "#1e2226";
const lead = "#59626b";
const redline = "#c0301f";
const construction = "rgba(140,196,216,0.45)";

export default function OpengraphImage() {
  const cells = [
    ["Drawn by", "E. Roosevelt"],
    ["Title", site.role],
    ["Location", site.location],
    ["Rev", site.revision],
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: paper,
          backgroundImage: `linear-gradient(to right, ${construction} 1px, transparent 1px), linear-gradient(to bottom, ${construction} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          padding: 24,
          fontFamily: "Plex",
          color: ink,
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", border: `2px solid ${ink}` }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 64px" }}>
            <div style={{ display: "flex", alignItems: "center", color: redline, fontSize: 18, letterSpacing: 2 }}>
              <div style={{ width: 2, height: 22, background: redline }} />
              <div style={{ flex: 1, height: 2, background: redline }} />
              <div style={{ padding: "0 16px" }}>MAR 2021 → TODAY · BUILDING FOR THE WEB</div>
              <div style={{ flex: 1, height: 2, background: redline }} />
              <div style={{ width: 2, height: 22, background: redline }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "Barlow", fontSize: 200, lineHeight: 0.86, marginTop: 18 }}>
              <span>EDWIN</span>
              <span>ROOSEVELT</span>
            </div>
          </div>
          <div style={{ display: "flex", borderTop: `2px solid ${ink}`, height: 92, background: paper }}>
            {cells.map(([label, value], i) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "0 24px",
                  flex: i === 1 ? 1.4 : 1,
                  borderLeft: i === 0 ? "none" : `1px solid ${lead}`,
                }}
              >
                <span style={{ fontSize: 14, color: lead, letterSpacing: 1.5 }}>{label.toUpperCase()}</span>
                <span style={{ fontSize: 24, marginTop: 6 }}>{value.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Barlow", data: barlow, weight: 600, style: "normal" },
        { name: "Plex", data: plex, weight: 400, style: "normal" },
      ],
    },
  );
}
