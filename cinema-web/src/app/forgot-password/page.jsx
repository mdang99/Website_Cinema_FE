"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ForgotPasswordForm() {
  const { forgotPassword, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Vui lòng nhập email");
      return;
    }

    try {
      await forgotPassword(email);
      setSuccess("Vui lòng kiểm tra email để đặt lại mật khẩu");
    } catch (err) {
      setError(err.message || "Không thể gửi email khôi phục");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-500 text-sm">{success}</div>}

      <input
        type="email"
        placeholder="Nhập email"
        className="w-full rounded bg-white/5 px-3 py-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-primary py-2 disabled:opacity-70"
      >
        {loading ? "Đang gửi..." : "Gửi link khôi phục"}
      </button>
    </form>
  );
}
