"use client";

import { useState, useRef, useEffect } from "react";

const CODE_LENGTH = 6;
const RESEND_COOLDOWN = 30; // seconds

export default function page() {
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(""));
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setInterval(() => {
      setCooldown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  function handleChange(index, value) {
    const clean = value.replace(/[^0-9]/g, "");
    if (!clean) {
      const next = [...digits];
      next[index] = "";
      setDigits(next);
      return;
    }

    // Handle paste of a full code into one box
    if (clean.length > 1) {
      const next = [...digits];
      clean
        .slice(0, CODE_LENGTH - index)
        .split("")
        .forEach((char, i) => {
          next[index + i] = char;
        });
      setDigits(next);
      const lastFilled = Math.min(index + clean.length, CODE_LENGTH - 1);
      inputRefs.current[lastFilled]?.focus();
      return;
    }

    const next = [...digits];
    next[index] = clean;
    setDigits(next);

    if (index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const code = digits.join("");

    if (code.length !== CODE_LENGTH) {
      setStatus("error");
      setErrorMessage(`Enter all ${CODE_LENGTH} digits.`);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        throw new Error("Invalid code");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage("That code didn't work. Check it and try again.");
      setDigits(Array(CODE_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    }
  }

  async function handleResend() {
    if (cooldown > 0) return;
    setCooldown(RESEND_COOLDOWN);
    try {
      await fetch("/api/auth/resend-code", { method: "POST" });
    } catch (err) {
      // Silently ignore; the cooldown still protects against spamming.
    }
  }

  return (
    <main className="min-h-screen bg-[#0B0F14] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        {/* Signature mark: same keyhole motif, filled to show "unlocking" */}
        <div className="mb-8 flex justify-center">
          <div
            aria-hidden="true"
            className="relative h-12 w-12 rounded-full border border-[#3A4451] flex items-center justify-center"
          >
            <div className="h-2.5 w-2.5 rounded-full bg-[#7DD3C0]" />
            <div className="absolute bottom-2.5 h-3 w-1 bg-[#7DD3C0]" />
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#7DD3C0] font-mono mb-2">
            Verification
          </p>
          <h1 className="text-2xl font-semibold text-[#E8ECEF] tracking-tight">
            Enter your code
          </h1>
          <p className="mt-2 text-sm text-[#8A94A3] leading-relaxed">
            We sent a {CODE_LENGTH}-digit code to your email. It expires in
            10 minutes.
          </p>
        </div>

        {status === "success" ? (
          <div className="rounded-lg border border-[#2A3441] bg-[#111721] px-5 py-6 text-center">
            <p className="text-sm text-[#E8ECEF] font-medium mb-1">
              Verified
            </p>
            <p className="text-sm text-[#8A94A3] leading-relaxed">
              Your code checked out. You&apos;re all set.
            </p>
            <a
              href="/login"
              className="mt-5 inline-block text-sm text-[#7DD3C0] hover:text-[#9AE0D2] transition-colors"
            >
              Continue to sign in
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <div className="flex justify-between gap-2">
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={CODE_LENGTH}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    aria-label={`Digit ${index + 1} of ${CODE_LENGTH}`}
                    className="w-full aspect-square rounded-md bg-[#111721] border border-[#2A3441] text-center text-lg font-mono text-[#E8ECEF] outline-none focus:border-[#7DD3C0] focus:ring-1 focus:ring-[#7DD3C0] transition-colors"
                  />
                ))}
              </div>
              {status === "error" && errorMessage && (
                <p className="mt-3 text-xs text-[#E08787] text-center" role="alert">
                  {errorMessage}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-md bg-[#7DD3C0] text-[#0B0F14] text-sm font-medium py-2.5 hover:bg-[#9AE0D2] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {status === "loading" ? "Verifying…" : "Verify code"}
            </button>

            <p className="text-center text-sm text-[#8A94A3] pt-1">
              Didn&apos;t get it?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={cooldown > 0}
                className="text-[#7DD3C0] hover:text-[#9AE0D2] disabled:text-[#4A5563] disabled:cursor-not-allowed transition-colors"
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
              </button>
            </p>
          </form>
        )}
      </div>
    </main>
  );
}