import StatisticCard from "./StatisticCard";
import Icons from "./Icons";

function Statistics() {
  return (
    <div className="lg:container mx-auto md:px-0 md:pr-4 lg:pr-0 2xl:px-36 min-h-[960px] md:min-h-[600px] lg:min-h-[550px]">
      {/* TITULO */}
      <h3 className="text-center text-4xl font-medium md:text-3xl mb-4">Advanced Statistics</h3>
      <p className="text-center max-w-xs md:max-w-lg flex mx-auto mb-10 md:mb-0">
        Track how your links are performing across the web with our advanced
        statistics dashboard
      </p>
      <div className="top-36 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-4 relative">
        <div className="absolute top-1/3 md:top-1/2 mx-auto md:right-0 md:left-24 w-5/6 md:w-auto h-2 bg-cyan-400 md:block rotate-90 md:rotate-0" />
        <StatisticCard
          index={0}
          icon={<Icons.BrandRecognitionIcon />}
          title="Brand Recognition"
          description="Boost your brand recognition with each click. Generic links don't mean a thing. Branded links help instill confidence in your content."
        />
        <StatisticCard
          index={1}
          icon={<Icons.DetailedRecordsIcon />}
          title="Detailed Records"
          description="Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions."
          className="md:mt-8"
        />
        <StatisticCard
          index={2}
          icon={<Icons.FullyCustomizableIcon />}
          title="Fully Customizable"
          description="Improve brand awareness and content discoverability through customizable links, supercharging audience engagement."
          className="md:mt-16"
        />
      </div>
    </div>
  );
}

export default Statistics;
