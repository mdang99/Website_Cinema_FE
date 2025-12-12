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
import { useState, useEffect } from "react";

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
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hiddenRoutes = ["/login", "/signup"];
  if (hiddenRoutes.includes(pathname)) return null;

  function handleSearch() {
    if (!searchQuery.trim()) return;
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    setIsNavOpen(false);
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
      <div className="px-5 lg:px-6">
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Hamburger Nav - Mobile/Tablet */}
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/5 transition-all"
          >
            <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
          </button>

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

          {/* Search + Nav Container */}
          <div
            className={`
              fixed lg:static top-16 left-0 right-0 lg:top-auto
              flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6
              w-full lg:w-auto lg:h-auto md:h-[50%]
              bg-gray-900/98 lg:bg-transparent
              backdrop-blur-xl lg:backdrop-blur-none
              border-t lg:border-0 border-gray-800/50
              p-5 lg:p-0
              transition-all duration-300
              lg:overflow-visible md:overflow-y-hidden
              ${
                isNavOpen
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-full lg:translate-y-0 opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto"
              }
            `}
          >
            {/* Close Button - Mobile Only */}
            <button
              onClick={() => setIsNavOpen(false)}
              className="lg:hidden self-end flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all mb-2"
            >
              <FontAwesomeIcon icon={faX} className="w-4 h-4" />
            </button>

            {/* Search Bar */}
            <div className="relative w-full lg:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Tìm kiếm phim..."
                className="w-full rounded-xl bg-white/5 border border-gray-800/50 px-4 py-2.5 lg:py-2.5 pl-11 text-sm text-white placeholder:text-gray-500 focus:border-red-600/50 focus:bg-white/10 focus:ring-2 focus:ring-red-600/20 outline-none transition-all"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 cursor-pointer hover:text-red-600 transition-colors"
                onClick={handleSearch}
              />
            </div>

            {/* Navigation */}
            <nav className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-1 w-full lg:w-auto">
              <Link
                href="/group-movies"
                onClick={() => setIsNavOpen(false)}
                className={`w-full lg:w-auto px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === "/group-movies"
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                Phim Bộ
              </Link>
              <Link
                href="/single-movies"
                onClick={() => setIsNavOpen(false)}
                className={`w-full lg:w-auto px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === "/single-movies"
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                Phim Lẻ
              </Link>

              {/* Categories Dropdown */}
              <div className="w-full lg:w-auto group relative">
                <button className="w-full lg:w-auto flex items-center justify-between lg:justify-center gap-2 px-5 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                  <span>Thể Loại</span>
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    className="w-3 h-3 transition-transform group-hover:rotate-180"
                  />
                </button>
                <ul className="absolute left-0 top-full mt-2 w-full h-[500px]  lg:min-w-[600px] lg:w-auto bg-dark  rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 group-hover:translate-y-0 translate-y-2 z-50 p-4 grid grid-cols-2 lg:grid-cols-4 overflow-y-auto navbar-scroll">
                  {homeData.categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/the-loai/${cat.slug}`}
                        onClick={() => setIsNavOpen(false)}
                        className="block px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Countries Dropdown */}
              <div className="w-full lg:w-auto group relative">
                <button className="w-full lg:w-auto flex items-center justify-between lg:justify-center gap-2 px-5 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                  <span>Quốc Gia</span>
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    className="w-3 h-3 transition-transform group-hover:rotate-180"
                  />
                </button>
                <ul className="absolute left-0 top-full mt-2 w-full lg:min-w-[600px] lg:w-auto bg-dark rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 group-hover:translate-y-0 translate-y-2 z-50 p-4 grid grid-cols-2 lg:grid-cols-4">
                  {homeData.countryList.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/quoc-gia/${c.slug}`}
                        onClick={() => setIsNavOpen(false)}
                        className="block px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          {/* Auth Section - Hamburger User (Mobile) */}
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/5 transition-all"
          >
            <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
          </button>

          {/* Auth Menu */}
          <div
            className={`
              fixed lg:static top-16 lg:top-auto right-5 lg:right-auto
              flex flex-col lg:flex-row items-stretch lg:items-center gap-3
              w-auto min-w-[240px] lg:min-w-0
              bg-gray-900/98 lg:bg-transparent
              backdrop-blur-xl lg:backdrop-blur-none
              rounded-b-2xl lg:rounded-none
              border-t lg:border-0 border-gray-800/50
              shadow-2xl lg:shadow-none
              p-4 lg:p-0
              transition-all duration-300
              ${
                isUserMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-4 lg:translate-y-0 opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto"
              }
            `}
          >
            {user ? (
              <>
                {/* User Info - Mobile Only */}
                <div className="lg:hidden px-1 py-2 bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-xl border border-gray-800/50 mb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-pink-600 text-white font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-400 mb-0.5">Xin chào,</p>
                      <p className="text-white font-semibold truncate">
                        {user.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 truncate px-1">
                    {user.email}
                  </p>
                </div>

                {/* Desktop User Dropdown */}
                <div className="hidden lg:block relative group">
                  <button className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-pink-600 text-white font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-white font-medium">
                      {user.name}
                    </span>
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className="w-3 h-3 text-gray-400"
                    />
                  </button>

                  <div className="absolute right-0 top-full mt-2 w-60 bg-gray-900/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800/50 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <Link
                        href="/profile"
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
                  </div>
                </div>

                {/* Mobile User Menu Links */}
                <div className="lg:hidden space-y-1">
                  <Link
                    href="/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    <FontAwesomeIcon icon={faUserCircle} className="w-5 h-5" />
                    <span className="text-sm font-medium">Trang cá nhân</span>
                  </Link>
                  <Link
                    href="/favorite-movies"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                    <span className="text-sm font-medium">Phim yêu thích</span>
                  </Link>
                  <div className="mx-2 my-2 border-t border-gray-800/50" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-600/10 rounded-xl transition-all"
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
              <>
                <Link
                  href="/login"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="lg:px-5 lg:py-2 px-4 py-3 rounded-xl text-sm font-medium text-center lg:text-left text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="lg:px-5 lg:py-2 px-4 py-3 rounded-xl text-sm font-medium text-center lg:text-left bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-600/30 transition-all"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
