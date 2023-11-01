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
      <p>
        This page <strong>fetches and caches data at build time</strong>. Even though
        the Unsplash API always returns a new image, we see the same image after
        refreshing the page until we compile the project again.
      </p>
      <Image
        className="rounded-md"
        alt={image.description}
        src={image.urls.raw}
        width={width}
        height={height}
      />
      <p>page static</p>
    </div>
  );
}
