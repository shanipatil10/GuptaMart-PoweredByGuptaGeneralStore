"use client";

import { useState } from "react";
import { Send, Loader2, Info, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Messaging is NOT connected to any service yet — there is no email
 * provider, API route or backend endpoint for contact messages. While this
 * is false the form validates input but never claims anything was sent.
 *
 * To connect it later: implement the request inside submitContactMessage()
 * below, then set this to true. Nothing else in this file needs to change.
 */
const MESSAGING_AVAILABLE = false;

/**
 * submitContactMessage
 * The single place a real submission plugs in. Expected to resolve to
 * { sent: true } on success, or throw on failure. For example:
 *
 *   const res = await fetch("<contact endpoint>", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(data),
 *   });
 *   if (!res.ok) throw new Error("Failed to send message");
 *   return { sent: true };
 */
async function submitContactMessage(data) {
  void data;

  if (!MESSAGING_AVAILABLE) {
    return { sent: false, reason: "not-configured" };
  }

  // Deliberately throws instead of returning { sent: true }: flipping the
  // flag without writing the real request must never produce a fake success.
  throw new Error("submitContactMessage is not implemented");
}

const TOPICS = [
  "Order question",
  "Product availability",
  "Payment",
  "Feedback",
  "Something else",
];

const MAX_MESSAGE_LENGTH = 1000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_ORDER = ["name", "email", "topic", "message"];

const INITIAL_VALUES = { name: "", email: "", topic: "", message: "" };

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name looks too short.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.topic) {
    errors.topic = "Please choose what your message is about.";
  }

  if (!values.message.trim()) {
    errors.message = "Please write a message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Please add a little more detail (at least 10 characters).";
  }

  return errors;
}

const FIELD_CLASSES =
  "w-full rounded-xl border-[#bfcaba] bg-white px-4 text-sm text-[#1a1c19] placeholder:text-[#8a9486] transition-colors duration-200 focus-visible:border-[#1c6d24]/50 focus-visible:ring-[#1c6d24]/20 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 motion-reduce:transition-none";

const NATIVE_FIELD_CLASSES =
  "rounded-xl border border-[#bfcaba] bg-white text-sm text-[#1a1c19] outline-none transition-colors duration-200 placeholder:text-[#8a9486] focus-visible:border-[#1c6d24]/50 focus-visible:ring-3 focus-visible:ring-[#1c6d24]/20 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 motion-reduce:transition-none";

function Field({ id, label, required = false, error, aside, children }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-[#1a1c19]">
          {label}
          {required && (
            <span className="text-[#1c6d24]" aria-hidden="true">
              {" "}*
            </span>
          )}
        </label>
        {aside}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * ContactForm
 * Controlled form with client-side validation. UI-only for now — see
 * MESSAGING_AVAILABLE above. Status values: "idle" | "submitting" |
 * "sent" | "not-sent" | "failed".
 */
export default function ContactForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function handleChange(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (status !== "idle" && status !== "submitting") setStatus("idle");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "submitting") return;

    const foundErrors = validate(values);
    setErrors(foundErrors);

    const firstInvalid = FIELD_ORDER.find((field) => foundErrors[field]);
    if (firstInvalid) {
      setStatus("idle");
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const result = await submitContactMessage(values);
      if (result.sent) {
        setValues(INITIAL_VALUES);
        setStatus("sent");
      } else {
        setStatus("not-sent");
      }
    } catch {
      setStatus("failed");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-[#bfcaba]/50 bg-white p-5 shadow-[0_8px_30px_rgba(45,66,50,0.06)] sm:p-8"
    >
      {!MESSAGING_AVAILABLE && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl bg-[#ebf7ea] p-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#1c6d24]" aria-hidden="true" />
          <p className="text-sm leading-5 text-[#40493d]">
            Online messaging isn&apos;t connected yet, so messages written here
            can&apos;t be sent to the store for now.
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Full name" required error={errors.name}>
          <Input
            id="contact-name"
            name="name"
            type="text"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={`h-11 ${FIELD_CLASSES}`}
          />
        </Field>

        <Field id="contact-email" label="Email address" required error={errors.email}>
          <Input
            id="contact-email"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={`h-11 ${FIELD_CLASSES}`}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field id="contact-topic" label="What is this about?" required error={errors.topic}>
            <select
              id="contact-topic"
              name="topic"
              value={values.topic}
              onChange={(e) => handleChange("topic", e.target.value)}
              aria-invalid={Boolean(errors.topic)}
              aria-describedby={errors.topic ? "contact-topic-error" : undefined}
              className={`h-11 w-full px-4 ${NATIVE_FIELD_CLASSES} ${
                values.topic ? "" : "text-[#8a9486]"
              }`}
            >
              <option value="" disabled>
                Choose a topic
              </option>
              {TOPICS.map((topic) => (
                <option key={topic} value={topic} className="text-[#1a1c19]">
                  {topic}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field
            id="contact-message"
            label="Message"
            required
            error={errors.message}
            aside={
              <span className="text-xs text-[#707a6c]">
                {values.message.length}/{MAX_MESSAGE_LENGTH}
              </span>
            }
          >
            <textarea
              id="contact-message"
              name="message"
              value={values.message}
              onChange={(e) => handleChange("message", e.target.value)}
              maxLength={MAX_MESSAGE_LENGTH}
              rows={5}
              placeholder="Tell us how we can help"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              className={`w-full resize-y px-4 py-3 ${NATIVE_FIELD_CLASSES}`}
            />
          </Field>
        </div>
      </div>

      {status === "sent" && (
        <p
          role="status"
          className="mt-6 flex items-start gap-2 rounded-xl bg-[#ebf7ea] px-4 py-3 text-sm text-[#1c6d24]"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          Your message has been sent.
        </p>
      )}
      {status === "not-sent" && (
        <p
          role="status"
          className="mt-6 flex items-start gap-2 rounded-xl bg-[#f4f4ee] px-4 py-3 text-sm text-[#40493d]"
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#1c6d24]" aria-hidden="true" />
          Your message has not been sent. Sending messages from this page isn&apos;t
          available yet.
        </p>
      )}
      {status === "failed" && (
        <p
          role="alert"
          className="mt-6 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          Something went wrong and your message was not sent. Please try again.
        </p>
      )}

      <div className="mt-6 flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-full bg-[#1c6d24] px-6 text-sm font-semibold text-white hover:bg-[#155a1d] focus-visible:border-[#1c6d24] focus-visible:ring-[#1c6d24]/40 sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
              Sending...
            </>
          ) : (
            <>
              <Send aria-hidden="true" />
              Send message
            </>
          )}
        </Button>
      </div>
    </form>
  );
}