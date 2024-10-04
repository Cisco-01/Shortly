"use client";

import UrlShortener from "./components/UrlsShortener/UrlShortener";
import Description from "./components/Description";
import Statistics from "./components/Statistics";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Description />
      <div className="pt-2 pb-4 bg-[#F3F4F6]">
        <UrlShortener />
        <Statistics />
      </div>
    </main>
  );
}
