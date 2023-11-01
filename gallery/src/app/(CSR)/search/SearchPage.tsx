"use client";
import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import { FormEvent, useState } from "react";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(null);
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] =
    useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();
    // console.log("query",query);

    if (query) {
      try {
        setSearchResults(null);
        setSearchResultsLoadingIsError(false);
        setSearchResultsLoading(true);
        const response = await fetch("/api/search?query=" + query);
        const images: UnsplashImage[] = await response.json();
        setSearchResults(images);
      } catch (error) {
        console.error(error);
        setSearchResultsLoadingIsError(true);
      } finally {
        setSearchResultsLoading(false);
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="relative ">
          <input
            className="block  w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            name="query"
            placeholder="E.g. cats, hotdogs, ..."
          />
          <button
            type="submit"
            disabled={searchResultsLoading}
            className=" absolute top-0 right-0 p-1.5 my-0.5 mx-0.5 rounded-md bg-slate-800 hover:bg-slate-500 text-white"
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex justify-center">
        {searchResultsLoading && <p className="text-white text-3xl">loading...</p>}
        {searchResultsLoadingIsError && (
          <p className="text-white text-xl">
            Something went wrong. Please try again.
          </p>
        )}
        {searchResults?.length === 0 && (
          <p className="text-white text-xl">Nothing found. Try a different query!</p>
        )}
      </div>

      {searchResults && (
        <>
          <div className="w-full flex flex-wrap py-16">
            {searchResults.map((image, index) => (
              <div
                className="w-1/2 rounded-md p-0.5 shadow-white shadow-sm"
                key={index}
              >
                <Image
                  src={image.urls.raw}
                  width={250}
                  height={250}
                  alt={image.description}
                  className="w-full max-w-md h-full object-cover"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
