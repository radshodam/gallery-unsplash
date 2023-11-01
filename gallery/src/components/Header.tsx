"use client";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="flex justify-center py-4 bg-gray-900">
      <div className="mt-1 flex flex-row  space-x-3">
        <div className="mt-2 flex items-center text-sm font-semibold text-gray-100 hover:text-cyan-600">
          <Link href="/static">STATIC</Link>
        </div>
        <div className="mt-2 flex items-center text-sm font-semibold text-gray-100 hover:text-cyan-600">
          <Link href="/dynamic">DYNAMIC</Link>
        </div>
        <div className="mt-2 flex items-center text-sm font-semibold text-gray-100 hover:text-cyan-600">
          <Link href="/isr">ISR</Link>
        </div>
        <div className="mt-2 flex items-center text-sm font-semibold text-gray-100 hover:text-cyan-600">
          <Link href="/topics/health">TOPICS</Link>
        </div>
        <div className="mt-2 flex items-center text-sm font-semibold text-gray-100 hover:text-cyan-600">
          <Link href="/search">Search</Link>
        </div>
      </div>
    </div>
  );
}
