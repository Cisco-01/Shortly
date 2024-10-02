import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface ShortenedUrl {
  id: string;
  alias: string;
  original: string;
  shortened: string;
}
const API_KEY = process.env.NEXT_PUBLIC_URLDAY_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_URLDAY_APIURL;

/**
 * @param {string} url - The regular expression pattern checks for various
 * components of a URL such as protocol, domain name, IP address, port, path, query
 * string, and fragment locator
 * @returns The `validateUrl` function returns a boolean value indicating whether the input `url`
 * string matches the specified URL pattern.
 */
const validateUrl = (url: string) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(url);
};

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);

  const fetchShortenedUrls = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data }: { data: ShortenedUrl[] } = await axios.get(
        `${API_URL}/links`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      setShortenedUrls(data);
      localStorage.setItem("shortenedUrls", JSON.stringify(data));
    } catch (error: unknown) {
      setError("Failed to shorten URL. Please try again.");
      toast.error(
        `Failed to shorten URL. Please try again. ${error as string}`
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedUrls = localStorage.getItem("shortenedUrls");
    if (savedUrls) {
      setShortenedUrls(JSON.parse(savedUrls));
    }
    fetchShortenedUrls();
  }, [fetchShortenedUrls]);

  /*
   * The `shortenUrl` function is an asynchronous function that shortens a given
   * URL by making a POST request to a specified API endpoint and handles error cases accordingly.
   */
  const shortenUrl = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent the default behavior of the form submission
    setIsLoading(true);
    setError("");

    // validate the URL input
    if (!url) {
      setError("Please enter a URL");
      setIsLoading(false);
      return;
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid URL");
      setIsLoading(false);
      return;
    }

    try {
      // Simular retraso en la respuesta (temporizador de un segundo)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // calling urlday api
      const response = await axios.post(
        `${API_URL}/links/`,
        { url },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      // creating a new object of type `ShortenedUrl` based on the response data received from the API
      const newShortenedUrl: ShortenedUrl = {
        id: response.data.id,
        alias: response.data.short,
        original: response.data.url,
        shortened: response.data.short_url,
      };

      // Actualizar el estado de las URLs acortadas
      setShortenedUrls((prev) => [newShortenedUrl, ...prev]);
      setUrl("");
      toast.success("URL shortened successfully!");
    } catch (error: unknown) {
      setError("Failed to shorten URL. Please try again.");
      toast.error(
        `Failed to shorten URL. Please try again. ${error as string}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  // permite copiar en el portapapeles
  const copyToClipboard = (shortUrl: string) => {
    navigator.clipboard
      .writeText(`https://urlday.cc/${shortUrl}`)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy"));
  };

  // eliminar 1x1
  const deleteUrl = (id: string) => {
    setShortenedUrls((prev) => prev.filter((item) => item.id !== id));
  };

  // eliminar todos los links acortados
  const handleReset = () => {
    setShortenedUrls([]);
  };

  return (
    <div className="bg-[#F3F4F6] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-2 mt-4 sm:mt-0 -inset-y-20 relative">
        <div
          className="bg-purple-900 bg-no-repeat bg-cover py-4 md:py-16 px-8 rounded-lg shadow-lg static mb-4"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='1152' height='200' viewBox='0 0 1152 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M671.481 -111.814C671.481 -49.0476 687.568 -4.09285 747.243 24.9441C806.919 53.981 864.576 27.4845 922.416 42.675C980.255 57.8655 980.255 155.725 1034.72 215.948C1089.19 276.17 1204.04 290.798 1297.42 229.7C1390.8 168.602 1433.13 25.9476 1405.23 -58.1655C1377.33 -142.28 1323.86 -219.048 1065.86 -219.048C807.86 -219.048 671.481 -174.58 671.481 -111.814ZM-139.07 141.757C-139.07 204.524 -122.984 249.479 -63.3082 278.515C-3.63248 307.552 54.0246 281.056 111.864 296.246C169.704 311.437 169.704 409.296 224.173 469.519C278.642 529.742 393.488 544.369 486.87 483.271C580.25 422.174 622.582 279.519 594.681 195.406C566.779 111.292 513.307 34.5238 255.308 34.5238C-2.69116 34.5238 -139.07 78.9917 -139.07 141.757Z' fill='%236B21A8'/%3E%3C/svg%3E")`,
          }}
        >
          <form
            onSubmit={shortenUrl}
            className="flex flex-col md:flex-row sm:gap-5"
          >
            <input
              type="url"
              id="longUrl"
              placeholder="Enter your link here"
              value={url}
              required
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow p-3 sm:px-6 sm:py-4  rounded-lg border-2 border-purple-500 focus:outline-none focus:ring focus:ring-purple-300"
            />

            {/*error && <p className="mt-2 text-red text-sm">{error}</p>*/}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-3 sm:mt-0 btn p-3 sm:btn text-white font-semibold sm:rounded-lg rounded-lg transition duration-300"
            >
              {isLoading ? "Shortening..." : "Shorten It!"}
            </button>
          </form>
        </div>
        {isLoading ? (
          <div className="text-center py-4">
            <p className="text-gray-600">Loading your shortened URLs...</p>
          </div>
        ) : shortenedUrls.length === 0 ? null : (
          <div className="space-y-4">
            <span className="text-gray-600 font-medium ml-9">Your links</span>
            {shortenedUrls.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md shadow flex flex-col sm:flex-row items-start sm:items-center justify-between"
              >
                <span className="text-gray-500 ml-5">{item.original}</span>
                <div className="flex items-center">
                  <span className="text-teal-500 mr-4">
                    https://urlday.cc/{item.shortened}
                  </span>
                  <button
                    onClick={() => copyToClipboard(item.shortened)}
                    className="btn text-white px-4 py-2 rounded-md hover:bg-dark-violet focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-opacity-50 mr-2 w-full sm:w-auto"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => deleteUrl(item.id)}
                    className="btn text-white px-4 py-2 rounded-md hover:bg-dark-violet focus:outline-none focus:ring-2 focus:ring-red focus:ring-opacity-50 w-full sm:w-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {shortenedUrls.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
            >
              Reset All Links
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
