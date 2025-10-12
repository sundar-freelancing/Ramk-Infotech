"use client";
import Link from "next/link";
import Image from "next/image";
import { pageURL } from "@/constant/pageURL";
import { images } from "@/constant/images";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated 404 Number */}
          <div className="relative mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              404
            </h1>
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
            <div className="absolute -top-2 -right-6 w-6 h-6 bg-purple-400 rounded-full animate-bounce opacity-60 animation-delay-200"></div>
            <div className="absolute -bottom-4 -left-2 w-4 h-4 bg-pink-400 rounded-full animate-bounce opacity-60 animation-delay-400"></div>
            <div className="absolute -bottom-2 -right-4 w-5 h-5 bg-indigo-400 rounded-full animate-bounce opacity-60 animation-delay-600"></div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-2">
              The page you&apos;re looking for seems to have vanished into the
              digital void.
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400">
              Don&apos;t worry, even the best explorers sometimes take a wrong
              turn!
            </p>
          </div>

          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Image
                src={images.mainlogo}
                alt="RamK Infotech"
                height={80}
                className="opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href={pageURL.home.href}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              <span className="relative z-10">Go Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group px-8 py-4 bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              <span className="flex items-center gap-2">
                <span>←</span>
                <span>Go Back</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-pulse animation-delay-1000"></div>
      </div>
    </div>
  );
}
