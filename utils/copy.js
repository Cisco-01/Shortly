import { useState } from "react";

const CopyButton = ({ shortUrl, showToast }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`https://urlday.cc/${shortUrl}`)
      .then(() => {
        setIsCopied(true);
        showToast("Copied to clipboard!");
        setTimeout(() => setIsCopied(false), 1500); // Reset after 2 seconds
      })
      .catch(() => showToast("Failed to copy"));
  };

  return (
    <button
      onClick={copyToClipboard}
      className={`text-white tracking-wider rounded-md hover:bg-dark-violet text-nowrap transition-colors duration-200 mr-2 w-full`}
    >
      <span className="btn rounded-md flex justify-center">
        {isCopied ? "Copied" : "Copy"}
      </span>
    </button>
  );
};
export default CopyButton;
