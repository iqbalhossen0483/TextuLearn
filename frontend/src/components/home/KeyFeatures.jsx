const featuresData = [
  {
    id: "01",
    title: "Interactive Book Chat",
    description:
      "Dive deep into texts by asking questions, requesting summaries, and discussing complex topics directly with your AI learning partner.",
  },
  {
    id: "02",
    title: "Intelligent Q&A Generation",
    description:
      "Instantly generate relevant short and long-form questions and answers from your books to test understanding and reinforce learning.",
  },
  {
    id: "03",
    title: "Context-Aware Assistance",
    description:
      "Get explanations and insights that are precisely tailored to the specific content and context of the book you're studying.",
  },
  {
    id: "04",
    title: "Personalized Study Support",
    description:
      "Experience a learning journey adapted to your pace and preferences, helping you grasp concepts more effectively.",
  },
];

const FeatureCard = ({ id, title, description, isLast }) => (
  <div className='flex items-start md:items-center'>
    <div className='flex flex-col items-center mr-4 md:mr-8'>
      <div className='relative bg-primary w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-white font-bold text-xl md:text-2xl rounded-lg transform rotate-[-30deg] mb-2'>
        <div className='transform rotate-[30deg]'>{id}</div>
      </div>
      {!isLast && (
        <div className='hidden md:block border-l-2 border-dashed border-primary-dark h-16 mt-2'></div>
      )}
    </div>
    <div className='mt-1 md:mt-0'>
      <h3 className='text-xl md:text-2xl font-semibold text-primary-dark mb-2'>
        {title}
      </h3>
      <p className='text-gray-600 text-sm md:text-base leading-relaxed'>
        {description}
      </p>
    </div>
  </div>
);

const KeyFeatures = () => {
  return (
    <section className='py-8 md:py-18 bg-white z-10 overflow-hidden relative'>
      {/* Background shape */}
      <div
        className='absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-secondary opacity-50 rounded-full transform -rotate-45'
        style={{ filter: "blur(100px)" }}
      >
        hello
      </div>
      <div className='container mx-auto px-6 z-10 relative overflow-hidden'>
        <h2 className='text-3xl md:text-4xl font-bold text-center text-primary-dark mb-4 z-20 relative'>
          Our key features
        </h2>
        <p className='text-outline text-6xl md:text-8xl lg:text-9xl font-bold text-center absolute left-1/2 -translate-x-1/2 z-0 select-none top-8 opacity-30 pointer-events-none'>
          FEATURES
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-16 relative z-10 mt-10 md:mt-18'>
          {featuresData.map((feature, index) => (
            <div key={feature.id} className='relative z-10'>
              <FeatureCard
                {...feature}
                isLast={index === featuresData.length - 1}
              />
              {index < featuresData.length - 1 && (
                <div className='hidden lg:block absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-4 w-16 border-t-2 border-dashed border-primary-dark'></div>
              )}
              {index === 1 && (
                <div className='block md:hidden absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-0 h-12 border-l-2 border-dashed border-primary-dark'></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
