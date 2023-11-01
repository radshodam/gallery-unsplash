import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import React from "react";

export default async function Page() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const image: UnsplashImage = await response.json();

  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <div>
      <div className="relative">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Page Static
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              This page <strong>fetches and caches data at build time</strong>. Even
              though the Unsplash API always returns a new image, we see the same
              image after refreshing the page until we compile the project again.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Image
                className="rounded-md"
                alt={image.description}
                src={image.urls.raw}
                width={width}
                height={height}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
