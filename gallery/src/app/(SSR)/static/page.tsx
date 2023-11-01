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
    <div className=" container">
      <Image
        placeholder="empty"
        priority={false} 
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
