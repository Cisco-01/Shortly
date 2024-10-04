"use client";

import UrlShortener from "./components/UrlsShortener/UrlShortener";
import Description from "./components/Description";
import Statistics from "./components/Statistics";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Description />
      <div className="pt-2 pb-4 bg-[#F3F4F6]">
        <Suspense fallback={<Loading />}>
          <UrlShortener />
        </Suspense>
        <Statistics />
      </div>
    </main>
  );
}
