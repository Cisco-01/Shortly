"use client";

import { useState } from "react";

interface UrlFormProps {
  url?: string;
  setUrl?: (url: string) => void;
  shortenUrl?: (e: React.FormEvent) => void;
  isLoading?: boolean;
  error?: string;
  validateUrl?: (url: string) => boolean;
}

// URL validation function
const isValidUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "https:";
  } catch (error: unknown) {
    if (error instanceof Error) {
      return !!error.message;
    }
  }
  return !!Error;
};

const UrlForm: React.FC<UrlFormProps> = ({
  shortenUrl,
  isLoading,
  url,
  setUrl,
  validateUrl,
}) => {
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const urlToValidate = e.target.value;
    if (setUrl) {
      setUrl(urlToValidate);
    }
    if (urlToValidate === "") {
      setError(null);
      setSuccess(false);
    } else if (urlToValidate.match(/^https?:\/\/\s/)) {
      setError("URL is required");
    } else if (!urlToValidate.startsWith("https://")) {
      setError("URL must start with https://");
      setSuccess(false);
    } else if (
      (validateUrl && !validateUrl(urlToValidate)) ||
      !isValidUrl(urlToValidate)
    ) {
      setError("Please enter a valid HTTPS URL");
      setSuccess(false);
    } else {
      setError(null);
      setSuccess(true);
      return urlToValidate;
    }
  };

  return (
    <div
      className={`bg-purple-900 bg-no-repeat bg-cover py-4 ${
        error
          ? "pb-14 m:pb-10 transition-all duration-300 ease-in-out"
          : "pb-4 transition-all duration-300 ease-in-out"
      } md:py-12 px-8 rounded-lg shadow-lg mb-4`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='1152' height='200' viewBox='0 0 1152 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M671.481 -111.814C671.481 -49.0476 687.568 -4.09285 747.243 24.9441C806.919 53.981 864.576 27.4845 922.416 42.675C980.255 57.8655 980.255 155.725 1034.72 215.948C1089.19 276.17 1204.04 290.798 1297.42 229.7C1390.8 168.602 1433.13 25.9476 1405.23 -58.1655C1377.33 -142.28 1323.86 -219.048 1065.86 -219.048C807.86 -219.048 671.481 -174.58 671.481 -111.814ZM-139.07 141.757C-139.07 204.524 -122.984 249.479 -63.3082 278.515C-3.63248 307.552 54.0246 281.056 111.864 296.246C169.704 311.437 169.704 409.296 224.173 469.519C278.642 529.742 393.488 544.369 486.87 483.271C580.25 422.174 622.582 279.519 594.681 195.406C566.779 111.292 513.307 34.5238 255.308 34.5238C-2.69116 34.5238 -139.07 78.9917 -139.07 141.757Z' fill='%236B21A8'/%3E%3C/svg%3E")`,
      }}
    >
      <form
        onSubmit={shortenUrl}
        className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-5"
      >
        {/* Input URL field */}
        <input
          type="text"
          id="longUrl"
          placeholder="Enter your link here"
          value={url}
          required
          onChange={handleUrlChange}
          className={`w-full p-3 rounded-lg border-4 focus:outline-none focus:ring ${
            error
              ? "border-red-400 focus:ring-transparent"
              : success
              ? "border-[#10B981] focus:ring-transparent"
              : "border-transparent"
          } hover:border-[#3B82F6] active:border-[#3B82F6] focus:border-[#3B82F6]`}
        />

        {/* Error message */}
        {error && (
          <p className="text-red-500 absolute top-40 sm:top-44 md:top-36">
            Please add a link
          </p>
        )}
        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading || !!error}
          className="text-nowrap rounded-lg tracking-wider transition-colors duration-200 py-0 sm:py-1 md:py-2 w-full md:w-auto"
        >
          <span className="btn rounded-md flex justify-center">
            {isLoading ? "Shortening..." : "Shorten It!"}
          </span>
        </button>
      </form>
    </div>
  );
};

export default UrlForm;
