interface StatisticCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;

  // to manage positions for each block
  index: number;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  icon,
  title,
  description,
  className = "",
  index,
}) => {
  // ajustar el desplazamiento vertical basado en el índice
  let insetYClass = "";
  switch (index) {
    case 0:
      insetYClass = "-inset-y-32 md:-inset-y-10 lg:-inset-y-16 xl:-inset-y-11"; // No desplazamiento para el primer elemento
      break;
    case 1:
      insetYClass = "-inset-y-16 md:inset-y-3 lg:-inset-y-3"; // Desplazamiento para el segundo elemento
      break;
    case 2:
      insetYClass = "md:inset-y-16 lg:inset-y-8"; // Más desplazamiento para el tercer elemento
      break;
    default:
      insetYClass = `-inset-y-${index * 10}`; // Desplazamiento por defecto si hay más índices
      break;
  }
  return (
    <div
      className={`
      bg-white rounded-lg shadow-md pt-5 p-7 h-44 md:h-auto xl:h-56 relative z-10 w-[95%] sm:w-3/4
      ${className} ${insetYClass}
      text-center
      md:text-start
    `}
    >
      <div
        className="absolute -top-12 left-1/2 transform -translate-x-1/2
      md:left-6 md:transform-none
      bg-gray-800 rounded-full"
      >
        <div className="mx-auto text-center">{icon}</div>
      </div>
      <h3 className=" text-xl font-semibold mt-8 sm:mb-2 lg:mb-4">{title}</h3>
      <p className="text-gray-600 text-xs md:text-sm lg:text-sm xl:text-base font-medium xl:pr-4">{description}</p>
    </div>
  );
};

export default StatisticCard;
