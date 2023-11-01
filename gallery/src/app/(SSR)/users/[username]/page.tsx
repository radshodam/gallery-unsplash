import { UnsplashUser } from "@/models/unsplash-user";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: { username: string };
}

async function getUser(username: string): Promise<UnsplashUser> {
  const response = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  if (response.status === 404) notFound();

  return await response.json();
}

// const getUserCached = cache(getUser) Use cache if you're not using the native fetch

export async function generateMetadata({
  params: { username },
}: PageProps): Promise<Metadata> {
  const user = await getUser(username);

  return {
    title:
      ([user.first_name, user.last_name].filter(Boolean).join(" ") ||
        user.username) + " - NextJS 14 Image Gallery",
  };
}

export default async function Page({ params: { username } }: PageProps) {
  const user = await getUser(username);

  return (
    <div className="relative">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              name user :{user.username}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              This profile page uses <strong>generateMetadata</strong> to set the{" "}
              <strong>page title</strong> dynamically from the API response.
            </p>
            <h1 className="text-xl text-white ">{user.username}</h1>
            <p className="text-xl text-white ">First name: {user.first_name}</p>
            <p className="text-xl text-white ">Last name: {user.last_name}</p>
            <Link
              className="text-xl text-white "
              href={"https://unsplash.com/" + user.username}
            >
              Unsplash profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
