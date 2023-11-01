import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Dynamic Fetching - NextJS 14 Image Gallery",
}

export const revalidate = 0;

export default async function Page() {
    const response = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_ACCESS_KEY,
        {
            // cache: "no-cache"/"no-store"
            // next: { revalidate: 0 }
        }
    );
    const image: UnsplashImage = await response.json();

    const width = Math.min(500, image.width);
    const height = (width / image.width) * image.height;

    return (
        <div>
            <p>
                This page <strong>fetches data dynamically</strong>.
                Every time you refresh the page, you get a new image from the Unsplash API.
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