import Image from "next/image";

function Description() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 overflow-x-hidden sm:overflow-visible">
      <div className="flex flex-col-reverse md:grid md:grid-cols-2 md:gap-8 md:items-center items-start md:relative top-8">
        <div className="w-auto text-center md:text-start justify-center mx-auto md:mt-0 mb-8 md:mb-0">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 px-4 md:px-0 tracking-wide ">
            More than just shorter links
          </h2>
          <p className="mt-2 text-sm sm:text-lg md:text-xl text-gray-500 sm:mt-5 md:mt-5 px-8 sm:px-0 xl:max-w-lg">
            Build your brand&apos;s recognition and get detailed insights on how your
            links are performing.
          </p>
          <div className="mt-3">
            <button className="btn text-white">Get Started</button>
          </div>
        </div>

        <div className="ml-12 sm:ml-48 md:ml-0 xl:ml-20 inset-0 right-0 md:h-[500px] mb-4 md:mb-0">
          <Image
            className="max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl h-auto"
            src="/imgs/illustration-working.png"
            alt="Shortly"
            priority
            width={2000}
            height={2000}
          />
        </div>
      </div>
    </div>
  );
}

export default Description;
