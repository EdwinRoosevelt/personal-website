import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";

test.describe("home", () => {
  test("renders every sheet in order", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Edwin\s*Roosevelt/);
    const titles = await page.locator("section h2").allTextContents();
    expect(titles).toEqual(["About", "Career", "Skills", "Projects", "Gallery", "Contact"]);
  });

  test("title block follows the section in view", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Site" });
    await page.evaluate(() => document.getElementById("career")!.scrollIntoView());
    await expect(nav).toContainText("Career");
    await expect(nav).toContainText("3/7");
  });

  test("sheet index opens, navigates and closes", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Index" }).click();
    const dialog = page.getByRole("dialog", { name: "Sheet index" });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("link", { name: /Projects/ }).click();
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(/#projects$/);
  });

  test("theme toggle switches and persists", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("links Edz Central's privacy policy from the home page", async ({ page }) => {
    // Google's OAuth verification checks the home page links to the policy.
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Edz Central privacy policy" })).toHaveAttribute(
      "href",
      "/edz-central/privacy/",
    );
  });
});

test.describe("contact form", () => {
  test("sends to Formspree and confirms", async ({ page }) => {
    let body = "";
    await page.route("https://formspree.io/**", async (route) => {
      body = route.request().postData() ?? "";
      await route.fulfill({ json: { ok: true } });
    });
    await page.goto("/#contact");
    await page.getByLabel("Your name").fill("Ada");
    await page.getByLabel("Your email").fill("ada@example.com");
    await page.getByLabel("Message").fill("Hello there");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Message sent")).toBeVisible();
    expect(body).toContain("ada@example.com");
  });

  test("explains a failed send", async ({ page }) => {
    await page.route("https://formspree.io/**", (route) =>
      route.fulfill({ status: 422, json: { errors: [{ message: "Email is invalid." }] } }),
    );
    await page.goto("/#contact");
    await page.getByLabel("Your name").fill("Ada");
    await page.getByLabel("Your email").fill("ada@example.com");
    await page.getByLabel("Message").fill("Hello");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.locator("#form-status")).toHaveText("Message not sent. Email is invalid.");
  });
});

test.describe("gallery", () => {
  test("filters by type", async ({ page }) => {
    await page.goto("/gallery/");
    const items = page.locator("main li a[href^='/gallery/']");
    await expect(items).toHaveCount(33);
    await page.getByRole("button", { name: /Logos/ }).click();
    await expect(items).toHaveCount(4);
  });

  test("opens a work and steps with the arrow keys", async ({ page, isMobile }) => {
    await page.goto("/gallery/");
    await page.getByRole("link", { name: /Natya Night/ }).click();
    await expect(page).toHaveURL(/\/gallery\/natya-night\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Natya Night");
    if (!isMobile) {
      await page.keyboard.press("ArrowRight");
      await expect(page).toHaveURL(/\/gallery\/charminar-hyderabad\/$/);
    }
  });

  test("unknown work is a 404", async ({ request }) => {
    expect((await request.get("/gallery/not-a-work/")).status()).toBe(404);
  });
});

test.describe("Edz Central pages (registered with Google OAuth)", () => {
  for (const [url, file] of [
    ["/edz-central/", "public/edz-central/index.html"],
    ["/edz-central/privacy/", "public/edz-central/privacy/index.html"],
  ]) {
    test(`${url} serves the reviewed HTML unchanged`, async ({ request }) => {
      const res = await request.get(url);
      expect(res.status()).toBe(200);
      expect(await res.text()).toBe(await readFile(file, "utf8"));
    });
  }

  test("assets referenced by the pages resolve", async ({ page }) => {
    const failed: string[] = [];
    page.on("response", (r) => r.status() >= 400 && failed.push(r.url()));
    await page.goto("/edz-central/privacy/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Privacy policy");
    await page.getByRole("link", { name: "Edz Central" }).click();
    await expect(page).toHaveURL(/\/edz-central\/$/);
    expect(failed.filter((u) => !u.includes("fonts.g"))).toEqual([]);
  });
});

test("old URLs redirect", async ({ request }) => {
  const res = await request.get("/index.html", { maxRedirects: 0 });
  expect(res.status()).toBe(308);
  expect(res.headers().location).toBe("/");
});

test("unknown page shows the 404 sheet", async ({ page }) => {
  const res = await page.goto("/does-not-exist/");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
});
