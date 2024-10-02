"use client";

import UrlShortener from "./components/UrlShortener";
import Description from "./components/Description";

export default function Home() {  
  return (
    <main className="min-h-screen">
      <Description />
      <UrlShortener />
    </main>
  );
}
