"use client";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 w-12 h-12 bg-white text-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group hover:scale-110"
      aria-label="Scroll to top"
    >
      <FontAwesomeIcon icon={faUpLong} />
    </button>
  );
}
