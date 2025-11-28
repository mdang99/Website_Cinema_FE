"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Không hiển thị navbar khi ở login/signup
  const hiddenRoutes = ["/login", "/signup"];
  if (hiddenRoutes.includes(pathname)) return null;

  async function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <nav className="sticky top-0 z-30 bg-black/70 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded bg-primary text-xl font-extrabold">
            C
          </span>
          <span className="text-xl font-bold">Cinema</span>
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6 text-sm text-gray-200">
          <Link
            href="/"
            className="hover:text-primary transition-colors"
          >
            Trang chủ
          </Link>

          <Link
            href="/profile"
            className="hover:text-primary transition-colors"
          >
            Profile
          </Link>

          {user ? (
            <>
              <span className="hidden sm:inline text-xs text-gray-300">
                Xin chào, {user.name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="rounded bg-primary px-3 py-1 text-sm font-semibold hover:bg-red-700 transition"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded bg-primary px-3 py-1 text-sm font-semibold hover:bg-red-700 transition"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
