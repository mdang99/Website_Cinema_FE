// src/app/profile/page.jsx
"use client";

import { useEffect, useState } from "react";
import RequireAuth from "@/components/common/RequireAuth";
import { useAuth } from "@/context/AuthContext";
import { getProfile, updateProfile } from "@/services/userApi";
import { authChangePassword } from "@/services/authApi";

export default function ProfilePage() {
  const { accessToken, user, loading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [pwForm, setPwForm] = useState({
    oldPassword: "",
    newPassword: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!accessToken) return;
    async function fetchProfile() {
      try {
        const data = await getProfile(accessToken);
        setProfile(data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchProfile();
  }, [accessToken]);

  async function handleSaveProfile(e) {
    e.preventDefault();
    setMessage("");
    setSaving(true);
    try {
      const updated = await updateProfile(accessToken, profile);
      setProfile(updated);
      setMessage("Cập nhật profile thành công");
    } catch (e) {
      setMessage(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setMessage("");
    try {
      await authChangePassword(accessToken, pwForm);
      setPwForm({ oldPassword: "", newPassword: "" });
      setMessage("Đổi mật khẩu thành công");
    } catch (e) {
      setMessage(e.message);
    }
  }

  return (
    <RequireAuth>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">Trang cá nhân</h1>
        {loading || !profile ? (
          <p>Đang tải profile...</p>
        ) : (
          <>
            {message && (
              <div className="rounded bg-white/10 px-3 py-2 text-sm">{message}</div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
              <div>
                <label className="mb-1 block text-sm">Tên</label>
                <input
                  className="w-full rounded bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-primary"
                  value={profile.name || ""}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">Email</label>
                <input
                  disabled
                  className="w-full cursor-not-allowed rounded bg-white/5 px-3 py-2 text-sm text-gray-400 outline-none ring-1 ring-white/10"
                  value={profile.email || ""}
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="rounded bg-primary px-4 py-2 text-sm font-semibold disabled:opacity-70"
              >
                {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </form>

            <form
              onSubmit={handleChangePassword}
              className="space-y-4 max-w-lg border-t border-white/10 pt-6"
            >
              <h2 className="text-lg font-semibold">Đổi mật khẩu</h2>
              <div>
                <label className="mb-1 block text-sm">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  className="w-full rounded bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-primary"
                  value={pwForm.oldPassword}
                  onChange={(e) =>
                    setPwForm((s) => ({ ...s, oldPassword: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">Mật khẩu mới</label>
                <input
                  type="password"
                  className="w-full rounded bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-primary"
                  value={pwForm.newPassword}
                  onChange={(e) =>
                    setPwForm((s) => ({ ...s, newPassword: e.target.value }))
                  }
                  required
                />
              </div>
              <button className="rounded bg-primary px-4 py-2 text-sm font-semibold">
                Đổi mật khẩu
              </button>
            </form>
          </>
        )}
      </div>
    </RequireAuth>
  );
}
