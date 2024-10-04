import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UrlForm from "./UrlForm";
import UrlList from "./UrlList";

type ToastMessage = string;
type ToastPromiseResult = { success: string; error: string };

interface ShortenedUrl {
  id: string;
  original: string;
  shortened: string;
}
//const API_KEY = process.env.NEXT_PUBLIC_URLDAY_API_KEY;
//const API_URL = process.env.NEXT_PUBLIC_URLDAY_APIURL;

const UrlShortener = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);

  /*const fetchShortenedUrls = useCallback(async () => {
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
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  }, []);*/

  useEffect(() => {
    const savedUrls = localStorage.getItem("shortenedUrls");
    if (savedUrls) {
      setShortenedUrls(JSON.parse(savedUrls));
    }
  }, []);

  /**
   * @param {string} url - The regular expression pattern checks for various
   * components of a URL such as protocol, domain name, IP address, port, path, query
   * string, and fragment locator
   * @returns The `validateUrl` function returns a boolean value indicating whether the input `url`
   * string matches the specified URL pattern.
   */
  // URL validation function
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return !!error.message;
      }
    }
    return !!Error;
  };
  const validateUrl = (url: string) => {
    // Check for space after "http://" or "https://"
    if (url.match(/^https?:\/\/\s/)) {
      return false;
    }

    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator

    return !!pattern.test(url) && isValidUrl(url);
  };

  const showToast = (
    messageOrPromise: ToastMessage | Promise<ToastPromiseResult>,
    undoCallback?: () => void
  ) => {
    const renderToastContent = (message: string) => (
      <div>
        {message}
        {undoCallback && (
          <button
            onClick={() => {
              // Call the undoCallback and close the toast
              undoCallback();
              toast.dismiss();
            }}
            className="ml-2 text-purple-500 underline"
          >
            Deshacer
          </button>
        )}
      </div>
    );
    toast.dismiss(); // Dismiss the current toast
    if (typeof messageOrPromise === "string") {
      toast(renderToastContent(messageOrPromise), {
        duration: 1500,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      toast.promise<ToastPromiseResult>(
        messageOrPromise,
        {
          loading: "Loading...", // Mensaje mientras se espera
          success: renderToastContent("Operation successful!"),
          error: <b>Could not perform the operation.</b>,
        },

        {
          duration: 1500,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    }
  };

  // CALLING URLDAY API
  /*const response = await axios.post(
        `${API_URL}/links/`,
        { url },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );*/

  // creating a new object of type `ShortenedUrl` based on the response data received from the API
  /*const newShortenedUrl: ShortenedUrl = {
        id: response.data.id,
        alias: response.data.short,
        original: response.data.url,
        shortened: response.data.short_url,
      };*/

  /*
   * The `shortenUrl` function is an asynchronous function that shortens a given
   * URL by making a POST request to a specified API endpoint and handles error cases accordingly.
   */
  const shortenUrl = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent the default behavior of the form submission
    setIsLoading(true);

    // validate the URL input
    if (!validateUrl(url)) {
      showToast("Please enter a valid URL");
      setIsLoading(false);
      return;
    }

    try {
      // Simular retraso en la respuesta (temporizador de un segundo)
      const response: ShortenedUrl = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            id: Date.now().toString(),
            shortened: Math.random().toString(36).slice(2, 6),
            original: url,
          });
        }, 1000)
      );

      // Actualizar el estado de las URLs acortadas
      setShortenedUrls((prev) => {
        const updatedUrls = [...prev, response];

        // Guardar solo el array completo de URLs acortadas en localStorage
        localStorage.setItem("shortenedUrls", JSON.stringify(updatedUrls));
        return updatedUrls; // retornamos el nuevo estado
      });
      setUrl("");
      showToast("✅ URL shortened successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        return showToast("An error occurred while shortening the URL");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateLocalStorage = (updatedUrls: ShortenedUrl[]) => {
    // Guardar el nuevo estado en localStorage
    localStorage.setItem("shortenedUrls", JSON.stringify(updatedUrls));
  };

  // eliminar 1x1
  const deleteUrl = (id: string) => {
    const previousUrls = [...shortenedUrls]; // Suponiendo que shortenedUrls es el estado actual

    const promise = new Promise<ToastPromiseResult>((resolve, reject) => {
      try {
        setShortenedUrls((prev) => {
          const updatedUrls = prev.filter((url) => url.id !== id);
          const deletedUrl = prev.find((url) => url.id === id);

          if (!deletedUrl) {
            throw new Error("URL not found");
          }

          updateLocalStorage(updatedUrls);
          resolve({
            success: `Deleted shortened URL: ${deletedUrl.id}`,
            error: "", // This won't be used in the success case
          });
          return updatedUrls;
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          reject({
            success: "", // This won't be used in the error case
            error: error,
          });
        }
      }
    });

    // Función para deshacer eliminación de un enlace
    const undoDeleteUrl = (deletedUrl: ShortenedUrl | undefined) => {
      if (deletedUrl) {
        setShortenedUrls((prev) => {
          // Verifica si el URL ya existe antes de agregarlo
          const urlExists = prev.some((url) => url.id === deletedUrl.id);
          if (!urlExists) {
            const restoredUrls = [...prev, deletedUrl]; // restaura el enlace
            updateLocalStorage(restoredUrls); // Actualiza el almacenamiento local
            showToast(`Restored: ${deletedUrl.original}`);
            return restoredUrls; // Devuelve el nuevo estado
          } else {
            showToast("Link is already restored.");
            return prev; // retorna el estado sin cambios
          }
        });
      } else {
        showToast("No link to restore.");
      }
    };

    showToast(promise, () => {
      // encuentra el enlace eliminado
      const deletedUrl = previousUrls.find((url) => url.id === id); // encuentra el enlace eliminado
      undoDeleteUrl(deletedUrl); // Pasa solo el enlace eliminado
    });
  };

  // Función para deshacer eliminación de todos los enlaces
  const undoReset = (deletedUrls: ShortenedUrl[]) => {
    setShortenedUrls((prev) => {
      // checking if there are urls already in the current state before restore again
      const urlsToRestore = deletedUrls.filter(
        (deletedUrl) => !prev.some((url) => url.id === deletedUrl.id)
      );
      if (urlsToRestore.length > 0) {
        const restoredUrls = [...prev, ...urlsToRestore]; // restaura solo los urls que no están
        updateLocalStorage(restoredUrls); // restaurar en localStorage
        showToast(`${urlsToRestore.length} link(s) restored.`); // notifica cuántos enlaces se restauraron
        return restoredUrls; // Devuelve el nuevo estado
      } else {
        showToast("All links are already restored.");
        return prev;
      }
    });
  };

  // eliminar todos los links acortados
  const handleReset = () => {
    let oldUrls: ShortenedUrl[] = [];

    const promise = new Promise<ToastPromiseResult>((resolve, reject) => {
      try {
        // Guardar el estado actual antes de eliminar
        setShortenedUrls((prev) => {
          oldUrls = [...prev]; // Make a copy of the previous state
          updateLocalStorage([]); // Update local storage
          return [];
        });
        resolve({
          success: `All ${oldUrls.length} shortened URL(s) have been deleted.`,
          error: "", // This won't be used in the success case
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          reject({
            success: "", // This won't be used in the error case
            error: error,
          });
        }
      }
    });

    showToast(promise, () => undoReset(oldUrls));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 -inset-y-24 relative" id="urlshortener">
      <UrlForm
        url={url}
        setUrl={setUrl}
        shortenUrl={shortenUrl}
        isLoading={isLoading}
        
      />
      <UrlList
        shortenedUrls={shortenedUrls}
        deleteUrl={deleteUrl}
        showToast={showToast}
        isLoading={isLoading}
      />
      {shortenedUrls.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-4 rounded-md transition duration-150 ease-in-out"
          >
            Reset All Links
          </button>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
