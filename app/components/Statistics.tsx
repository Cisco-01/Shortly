import React from "react";

function Statistics() {
  return (
    <div className="mt-16">
      <h2 className="text-3xl font-extrabold text-center text-gray-900">
        Advanced Statistics
      </h2>
      <p className="mt-4 max-w-2xl text-xl text-gray-500 text-center mx-auto">
        Track how your links are performing across the web with our advanced
        statistics dashboard.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Brand Recognition",
            description:
              "Boost your brand recognition with each click. Generic links don't mean a thing. Branded links help instil confidence in your content.",
          },
          {
            title: "Detailed Records",
            description:
              "Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.",
          },
          {
            title: "Fully Customizable",
            description:
              "Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.",
          },
        ].map((feature, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">
              {feature.title}
            </h3>
            <p className="mt-2 text-base text-gray-500">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Statistics;
