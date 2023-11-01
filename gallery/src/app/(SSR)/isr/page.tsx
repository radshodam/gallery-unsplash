import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Incremental Static Regeneration - NextJS 14 Image Gallery",
};

export const revalidate =30;

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
    <div>
      <p>
        This page uses <strong>incremental static regeneration</strong>. A new image
        is fetched every 30 seconds (after refreshing the page) and then served from
        the cache for that duration.
      </p>
      <Image
        src={image.urls.raw}
        width={width}
        height={height}
        alt={image.description}
      />
      by <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
    </div>
  );
}
