"use client";

import { useState } from "react";

export default function page() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setStatus("error");
      setErrorMessage("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      // Replace with your actual API route, e.g. /api/auth/forgot-password
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage("Something went wrong. Try again in a moment.");
    }
  }

  return (
    <main className="min-h-screen bg-[#e9ebf0]  flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl ">
        {/* Signature mark: a keyhole formed from two overlapping strokes */}
        <div className="mb-8 flex justify-center">
          <div
            aria-hidden="true"
            className="relative h-12 w-12 rounded-full border border-[#3A4451] flex items-center justify-center"
          >
            <div className="h-2.5 w-2.5 rounded-full bg-black" />
            <div className="absolute bottom-2.5 h-3 w-1 bg-black rotate-0" />
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#7DD3C0] font-mono mb-2">
            Account recovery
          </p>
          <h1 className="text-2xl font-semibold text-gray-500 tracking-tight">
            Reset your password
          </h1>
          <p className="mt-2 text-sm text-[#8A94A3] leading-relaxed">
            Enter the email on your account and we&apos;ll send a code to
            reset your gmail.
          </p>
        </div>

        {status === "success" ? (
          <div className="rounded-lg border border-[#2A3441] bg- px-5 py-6 text-center">
            <p className="text-sm text-[#E8ECEF] font-medium mb-1">
              Check your inbox
            </p>
            <p className="text-sm text-[#8A94A3] leading-relaxed">
              If an account exists for{" "}
              <span className="text-[#E8ECEF]">{email}</span>, a reset code
              is on its way.
            </p>
            <a
              href="/login"
              className="mt-5 inline-block text-sm text-orange-600 hover:text-[#9AE0D2] transition-colors"
            >
              Back to sign in
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono uppercase tracking-wider text-[#8A94A3] mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="you@example.com"
                className="w-full rounded-md bg-gray-50 border border-[#7DD3C0] px-4 py-2.5 text-sm text-black placeholder:text-gray-400 outline-none focus:border-[#7DD3C0] focus:ring-1 focus:ring-[#7DD3C0] transition-colors"
              />
              {status === "error" && errorMessage && (
                <p className="mt-2 text-xs text-[#E08787]" role="alert">
                  {errorMessage}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full cursor-pointer rounded-md bg-parrot-400 text-white text-sm font-medium py-2.5 hover:bg-[#9AE0D2] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {status === "loading" ? "Sending Code" : "Send reset Code"}
            </button>

            <p className="text-center text-sm text-[#8A94A3] pt-2">
              Remembered it after all?{" "}
              <a
                href="/login"
                className="text-[#7DD3C0] hover:text-[#9AE0D2] transition-colors"
              >
                Back to sign in
              </a>
            </p>
          </form>
        )}
      </div>
    </main>
  );
}