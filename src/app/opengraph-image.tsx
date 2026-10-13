import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = "Edwin Roosevelt, senior developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fonts = join(process.cwd(), "src/assets/fonts");
const unbounded = await readFile(join(fonts, "Unbounded-ExtraBold.ttf"));
const martian = await readFile(join(fonts, "MartianMono-Medium.ttf"));

const paper = "#ecedea";
const ink = "#1c2238";
const blue = "#3255a4";
const pink = "#ff48b0";

/** The hero as a poster: the name overprinted in blue and pink. */
export default function OpengraphImage() {
  const name = (color: string, dx: number, dy: number, blend?: "multiply") => (
    <div
      style={{
        position: "absolute",
        left: 64 + dx,
        top: 150 + dy,
        display: "flex",
        flexDirection: "column",
        fontFamily: "Unbounded",
        fontSize: 150,
        lineHeight: 0.92,
        letterSpacing: -6,
        color,
        mixBlendMode: blend,
      }}
    >
      <span>edwin</span>
      <span>roosevelt</span>
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: paper,
          fontFamily: "Martian",
          color: ink,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            top: 56,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: 1,
            color: blue,
          }}
        >
          <span>PRINTED IN TWO INKS</span>
          <span>{site.location.toUpperCase()}</span>
        </div>
        {name(blue, 0, 0)}
        {name(pink, 8, 5, "multiply")}
        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            bottom: 52,
            display: "flex",
            justifyContent: "space-between",
            borderTop: `3px solid ${ink}`,
            paddingTop: 18,
            fontSize: 22,
          }}
        >
          <span>{site.role.toUpperCase()} · BEANSTALK</span>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: pink, alignSelf: "center" }} />
          <span>PHOTOGRAPHER & DESIGNER</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Unbounded", data: unbounded, weight: 800, style: "normal" },
        { name: "Martian", data: martian, weight: 500, style: "normal" },
      ],
    },
  );
}
