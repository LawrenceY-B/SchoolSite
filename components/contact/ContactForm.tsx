"use client";

import { useState, type FormEvent } from "react";

type Field = "name" | "email" | "message";
type Status = "idle" | "sending" | "sent" | "error";

const validate = (values: Record<Field, string>) => {
  const errors: Partial<Record<Field, string>> = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "That email doesn't look quite right.";
  if (values.message.trim().length < 10) errors.message = "A few more words, please (at least 10 characters).";
  return errors;
};

export default function ContactForm() {
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: (e.currentTarget as HTMLFormElement).company?.value ?? "" }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="flex h-full flex-col items-start justify-center gap-6 rounded-[2.5rem] bg-sun p-10">
        <p className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] font-black tracking-tight">Thank you!</p>
        <p className="text-lg">Your message is on its way. We&apos;ll get back to you within a day.</p>
        <button type="button" onClick={() => setStatus("idle")} className="font-semibold underline underline-offset-4">
          Send another message
        </button>
      </div>
    );
  }

  const input = (field: Field, label: string, type = "text") => {
    const Tag = field === "message" ? "textarea" : "input";
    return (
      <div className="relative">
        <Tag
          id={field}
          name={field}
          type={field === "message" ? undefined : type}
          rows={field === "message" ? 4 : undefined}
          placeholder=" "
          value={values[field]}
          onChange={(e: { target: { value: string } }) => {
            setValues((v) => ({ ...v, [field]: e.target.value }));
            if (errors[field]) setErrors((errs) => ({ ...errs, [field]: undefined }));
          }}
          aria-invalid={!!errors[field]}
          aria-describedby={errors[field] ? `${field}-error` : undefined}
          autoComplete={field === "message" ? "off" : field}
          className="peer block w-full resize-none border-0 border-b-2 border-ink bg-transparent px-0 pt-7 pb-3 text-xl font-semibold outline-none focus:border-blue focus-visible:outline-none aria-[invalid=true]:border-cherry"
        />
        <label
          htmlFor={field}
          className="pointer-events-none absolute top-1 left-0 text-sm font-bold tracking-[0.15em] uppercase opacity-60 transition-all duration-300 peer-placeholder-shown:top-7 peer-placeholder-shown:text-xl peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-1 peer-focus:text-sm peer-focus:tracking-[0.15em] peer-focus:uppercase"
        >
          {label}
        </label>
        {errors[field] && (
          <p id={`${field}-error`} className="mt-2 font-semibold text-cherry">
            {errors[field]}
          </p>
        )}
      </div>
    );
  };

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-8">
      {input("name", "Your name")}
      {input("email", "Email address", "email")}
      {input("message", "Your message")}
      {/* Honeypot for bots; hidden from people and assistive tech */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      {status === "error" && (
        <p role="alert" className="rounded-2xl bg-cherry/10 p-4 font-semibold text-cherry">
          Sorry, we couldn&apos;t send that just now. Please try again or call us on 024 433 1550.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-2 inline-flex items-center justify-between gap-6 self-start rounded-full bg-ink py-3 pr-3 pl-8 font-display text-lg font-medium text-cream transition-colors hover:bg-cherry disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
        <span className="grid size-12 place-items-center rounded-full bg-sun text-ink transition-transform duration-500 group-hover:rotate-[-45deg]" aria-hidden="true">
          →
        </span>
      </button>
    </form>
  );
}
