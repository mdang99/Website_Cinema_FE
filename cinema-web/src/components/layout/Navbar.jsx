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
    <div className="sticky top-0 z-30 bg-black/70 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded bg-primary text-xl font-extrabold">
            C
          </span>
          <span className="text-xl font-bold">Cinema</span>
        </Link>
        {/* search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm phim..."
            className="rounded bg-gray-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="absolute right-3 top-2 text-gray-400 hover:text-white">
            🔍
          </button>
        </div>
        {/* nav */}
        <nav className="flex items-center">
          <ul className="flex items-center gap-6 text-sm text-gray-200">
            <li className="px-1">
              <Link
                href="/movies"
                className="hover:text-primary transition-colors text-sm"
              >
                Phim Bộ
              </Link>
            </li>
            <li className="px-1">
              <Link
                href="/categories"
                className="hover:text-primary transition-colors text-sm"
              >
                Phim Lẻ
              </Link>
            </li>

            <li className="relative group px-1">
              <Link
                href="/news"
                className="relative hover:text-primary transition-colors text-sm"
              >
                Thể Loại
              </Link>

              <ul
                className="
      absolute left-0 top-full 
  w-max
  bg-black/70 backdrop-blur-lg p-4 rounded shadow-lg
  opacity-0 invisible translate-y-2
  group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
  transition-all duration-200
  grid grid-cols-4
    "
              >
                <li className="w-max hover:text-primary transition-colors py-1">
                  <Link
                    href="/news/hot"
                    className="flex items-center px-3 py-1 text-sm"
                  >
                    Hành Động
                  </Link>
                </li>

                <li className="w-max hover:text-primary transition-colors py-1">
                  <Link
                    href="/news/trending"
                    className="flex items-center px-3 py-1 text-sm"
                  >
                    Viễn Tưởng
                  </Link>
                </li>

                <li className="w-max hover:text-primary transition-colors py-1">
                  <Link
                    href="/news/recommended"
                    className="flex items-center px-3 py-1 text-sm"
                  >
                    Hoạt Hình
                  </Link>
                </li>

                <li className="w-max hover:text-primary transition-colors py-1">
                  <Link
                    href="/news/comedy"
                    className="flex items-center px-3 py-1 text-sm"
                  >
                    Hài Hước
                  </Link>
                </li>
                <li className="w-max hover:text-primary transition-colors py-1">
                  <Link
                    href="/news/comedy"
                    className="flex items-center px-3 py-1 text-sm"
                  >
                    Hài Hước
                  </Link>
                </li>
              </ul>
            </li>

            <li className="relative group px-1">
              <Link
                href="/news"
                className="relative hover:text-primary transition-colors text-sm"
              >
                Quốc gia
              </Link>

              <ul
                className="
                  absolute left-0 top-full 
                    w-max
                    bg-black/70 backdrop-blur-lg p-4 rounded shadow-lg
                    opacity-0 invisible translate-y-2
                    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                    transition-all duration-200
                    grid grid-cols-4
              "
              >
                <li className="w-max hover:text-primary transition-colors py-1">
                  <Link
                    href="/news/hot"
                    className="flex items-center px-3 py-1 text-sm"
                  >
                    Hành Động
                  </Link>
                </li>

                <li className="w-max hover:text-primary transition-colors py-1">
                  <Link
                    href="/news/trending"
                    className="flex items-center px-3 py-1 text-sm"
                  >
                    Viễn Tưởng
                  </Link>
                </li>

                <li className="w-max hover:text-primary transition-colors py-1">
                  <Link
                    href="/news/recommended"
                    className="flex items-center px-3 py-1 text-sm"
                  >
                    Hoạt Hình
                  </Link>
                </li>

                <li className="w-max hover:text-primary transition-colors py-1">
                  <Link
                    href="/news/comedy"
                    className="flex items-center px-3 py-1 text-sm"
                  >
                    Hài Hước
                  </Link>
                </li>
                <li className="w-max hover:text-primary transition-colors py-1">
                  <Link
                    href="/news/comedy"
                    className="flex items-center px-3 py-1 text-sm"
                  >
                    Hài Hước
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        {/* Menu */}
        <div className="flex items-center gap-6 text-sm text-gray-200">
          <Link
            href="/profile"
            className="hover:text-primary transition-colors border-1 rounded"
          >
            Đăng ký
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
        {/* user mobile */}
        <div></div>
      </div>
    </div>
  );
}
