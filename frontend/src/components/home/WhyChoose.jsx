import Button from "@/components/libs/Button";
import Image from "next/image";

const features = [
  {
    icon: "📚",
    title: "Human-like Writing Support",
    description:
      "Generate polished content for essays, notes, or professional documents.",
  },
  {
    icon: "⚡",
    title: "Real-Time Text Suggestions",
    description:
      "Improve your writing instantly with smart, in-context suggestions.",
  },
  {
    icon: "🌍",
    title: "Supports 50+ Languages",
    description: "Translate and write across global languages effortlessly.",
  },
  {
    icon: "📖",
    title: "Access to 500+ Curated Books",
    description:
      "Explore a rich library of academic and skill-building books free to read and learn from.",
  },
];

const WhyChoose = () => {
  return (
    <section className='py-12 md:py-20 bg-secondary'>
      <div className='container mx-auto px-6'>
        <div className='flex flex-col md:flex-row items-center'>
          {/* Image Column */}
          <div className='w-full md:w-1/2 lg:w-5/12 mb-10 md:mb-0 md:pr-10 lg:pr-16 flex justify-center'>
            <Image
              src='/mascot.png'
              alt='TextuLearn Mascot'
              width={350}
              height={350}
              className='object-contain'
            />
          </div>

          {/* Text Content Column */}
          <div className='w-full md:w-1/2 lg:w-7/12 relative'>
            <h2 className='text-3xl md:text-4xl font-bold text-primary-dark mb-4'>
              Why choose TextuLearn?
            </h2>
            <p className='text-outline text-6xl md:text-8xl lg:text-9xl font-bold text-center absolute left-0 md:-left-10 z-0 select-none -top-3 md:top-0 lg:-top-14 opacity-30 pointer-events-none'>
              CHOOSE
            </p>
            <p className='text-gray-700 text-base md:text-lg leading-relaxed mb-7'>
              Transform the way you learn with an AI-powered educational
              assistant. From writing help to multilingual support and a vast
              library of books, TextuLearn makes learning faster, smarter, and
              more personalized.
            </p>

            <div className='space-y-3 mb-7'>
              {features.map((feature, index) => (
                <div key={index} className='flex items-start'>
                  <span className='text-2xl mr-3'>{feature.icon}</span>
                  <div>
                    <h3 className='text-lg font-semibold text-primary-dark'>
                      {feature.title}
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              href='#'
              variant='contain'
              className='bg-green-500 hover:bg-green-600 text-white'
            >
              🟩 Start Exploring Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
