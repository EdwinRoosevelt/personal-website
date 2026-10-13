"use client";

import { useState } from "react";
import { site } from "@/content/site";

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: "sending" });
    try {
      const res = await fetch(site.formspree, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { errors?: { message: string }[] } | null;
        throw new Error(data?.errors?.map((x) => x.message).join(" ") || `The server answered ${res.status}.`);
      }
      form.reset();
      setStatus({ state: "sent" });
    } catch (err) {
      setStatus({
        state: "error",
        message: err instanceof TypeError ? "Couldn't reach the server. Check your connection." : (err as Error).message,
      });
    }
  }

  if (status.state === "sent") {
    return (
      <div role="status" className="border border-ink p-8">
        <p className="annot !text-redline">Received</p>
        <p className="display mt-2 text-4xl">Message sent</p>
        <p className="mt-3 text-lead">Thanks for writing. I&rsquo;ll reply to the email you gave.</p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className="btn mt-6">
          Write another
        </button>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" aria-describedby="form-status">
      <Field label="Your name" name="name" autoComplete="name" />
      <Field label="Your email" name="email" type="email" autoComplete="email" />
      <label className="sm:col-span-2">
        <span className="annot mb-1.5 block !text-ink">Message</span>
        <textarea
          name="message"
          required
          rows={6}
          className="block w-full resize-y border border-ink bg-transparent px-3 py-2.5 placeholder:text-lead/70 focus:bg-paper-2 focus:outline-2 focus:outline-redline"
          placeholder="What are you working on?"
        />
      </label>
      {/* Formspree's honeypot field: hidden from people, filled in by bots. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={sending} className="btn btn-solid disabled:opacity-60">
          {sending ? "Sending…" : "Send message"}
        </button>
        <p id="form-status" role="alert" className="text-sm text-redline">
          {status.state === "error" && `Message not sent. ${status.message}`}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete: string;
}) {
  return (
    <label>
      <span className="annot mb-1.5 block !text-ink">{label}</span>
      <input
        type={type}
        name={name}
        required
        autoComplete={autoComplete}
        className="block h-11 w-full border border-ink bg-transparent px-3 focus:bg-paper-2 focus:outline-2 focus:outline-redline"
      />
    </label>
  );
}
