// src/app/signup/page.jsx
"use client";

import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validateSignup } from "../../../utils/validateSignup";

export default function SignupPage() {
  const { user, signup, loading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const errorMessage = validateSignup(form);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    try {
      await signup(form);
      router.replace("/");
    } catch (err) {
      setError(err.message || "Đăng ký thất bại");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-dark to-black">
      <div className="w-full max-w-md rounded-2xl bg-black/70 p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Đăng ký tài khoản
        </h1>

        {error && (
          <div className="mb-4 rounded bg-red-500/20 px-3 py-2 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm">Tên</label>
            <input
              className="w-full rounded bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-primary"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">Email</label>
            <input
              type="email"
              className="w-full rounded bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-primary"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">Mật khẩu</label>
            <input
              type="password"
              className="w-full rounded bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-primary"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded bg-primary py-2 text-sm font-semibold disabled:opacity-70"
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>
      </div>
    </div>
  );
}
