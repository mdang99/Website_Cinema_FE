"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ChangePasswordForm() {
  const { changePassword, accessToken } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Nếu chưa đăng nhập, redirect về login
  useEffect(() => {
    if (!accessToken) {
      router.replace("/login");
    }
  }, [accessToken, router]);

  // Validate password mới
  function validatePassword(password) {
    if (!password || password.length < 8)
      return "Mật khẩu phải có ít nhất 8 ký tự";
    if (!/[A-Z]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ hoa";
    if (!/[a-z]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ thường";
    if (!/[0-9]/.test(password)) return "Mật khẩu phải có ít nhất 1 số";
    if (!/[\W]/.test(password))
      return "Mật khẩu phải có ít nhất 1 ký tự đặc biệt";
    return null;
  }

  // Handle submit
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const msg = validatePassword(form.newPassword);
    if (msg) {
      setError(msg);
      return;
    }

    setLoading(true);
    try {
      await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      setForm({ oldPassword: "", newPassword: "" });
      router.replace("/login");
    } catch (err) {
      setError(err.message || "Đổi mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  }

  const isDisabled =
    loading ||
    !form.oldPassword ||
    !form.newPassword ||
    validatePassword(form.newPassword);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {error && (
        <div className="rounded bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm">Mật khẩu cũ</label>
        <input
          type="password"
          className="w-full rounded bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-primary"
          value={form.oldPassword}
          onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm">Mật khẩu mới</label>
        <input
          type="password"
          className="w-full rounded bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-primary"
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="mt-2 w-full rounded bg-primary py-2 text-sm font-semibold disabled:opacity-70"
      >
        {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
      </button>
    </form>
  );
}
