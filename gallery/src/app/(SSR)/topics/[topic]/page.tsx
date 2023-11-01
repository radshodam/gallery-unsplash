import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import styles from "./TopicPage.module.css";
import { Metadata } from "next";

// export const revalidate = 0;

// export const dynamicParams = false;

interface PageProps {
  params: { topic: string };
  // searchParams: { [key: string]: string | string[] | undefined },
}

export function generateMetadata({ params: { topic } }: PageProps): Metadata {
  return {
    title: topic + " - NextJS 14 Image Gallery",
  };
}

export function generateStaticParams() {
  return ["health", "fitness", "coding"].map((topic) => ({ topic }));
}

export default async function Page({ params: { topic } }: PageProps) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const images: UnsplashImage[] = await response.json();

  return (
    <div className="relative">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              topic :{topic}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              This page uses <strong>generateStaticParams</strong> to render and
              cache static pages at build time, even though the URL has a dynamic
              parameter. Pages that are not included in generateStaticParams will be
              fetched & rendered on first access and then{" "}
              <strong>cached for subsequent requests</strong> (this can be disabled).
            </p>

            <h1>{topic}</h1>
            <div className="w-full flex flex-wrap py-16">
              {images.map((image) => (
                <div className="w-1/2 rounded-md p-0.5 shadow-white shadow-sm">
                  <Image
                    src={image.urls.raw}
                    width={250}
                    height={250}
                    alt={image.description}
                    key={image.urls.raw}
                    className="w-full max-w-md h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
