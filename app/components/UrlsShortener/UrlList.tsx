import CopyButton from "@/utils/copy";

interface ShortenedUrl {
  id: string;
  original: string;
  shortened: string;
}

interface UrlListProps {
  shortenedUrls: ShortenedUrl[];
  deleteUrl: (id: string) => void;
  showToast: (message: string, undoCallback?: () => void) => void;
  isLoading: boolean;
}

const UrlList: React.FC<UrlListProps> = ({
  shortenedUrls,
  deleteUrl,
  showToast,
  isLoading,
}) => {

  const handleDelete = (id: string) => {
    // Guardar el estado anterior antes de eliminar el enlace
    deleteUrl(id);
  };
  return (
    <div>
      {isLoading ? (
        <div className="text-center py-4">
          <legend className="text-gray-600">
            Loading your shortened URLs...
          </legend>
        </div>
      ) : shortenedUrls.length === 0 ? null : (
        <div className="space-y-4">
          <legend className="text-gray-400 font-medium ml-9">Your links</legend>
          {shortenedUrls.map((item) => (
            <div
              key={item.id}
              className="bg-white py-4 md:p-2 rounded-md shadow flex flex-row items-start sm:items-center justify-between "
            >
              <div className="flex-col flex md:flex-row items-center mx-auto gap-2 w-full md:pl-7">
                <div className="text-black md:truncate md:max-w-sm text-start w-full pl-7 md:pl-0">
                  <span className="text-sm lg:text-base font-medium">
                    {item.original}
                  </span>
                </div>
                <hr className="md:hidden border-1 border-[#E5E7EB] w-full " />
                <div className="items-center md:flex w-full justify-end pl-7 pr-5">
                  <span className="text-teal-500 mr-2 lg:mr-12">
                    https://urlday.cc/{item.shortened}
                  </span>
                  <div className="items-center flex mt-2 md:mt-0">
                    <CopyButton shortUrl={item.shortened} showToast={showToast}/>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn rounded-md hover:bg-dark-violet focus:outline-none focus:ring-2 focus:ring-red focus:ring-opacity-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-trash"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UrlList;
