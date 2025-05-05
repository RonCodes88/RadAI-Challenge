"use client";
import React from "react";

export default function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-blue-400 hover:bg-blue-300 text-[#0a2342] font-semibold px-4 py-2 rounded transition-colors"
      {...props}
    >
      {children}
    </button>
  );
}
