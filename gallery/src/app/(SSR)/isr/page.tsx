import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Incremental Static Regeneration - NextJS 14 Image Gallery",
};

export const revalidate = 30;

export default async function Page() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_ACCESS_KEY,
    {
      // next: { revalidate: 15 }
    }
  );
  const image: UnsplashImage = await response.json();

  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <div className="relative">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Page ISR
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            This page uses <strong>incremental static regeneration</strong>. A new
            image is fetched every 30 seconds (after refreshing the page) and then
            served from the cache for that duration.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Image
              src={image.urls.raw}
              width={width}
              height={height}
              alt={image.description}
            />
          </div>
          <div>
            <span>By</span>
            <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
