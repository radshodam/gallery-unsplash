import { Metadata } from "next";
import SearchPage from "./SearchPage";

export const metadata: Metadata = {
  title: "Search - NextJS 14 Image Gallery",
};

export default function Page() {
  return (
    <div className="relative">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Page Searching...
          </h2>
          <div className="mx-auto mt-6 ">
            <SearchPage />
          </div>
        </div>
      </div>
    </div>
  );
}
