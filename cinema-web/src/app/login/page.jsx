// src/app/login/page.jsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const { user, login, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      router.replace("/");
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-dark to-black">
      <div className="w-full max-w-md rounded-2xl bg-black/70 p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-2xl font-bold">Đăng nhập Cinema</h1>

        {error && (
          <div className="mb-4 rounded bg-red-500/20 px-3 py-2 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm">Email</label>
            <input
              type="email"
              className="w-full rounded bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">Mật khẩu</label>
            <input
              type="password"
              className="w-full rounded bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded bg-primary py-2 text-sm font-semibold disabled:opacity-70"
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
