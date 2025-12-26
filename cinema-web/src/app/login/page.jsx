// src/app/login/page.jsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
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
    <div className="flex  flex-col min-h-screen items-center justify-center bg-gradient-to-b from-black via-dark to-black">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 lg:gap-3 group">
        <div className="relative">
          <span className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-xl lg:text-2xl font-black text-white shadow-lg shadow-red-600/30 group-hover:shadow-red-600/50 transition-all group-hover:scale-105">
            C
          </span>
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-30 blur transition-opacity" />
        </div>
        <span className="hidden sm:block text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Cinema
        </span>
      </Link>
      <div className="w-full max-w-md rounded-2xl bg-black/70 p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Đăng nhập Cinema
        </h1>

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
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-400">Or</span>
        </div>
        <div className="mt-4 text-center flex justify-center gap-4">
          {" "}
          <a
            href="/signup"
            className="block w-[100%] bg-gray-800 p-2 rounded hover:bg-gray-700-text hover:text-white text-sm text-red-500"
          >
            <FontAwesomeIcon icon={faGoogle} /> Đăng nhập với Google
          </a>
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-400">Bạn chưa có tài khoản? </span>
          <a href="/signup" className="text-sm text-red-500 hover:underline">
            Đăng ký ngay
          </a>
        </div>
      </div>
    </div>
  );
}
