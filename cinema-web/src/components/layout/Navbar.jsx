"use client";
import homeData from "../../../mockup-Data/homeData.json";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faArrowRightFromBracket,
  faBars,
  faMagnifyingGlass,
  faUser,
  faX,
  faHeart,
  faUserCircle,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useState, useEffect, useRef } from "react";

library.add(
  faAngleDown,
  faArrowRightFromBracket,
  faBars,
  faMagnifyingGlass,
  faUser,
  faX,
  faHeart,
  faUserCircle,
  faFilm
);

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef(null);

  const pathname = usePathname();
  const router = useRouter();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hiddenRoutes = ["/login", "/signup"];
  if (hiddenRoutes.includes(pathname)) return null;

  function handleSearch() {
    if (!searchQuery.trim()) return;
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    setIsMenuOpen(false);
    setSearchQuery("");
  }

  async function handleLogout() {
    logout();
    setIsUserMenuOpen(false);
    router.push("/login");
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/98 backdrop-blur-xl shadow-lg shadow-black/20"
          : "bg-gradient-to-b from-black/90 to-transparent backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-2xl font-black text-white shadow-lg shadow-red-600/30 group-hover:shadow-red-600/50 transition-all group-hover:scale-105">
                C
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-30 blur transition-opacity" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Cinema
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-1">
            <Link
              href="/group-movies"
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === "/group-movies"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Phim Bộ
            </Link>
            <Link
              href="/single-movies"
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === "/single-movies"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Phim Lẻ
            </Link>

            {/* Dropdown Category */}
            <div className="group relative">
              <button className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                Thể Loại
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className="w-3 h-3 transition-transform group-hover:rotate-180"
                />
              </button>
              <div className="absolute left-0 top-full mt-2 min-w-[600px] bg-gray-900/98 backdrop-blur-xl border border-gray-800/50 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 group-hover:translate-y-0 translate-y-2">
                <div className="p-4 grid grid-cols-4 gap-1">
                  {homeData.categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/the-loai/${cat.slug}`}
                      className="block px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Dropdown Quốc Gia */}
            <div className="group relative">
              <button className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                Quốc Gia
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className="w-3 h-3 transition-transform group-hover:rotate-180"
                />
              </button>
              <div className="absolute left-0 top-full mt-2 min-w-[600px] bg-gray-900/98 backdrop-blur-xl border border-gray-800/50 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 group-hover:translate-y-0 translate-y-2">
                <div className="p-4 grid grid-cols-4 gap-1">
                  {homeData.countryList.map((c) => (
                    <Link
                      key={c.id}
                      href={`/quoc-gia/${c.slug}`}
                      className="block px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Search + User Actions */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Tìm kiếm phim..."
                className="w-64 rounded-xl bg-white/5 border border-gray-800/50 px-4 py-2.5 pl-11 text-sm text-white placeholder:text-gray-500 focus:border-red-600/50 focus:bg-white/10 focus:ring-2 focus:ring-red-600/20 outline-none transition-all"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 cursor-pointer hover:text-red-600 transition-colors"
                onClick={handleSearch}
              />
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all ${
                  isUserMenuOpen
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-72 bg-gray-900/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800/50 overflow-hidden animate-fadeIn">
                  {user ? (
                    <>
                      <div className="px-5 py-4 bg-gradient-to-r from-red-600/20 to-pink-600/20 border-b border-gray-800/50">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-pink-600 text-white font-bold text-lg">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-400 mb-0.5">
                              Xin chào,
                            </p>
                            <p className="text-white font-semibold truncate">
                              {user.name}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="py-2">
                        <Link
                          href="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <FontAwesomeIcon
                            icon={faUserCircle}
                            className="w-5 h-5"
                          />
                          <span className="text-sm font-medium">
                            Trang cá nhân
                          </span>
                        </Link>
                        <Link
                          href="/favorite-movies"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                          <span className="text-sm font-medium">
                            Phim yêu thích
                          </span>
                        </Link>
                        <div className="mx-3 my-2 border-t border-gray-800/50" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-5 py-3 text-red-400 hover:text-red-300 hover:bg-red-600/10 transition-all"
                        >
                          <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            className="w-5 h-5"
                          />
                          <span className="text-sm font-medium">Đăng xuất</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 space-y-2">
                      <Link
                        href="/login"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block w-full text-center bg-gradient-to-r from-red-600 to-red-700 py-3 rounded-xl text-white font-semibold hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-600/30 transition-all"
                      >
                        Đăng nhập
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block w-full text-center border border-gray-700/50 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 hover:border-gray-600 transition-all"
                      >
                        Đăng ký
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE & TABLET HEADER */}
        <div className="flex lg:hidden items-center justify-between h-16">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/5 transition-all"
          >
            <FontAwesomeIcon
              icon={isMenuOpen ? faX : faBars}
              className="w-5 h-5"
            />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-red-700 text-xl font-black text-white shadow-lg shadow-red-600/30">
              C
            </span>
            <span className="text-xl font-bold text-white hidden sm:block">
              Cinema
            </span>
          </Link>

          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/5 transition-all"
          >
            <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
          </button>
        </div>

        {/* MOBILE SIDEBAR */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            <div className="absolute left-0 top-0 w-[320px] max-w-[85vw] h-full bg-gray-900/98 backdrop-blur-xl border-r border-gray-800/50">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-800/50">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-red-700 text-xl font-black text-white shadow-lg shadow-red-600/30">
                    C
                  </span>
                  <span className="text-xl font-bold text-white">Cinema</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/5"
                >
                  <FontAwesomeIcon icon={faX} className="w-4 h-4" />
                </button>
              </div>

              {/* Search */}
              <div className="p-5 border-b border-gray-800/50">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Tìm kiếm phim..."
                    className="w-full rounded-xl bg-white/5 border border-gray-800/50 px-4 py-3 pl-11 text-white placeholder:text-gray-500 focus:border-red-600/50 focus:ring-2 focus:ring-red-600/20 outline-none"
                  />
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 cursor-pointer"
                    onClick={handleSearch}
                  />
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-112px)]">
                <Link
                  href="/group-movies"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === "/group-movies"
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <FontAwesomeIcon icon={faFilm} className="w-4 h-4" />
                  Phim Bộ
                </Link>
                <Link
                  href="/single-movies"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === "/single-movies"
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <FontAwesomeIcon icon={faFilm} className="w-4 h-4" />
                  Phim Lẻ
                </Link>

                {/* Categories Accordion */}
                <details className="group">
                  <summary className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer transition-all">
                    <span>Thể Loại</span>
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className="w-4 h-4 transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <div className="mt-2 ml-4 space-y-1">
                    {homeData.categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/the-loai/${cat.slug}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </details>

                {/* Country Accordion */}
                <details className="group">
                  <summary className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer transition-all">
                    <span>Quốc Gia</span>
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className="w-4 h-4 transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <div className="mt-2 ml-4 space-y-1">
                    {homeData.countryList.map((c) => (
                      <Link
                        key={c.id}
                        href={`/quoc-gia/${c.slug}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </details>
              </nav>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </header>
  );
}
