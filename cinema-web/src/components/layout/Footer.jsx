import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faFilm,
  faMessage,
  faMusic,
  faPaperPlane,
  faUpLong,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Top Banner */}
      <div className="bg-red-600 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <span className="text-lg">⭐</span>
          <span className="text-sm md:text-base font-medium">
            Hoàng Sa & Trường Sa là của Việt Nam!
          </span>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          {/* Logo and Brand */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faFilm}
                  className="w-6 h-6 md:w-8 md:h-8 text-gray-900"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Cinema</h2>
                <p className="text-gray-400 text-sm md:text-base">
                  Phim hay cả rổ
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-3 flex-wrap lg:flex-nowrap">
            <button className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
              <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
              <FontAwesomeIcon icon={faMessage} className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
            <button className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
              <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
              <FontAwesomeIcon icon={faMusic} className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
              <FontAwesomeIcon icon={faYoutube} className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
              <FontAwesomeIcon icon={faAt} className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
              <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8 md:mt-10">
          <ul className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base">
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Hỏi-Đáp
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Điều khoản sử dụng
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Giới thiệu
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Liên hệ
              </a>
            </li>
          </ul>
        </nav>

        {/* Category Links */}
        <nav className="mt-4 md:mt-6">
          <ul className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base">
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Dongphim
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Ghienphim
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Motphim
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Subnhanh
              </a>
            </li>
          </ul>
        </nav>

        {/* Description */}
        <div className="mt-6 md:mt-8 text-gray-400 text-sm md:text-base leading-relaxed">
          <p>
            Cinema – Phim hay cả rổ - Trang xem phim online chất lượng cao miễn
            phí Vietsub, thuyết minh, lồng tiếng full HD. Kho phim mới không lỗ,
            phim chiếu rạp, phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn
            Quốc, Trung Quốc, Thái Lan, Nhật Bản, Âu Mỹ... đa dạng thể loại.
            Khám phá nền tảng phim trực tuyến hay nhất 2024 chất lượng 4K!
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 md:mt-8 text-gray-500 text-xs md:text-sm">
          <p>© 2025 Cinema</p>
        </div>
      </div>
    </footer>
  );
}
