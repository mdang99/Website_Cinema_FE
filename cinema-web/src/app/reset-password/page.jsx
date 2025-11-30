"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { validateResetPassword } from "../../../utils/validateResetPassword";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { resetPassword, loading } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const msg = validateResetPassword(newPassword);
    if (msg) {
      setError(msg);
      return;
    }

    try {
      await resetPassword({
        token,
        newPassword,
      });

      router.replace("/login");
    } catch (err) {
      setError(err.message || "Reset mật khẩu thất bại");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-dark to-black">
      <div className="w-full max-w-md rounded-2xl bg-black/70 p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Đặt lại mật khẩu
        </h1>

        {error && (
          <div className="mb-4 rounded bg-red-500/20 px-3 py-2 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm">Mật khẩu mới</label>
            <input
              type="password"
              className="w-full rounded bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-primary"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded bg-primary py-2 text-sm font-semibold disabled:opacity-70"
          >
            {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
          </button>
        </form>
      </div>
    </div>
  );
}
